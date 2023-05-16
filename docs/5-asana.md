---
layout: page
title: Kobo-to-Asana Integration
nav_order: 5
permalink: /asana/
---

# Project 4: Kobo-to-Asana Integration for Project Managers

See the `asana` directory in this repo for these jobs. 

## Project Overview & Prerequisites

WCS uses Kobo Toolbox forms to record grievances of any kind that were reported to WCS for further evaluartion and review.  OpenFn automates data integration between Kobo
Toolbox (_the Source System_) and Asana (_the Destination system_).

**KoboToolBox**
the KoboToolbox form must first be setup with the relevan questions. (see the [Kobo form template here](https://ee.kobotoolbox.org/x/ZsQtnyuY)).


**Asana Field Properties:**
 The next step is to create the Asana project, using an email address that would be used to setup the OpenFN job. 
It was **very important** that the name of  destination fields within Asana match the `name` values of the Kobo fields.

 The [Asana API documentation](https://developers.asana.com/docs) explains how Asana assigns a unique identifier called, `gid` to each question field, as well as its associated answer options (if any). This is crucial for writing the actual job for creating the task in Asana.

Using a `getTask` language-asana request, we established the properties of destination fields in Asana.

**Data Flows**

*[See this data flow diagram](https://lucid.app/documents/view/6221fa37-411d-49d2-93e7-b889c4f06511).* The following jobs are configured on OpenFn.org to run automatically.



### OpenFn Jobs Setup
 
1. A first OpenFn job (`A. GIDs and Mappings for Updsert`) is written to retrieve the gids of all the associated fields from the Asana project. Note: the Project gid is found in the Asana project URL, which usually has the format:`https://app.asana.com/0/<Project_gid/list`. 

The key is to create a dummy task in Asana using the " +Add task" button in the Asana UI. Click to view the Asana task details and take note of the UI structure in the browser. It should look like this:. 

       https://app.asana.com/0/<Project_gid>/< Task_gid>  (Note: We use the TaskID in the getTask request, and not the _ProjectID_)

This *Task_gid* becomes an argument in a `getTask` request sent to Asana. The output of `state.data` contains the gids for all the Asana fields, otions and labels. Finally, this job is then modified to  create a mapping table of Kobo field response choices to their respective Asana custom_fields_choices gids. It also generates and logs a set of statements that can be inserted into Fn blocks in the main upsert job (Job #3).

This job is run *only once* as the Asana field gids for a given project are unique and doo not change. Thus this job can be switched off or archived afterwards.

⚠ *Notes for developers:*
- An example of this `A. GIDs and Mappings for Updsert` job is linked to the Github file [`/asana/getTaskGID.js`](https://github.com/OpenFn/ConSoSci/blob/master/asana/getTaskGID.js).
- On OpenFn.org this job is configured with the `asana` adaptor and a `cron` trigger.
- See below for a screenshot of how it might look configured on the platform.  

![jobA-example](../job1_ex.png)

   
2. On a timer-basis, a second OpenFn job (`B. Fetch Kobo Grievance Data`) is written to fetches Kobo survey submissions from different forms. For each Kobo form to pull, the administrator should specify the form Name, it's unique identifier (`uid`), and the identifier of the Asana project where the data should be sent (projectid). 
   
   The data is fetched via OpenFn's [language-asana adaptor](https://github.com/OpenFn/language-asana) and important metadata such as `formName`, `formType` and `projectID` are appended to the Kobo form request. This returns a json object that includes these fields above (to be used for filtering responses).
  Upon retrieving the data, OpenFn posts each individual Kobo survey data into the OpenFn inbox, to be processed by other jobs.
   OpenFn.org and automatically triggers the next (third) job.

⚠ *Notes for developers:*
- An example of this `B. Fetch Kobo Grievance Data` job is linked to the Github file [`/asana/PullKoboGrievanceData.js`](https://github.com/OpenFn/ConSoSci/blob/master/asana/PullKoboGrievanceData.js).
- On OpenFn.org this job is configured with the `http` adaptor and a `cron` trigger. 
- See below for a screenshot of how it might look configured on the platform.  

![jobB-example](../job2_ex.png)
   
3. A third job (`Upsert Job`) is written and gets triggered by the arrival of New Kobo Form data  (with a specific formName) in the inbox. This job automatically cleans, maps, & loads the Kobo survey data into a specified Asana project by creating a New Task for every Kobo submission received. Each new form to be fetched requires a new Upsert Job to be created.

This job requires a  *one-to-one mapping* i.e. 

       1 Kobo form submission => 1 task in Asana 

For scalability, WCS also required that this integration be designed such that multiple versions of the Kobo form (with identical fields) can be mapped to their own corresponding project tasks in Asana. 

There are two types of fields to be mapped:
i. Open-Ended Kobo Fields: These fields are NOT drop-down fields. They are typically Date fields or fields that accept free text input from the user. The key-value pair statements needed to populate the custom fields are auto-generated in Job #1. These ones are mapped as follows: 

       custom_fields: {'1234567890123456': dataValue('body.OneDriveFolder')} 

ii. Multiple Choice / Drop-down Kobo fields. These fileds typically have a list of pre-defined choices that users must select from. In Asana, these are mapped to `enum_options` which also have their unique gid values for every single choice in kobo. The key-value pair statements needed to populate the custom fields are also auto-generated in Job #1. These parameters are structured as follows:

       custom_fields: {
                    1234567890123456: state =>
          state.formatMapping[dataValue('body.GrievanceOrSuggestion')(state)],
                }  

iii. For the Task name in Asana, we used a combination of (1) the GrievanceID (filled in by the survey respondent) and (2) the unique, auto-generated KoboToolbox ID ( `_id` ). This was assigned to the `name` key in the `upsert()` method as follows:

       name: state =>
         `${dataValue('body.GrievanceID')(state)} (KoboID:${dataValue('body._id')(state)})`, 

The `externalId : "name",` key-value pair was included as well, to create a unique reference between a task in Asana and another database, such as cross-referencing an Asana task with a customer record in a CRM.

Next, a `formatMapping` method was included in the First Job, to map every single Kobo queston field and answer choice (obtained from Kobo `state.data` ) to a corresponding gid in Asana. For example, The *Country* field and its answer options were each mapped to gids as follows:

   
    Country: '1200158353214078',
      Afghanistan: '1187466717116802',
      Argentina: '1187466717116803',
      Bangladesh: '1187466717116804', 
   


iv.Upsert the data into the Asana project, as follows:

       upsertTask(
                   dataValue('projectid'),...
                   );

⚠ *Notes for developers:*
- An example of this `Upsert Job`  is linked to the Github file [`/asana/upsertTask.js`](https://github.com/OpenFn/ConSoSci/blob/master/asana/upsertTask.js).
- On OpenFn.org this job is configured with the `asana` adaptor, and a `message filter` trigger which is activated every time a Kobo form is fetched with a matching name (e.g., `{"formName":"WCS Global Grievances"}`). 


### Data Element Mappings

[See here](https://docs.google.com/spreadsheets/d/18AXoD-ABl8gAGDpJHiBkK8oDP6YrEsF4/edit?usp=drive_web&ouid=102832098624169374758&rtpof=true) for the integration mapping specifications. 


### Assumptions

1. The jobs and mapping design are based on this [KoboToolBox to Asana Integration Requirement](https://docs.google.com/document/d/1blAjAyZ1UfDI-3zDdf38sXYqevroGQVHxOkFWseNTS4/edit#) of WCS.
2. All data cleaning will be done in Kobo Toolbox. Every time Kobo data is
   received, OpenFn first checks for a matching task record in Asana, If a match is found, the Task is updated with new details. If a matching task is not found, a new Task is created in Asana with the data fields populated.
3. The uuid used for syncing with the destination DB is the Kobo answer `_id`. The combination of `GrievanceID` and Kobo `_id_` creates a unique identifier for each form across various systems that would interact wit this data. **Note:** `uuid` may vary, and hence not a reliable unique identifier.


### Administration & Support
#### Provisioning, Hosting, & Maintenance
This integration is hosted on OpenFn.org with hosted SaaS. The KoboToolBox Forms managed by WCS (email: ddetoeuf@wcs.org).

####  Questions or support needed?
Contact support@openfn.org. 

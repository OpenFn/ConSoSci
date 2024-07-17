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

   **Troubleshooting updates made in July 2024:**

   1. This job will not fetch Kobo submissions that are over 1 week old. If an undefined cursor or a cursor over 1 week old is used, the job will throw an error and ask the user to use a more recent cursor. This logic was implemented in July 2024 to prevent overwriting Asana tasks with Kobo data.
   2. This job logs the `_id` for each Kobo submission sent to the OpenFn Inbox.
   3. If for some reason an empty message is sent to the Inbox, the job will throw an error with the form id for further investigation. 

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


## Q2 2024 GoogleSheets Integration

### Project Overview

{TO-DO: Add Background information about why the Indonesia form needs to use GoogleSheets to record updates instead of recording them directly in Asana}


**GoogleSheets**

OpenFn will sync Kobo data to this [GoogleSheet](https://docs.google.com/spreadsheets/d/14xOFZ-iUgOizvtyDul52LhwWqFq8MUTmy2xLMEU3SRw/edit?gid=165048308#gid=165048308). Review the [GRM GoogleSheets User Guide](https://docs.google.com/document/d/1vAPLG1Sc4pSe6L0z3J5qVfmQFcvuJ1zEGmEKuExs5iI/edit) for details on how to use the GoogleSheet.


**Data Flows** 

*[See this data flow diagram](https://lucid.app/lucidchart/3f6e91d6-feac-4c12-9602-60a0f9029943/edit?invitationId=inv_6fe97638-7d35-4930-9e00-ca2e538688eb&page=OQGlZYTqVO5E#).* 


### Jobs Configured 

The following jobs are configured on OpenFn.org to run automatically.


**1. Sync to GoogleSheets**

After the tasks are upserted in Asana via the `GRM02. Upsert Aceh Grievances in Asana` job, the `Sync to GoogleSheets` job will run automatically. This job automatically cleans, maps, & loads the Kobo survey data into the specified GoogleSheet. This job stores the `Asana Task ID` returned from Asana in the Google sheet and uses it as the UUID for each row.
This job employs a  *one-to-one mapping* i.e. 

       1 Kobo form submission => 1 row in GoogleSheets 

After OpenFn syncs the Kobo data to GoogleSheets, the Indonesia team addresses the grievances and leaves updates directly in the sheet. OpenFn has created protected ranges in the Sheet so that the users will only be able to update certain rows and cannot delete any rows. Refer to the [GRM GoogleSheets User Guide](https://docs.google.com/document/d/1vAPLG1Sc4pSe6L0z3J5qVfmQFcvuJ1zEGmEKuExs5iI/edit) for more details on these protected ranges. 

**2. Update Asana Task**

This job is triggered by a message that is sent to the OpenFn project inbox. The message is automatically sent to OpenFn daily at midnight UTC by a Google Apps Script that was developed by the OpenFn team. Please notify the OpenFn team if any changes need to be made to this script. The message the script pushes to OpenFn will contain the rows and columns that have been updated since the last sync. Note: it is possible to send this message manually (instead of waiting until midnight) by clicking the "OpenFn Sync" button. Refer to the [GRM GoogleSheets User Guide](https://docs.google.com/document/d/1vAPLG1Sc4pSe6L0z3J5qVfmQFcvuJ1zEGmEKuExs5iI/edit) for more details. 

The `Update Asana Task` job will find the existing task in Asana using the `Asana Task ID` and map and load the GoogleSheet data to Asana. Only the fields in the `MAP 2: GoogleSheets -> Asana` tab in the [mapping specifications](https://docs.google.com/spreadsheets/d/1D3_smWDjelubR_Lg-1xex9TLl6lAEGMSbGDyw8whqx4/edit#gid=373544466) will be synced from GoogleSheets to Asana. 

### Data Element Mappings

[See here](https://docs.google.com/spreadsheets/d/1D3_smWDjelubR_Lg-1xex9TLl6lAEGMSbGDyw8whqx4/edit#gid=373544466) for the integration mapping specifications. 


### Assumptions

1. Only the GoogleSheets document owner and the OpenFn GoogleSheets integration user will be able to update the protected ranges in the GoogleSheet or delete rows in the Sheet. 
2. The `Update Asana Task` should always find the Asana task using the uuid `Asana Task Id`. If the task is not found in Asana it may have been deleted in Asana or someone may have changed the ID in the GoogleSheet. If assumption number 1 is met, only the OpenFn user and the document owner would have the privileges to update the ID the GoogleSheet. 
3. The GoogleSheet sharing setting will remain set to "Restricted - Only people with access can open with the link" so that any changes made to the document will be associated with a user.



### Administration & Support
#### Provisioning, Hosting, & Maintenance
This integration is hosted on OpenFn.org with hosted SaaS. The KoboToolBox Forms managed by WCS (email: ddetoeuf@wcs.org).

####  Questions or support needed?
Contact support@openfn.org. 

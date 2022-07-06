---
layout: page
title: Kobo-to-Asana Integration
nav_order: 5
permalink: /asana/
---

# Project 4: Kobo-to-Asana Integration for Project Managers

See the `asana` directory in this repo for these jobs. 

## Project Overview

WCS uses Kobo Toolbox forms to record grievances of any kind that were reported to WCS for further evaluartion and review. (see
the [Kobo form template here](https://ee.kobotoolbox.org/x/ZsQtnyuY)). OpenFn automates data integration between Kobo
Toolbox (_the Source System_) and Asana (_the Destination system_).

It was **very important** to first create both the KoboToolBox form (source system) and the corresponding desired destination fields within Asana, based on the source fields in Kobo. Using a `getTask` language-asana request, we established the properties of destination fields in Asana.

**Asana Field Properties:**
 The [Asana API documentation](https://developers.asana.com/docs) explains how Asana assigns a unique identifier called, `gid` to each question field, as well as its associated answer options (if any). This is crucial for writing the actual job for creating the task in Asana.



### Data Flows & OpenFn Jobs

**[See this data flow diagram](https://lucid.app/documents/view/6221fa37-411d-49d2-93e7-b889c4f06511).** The following jobs are configured on OpenFn.org to run automatically.

Jobs Description: 
1. A first OpenFn job is used to send a `getTask` request to Asana to  (using the `project gid`), to retrieve the gids of all the associated fields from the Asana project. 
Note: the Project gid and task gid are found in the Asana project URL, which usually has the format:`https://app.asana.com/0/<Project_gid/list`. 
The output of `state.data` contains the gids for all the Asana fields, otions and labels. Finally, this job is used to  create a mapping table of Kobo field response choices to their respective Asana custom_fields_choices gids. It also generates and logs a set of statements that can be inserted into Fn blocks in the main upsert job (Job #3).
   
2. On a timer-basis, a second OpenFn job fetches all Kobo survey submissions where form
   `name` matches "SSMT GRM Intake Form Template" with a specific `uid`. 
   
   The data is fetched via OpenFn's language-http adaptor and important metadata such as `formName`, `formType` are appended to the Kobo form submission data.
  Upon retrieving the data, OpenFn posts each individual Kobo survey data into the OpenFn inbox, to be processed by other jobs.
   OpenFn.org and automatically triggers the next (third) job.
   
3. A third job is triggerd in OpenFn by the arrival of New Kobo Form data in the inbox. This job automatically cleans, maps, & loads the Kobo survey data into a specified Asana project by creating a New Task for every Kobo submission received.

### (2) Data Element Mappings

[See here](https://docs.google.com/spreadsheets/d/18AXoD-ABl8gAGDpJHiBkK8oDP6YrEsF4/edit?usp=drive_web&ouid=102832098624169374758&rtpof=true) for the integration mapping specifications. 

This job requires a  *one-to-one mapping* i.e. 

       1 Kobo form submission => 1 task in Asana 

For scalability, WCS also required that this integration be designed such that multiple versions of the Kobo form (with identical fields) can be mapped to their own corresponding project tasks in Asana. 

There are two types of fields to be mapped:
1. Open-Ended Kobo Fields: These fields are NOT drop-down fields. They are typically Date fields or fields that accept free text input from the user. The key-value pair statements needed to populate the custom fields are auto-generated in Job #1. These ones are mapped as follows: 

       custom_fields: {'1234567890123456': dataValue('body.OneDriveFolder')} 

2. Multiple Choice / Drop-down Kobo fields. These fileds typically have a list of pre-defined choices that users must select from. In Asana, these are mapped to `enum_options` which also have their unique gid values for every single choice in kobo. The key-value pair statements needed to populate the custom fields are also auto-generated in Job #1. These parameters are structured as follows:

       custom_fields: {
                    1234567890123456: state =>
          state.formatMapping[dataValue('body.GrievanceOrSuggestion')(state)],
                }  


### (3) Job-writing
Creating the tasks in the Asana project leverages our  [language-asana](https://github.com/OpenFn/language-asana) to perform `upsert()` operations in the Asana project, as follows:

       upsertTask(
                   dataValue('projectid'),...
                   );


 Note: This `projectID` **must be added** to the second OpenFn Job (the Job that fetches survey responses from Kobo) in order to make this field available to the upsert job.
 
For the Task name in Asana, we used a combination of (1) the GrievanceID (filled in by the survey respondent) and (2) the unique, auto-generated KoboToolbox ID ( `_id` ). This was assigned to the `name` key in the `upsert()` method as follows:

       name: state =>
         `${dataValue('body.GrievanceID')(state)} (KoboID:${dataValue('body._id')(state)})`, 

The `externalId : "name",` key-value pair was included as well, to create a unique reference between a task in Asana and another database, such as cross-referencing an Asana task with a customer record in a CRM.

Next, a `formatMapping` method was included in the First Job, to map every single Kobo queston field and answer choice (obtained from Kobo `state.data` ) to a corresponding gid in Asana. For example, The *Country* field and its answer options were each mapped to gids as follows:

   
    Country: '1200158353214078',
      Afghanistan: '1187466717116802',
      Argentina: '1187466717116803',
      Bangladesh: '1187466717116804', 
   
It was helpful to note that customizing a field name in Asana *does not change* its `gid` value. Hence a change in an **existing** field name in Asana does not require any modifications to the mapping tables. 



### (4) Assumptions

1. The jobs and mapping design are based on this [KoboToolBox to Asana Integration Requirement](https://docs.google.com/document/d/1blAjAyZ1UfDI-3zDdf38sXYqevroGQVHxOkFWseNTS4/edit#) of WCS.
2. All data cleaning will be done in Kobo Toolbox. Every time Kobo data is
   received, OpenFn first checks for a matching task record in Asana, If a match is found, the Task is updated with new details. If a matching task is not found, a new Task is created in Asana with the data fields populated.
3. The uuid used for syncing with the destination DB is the Kobo answer `_id`. The combination of `GrievanceID` and Kobo `_id_` creates a unique identifier for each form across various systems that would interact wit this data. **Note:** `uuid` may vary, and hence not a reliable unique identifier.


### (4) Administration & Support
#### Provisioning, Hosting, & Maintenance
This integration is hosted on OpenFn.org with hosted SaaS. The KoboToolBox Forms managed by WCS (email: ddetoeuf@wcs.org).

####  Questions or support needed?
Contact support@openfn.org. 

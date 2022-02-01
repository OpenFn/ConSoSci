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
Toolbox and Asana project.

### (1) Data Flows & OpenFn Jobs

**[See this data flow](https://lucid.app/lucidchart/b7d25cb3-067c-4e80-ade6-adc3f741a66f/view?page=0_0#?folder_id=home&browser=icon) diagram.** The following jobs are configured on OpenFn.org to run automatically.

Jobs Description: 
1. On a timer-basis, OpenFn fetches all Kobo survey submissions where form
   `name` matches "SSMT GRM Intake Form Template" with a specific uid. 
   
   The data is fetched via OpenFn's language-http adaptor and important metadata such as `formName`, `formType` are appended to the Kobo form submission data.
  Upon retrieving the data, OpenFn posts each individual Kobo survey data into the OpenFn inbox, to be processed by other jobs.
   OpenFn.org and automatically triggers the next job.
2. A second job is triggerd in OpenFn by the arrival of New Kobo Form data in the inbox. This job automatically cleans, maps, & loads the Kobo survey data into a specified Asana project by creating a New Task for every Kobo submission received. tables in a Postgres Wildmeat database.

### (2) Data Element Mappings

[See here](https://docs.google.com/spreadsheets/d/18AXoD-ABl8gAGDpJHiBkK8oDP6YrEsF4/edit?usp=drive_web&ouid=102832098624169374758&rtpof=true) for the integration mapping specifications. 

This job requires a  *one-to-one mapping* i.e. 

       1 Kobo form submission => 1 tast in Asana 

For scalability, WCS also required that this integration be designed such that multiple versions of the Kono form (with identical fields) can be mapped to their own correspondingproject tasks in Asana. 

The [Asana API documentation](https://developers.asana.com/docs) explains how Asana assigns a unique identifier called, `gid` to each question field, as well as its associated answer options (if any). This is crucial for writing the actual job for creating the task in Asana.


### (3) Job-writing
Creating the tasks in the Asana project leverages our  [language-asana](https://github.com/OpenFn/language-asana) to perform `upsert()` operations in the Asana project.

It was **very important** to first create the corresponding desired destination fields within Asana, based on the source fields in Kobo. Using a `GET` request, we established the properties of destination fields in Asana.


<<Insert picture>>

 For the Task name in Asana, we used a combination of (1) the GrievanceID (filled in by the survey respondent) and (2) the unique, auto-generated KoboToolbox ID ( `_id` ). This was assigned to the `name` key in the `upsert()` method. The `externalId : "name",` key-value pair was included as well, to create a unique reference between a task in Asana and another database, such as cross-referencing an Asana task with a customer record in a CRM.

Next, a `formatMapping` method was included to map every single Kobo queston field and answer choice (obtained from Kobo `state.data` ) to a corresponding gid in Asana. For example, The *Country* field and its answer options were each mapped to gids as follows:

   
    Country: '1200158353214078',
      Afghanistan: '1187466717116802',
      Argentina: '1187466717116803',
      Bangladesh: '1187466717116804', 
   


The desired behaviour was as follows:

### (4) Assumptions

1. The jobs and mapping design are based on [this DRC version](https://docs.google.com/spreadsheets/d/1AN2Qyjx-ua3fE5-Nj7Bg2WSdZdIE6zy4FmVVrMqGZl0/edit?usp=drive_web&ouid=101430720901034004945) of the Rural Consumption Kobo survey.
2. All data cleaning will be done in Kobo Toolbox. Every time Kobo data is
   synced with the DB, it will overwrite the records saved there and use the
   above uuid to upsert existing records.
3. The uuid used for syncing with the destination DB is the Kobo answer `_id`. 


### (4) Administration & Support
#### Provisioning, Hosting, & Maintenance
This integration is hosted on OpenFn.org with hosted SaaS. The Postgres DB is managed by WCS/EU SWM Wildmeat partners (email: U.Muchlish@cgiar.org).

####  Questions or support needed?
Contact support@openfn.org. 

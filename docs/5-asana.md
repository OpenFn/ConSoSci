---
layout: page
title: Kobo-to-Asana Integration
nav_order: 5
permalink: /asana/
---

# Project 3: Kobo-to-Asana Integration for Project Managers

See the `asana` directory in this repo for these jobs. 

## Project Overview

EU SWM uses Kobo Toolbox to collect data on Rural Consumption across sites (see
the [Kobo form template here](https://docs.google.com/spreadsheets/d/1AN2Qyjx-ua3fE5-Nj7Bg2WSdZdIE6zy4FmVVrMqGZl0/edit?usp=drive_web&ouid=101430720901034004945)). OpenFn automates data integration between Kobo
Toolbox and a Postgresql transitional database.

### (1) Data Flows & OpenFn Jobs

**[See this data flow](https://lucid.app/lucidchart/b7d25cb3-067c-4e80-ade6-adc3f741a66f/view?page=0_0#?folder_id=home&browser=icon) diagram.** The following jobs are configured on OpenFn.org to run automatically.

Jobs: 
1. [fetch-rc-submissions.js](https://github.com/OpenFn/wcs-wildmeat/blob/master/jobs/fetch-rc-submissions.js):
   On a timer-basis, OpenFn fetches all Kobo survey submissions where form
   `name` contains "Rural Consumption". This job sends the Kobo data to
   OpenFn.org and automatically triggers the next job.
2. [rural-consumption-to-postgres.js](https://github.com/OpenFn/wcs-consocsci/blob/master/rural-consumption-to-postgres.js): OpenFn automatically cleans, maps, & loads the Kobo survey data into structured tables in a Postgres Wildmeat database.

### (2) Data Element Mappings

[See here](https://docs.google.com/spreadsheets/d/15VRibnaglShF3oNNLMbiyGopTJrYbP02aQ04cz4Qt-k/edit#gid=767749359) for the integration mapping specifications. These jobs leverage [language-postgresql](https://github.com/OpenFn/postgresql) to perform `upsert()` operations in the Postgres database.

### (3) Assumptions

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

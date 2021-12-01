---
layout: page
title: Wildmeat
nav_order: 4
permalink: /wildmeat/
---

# Project 3: Wildmeat

See the Wildmeat repository for the job code. These jobs run on the `Wildmeat` OpenFn.org project.
https://github.com/OpenFn/wcs-wildmeat

## Wildmeat Kobo Integration 2020

EU SWM uses Kobo Toolbox to collect data on Rural Consumption across sites (see
the [Kobo form template here](https://docs.google.com/spreadsheets/d/1AN2Qyjx-ua3fE5-Nj7Bg2WSdZdIE6zy4FmVVrMqGZl0/edit?usp=drive_web&ouid=101430720901034004945)). OpenFn automates data integration between Kobo
Toolbox and a Postgresql transitional database.

### (1) Data Flows & OpenFn Jobs

**[See this data flow](https://lucid.app/lucidchart/b7d25cb3-067c-4e80-ade6-adc3f741a66f/view?page=0_0#?folder_id=home&browser=icon) diagram.** The following jobs are configured on OpenFn.org to run automatically.

1. [fetch-rc-submissions.js](https://github.com/OpenFn/wcs-wildmeat/blob/master/jobs/fetch-rc-submissions.js):
   On a timer-basis, OpenFn fetches all Kobo survey submissions where form
   `name` contains "Rural Consumption". This job sends the Kobo data to
   OpenFn.org and automatically triggers the next job.
2. [rural-consumption-to-postgres.js](https://github.com/OpenFn/wcs-consocsci/blob/master/rural-consumption-to-postgres.js): OpenFn automatically cleans, maps, & loads the Kobo survey data into structured tables in a Postgres Wildmeat database.

### (2) Mappings

[See here](https://docs.google.com/spreadsheets/d/15VRibnaglShF3oNNLMbiyGopTJrYbP02aQ04cz4Qt-k/edit#gid=767749359) for the integration mapping specifications. These jobs leverage [language-postgresql](https://github.com/OpenFn/postgresql) to perform `upsert()` operations in the Postgres database.

### (3) Assumptions

1. The jobs and mapping design are based on [this DRC version](https://docs.google.com/spreadsheets/d/1AN2Qyjx-ua3fE5-Nj7Bg2WSdZdIE6zy4FmVVrMqGZl0/edit?usp=drive_web&ouid=101430720901034004945) of the Rural Consumption Kobo survey.
2. All data cleaning will be done in Kobo Toolbox. Every time Kobo data is
   synced with the DB, it will overwrite the records saved there and use the
   above uuid to upsert existing records.
3. Kobo forms only capture species `code`, not `name`. OpenFn was unable to determine a way to match this species `code` to the relevant species `name` and `taxonId`, so OpenFn is only mapping the `code` until a master list of species codes and corresponding names can be provided.
4. The jobs currently use hard-coded values for `study_id` ('1000') and
   `site_id` ('1001') as this information is currently not captured in the Kobo
   forms. All surveys will be mapped to these default `site` and `study` record. 
5. See [Wildmeat Map](https://docs.google.com/spreadsheets/d/15VRibnaglShF3oNNLMbiyGopTJrYbP02aQ04cz4Qt-k/edit#gid=767749359) for a list of fields that were intentionally not mapped in these jobs (i.e., `tbl_individual_char`).
6. All Kobo surveys to be fetched by OpenFn will contain "Rural Consumption" in
   the form name. If this criteria should change, job #1 should be updated.
7. All surveys will have a default `sample unit` (e.g., kilograms).
8. All surveys will have the default type `consumption` to start (but downstream other types like `hunter` or `market` may be added).


## Wildmeat Kobo Integration `2021 (Phase 2)`
### (1) Solution Overview
OpenFn has configured an automated data integration solution between Kobo Toolbox and a PostgresSQL database to sync Kobo submissions and enable real-time monitoring of field data collection.

[See here](https://drive.google.com/file/d/1H6x0S-b6BOqVKN41i99c7mVjyk_YACrT/view?usp=sharing) for the data model of the destionation database. 



### (2) Integration Flow
The solution is a one-way Kobo Toolbox-to-PostgresSQL integration that connects the following Kobo form types:
`Urban Consumption`,
`Rural Consumption`,
`Market`,
`Offtake`.

[See here](https://docs.google.com/spreadsheets/d/1qfniuXap7tyjf9sZZN1M1Hn7nzGfvs_twhcxzjRV8QQ/edit#gid=0) for the full list of Kobo forms which were used to design these integrations.

[See here](https://docs.google.com/spreadsheets/d/1qfniuXap7tyjf9sZZN1M1Hn7nzGfvs_twhcxzjRV8QQ/edit#gid=0) for the data element mapping specification for exchange data between Kobo and the database.


**Triggers**  
Trigger Type: Message Filter  
A message filter trigger has been configured for each of the forms above. The corresponding job will run when a form with the matching message filter is recieved in the project inbox. These can be adjusted in the OpenFn project.

**Data Mappings**  

The Kobo forms map to the following database tables: 

| DB Table              | External Uuid        | Source data                      | Form Type         |
|:----------------------|:---------------------|:---------------------------------|:------------------|
| tbl_site              | site_id              | hardcoded default (e.g., `1001`) | All               |
| tbl_sample            | sample_id            | _id + _xform_id_string           | Rural Consumption |
| tbl_study             | study_id             | hardcoded default (e.g., `2001`) | All               |
| swm_transaction       | uuid                 | _id + _xform_id_string           | Rural Consumption |
| tbl_individual        | individual_id        | _id                              | Rural Consumption |
| tbl_individual_char   | individual_char_id   | _id                              | Rural Consumption |
| tbl_household         | household_id         | _id                              | Rural Consumption |
| tbl_household_char    | household_char_id    | _id                              | Rural Consumption |
| tbl_wildmeat          | wildmeat_id          | species                          | Rural Consumption |
| tbl_market            | external_id          | market (e.g., "djazzi")          | Market            |
| tbl_wildmeat_market   | wildmeat_id          | species                          | Market            |
| tbl_sample_market     | sample_id            | _id + _xform_id_string           | Market            |
| tbl_hunter_monitoring | hunter_monitoring_id | id_hunter                        | Offtake           |
| tbl_wildmeat_hunter   | wildmeat_id          | species_id                       | Offtake           |
| tbl_sample_hunter     | sample_id            | _id + _xform_id_string           | Offtake           |
| tbl_wildmeat_urban    | wildmeat_id          | wildmeat                         | Urban Consumption |
| tbl_individual_urban  | individual_id        | _id                              | Urban Consumption |
| tbl_sample_urban      | sample_id            | _id + _xform_id_string           | Urban Consumption |


### (3) Assumptions & Considerations for Change Management
1. `study_id` & `site_id` are hardcoded values.
2. This integration assumes that the master list of species used across forms has already been added to the PostgresSQL database. The master list can be found [here](https://docs.google.com/spreadsheets/d/1qfniuXap7tyjf9sZZN1M1Hn7nzGfvs_twhcxzjRV8QQ/edit#gid=1500079237).

### (4) Administration & Support
#### Provisioning, Hosting, & Maintenance
This integration is hosted on OpenFn.org with hosted SaaS. The Postgres DB is managed by WCS/EU SWM Wildmeat partners (email: U.Muchlish@cgiar.org).

####  Questions or support needed?
Contact support@openfn.org. 



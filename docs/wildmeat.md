---
layout: page
title: Wildmeat
nav_order: 4
permalink: /wildmeat/
---

# Project 3: Wildmeat

See the Wildmeat repository for the job code. These jobs run on the `Wildmeat` OpenFn.org project.
https://github.com/OpenFn/wcs-wildmeat

## Wildmeat Kobo Integration

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

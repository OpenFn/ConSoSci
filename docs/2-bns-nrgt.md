---
layout: page
title: BNS & NRGT
nav_order: 3
permalink: /bns_nrgt/
---

# Project 1: BNS and NRGT Survey Integrations

## Kobo Toolbox template forms to integrate

- [x] BNS Survey --> OpenFn job [`bns/survey.js`](https://github.com/OpenFn/wcs/blob/master/bns/survey.js)
- [x] BNS Price --> OpenFn job [`bns/price.js`](https://github.com/OpenFn/wcs/blob/master/bns/price.js)
- [x] NRGT Historical --> OpenFn job [`nrgt/2017.js`](https://github.com/OpenFn/wcs/blob/master/ngrt/2017.js)
- [x] NRGT Current --> OpenFn job [`nrgt/2019.js`](https://github.com/OpenFn/wcs/blob/master/ngrt/2019.js)

## Mappings

[See here](https://docs.google.com/spreadsheets/d/1EuSCOepC3gs8nRHlh9E4Tszi5txv__WxHkRAK80FMT4/edit#gid=0) for the mapping specifications defined by WCS.

- These jobs map to a MSSql database and leverage [OpenFn/language-mssql](https://github.com/OpenFn/language-mssql) and available helper functions.
- If WCS would like to connect with a **Postgres database**, it can leverage [OpenFn/language-postgresql](https://github.com/openfn/language-postgresql), however we would need to add more helper functions (e.g., `upsert()`, `insertMany()`) so that syntax from these initial jobs can easily be transferred. We could look into building some sort of hyper-generic `language-sql` package that worked across various sql DBs. This would be very under-powered (as it would struggle to reach the lowest-common-denominator for things like upsert) but might ultimately save WCS time if they plan to use two different kinds of database concurrently. **(Can WCS share feedeback here and confirm whether the Postgres DB structure will be the same as the Mssql DB?)**

### Assumptions

1. For idempotency, the jobs create a new Kobo `uuid` to map to the DB `DatasetUuidId`. This is a concatenation of Kobo `_id` + `_submission_time` + `_xform_id_string`. We cannot use Kobo `_uuid` because this is refreshed every time a Kobo submission is cleaned.
2. All data cleaning will be done in Kobo Toolbox. Every time Kobo data is synced with the DB, it will overwrite the records saved there and use the above `uuid` to upsert existing records.
3. In the [`bns/survey.js`](https://github.com/OpenFn/wcs/blob/master/bns/survey.js) job, we utiilize some of the Kobo form metadata to create data for the `bns_matrix` [L52-L65](https://github.com/OpenFn/wcs/blob/master/bns/survey.js#L52-L65) and `nr` [L42-L50](https://github.com/OpenFn/wcs/blob/master/bns/survey.js#L42-L50) question groups. It is therefore important that future versions of this form follow the same Kobo question naming conventions, otherwise the data will _not_ map as expected and the job may need to be modified.
4. OpenFn will only automatically fetch the Kobo surveys where the form Ids have been specified in the  [Google Sheet Deployed Forms List](https://docs.google.com/spreadsheets/d/1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY/edit?gid=1965562058#gid=1965562058). 

## Syncing Kobo Form Submissions and the Workflows Supported

### (1) Scheduled Data Integration (Ongoing Sync)

1. On a scheduled-basis (e.g., every 3 hours), a OpenFn job will run to fetch Kobo form data in bulk for the specified form Ids. See the [Form Sharing docs](./form-sharing/#syncing-bnsnrgt-kobo-form-submissions) for more on how this workflow works and can be managed. 

Note that this workflow will: 
- Post each individual Kobo survey back to the OpenFn inbox as an individual Message.
- Message filter triggers will execute the relevant jobs (see above list) to process & load the data into the connect DB.

View **Activity History** to monitor the success of these integration flows. If any Kobo data is cleaned, it will be fetched in the next job run and will overwrite\* the matching record in the DB.

\*Note these jobs have built-in transformations to create a **custom unique identifier** to map to the DB column `DatasetUuidId`, which can be used in the OpenFn job `upsert()` operations to ensure idempotency.

```
  cleanedSubmission.durableUUID = `${_submission_time}-${_xform_id_string}-${_id}`;
```

### (2) Historical Kobo Migrations (Once-off)
If desired, Kobo forms submissions can be "re-synced" for historical or archived Kobo forms. See the [Form Sharing docs](./form-sharing/#syncing-bnsnrgt-kobo-form-submissions) for more on how this workflow works and can be managed.  

### (3) Real-Time Integration (Not used, available as needed)

**Note:** This approach is not expected to be used because it is redundant to data flow #1, where data is already being fetched every 3 hours. However, this integration option remains available for scenarios where real-time data flow is important.

1. For some forms, WCS may prefer to configure a \*REST service\*\* in Kobo Toolbox to forward Kobo surveys to OpenFn for real-time processing (rather than having the above job sync the data on a timed basis).
2. To configure the Kobo REST service for real-time integration, see the [instructions here](https://docs.google.com/document/d/14V4GgvH2eorchO6s7AOwDCIkn4JhqBb6A6SsC46GJmY/edit?usp=sharing).
3. Every time WCS submits a new Kobo survey, the data will be forwarded automatically to the OpenFn Inbox. If the OpenFn jobs are "on", this data will be processed and forwarded onto the database automatically.

\*Note that this REST Service will not re-send Kobo data after it has been cleaned (only the initial submission). This is why the timer-based jobs are needed to sync cleaned Kobo data.

## Kobo Form Management

### Integrating New Kobo Forms

If WCS would like to integrate a new BNS or NRGT Kobo form with the database...

1. Delete any test submissions used in training/ testing.
2. Check if the form already has real submission data collected. If yes, add the `formId` to the [`1B. Get Historical Kobo Data`](https://www.openfn.org/projects/1168/jobs/3542) job and run it to first migrate the historical data to the database (see more in data flow #2 above).
3. Add the new `formId` and relevant info to the [Google Sheet Deployed Forms List](https://docs.google.com/spreadsheets/d/1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY/edit?gid=1965562058#gid=1965562058) to fetch data for this form on an ongoing basis. (See the [Form Sharing docs](./form-sharing) for more on how this process.)

### Disconnecting Kobo Forms

To remove a Kobo form from the integration flow, remove it from the [Google Sheet Deployed Forms List](https://docs.google.com/spreadsheets/d/1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY/edit?gid=1965562058#gid=1965562058) or mark the column `automate_sync: false`. 

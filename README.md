# Wildlife Conservation Society (OpenFn Jobs)

**N.B. commits to the `master` branch will automatically deploy to OpenFn.org**

## Kobo Toolbox template forms to integrate
- [x] BNS Survey --> OpenFn job [`bns/survey.js`](https://github.com/OpenFn/wcs/blob/master/bns/survey.js)
- [x] BNS Price  --> OpenFn job [`bns/price.js`](https://github.com/OpenFn/wcs/blob/master/bns/price.js)
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

## Data Flows
### (1) Ongoing, Timer-Based Integration 
1. On a timer-basis (e.g., every 3 hours), the OpenFn job `[getKoboData.js](https://github.com/OpenFn/wcs/blob/master/bns/getKoboData.js)` will run to fetch Kobo form data in bulk for the specified form Ids. 
2. This job will post each individual Kobo survey back to the OpenFn inbox as an individual Message. 
3. Message filter triggers will execute the relevant jobs (see above list) to process & load the data into the connect DB. 
4. View **Activity History** to monitor the success of these integration flows. 
5. If any Kobo data is cleaned, it will be fetched in the next job run (see step #1) and will overwrite* the matching record in the DB. 

*Note these jobs have built-in transformations to create a **custom unique identifier** to map to the DB column `DatasetUuidId`, which can be used in the OpenFn job `upsert()` operations to ensure idempotency. 
```
  cleanedSubmission.durableUUID = `${_submission_time}-${_xform_id_string}-${_id}`;
```

### (2) Real-Time Integration (READY for testing)
1. For some forms, WCS may prefer to configure a REST service* in Kobo Toolbox to forward Kobo surveys to OpenFn for real-time processing (rather than having the above job sync the data on a timed basis). 
2. To configure the Kobo REST service for real-time integration, see the [instructions here](https://docs.google.com/document/d/14V4GgvH2eorchO6s7AOwDCIkn4JhqBb6A6SsC46GJmY/edit?usp=sharing). 
3. Every time WCS submits a new Kobo survey, the data will be forwarded automatically to the OpenFn Inbox. If the OpenFn jobs are "on", this data will be processed and forwarded onto the database automatically. 

*Note that this REST Service will not re-send Kobo data after it has been cleaned (only the initial submission). This is why the timer-based jobs are needed to sync cleaned Kobo data. 

 ### (3) Historical Kobo Migrations (READY for testing)
1. At any time, the OpenFn job `historical.js` can be run on-demand to manually fetch historical Kobo data. 
2. Before running the job, WCS should update the survey Ids to fetched from Kobo toolbox (these can be copied from the URL of a Kobo form). 
In `https://kf.kobotoolbox.org/#/forms/aopf2bJ4cVqEXCrjnwAoHd/landing` --> `aopf2bJ4cVqEXCrjnwAoHd` is the survey Id
3. When ready to sync the historical data, click "Run job" button. 
![run-job](run-this-job.png)

## Questions? 
Contact support@openfn.org. 


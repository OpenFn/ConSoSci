# Wildlife Conservation Society (OpenFn Jobs)

**N.B. commits to the `master` branch will deploy to OpenFn.org**

## Kobo Toolbox template forms to integrate
- [x] BNS Survey --> OpenFn job [`bns/survey.js`](https://github.com/OpenFn/wcs/blob/master/bns/survey.js)
- [x] BNS Price  --> OpenFn job [`bns/price.js`](https://github.com/OpenFn/wcs/blob/master/bns/price.js)
- [x] NRGT Historical --> OpenFn job [`nrgt/2017.js`](https://github.com/OpenFn/wcs/blob/master/ngrt/2017.js)
- [x] NRGT Current --> OpenFn job [`nrgt/2019.js`](https://github.com/OpenFn/wcs/blob/master/ngrt/2019.js)

[See here](https://docs.google.com/spreadsheets/d/1EuSCOepC3gs8nRHlh9E4Tszi5txv__WxHkRAK80FMT4/edit#gid=0) for the mapping specifications. 

## How it works
_Ongoing, Timer-Based Integration_
1. On a timer-basis, the OpenFn job `getKoboData.js` will run to fetch Kobo form data in bulk for the specified form Ids. 
2. This job will post each individual Kobo survey back to the OpenFn inbox as an individual Message. 
3. Message filter triggers will execute the relevant jobs (see above list) to process & load the data into the connect DB. 
4. View **Activity History** to monitor the success of these integration flows. 
5. If any Kobo data is cleaned, it will be fetched in the next job run (see step #1) and will overwrite* the matching record in the DB. 

*Note this job creates a **custom unique identifier** (Kobo `_id` + `_submission_time` + `_xform_id_string`) to map to the DB column `DatasetUuidId`, which can be used in the OpenFn job `upsert()` operations to ensure idempotency. We cannot use Kobo `_uuid` because this is refreshed every time a Kobo submission is cleaned.

_Real-Time Integration_
1. WCS may choose to configure a REST service in Kobo Toolbox to forward Kobo surveys to OpenFn for real-time processing (rather than having the above job sync the data on a timed basis. 
2. To configure the Kobo REST service for real-time integration, see the instructions here. 

_Historical Migration_
1. At any time, the OpenFn job `historical.js` can be run on-demand to manually fetch historical Kobo data. 
2. Before running the job, WCS should update the survey Ids to fetched from Kobo toolbox (these can be copied from the URL of a Kobo form). 
'https://kf.kobotoolbox.org/#/forms/**aopf2bJ4cVqEXCrjnwAoHd**/landing'
3. When ready to sync the historical data, click "Run job" button. 

## Questions? 
Contact support@openfn.org. 


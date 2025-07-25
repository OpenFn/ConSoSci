---
layout: page
title: Key Concepts
nav_order: 2
permalink: /key_concepts/
---

_Conservation Social Science (ConSoSci) partnership is leveraging social science to strengthen conservation outcomes._

# Key Concepts
ConSoSci offers a robust technology stack and template solutions to support partners with data collection, data management, and analysis. To better understand the solution options and value delivered, please read the following overview of key concepts, components, and terms refered throughout the solution documentation and training sessions. 

## OpenFn Platform
`OpenFn` ([openfn.org](https://openfn.org)) is an integration platform that provides secure, scalable infrastructure for integrating data and automating business processes. In short, OpenFn helps organizations spend less time processing and sharing data, and more time focussing on their core work. 

For ConSoSci, OpenFn is the "plumbing" or infrastructure connecting the different tools in the ConSoSci technology stack, helping to  exchange data, integrate disparate systems, and automate data cleaning and business process steps. OpenFn can be implemented to (1) automatically extract data from Kobo Toolbox or other data sources, (2) clean and map data elements, (3) load data into other destination systems, and (4) perform duplicate-checking operations. 
![openfn-connects](../openfn-connects.png)

OpenFn's platform centers around `jobs`, which are "low-code" integration scripts or workflows that can be automated or run on-demand. [Learn more about jobs](https://docs.openfn.org/documentation/getting-started/overview#key-terms). 
_See example job to insert data collected for Sharks and Rays via Kobo Toolbox into a connected database._
```js
upsert('table__SharksAndRays_Survey', 'answerid',
    {
        formId: dataValue('formId'), 
        answerId: dataValue('_id'),
        site: dataValue('country'),
        boatType: dataValue('boat'),
        targetCatch: dataValue('boat/target_catch'),
        weight: dataValue('boat/catch_details/weight'),
        //DB_Column: answer_to_FormQuestion
    }
);

```

To learn more about OpenFn generally and its suite of open source integration tools, see [OpenFn Documentation](https://docs.openfn.org/). Also check out the...
-  [OpenFn platform walkthrough](https://www.youtube.com/watch?v=e2V88NoLQco&list=PL1pD3-abjHJ2fNDk0g3A0jrowIVwTZyhR&index=3)
- [OpenFn Overview](https://www.youtube.com/watch?v=S_FLemsdWcc&list=PL1pD3-abjHJ2fNDk0g3A0jrowIVwTZyhR&index=1) presented in a COVIDaction webinar

## Core Terminology (Jobs, Triggers, Adaptors)
Key terms like jobs, triggers, and adaptors are used throughout this documentation and on the OpenFn platform.
To avoid duplicating content that may change, please refer to the official OpenFn documentation for the most up-to-date definitions:

- [Terminology Overview](https://www.google.com/url?q=https://docs.openfn.org/documentation/get-started/terminology&sa=D&source=docs&ust=1753105129062156&usg=AOvVaw0p4gZ7gUKuFBn0zWanaU35)
- [Full Glossary](https://www.google.com/url?q=https://docs.openfn.org/documentation/get-started/glossary&sa=D&source=docs&ust=1753105129062175&usg=AOvVaw2rIllfLuIs0S9QjZ2H9DGL)

These resources provide detailed definitions and examples that align with the latest OpenFn features and best practices.

## Integration Patterns (Scheduled vs. Event-Driven)

### Integration
The ConSoSci stack provides an _integrated_ solution to support your complete data cycle, from data collection and maangement, to integration and analysis. The solution is made of separate components or tools that support different steps in the data cycle. 
![consosci-stack](../consosci-stack.png)

In broad terms, `integration` is the process of connecting different systems, components, and/or services to work together functionally as one. Data integration, specifically, involves integrating disparate data sources and systems in a way that focuses on increasing value to the data users. In the ConSoSci stack, we leverage separate tools that support different steps in the data cycle (incl. Kobo for data collection and ConSoSci Connect for data management and analysis), which are integrated using the OpenFn platform. These solutions may also be extended/modified to integrate with other data sources, if desired. 

OpenFn supports two main integration patterns for syncing data: **scheduled (cron-based)** and **event-driven (webhook-based)**. These patterns determine how and when data gets moved between systems.

### Scheduled (Cron-Based) Integration
In a scheduled integration, OpenFn pulls data from a source system like Kobo Toolbox at regular intervals. E.g. daily or hourly—using a cron-based job trigger. This is especially useful when:

- Real-time syncing is not needed
- Webhooks cannot be configured (e.g. due to firewall or account limitations)
- You want to backfill historical submissions
- You want predictable load times or timed extraction windows

For example, many WCS deployments have scheduled jobs that periodically call the Kobo API to retrieve new submissions and sync them to ConSoSci Connect.

👉 [Learn more about scheduling jobs with OpenFn](https://docs.openfn.org/documentation/build/triggers#cron-triggers-formerly-timers)

### Event-Driven (Webhook-Based) Integration
In an event-driven setup, data is sent to OpenFn in real time via a webhook. Whenever a form is submitted in Kobo Toolbox, the submission is automatically pushed to a designated OpenFn webhook URL, instantly triggering a job to process that data. This is ideal when:

- Real-time updates are important
- You want instant feedback or processing
- The volume of submissions is manageable in real time

Many ConSoSci projects use this model to forward Kobo form submissions directly to OpenFn for immediate validation and database syncing.

👉 [Learn more about Kobo’s integration options, including webhooks and APIs](https://docs.openfn.org/adaptors/kobotoolbox#apis--integration-options)

## Data Management, Sources & Formats
### Kobo Toolbox (Add something about various Kobo accounts and aggregation accounts) 
Kobo Toolbox ([see documentation](https://support.kobotoolbox.org/welcome.html)) is a suite of tools for field data collection for use in challenging environments. The software is _free_ and open source and works both on and offline.

Kobo primarily offers a mobile application for data collection. Users will create data collection tools or surveys called `projects` or `forms`. Then, field data collectors will fill out these different forms, submitting `form submissions` to record forms responses. 
![kobo-shots](../kobo-shots.png)

Kobo also offers a web app for aggregating form submissions collected in the field, which provides basic data management and data cleaning functions. However, data management and analysis functions are limited, so typically users via export the data via CSV export options and/or REST APIs for automated data integration. If you've worked with data collection tools like `ODK`, `ONA`, or `SurveyCTO`, these are very similar mobile data collection apps. 

To learn more about Kobo, check out...
- [Kobo quick tour video](https://www.youtube.com/watch?v=4PNtT51h3CQ)
- [Kobo training deck](https://docs.google.com/presentation/d/e/2PACX-1vSAvVM0h3NsQg6vUsw1zxVBUtGsnJC0P792iT87gZydijuMcg6yT1OEz6L7ZNeSTqaZicEmlJrZnXQP/pub?start=false&loop=false&delayms=3000&slide=id.gca45939289_2_75) for ConSoSci partners
- [Kobo user manuals](https://drive.google.com/drive/folders/12anHiXs2ya_7AgGPL8Oux4HXK_LylIX0)

### ConSoSci Connect
ConSoSci Connect is a data solution in development to deliver secure data storage, centralized management, analysis and visualization tools for social science data. It provides automated queries and analyses indicators such as the Basic Necessities Survey (BNS) and Natural Resource Governance Tool (NRGT), and visualize and share the results in compelling dashboards and reports. This enables users to easily monitor progress towards these indicators in near real-time, as well as run further custom analysis to dissect and investigate social science data collected across sites.
![consosci-dashboard](../consosci-dashboard.png)

### JSON
JSON stands for JavaScript Object Notation. `JSON` is a lightweight format for storing and transporting data, commonly used for transporting data across the web. If we extract form submissions from Kobo Toolbox, for example, the data collected can be returned in JSON format that looks like this...
```json
{
    "formName": "Vegetation Survey", 
    "_id": "21020919", 
    "submissionDate": "2021-03-21", 
    "species_code": "20391", 
    "species_type": "shrub"
}
```

JSON characteristically is made of key:value pairs (e.g., `"kobo_question": "answer"`). 
## Destination of the DataPostgreSQL & MSSQL

### APIs 
`API` stands for Application Programming Interface, which is a software intermediary that allows applications to talk to each other. APIs provide a set of definitions and protocols for building and integrating application software. They're sometimes referred to as a "contract" between an information provider and an information user. APIs establish the content required from the consumer (the "request") and the content required by the producer (the "response").

In other words, if you want to interact with a system to retrieve information or perform a function, an API helps you communicate what you want to that system so it can understand and fulfill the request. In the ConSoSci stack, OpenFn sends scheduled requests to the Kobo API in order to extract data collected in the field, and then load it into a destination database like ConSoSci Connect. 
![api](../kobo-api.png)


#### Read on for the more technical bits... 
Planning to personally interact and configure the technology in the ConSoSci stack? Check out the following for more information on concepts core to the technical workings of the solutions. 

### REST APIs
Systems integration will leverage APIs to extract and load data to/from an application, commonly leveraging `REST` or `RESTful` APIs, which supports interactions using web services. `REST` stands for "representational state transfer" and describes the architecture of the API, which takes advantage of `HTTP`. Using `HTTP` requests and responses, information can be sent in multiple formats (`JSON`, `HTML`, `PHP`, `Plain Text`, etc.). [Read more here](https://www.redhat.com/en/topics/api/what-is-a-rest-api). 

Check out the Kobo API: [https://support.kobotoolbox.org/api.html](https://support.kobotoolbox.org/api.html)

### HTTP Requests
`HTTP` is the foundation of any data exchange on the Web and it is a client-server protocol, which means requests are initiated by the recipient. When you open your webbrowser and go to a website (e.g., `http://openfn.org`), you are the "client" initiating a HTTP request to access a website. 

REST APIs most commonly support the following types of HTTP requests: 
- `GET` - Asks the server to retrieve a resource
- `POST` - Asks the server to create a new resource
- `PUT` - Asks the server to edit/update an existing resource
- `DELETE` - Asks the server to delete a resource

![openfn-int](../openfn-integration.png)

For example, if you want to "get" or extract data collected via a mobile data collection app like Kobo Toolbox ([see Kobo's API docs](https://support.kobotoolbox.org/api.html)), you might send a HTTP request that looks something like this...
```
GET https://kf.kobotoolbox/api/v2/assets/{form-uuid}/data/
```
You could send this HTTP request on-demand via your computer using a [cURL command](https://www.redhat.com/sysadmin/use-curl-api) or an application like [Postman](https://documenter.getpostman.com/view/631643/JsLs/?version=latest), _or_ you could develop a software program to automate this... _OR_ leverage OpenFn to quickly write a "job" to send these requests automatically or on-demand. 

In these ConSoSci integration solutions, OpenFn is frequently making HTTP requests to `GET` data from Kobo Toolbox and to then load it into the relevant destination database, running `SQL` scripts to execute database operations (e.g., `insert`, `select`, etc.). 

### Databases (PostgreSQL, MSSQL)
PostgreSQL and Microsoft MSSQL are common types of relational databases. PostgreSQL is the underlying database infrastructure for ConSoSci Connect and is an open-source database option for those looking to configure their own database. Such databases can be accessed and manipulated using `SQL` (Structured Query Language). Queries can be used to extract or load data, as well as structure data to feed into reports and analytics. 

Example SQL script that will insert rows of data into a database table: 
```sql
INSERT INTO TABLE_NAME (column1, column2, column3,...columnN)  
VALUES (value1, value2, value3,...valueN);
```

## Ready to try OpenFn? 
Create a user account at [openfn.org/signup](https://www.openfn.org/signup).

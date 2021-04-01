---
layout: page
title: Key Terms
nav_order: 2
permalink: /key_terms/
---

# Key Terms
These solutions and documentation take for granted that you're familiar with the following key terms and concepts. 

## Integration
In broad terms, integration is the process of connecting different systems, components, and/or services to work together functionally as one. Data integration, specifically, involves integrating disparate data sources and systems in a way that focuses on increasing value to the data users. 

Most of the ConSoSci solutions discussed in this site deliver data integration between mobile data collection sources (Kobo Toolbox) and database systems (ConSoSci Connect, your own custom database), but may be extended/modified to integrate with other data sources. 

## OpenFn
OpenFn is an integration platform that provides secure, scalable infrastructure for integrating data and automating business processes, helping organizations spend less time processing and sharing data and more time focussing on their core work. 

OpenFn's platform centers around `jobs`, which are integration "scripts" or workflows that can be automated or run on-demand. 

For ConSoSci, OpenFn is the "plumbing" connecting the different tools in the ConSoSci technology stack, helping to  exchange data, integrate disparate systems, and automate data cleaning and business process steps. OpenFn `jobs` are implemented to (1) extract data from Kobo Toolbox, (2) clean and map data elements, and (3) load data into other database systems, while performing duplicate-checking operations. 
![consosci-stack](../consosci-stack.png)

To learn more about OpenFn generally and its suite of open source integration tools, see [`OpenFn Documentation`](https://docs.openfn.org/). 

## KoBo Toolbox
Kobo Toolbox ([see documentation](https://support.kobotoolbox.org/welcome.html)) is a suite of tools for field data collection for use in challenging environments. The software is free and open source and works both on and offline.

Kobo primarily offers a mobile application for data collection. Users will create data collection tools or surveys called `projects` or `forms`. Then, field data collectors will fill out these different forms, submitting `form submissions` to record forms responses. 

Kobo also offers a web app for aggregating form submissions collected in the field, which provides basic data management and data cleaning functions. However, data management and analysis functions are limited, so typically users via export the data via CSV export options and/or REST APIs for automated data integration. 

## Databases: PostgreSQL, MSSQL
PostgreSQL and Microsoft MSSQL are common types of relational databases. PostgreSQL is the underlying database infrastructure for ConSoSci Connect and is open-source. These databases can be accessed and manipulated using `SQL` (Structured Query Language). 

Example SQL script that will insert rows of data into a database table: 
```sql
INSERT INTO TABLE_NAME (column1, column2, column3,...columnN)  
VALUES (value1, value2, value3,...valueN);
```

## APIs 
`API` stands for Application Programming Interface, which is a software intermediary that allows applications to talk to each other. An API is a set of definitions and protocols for building and integrating application software. It’s sometimes referred to as a contract between an information provider and an information user. APIs establish the content required from the consumer (the "request" or "call") and the content required by the producer (the "response").

In other words, if you want to interact with a system to retrieve information or perform a function, an API helps you communicate what you want to that system so it can understand and fulfill the request. APIs effectively provide a "menu" for what information/functions you can perform in an application. 

Systems integration will leverage APIs to extract and load data to/from an application, commonly leveraging `REST` or `RESTful` APIs, which supports interactions using web services. `REST` stands for "representational state transfer" and describes the architecture of the API, which takes advantage of `HTTP`. Using `HTTP` requests and responses, information can be sent in multiple formats (`JSON`, `HTML`, `PHP`, `Plain Text`, etc.). [Read more here](https://www.redhat.com/en/topics/api/what-is-a-rest-api). 

## HTTP Requests

`HTTP` is the foundation of any data exchange on the Web and it is a client-server protocol, which means requests are initiated by the recipient. When you open your webbrowser and go to a website (e.g., `http://openfn.org`), you are the "client" initiating a HTTP request to access a website. 

REST APIs most commonly support the following types of HTTP requests: 
- `GET` - Asks the server to retrieve a resource
- `POST` - Asks the server to create a new resource
- `PUT` - Asks the server to edit/update an existing resource
- `DELETE` - Asks the server to delete a resource

For example, if you want to "get" or extract data collected via a mobile data collection app like Kobo Toolbox ([see Kobo's API docs](https://support.kobotoolbox.org/api.html)), you might send a HTTP request that looks something like this...
```
GET https://kf.kobotoolbox/api/v2/assets/{form-uuid}/data/
```
You could send this HTTP request on-demand via your computer using a [cURL command](https://www.redhat.com/sysadmin/use-curl-api) or an application like [Postman](https://documenter.getpostman.com/view/631643/JsLs/?version=latest), _or_ you could develop a software program to automate this... _OR_ leverage OpenFn to quickly write a "job" to send these requests automatically or on-demand. 

In these ConSoSci integration solutions, OpenFn is frequently making HTTP requests to `GET` data from Kobo Toolbox and to then load it into the relevant destination database, running `SQL` scripts to execute database operations (e.g., `insert`, `select`, etc.). 


## JSON
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

Using a tool like OpenFn, this JSON can then be easily mapped to another database. We might reference the JSON key in OpenFn jobs to define how to extract source data values. 

For example, this is a job that creates 
```js
insert(table__KoboForm, 
    date: dataValue('submissionDate'),
    answerId: dataValue('_id'),
    columnOne: dataValue('kobo_question1'),
    columnTwo: dataValue('kobo_question2'),
    ...
}); 
```
## Learn More
Check out [`OpenFn Documentation`](https://docs.openfn.org/) for more on OpenFn, jobs, integration use cases, examples, and design help. 
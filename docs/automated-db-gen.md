---
layout: page
title: Automated Database Generation
nav_order: 3
permalink: /automated_db_generation/
---

# Project 2: Automated Postgres Table & Kobo Form Integration

## Summary

WCS would like to automate the configuration of destination database tables and OpenFn jobs to integrate Kobo data when new Kobo forms are uploaded to a connected Kobo account. How this will work:

1. Job `automation/01-getForms.js` will run on a scheduled basis to check Kobo Toolbox for new forms. If any forms are created or updated, this will trigger 2 jobs to run.

2a. Job `02a-syncToPostgres.js` will upsert database tables in Postgres. If the table exists, but new Kobo questions have been added - the table will be updated to include additional columns.

2b. Job `02b-syncToOpenFn.js` will upsert jobs in OpenFn to map the Kobo forms to the tables created in the above job.

See [issue 7](https://github.com/OpenFn/wcs-consocsci/issues/7) documenting the original request.

## Assumptions from engineering

1. We will check for new or changed forms in Kobo every 60 minutes.
2. We will not delete columns from tables in Postgres, ever.
3. Will will not modify columns in Postgres, ever.
4. When a new form is added to Kobo, we will create a corresponding table in
   Postgres.
5. When a form is modified in Kobo, if fields have been _added_, we will add
   those columns to the existing table in Postgres.
6. When a form is updated, records in "child" repeat group tables on Postgres
   will be purged and _then_ the current set of repeat group entries will be
   added as repeat group records in Postgres.

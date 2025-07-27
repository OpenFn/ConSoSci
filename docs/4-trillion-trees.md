---
layout: page
title: Trillion Trees
nav_order: 4
permalink: /trilliontrees/
---

# Trillion Trees

## Project Overview & Prerequisites
### Prerequisites

- Active KoboToolbox credentials
- Access to the [Trillion Trees Google Sheet](https://docs.google.com/spreadsheets/d/1infud5dFH-ogEIYUPmlSb9PSld_xftQs0i5HtdhHTas/edit?gid=847779889#gid=847779889) (`TT-DEPLOYED`, `TT-ARCHIVED`) listing all relevant form configurations
- Valid MS SQL database credentials and schema
- Standardized naming conventions and codes for enums and select options (e.g. `TT_TreeSpacingExtCode`, `TT_RegionExtCode`)

## Workflow Diagram

## Field-to-DB Mappings

[See here](https://docs.google.com/spreadsheets/d/17DLdsUCS3wincSlHD07lrgR7vOIYQEhDmrg2EtZbwCo/edit?gid=570142397#gid=570142397) for the mapping specifications defined by WCS.

## Data Flows & Workflow Descriptions
###  Overview

There are three main flows:

1. **Ongoing Sync (`1.1 Get Forms - Ongoing Gsheet`)**  
   - Scheduled sync of actively deployed forms  
   - Fetches submissions after a recent timestamp (manualCursor)  
   - Filters based on `auto_sync = TRUE` in the sheet

2. **Historical Sync (`1.2 Get Forms - Historical`)**  
   - Manual/on-demand run to fetch legacy form submissions  
   - Fetches from both deployed and archived forms if `historical_sync = TRUE`

3. **MSSQL Sync (`2. Sync Data to MSSQL`)**  
   - Receives posted submissions from the above jobs  
   - Triages incoming submissions based on `tableId`  
   - Routes to the correct job for transformation and upsert
   - 
### Triggers & Scheduling

| Workflow                         | Trigger Type | Schedule           |
|----------------------------------|--------------|--------------------|
| `1.1 Get Forms - Ongoing Gsheet` | Cron         | Every 3 hours      |
| `1.2 Get Forms - Historical`     | Manual       | Run as needed      |
| `2. Sync Data to MSSQL`          | Webhook      | Triggered on inbox post |
| `3. Sync Forms Metadata`         | Cron         | Daily at 6:00 AM   |

### Job Code Structure

Each job in the `2. Sync Data to MSSQL` workflow is designed to take a single Kobo form submission and save it to the appropriate table(s) in the database. These jobs are written in JavaScript using OpenFn’s expression syntax, but follow a predictable pattern that makes them easy to read and extend.

Here’s a general overview of how these jobs work:

#### 1. Read and filter the submission

The job first checks if the Kobo form submission should be processed. For example, if the submission is marked as a test (`survey_type = practice`), it is skipped. Otherwise, it extracts important details like:
- Submission ID
- Form name
- Region
- Submission date

This helps track each record and makes sure it's being routed correctly.

---

#### 2. Clean and format the data

Before saving anything to the database, the job ensures the data is clean and standardized:
- Text fields are trimmed (extra spaces removed)
- Dates are formatted correctly
- Responses like "yes" and "no" are converted to `1` and `0` (or matched to internal codes)

This helps avoid errors when saving to the database and keeps things consistent.

---

#### 3. Match answers to reference values

Some Kobo fields have dropdown choices (like region names or spacing types). These are mapped to standardized codes used in the database. For example:
- `"Sparse"` spacing becomes code `TT001`
- `"Dense"` spacing becomes code `TT002`

This is done using lookup tables, and the job searches these tables to find the correct code for each answer.

---

#### 4. Build the database record

Once the values are cleaned and matched, the job builds a structured "record" that matches the database format. It includes:
- All form responses
- A unique ID for the record
- Timestamps
- References to the original Kobo submission

If the form contains repeat groups (like a list of seedlings or people), each item is handled separately and linked back to the main record.

---

#### 5. Save to the database

Finally, the job saves the cleaned and mapped data into the correct table using:
- `upsert()` for a single record (e.g., planting data)
- `upsertMany()` for lists of related records (e.g., seedling monitoring entries)

OpenFn makes sure that if a record already exists (based on unique ID), it’s updated instead of duplicated.

---

#### 6. Finish and log

After saving, the job logs what was done for monitoring and debugging. Any issues (like unmatched values or errors connecting to the database) are logged clearly so they can be reviewed.

---

This structure is reused across all Trillion Trees form jobs — so adding a new form is mostly a matter of copying a job and updating the field mappings.

If you're non-technical, you can still help by:
- Making sure Kobo forms are properly configured in the Google Sheet
- Reviewing mappings in the shared mapping spreadsheet
- Confirming which table each form should save to


### Assumptions

- Kobo forms must be registered in the `TT-DEPLOYED` or `TT-ARCHIVED` sheet  
- Each form entry must include:
  - `form uid`  
  - `form name`  
  - `form owner`  
  - `DB table` (used as `tableId`)  
  - Flags for `auto_sync` or `historical_sync`  
- Lookup values in MS SQL are uniquely identified via `ExtCode` fields  
- `SurveyType != 'practice'` is used to exclude test data  
- Each form submission is uniquely identified via `_id` + `_xform_id_string` combo
  
## Administration & Support

#### Provisioning, Hosting, & Maintenance

####  Questions or support needed?
Contact support@openfn.org. 


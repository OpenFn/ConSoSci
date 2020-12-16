---
layout: page
title: Automated Kobo Integration
nav_order: 3
permalink: /kobo-automation/
---

# Project 2: Automated Database Configuration & Kobo Form Integration

## Solution overview 
(See Presentation for screenshots of the solution overview)

The aim of the solution is to automatically integrate data from Kobo surveys collected across different partners and sites so that WCS administrators can regularly monitor and report across these data sources. 

Specifically, this solution automates integration of Kobo survey data into a Postgres database, syncing both Kobo metadata (form design changes such as question IDs and question types) and data (actual records or form submissions) between the two systems, via OpenFn. The diagram below demonstrates this flow where OpenFn... 

1. Regularly checks for new and updated forms on Kobo from a specified list of form IDs [Requires initial manual configuration] 
2. Analyses fetched forms and creates SQL script for creating tables and columns
3. Updates Postgres table with new tables and columns [Optionally automated or manual step] 
4. Creates OpenFn job for writing submission data into the tables
5. Regularly fetches submission data from specified Kobo forms [Requires initial manual configuration] 
6. Writes submission data to Postgres tables

## Specifications
### Automation Specs
This solution delivers a semi-automatic process for integration Kobo metadata and data with a connected Postgres database. 
...

### Automation Assumptions
1. OpenFn will ...

## Database Auto-Configuration Specs 
(See database...


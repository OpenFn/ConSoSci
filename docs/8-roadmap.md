---
layout: page
title: Roadmap & Backlog
nav_order: 8
permalink: /roadmap/
---

# Roadmap & Backlog for Future Phases

## 1. BNS and NGRT
1. Implement compatibility with Postgres (This year?)
2. Training for WCS admins on editing & writing basic jobs (This year?)

## 2. Kobo Automation Solution
1. Implement compatibility with mssql database
2. Auto-generate SQL queries for quicker analysis?
3. Handling test data - is there a way to not write specific data to the DB? (Consider logic to check if test data before integrating with destination database)
4. Automatically build a “Data Dictionary” to track metadata in connected destination DBs if tables are auto-generated
5. Additional training for administrators in other organizations

## 3. Wildmeat
1. Updates to map species codes to specific species/ taxon records in a reference table
2. Support for future surveys with other consumption types (i.e., `hunter`, `market`), including other sample collection methods (so far this was specifically mentioned as a possibility for `hunter` surveys)
3. Support for `Urban Consumption` forms
4. Collection of household ethnicity & education data and DB mappings
5. Changes to how sample units (e.g., `kg`, `days`, `hours`) are set, converted & mapped to the DB

---
layout: page
title: Kobo Form Sharing Notifications
nav_order: 6
permalink: /form-sharing/
---

# Kobo Form Sharing Notification for WCS Admins

Lists of "deployed" and "archived" Kobo BNS/NRGT forms for data collection are stored in [this Google Sheet](https://docs.google.com/spreadsheets/d/1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY/edit?gid=1559623602#gid=1559623602). 

The below "Form Sharing" workflow has been configured in OpenFn. See the [form-sharing](https://github.com/OpenFn/ConSoSci/tree/master/form-sharing) directory for the underlying code. 

When the workflow runs, it will: 
1. Check the connected Kobo accounts for form updates
2. Compare any updated forms with the list of deployed forms in the ["Deployed" Forms Sheet](https://docs.google.com/spreadsheets/d/1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY/edit?gid=1559623602#gid=1559623602)
3. Add any newly deployed forms to the Sheet
4. Update rows in the ["Deployed" Sheet](https://docs.google.com/spreadsheets/d/1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY/edit?gid=1559623602#gid=1559623602) if forms are archived, and then add the archived form to the ["Archived" Sheet](https://docs.google.com/spreadsheets/d/1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY/edit?gid=1965562058#gid=1965562058)
5. Assign Asana Task(s) to the WCS admin to review every form newly deployed or archived

![form-sharing](./form-sharing.png)

## Managing the Forms Lists in Google Sheets
[This Sheet](https://docs.google.com/spreadsheets/d/1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY/edit?gid=1559623602#gid=1559623602) is now the source of truth for what Kobo forms should or should not be synced to the ConSoSci database. Update the column `automate_sync` to true/false to specify whether these forms should be included when either the [BNS-1A Ongoing]() or [BNS-1B Historical] "Get forms" jobs run.

## Specifications
- Original [Github technical specification](https://github.com/OpenFn/ConSoSci/issues/206) and the [workflow diagram (v2)](https://lucid.app/lucidchart/346b8e5c-6fb6-4a33-9d02-53e5059bd698/edit?invitationId=inv_d1431bce-05ae-4005-9b6a-9c279141a3a3&page=0_0#)
- [Change request](https://github.com/OpenFn/ConSoSci/issues/224) for how archived forms are managed 

## How to re-process Kobo form submissions & re-sync historical data
You can either: 
1. add the form to the [archived forms list](https://docs.google.com/spreadsheets/d/1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY/edit?gid=1965562058#gid=1965562058), set the column L `automate-sync: true` and run the historical job to re-sync _all_ submissions for that form, or 
2. specify a manual cursor in the [Get FormsList Ongoing job](https://v1.openfn.org/projects/consosci/jobs/E7cauG). 

See this video walkthrough: 

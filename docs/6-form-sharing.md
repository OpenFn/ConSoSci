---
layout: page
title: Kobo Form Sharing Notifications
nav_order: 6
permalink: /form-sharing/
---

# Kobo Form Sharing Notification for WCS Admins

Lists of "deployed" and "archived" Kobo forms for data collection are stored in [this Google Sheet](https://docs.google.com/spreadsheets/d/1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY/edit?gid=1559623602#gid=1559623602). 

The below "Form Sharing" workflow has been configured in OpenFn. See the [form-sharing](https://github.com/OpenFn/ConSoSci/tree/master/form-sharing) directory for the underlying code. 

When the workflow runs, it will: 
1. Check the connected Kobo accounts for form updates
2. Compare any updated forms with the list of deployed forms in the ["Deployed" Forms Sheet](https://docs.google.com/spreadsheets/d/1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY/edit?gid=1559623602#gid=1559623602)
3. Add any newly deployed forms to the Sheet
4. Update rows in the ["Deployed" Sheet](https://docs.google.com/spreadsheets/d/1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY/edit?gid=1559623602#gid=1559623602) if forms are archived, and then add the archived form to the ["Archived" Sheet](https://docs.google.com/spreadsheets/d/1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY/edit?gid=1965562058#gid=1965562058)
5. Assign Asana Task(s) to the WCS admin to review every form newly deployed or archived

![form-sharing](./form-sharing.png)

## Specifications
- Original [Github technical specification](https://github.com/OpenFn/ConSoSci/issues/206) and the [workflow diagram (v2)](https://lucid.app/lucidchart/346b8e5c-6fb6-4a33-9d02-53e5059bd698/edit?invitationId=inv_d1431bce-05ae-4005-9b6a-9c279141a3a3&page=0_0#)
- [Change request](https://github.com/OpenFn/ConSoSci/issues/224) for how archived forms are managed 

---
layout: page
title: Job Writing
nav_order: 5
permalink: /jobs/
---

# Job Writing & Customizing Automated Jobs
**Please note:** 
- We recommend using the OpenFn `Job Studio IDE` or a code editor like [VS Code](https://code.visualstudio.com/download) if editing locally on your computer. 
- These examples are based on the [Vegetation form mapping](https://docs.google.com/spreadsheets/d/1LHmKtQTGZEJqm6taUqpIaylYA11CXHNWmG8U0lL7Qd0/edit?ts=604662dc#gid=0). [See here](https://github.com/OpenFn/ConSoSci/blob/master/vegetation/VegetationClassficationAndTreeMeasurementForm.js) for the auto-generated job. 

## 1. Changing field & table names
When generating a destination database output, the automation solution will automatically use Kobo question names as DB columns names. 
- For example, in our Kobo "Vegetation" form we have the question `plot_number` --> OpenFn will generate the destination DB column name `plot_number`. 
- Therefore the field mapping in this auto-generate job is: `plot_number: dataValue('plot_number'),`

To quickly re-map this Kobo question to another database column, you can "find + replace" (use `ctrl` + `F` to find) to more quickly update the DB column names in the mappings. 
- For example, if the auto-generated job mapping is: `plot_number: dataValue('plot_number')`, but your destination column name `PlotNumber` (instead of `plot_number`)...
- You might `ctrl` + `F` to search for  `plot_number: dataValue('plot_number')` (see [cell G22](https://docs.google.com/spreadsheets/d/1LHmKtQTGZEJqm6taUqpIaylYA11CXHNWmG8U0lL7Qd0/edit?ts=604662dc#gid=0)), and then...
- Replace with the desired mapping (see [cell H22](https://docs.google.com/spreadsheets/d/1LHmKtQTGZEJqm6taUqpIaylYA11CXHNWmG8U0lL7Qd0/edit?ts=604662dc#gid=0)): `PlotNumber: dataValue('plot_number')`

## 2. Mapping many:1 relationships/ look-ups in a relational DB
If 

## 3. Mapping m:m relationships
1. Updates to map species codes to specific species/ taxon records in a reference table
2. Support for future surveys with other consumption types (i.e., `hunter`, `market`), including other sample collection methods (so far this was specifically mentioned as a possibility for `hunter` surveys)
3. Support for `Urban Consumption` forms
4. Collection of household ethnicity & education data and DB mappings
5. Changes to how sample units (e.g., `kg`, `days`, `hours`) are set, converted & mapped to the DB

## Additional Resources
- See the [Kobo Automation docs](https://openfn.github.io/ConSoSci/kobo-automation/) for more on the solution, default behavior, and naming conventions. 
- See [OpenFn/Docs](https://docs.openfn.org/documentation/build/jobs/) for general OpenFn job-writing guidance and explore the [ConSoSci](https://github.com/OpenFn/ConSoSci) repo for more examples. 
- See the [training recording](https://www.youtube.com/watch?v=ScmZt9PIJqQ&list=PL1pD3-abjHJ3d-6hB2zN5ia2z7tH_CtX9&index=4) from the session on job-writing.

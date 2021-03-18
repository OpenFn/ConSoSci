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

To quickly re-map this Kobo question to a different database column, you can "find + replace" (use `ctrl` + `F` to find) to more quickly update the DB column names in the mappings. 
- For example, if the auto-generated job mapping is: `plot_number: dataValue('plot_number')`, but your destination column name is `PlotNumber` (instead of `plot_number`)...
- You might `ctrl` + `F` to search for  `plot_number: dataValue('plot_number')` (see [cell G22](https://docs.google.com/spreadsheets/d/1LHmKtQTGZEJqm6taUqpIaylYA11CXHNWmG8U0lL7Qd0/edit?ts=604662dc#gid=0)), and then...
- Replace with the desired mapping (see [cell H22](https://docs.google.com/spreadsheets/d/1LHmKtQTGZEJqm6taUqpIaylYA11CXHNWmG8U0lL7Qd0/edit?ts=604662dc#gid=0)): `PlotNumber: dataValue('plot_number')`

## 2. Mapping many:1 relationships/ look-ups in a relational database
If you are inserting records in child tables that look-up parent tables via a `foreign key`, consider the following mapping approach: 
1. If the look-up values are fairly set and you don't expect the records in the parent table to change frequently, you might build a "mapping" object in our job to capture how Kobo values should map to DB values. See the example [surveyTypeMap](https://github.com/OpenFn/ConSoSci/blob/master/arcadia/arcadiaSiteDataCollection.js#L153) in the Arcadia jobs. 
For example, if hoping to map `WCSPROGRAMS_VegetationDrainageID:  dataValue('drainage')` where `WCSPROGRAMS_VegetationDrainageID` is the foreign key to a parent table called `WCSPROGRAMS_VegetationDrainage`, you might...
1. Build the mapping within `alterState(...)` to reassign the Kobo choice values with the relevant database Ids.  
```js
alterState(state => {
    const drainageMap = {
        welldrained: '1',
        impended: '2',
        seasonally_impended: '3'
        //kobo_choice: foreignKeyId 
    }
}
```
2. Then modify the job field mapping to apply this transformation to any incoming Kobo data value.  
```js
upsert('WCSPROGRAMS_Vegetation', 'GeneratedUuid', {
    GeneratedUuid: dataValue('__generatedUuid'),
    WCSPROGRAMS_VegetationDrainageID: state =>
        state.drainageMap[dataValue('drainage')(state)],
});
```
**Note:** This option works well for Kobo choice and database ID values that do not change frequently. If the values do change a lot, you may need to regularly update the job, or consider the approach below. 

## 3. Mapping many:many relationships & m:1 relationships that frequently change
1. Updates to map species codes to specific species/ taxon records in a reference table
2. Support for future surveys with other consumption types (i.e., `hunter`, `market`), including other sample collection methods (so far this was specifically mentioned as a possibility for `hunter` surveys)
3. Support for `Urban Consumption` forms
4. Collection of household ethnicity & education data and DB mappings
5. Changes to how sample units (e.g., `kg`, `days`, `hours`) are set, converted & mapped to the DB

## Additional Resources
- See the [Kobo Automation docs](https://openfn.github.io/ConSoSci/kobo-automation/) for more on the solution, default behavior, and naming conventions. 
- See [OpenFn/Docs](https://docs.openfn.org/documentation/build/jobs/) for general OpenFn job-writing guidance and explore the [ConSoSci](https://github.com/OpenFn/ConSoSci) repo for more examples. 
- See the [training recording](https://www.youtube.com/watch?v=ScmZt9PIJqQ&list=PL1pD3-abjHJ3d-6hB2zN5ia2z7tH_CtX9&index=4) from the session on job-writing.

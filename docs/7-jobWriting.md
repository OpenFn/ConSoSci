---
layout: page
title: Job Writing
nav_order: 7
permalink: /jobs/
---

# Job Writing & Customizing Automated Jobs
**Please note:** 
- We recommend using the OpenFn `Job Studio IDE` or a code editor like [VS Code](https://code.visualstudio.com/download) if editing locally on your computer. 
- If not using the `Job Studio IDE` and available in-line documentation on different OpenFn adaptors and helper functions, check out the relevant adaptor's repository like [`language-postgresql`](https://github.com/OpenFn/language-postgresql) for docs and examples. 
- These examples are based on the [Vegetation form mapping](https://docs.google.com/spreadsheets/d/1LHmKtQTGZEJqm6taUqpIaylYA11CXHNWmG8U0lL7Qd0/edit?ts=604662dc#gid=0). 
- For the auto-generated Vegetation job, [see Github version here](https://github.com/OpenFn/ConSoSci/blob/master/vegetation/VegetationClassficationAndTreeMeasurementForm.js) for the auto-generated job and [see the OpenFn view](https://www.openfn.org/projects/p5x4g4/jobs/jvnjwd/edit). 


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
});
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

## 3. Mapping m:1 relationships that frequently change & executing SQL queries to look-up existing data
If you need to look-up the Ids of data in related parent tables before you insert records, consider first running a `sql(...)` query to find related data in parent tables to then reference in your mappings. See example job below for [cell H15](https://docs.google.com/spreadsheets/d/1LHmKtQTGZEJqm6taUqpIaylYA11CXHNWmG8U0lL7Qd0/edit?ts=604662dc#gid=0) mapping. 
```js
alterState(state => {
    const { data } = state;
    //search for existing WCSPROGRAMS_VegetationTopographgyID using the Kobo choice value to look-up and match against Name
    return sql(
        state => `select WCSPROGRAMS_VegetationTopographyID from WCSPROGRAMS_VegetationTopography where WCSPROGRAMS_VegetationTopographyName = '${data.topography}'`
      )(state)
        .then(({ response }) => {
          console.log('WCSPROGRAMS_VegetationTopographyID found:', response);
          const topography = response.body.rows[0]; //return the first record found

    return upsert('WCSPROGRAMS_Vegetation', 'GeneratedUuid', {
        GeneratedUuid: dataValue('__generatedUuid'),
        WCSPROGRAMS_VegetationTopographyID:  topography[0].value, //map ID value returned by sql query above
    })(state);
});
```
The Arcadia job also includes several examples of this pattern using `sql(...)` queries - [see example](https://github.com/OpenFn/ConSoSci/blob/master/arcadia/arcadiaSiteDataCollection.js#L753-L770)

## 4. Mapping many:many relationships 
When inserting a record that has a `m:m` relationship with 2 or more parent tables, you may need to run multiple `sql(...)` queries to look-up the parent id of each table you might want to map to. See below example job code for the `WCSPROGRAMS_VegetationVegetationObserver` m:m mapping ([see cell F14](https://docs.google.com/spreadsheets/d/1LHmKtQTGZEJqm6taUqpIaylYA11CXHNWmG8U0lL7Qd0/edit?ts=604662dc#gid=0)).
```js
alterState(state => {

    //SQL query #1 to look-up parent WCSPROGRAMS_Vegetation via AnswerId
    return sql({
        query: `
      SELECT WCSPROGRAMS_VegetationID
      FROM WCSPROGRAMS_Vegetation
      WHERE AnswerId = '${state.data._id}'`,
    })(state).then(state => {
        const answerId = state.fetchFromRef(state.references[0]);

         //SQL query #2 to look-up parent WCSPROGRAMS_Vegetation via AnswerId
        return sql({
            query: `
          SELECT WWCSPROGRAMS_VegetationObserverID
          FROM WWCSPROGRAMS_VegetationObserver
          WHERE WWCSPROGRAMS_VegetationObserverName = '${state.data.observername}'`,
        })(state).then(({response}) => {
            const observerId = response.body.rows[0];

            //now upsert the m:m table and fill in foreign keys
            return upsertMany(
                'WCSPROGRAMS_VegetationVegetationObserver',
                'DataSetUUIDID',
                state =>
                    surveysPlanned.map(sp => {
                        return {
                            DataSetUUIDID: state.data._id,
                            WWCSPROGRAMS_VegetationID: answerId[0].value, //fk found via sql query #1
                            WWCSPROGRAMS_VegetationObserverID: observerId[0].value, //fk found via sql query #2

                        }
                    }))(state)
        })
    });
```

[This Arcadia m:m example](https://github.com/OpenFn/ConSoSci/blob/master/arcadia/arcadiaSiteDataCollection.js#L329-L366) shows how one foreign key column is set by running a `sql()` query to find the parent record (see `WCSPROGRAMS_ProjectAnnualDataPlanID`), while the second foreign key column is using `surveyTypeMap`. 

## 5. Repeat groups
For repeat groups, make use of helper functions like `upsertMany(...)` or `each(...)` (see the Arcadia [repeat group example](https://github.com/OpenFn/ConSoSci/blob/master/arcadia/arcadiaSiteDataCollection.js#L521-L542). 
```js
//For every item in the repeat group...
each(
  dataPath('$.body.repeatGroupName[*]'),
   alterState(state => {
    const surveysGroup = state.data; //assign the group a name

    return upsert(
        'WCSPROGRAMS_ProjectAnnualDataPlanDataSet',
        'DataSetUUIDID',
        {
          AnswerId: state.data._id, //this value lives outside the repeat group, so we use state.data.fieldName
          ColumnName: surveysGroup['repeatGroupName/fieldName'], //we use this path when mapping fields that live within repeat group
          CollectionStartDate: surveysGroup['repeatGroupName/data_collection_start'], 
          CollectionEndDate: surveysGroup['repeatGroupName/data_collection_end'],
          SiteID:
            state.data.siteMap[surveysGroup['repeatGroupName/site_name']],
```
If you need to execute a `sql` query _before_ you map your data in order to find the Ids of data in related tables, include your `sql(...)` query within your `alterState(...)`. See below example for the `st_grass_repeat/grass_species` m:m mapping (see [row 56](https://docs.google.com/spreadsheets/d/1LHmKtQTGZEJqm6taUqpIaylYA11CXHNWmG8U0lL7Qd0/edit?ts=604662dc#gid=0)). 
```js
each( //for every item in the st_grass_repeat repeat group
    dataPath('$.body.st_grass_repeat[*]'),
    alterState(state => {
      const grassRepeat = state.data; //rename repeat group
      const { body } = state;
  
      //Find parent WCSPROGRAMS_TaxaID via WCSPROGRAMS_TaxaName
      return sql({
        query: `
        SELECT WCSPROGRAMS_TaxaID, WCSPROGRAMS_TaxaName
        FROM WCSPROGRAMS_TaxaID
        WHERE DataSetUUIDID = '${grassRepeat[`st_grass_repeat/grass_species`]}'`,
      })(state).then(({response}) => {
            const taxaId = response.body.rows[0];
       
        return upsert(
          'WCSPROGRAMS_VegetationGrass',
          'DataSetUUIDID',
          {
            DataSetUUIDID: body._id,
            WCSPROGRAMS_TaxaID: taxaId[0].value, //FK found in sql query
            
```

If you want to make use of `upsertMany`, see below example...

```js
alterState(state => {
  const { st_grass_repeat } = state.body;

  const grassSpeciesString = st_grass_repeat.map(grass => grass.grass_species).joint("','");
  return sql({
        query: `
        SELECT WCSPROGRAMS_TaxaID, WCSPROGRAMS_TaxaName
        FROM WCSPROGRAMS_TaxaID
        WHERE DataSetUUIDID in ('${grassSpeciesString}')`,
      })(state).then(({ response }) => {
        const taxaIdRecords = response.body.rows;

        const findTaxaIDRecord = pd =>
          taxaIdRecords.find(v => v.WCSPROGRAMS_TaxaID === pd.taxaId);

        const taxaIdData = st_grass_repeat
          .filter(x => findTaxaIDRecord(x))
          .map(taxadata => {
            const data = {
              DataSetUUIDID: taxadata._id,
              WCSPROGRAMS_TaxaID: findTaxaIDRecord(taxadata).id, //FK found in sql query
            }
            return data;
          });
      
        return upsertMany(
          'WCSPROGRAMS_VegetationGrass',
          'DataSetUUIDID',
          taxaIdData
        
      })

})
```

## Additional Resources
- See the [Kobo Automation docs](https://openfn.github.io/ConSoSci/kobo-automation/) for more on the solution, default behavior, and naming conventions. 
- See [OpenFn/Docs](https://docs.openfn.org/documentation/build/jobs/) for general OpenFn job-writing guidance and explore the [ConSoSci](https://github.com/OpenFn/ConSoSci) repo for more examples. 
- See the [training recording](https://www.youtube.com/watch?v=ScmZt9PIJqQ&list=PL1pD3-abjHJ3d-6hB2zN5ia2z7tH_CtX9&index=4) from the session on job-writing.

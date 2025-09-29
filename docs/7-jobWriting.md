---
layout: page
title: Job Writing
nav_order: 7
permalink: /jobs/
---

# Job Writing & Customizing Automated Jobs

This section outlines common patterns for transforming and mapping Kobo (or other form) data to structured relational databases using OpenFn. It covers how to rename fields, manage relationships between tables, handle repeat groups, and apply lookups dynamically or statically. All examples come directly from the legacy documentation.

## Changing field & table names

When generating a destination DB output, Kobo field names become default column names. But often, destination systems use different naming conventions (e.g. camelCase, PascalCase, abbreviated forms, etc.), and you'll need to **remap** them.

Say your Kobo form has a field named `plot_number`, but the destination DB expects this to be `PlotNumber`. You should update the job to reflect that:

```js
PlotNumber: dataValue('plot_number')
```
This manual mapping ensures your job is compatible with the database schema and avoids rejected inserts due to mismatched column names.

✅ Pro tip: Do a bulk find & replace in your editor to switch field names quickly.

📎 Refer to the [mapping sheet (G22, H22)](https://docs.google.com/spreadsheets/d/1LHmKtQTGZEJqm6taUqpIaylYA11CXHNWmG8U0lL7Qd0/edit#gid=0) used in the Arcadia site data project.

## Mapping many→1 relationships/ look-ups in a relational DB

In relational DBs, it's common to store reference values (like topography types or drainage categories) in separate tables with numeric foreign keys. When submitting Kobo data like `welldrained`, you often need to **map that to a numeric ID** stored in another table.

**Example**
```js
alterState(state => {
  const drainageMap = {
    welldrained: '1',
    impended: '2',
    seasonally_impended: '3'
  };
  state.drainageMap = drainageMap;
  return state;
});

upsert('WCSPROGRAMS_Vegetation', 'GeneratedUuid', {
  WCSPROGRAMS_VegetationDrainageID: state =>
    state.drainageMap[dataValue('drainage')(state)]
});
```

This approach avoids costly DB queries and is easy to maintain when the values are limited and known in advance.

📎 [See the Arcadia job on GitHub](https://github.com/OpenFn/ConSoSci/blob/master/arcadia/arcadiaSiteDataCollection.js#L153)

## Mapping Many→1 Lookups via SQL

Sometimes, you can't rely on static mappings because reference values change or are added frequently. In that case, you need to look up the correct foreign key dynamically from the database using sql().

Here’s how to find the TopographyID matching the value submitted in Kobo:

**Example**
```js
alterState(state => {
  const { data } = state;
  return sql(state => `
    SELECT WCSPROGRAMS_VegetationTopographyID
    FROM WCSPROGRAMS_VegetationTopography
    WHERE WCSPROGRAMS_VegetationTopographyName = '${data.topography}'
  `)(state).then(({ response }) => {
    const topography = response.body.rows[0];
    return upsert('WCSPROGRAMS_Vegetation', 'GeneratedUuid', {
      WCSPROGRAMS_VegetationTopographyID: topography[0].value
    })(state);
  });
});
```

This ensures accurate foreign key relationships even as new values are added to the reference table over time.

📎 Refer to [cell H15 in the mapping sheet](https://docs.google.com/spreadsheets/d/1LHmKtQTGZEJqm6taUqpIaylYA11CXHNWmG8U0lL7Qd0/edit#gid=0)


## Mapping many↔many relationships

In many-to-many relationships, a junction table is used to associate two tables (e.g., one vegetation site can have many observers, and one observer can visit many sites). Your job must:

1. Lookup both foreign keys
2. Insert a record into the junction table for each association

**Example**
```js
alterState(state => {
  return sql({ query: `
    SELECT WCSPROGRAMS_VegetationID
    FROM WCSPROGRAMS_Vegetation
    WHERE AnswerId = '${state.data._id}'`
  })(state).then(state => {
    const vegetationId = state.fetchFromRef(state.references[0]);

    return sql({ query: `
      SELECT WWCSPROGRAMS_VegetationObserverID
      FROM WWCSPROGRAMS_VegetationObserver
      WHERE WWCSPROGRAMS_VegetationObserverName = '${state.data.observername}'`
    })(state).then(({ response }) => {
      const observerId = response.body.rows[0];

      return upsertMany(
        'WCSPROGRAMS_VegetationVegetationObserver',
        'DataSetUUIDID',
        state =>
          surveysPlanned.map(sp => ({
            DataSetUUIDID: state.data._id,
            WWCSPROGRAMS_VegetationID: vegetationId[0].value,
            WWCSPROGRAMS_VegetationObserverID: observerId[0].value
          }))
      )(state);
    });
  });
});
```
Use this pattern when you have repeatable values (like multiple observers, species, etc.) linked to a single submission or site.

## Repeat groups

Kobo repeat groups return arrays in the payload. Each repeat entry often corresponds to a new row in a child table. Use `each()` or `upsertMany()` to loop through and insert them.

**Example using ** each():

```js
each(
  dataPath('$.body.st_grass_repeat[*]'),
  alterState(state => {
    const grassRepeat = state.data;
    return sql({
      query: `
        SELECT WCSPROGRAMS_TaxaID
        FROM WCSPROGRAMS_TaxaID
        WHERE DataSetUUIDID = '${grassRepeat['st_grass_repeat/grass_species']}'`
    })(state).then(({ response }) => {
      const taxaId = response.body.rows[0];
      return upsert('WCSPROGRAMS_VegetationGrass', 'DataSetUUIDID', {
        DataSetUUIDID: state.body._id,
        WCSPROGRAMS_TaxaID: taxaId[0].value
      })(state);
    });
  })
);

```
This pattern is essential for handling complex surveys with nested/structured responses.
📎 Refer to [row 56 of the mapping sheet](https://docs.google.com/spreadsheets/d/1LHmKtQTGZEJqm6taUqpIaylYA11CXHNWmG8U0lL7Qd0/edit#gid=0)


**Please note:** 
- We recommend using the OpenFn `Job Studio IDE` or a code editor like [VS Code](https://code.visualstudio.com/download) if editing locally on your computer. 
- If not using the `Job Studio IDE` and available in-line documentation on different OpenFn adaptors and helper functions, check out the relevant adaptor's repository like [`language-postgresql`](https://github.com/OpenFn/language-postgresql) for docs and examples. 
- These examples are based on the [Vegetation form mapping](https://docs.google.com/spreadsheets/d/1LHmKtQTGZEJqm6taUqpIaylYA11CXHNWmG8U0lL7Qd0/edit?ts=604662dc#gid=0). 
- For the auto-generated Vegetation job, [see Github version here](https://github.com/OpenFn/ConSoSci/blob/master/vegetation/VegetationClassficationAndTreeMeasurementForm.js) for the auto-generated job and [see the OpenFn view](https://www.openfn.org/projects/p5x4g4/jobs/jvnjwd/edit). 

---

## Additional Resources
- See the [Kobo Automation docs](https://openfn.github.io/ConSoSci/kobo-automation/) for more on the solution, default behavior, and naming conventions. 
- See [OpenFn/Docs](https://docs.openfn.org/documentation/build/jobs/) for general OpenFn job-writing guidance and explore the [ConSoSci](https://github.com/OpenFn/ConSoSci) repo for more examples. 
- See the [training recording](https://www.youtube.com/watch?v=ScmZt9PIJqQ&list=PL1pD3-abjHJ3d-6hB2zN5ia2z7tH_CtX9&index=4) from the session on job-writing.

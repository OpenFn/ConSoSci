// Here we set default options for the SQL adaptor. Setting execute or writeSql
// below will set the standard behavior of all SQL functions below unless overwritten.
fn(state => ({ ...state, execute: true, writeSql: true }));

each(
  '$.tables[*]',
  fn(state => {
    const { execute, writeSql } = state;
    const { name, defaultColumns } = state.data;

    function insert(name, columns, execute, writeSql, state) {
      return insertTable(name, state => columns, {
        writeSql,
        execute,
      })(state);
    }

    function modify(name, newColumns, execute, writeSql, state) {
      if (newColumns && newColumns.length > 0) {
        console.log('Existing table found in mssql --- Updating.');
        // Note: Specify options here (e.g {writeSql: false, execute: true})
        return modifyTable(name, state => newColumns, {
          writeSql, // Keep to true to log query (otherwise make it false).
          execute, // keep to false to not alter DB
        })(state);
      } else {
        console.log('No new columns to add.');
        return state;
      }
    }

    if (name !== `${state.prefixes}_Untitled`) {
      let mergedColumns = state.data.columns;
      if (state.data.defaultColumns)
        mergedColumns = [...state.data.columns, ...state.data.defaultColumns];

      return describeTable(name.toLowerCase(), {
        writeSql: true, // Keep to true to log query.
        execute, // Keep to true to execute query.
      })(state)
        .then(postgresColumn => {
          const { rows } = postgresColumn.response.body;
          if (postgresColumn.response.body.rowCount === 0) {
            console.log('No matching table found in postgres --- Inserting.');

            const columns = mergedColumns.filter(x => x.name !== undefined);

            columns.forEach(col =>
              col.type === 'select_one' || col.type === 'select_multiple'
                ? (col.type = 'text')
                : col.type
            );

            // change this line to 'return insert(name, columns, true, writeSql, state);' to override 'execute: false' at top
            return insert(name, columns, execute, writeSql, state);
          } else {
            const columnNames = rows.map(x => x.column_name);

            console.log('----------------------');
            const newColumns = mergedColumns.filter(
              x =>
                x.name !== undefined &&
                !columnNames.includes(x.name.toLowerCase())
            );
            newColumns.forEach(col =>
              col.type === 'select_one' || col.type === 'select_multiple'
                ? (col.type = 'text')
                : col.type
            );
            console.log(newColumns);

            // change this line to 'return modify(name, newColumns, true, writeSql, state);' to override 'execute: false' at top
            return modify(name, newColumns, execute, writeSql, state);
          }
        })
        .catch(() => {
          // If describeTable does NOT get executed because they've turned off execute,
          // we should write the SQL for all the insert statements without executing them.
          const columns = mergedColumns.filter(x => x.name !== undefined);
          return insert(name, columns, execute, writeSql, state);
        });
    }
    return state;
  })
);

// Adds "seeds" to the lookup tables—rows that can be referenced in submissions.
each(
  '$.seeds[*]',
  fn(state => {
    const { writeSql, execute, data } = state;
    const { table, externalId, records } = data;
    return upsertMany(
      table, // table name
      externalId, // external ID column name
      state => {
        // array of records to upsert
        return records.map(r => ({
          [externalId]: r,
          [`${table}Name`]: r,
        }));
      },
      { writeSql, execute, logValues: true } // options
    )(state);
  })
);

fn(state => {
  console.log('----------------------');
  console.log('Logging queries.');
  for (query of state.queries) console.log(query);
  console.log('----------------------');

  return state;
});

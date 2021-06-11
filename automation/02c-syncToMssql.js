each('$.forms[*]', state => {
  return each(
    '$.data[*]',
    alterState(state => {
      const { name } = state.data;
      if (name !== `${state.prefix1}_${state.prefix2}_Untitled`) {
        // Note: Specify options here (e.g {writeSql: false, execute: true})
        return describeTable(name.toLowerCase(), {
          writeSql: true, // Keep to true to log query.
          execute: true, // This always needs to be true so we know if we need to insert or update
        })(state).then(mssqlColumn => {
          const { rows } = mssqlColumn.response.body;
          if (mssqlColumn.response.body.rowCount === 0) {
            console.log('No matching table found in mssql --- Inserting.');

            const columns = state.data.columns.filter(
              x => x.name !== undefined
            );
            columns.forEach(col =>
              col.type === 'select_one' || col.type === 'select_multiple'
                ? (col.type = 'text')
                : col.type === 'int4' || col.type === 'float4'
                ? (col.type = col.type.substring(0, col.type.length - 1))
                : col.type === 'jsonb'
                ? (col.type = 'nvarchar(max)')
                : col.type === 'timestamp'
                ? (col.type = 'datetime')
                : col.type
            );
            // Note: Specify options here (e.g {writeSql: false, execute: true})
            return insertTable(name, state => columns, {
              writeSql: true, // Keep to true to log query (otherwise make it false).
              execute: true, // keep to false to not alter DB
            })(state);
          } else {
            const columnNames = rows.map(x => x.column_name.toLowerCase());

            console.log('----------------------');
            const newColumns = state.data.columns.filter(
              x =>
                x.name !== undefined &&
                !columnNames.includes(x.name.toLowerCase())
            );
            newColumns.forEach(col =>
              col.type === 'select_one' || col.type === 'select_multiple'
                ? (col.type = 'text')
                : col.type === 'int4' || col.type === 'float4'
                ? (col.type = col.type.substring(0, col.type.length - 1))
                : col.type === 'jsonb'
                ? (col.type = 'nvarchar(max)')
                : col.type === 'timestamp'
                ? (col.type = 'datetime')
                : col.type
            );
            console.log(newColumns);
            if (newColumns && newColumns.length > 0) {
              console.log('Existing table found in mssql --- Updating.');
              // Note: Specify options here (e.g {writeSql: false, execute: true})
              return modifyTable(name, state => newColumns, {
                writeSql: true, // Keep to true to log query (otherwise make it false).
                execute: true, // keep to false to not alter DB
              })(state);
            } else {
              console.log('No new columns to add.');
              return state;
            }
          }
        });
      }
      return state;
    })
  )(state);
});

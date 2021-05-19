each('$.forms[*]', state => {
  return each(
    '$.data[*]',
    alterState(state => {
      const { name } = state.data;
      if (name !== `${state.prefix1}_${state.prefix2}_Untitled`) {
        // Note: Specify options here (e.g {writeSql: false, execute: true})
        return describeTable(name.toLowerCase(), {
          writeSql: true,
          execute: false,
        })(state).then(postgresColumn => {
          const { rows } = postgresColumn.response.body;
          if (postgresColumn.response.body.rowCount === 0) {
            console.log('No matching table found in postgres --- Inserting.');

            const columns = state.data.columns.filter(
              x => x.name !== undefined
            );
            columns.forEach(col =>
              col.type === 'select_one' || col.type === 'select_multiple'
                ? (col.type = 'text')
                : col.type
            );
            // Note: Specify options here (e.g {writeSql: false, execute: true})
            return insertTable(name, state => columns, {
              writeSql: true,
              execute: false,
            })(state);
          } else {
            const columnNames = rows.map(x => x.column_name);

            console.log('----------------------');
            const newColumns = state.data.columns.filter(
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
            if (newColumns && newColumns.length > 0) {
              console.log('Existing table found in postgres --- Updating.');
              // Note: Specify options here (e.g {writeSql: false, execute: true})
              return modifyTable(name, state => newColumns, {
                writeSql: true,
                execute: false,
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

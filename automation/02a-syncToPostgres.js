each('$.forms[*]', state => {
  return each(
    '$.data[*]',
    alterState(state => {
      const { name } = state.data;
      if (name !== `${state.prefix1}_${state.prefix2}_Untitled`) {
        // Note: Specify options here (e.g {writeSql: false, execute: true})
        return describeTable(name.toLowerCase(), { writeSql: true })(
          state
        ).then(postgresColumn => {
          const { rows } = postgresColumn.response.body;
          if (postgresColumn.response.body.rowCount === 0) {
            console.log('No matching table found in postgres --- Inserting.');

            const columns = state.data.columns.filter(
              x => x.name !== undefined
            );
            // Note: Specify options here (e.g {writeSql: false, execute: true})
            return insertTable(name, state => columns, { writeSql: true })(
              state
            );
          } else {
            const columnNames = rows.map(x => x.column_name);

            console.log('----------------------');
            const newColumns = state.data.columns.filter(
              x =>
                x.name !== undefined &&
                !columnNames.includes(x.name.toLowerCase())
            );
            console.log(newColumns);
            if (newColumns.length > 0) {
              console.log('Existing table found in postgres --- Updating.');
              // Note: Specify options here (e.g {writeSql: false, execute: true})
              return modifyTable(name, state => newColumns, { writeSql: true })(
                state
              );
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

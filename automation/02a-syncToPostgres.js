each('$.forms[*]', state => {
  return each(
    '$.data[*]',
    alterState(state => {
      const { name } = state.data;
      if (state.data.columns.length !== 0) {
        return describeTable(name)(state)
          .then(postgresColumn => {
            const { rows } = postgresColumn.table_data.body;
            if (
              postgresColumn.table_data.body.rowCount === 0 &&
              name !== 'untitled' &&
              state.data.columns.length !== 0
            ) {
              console.log('No matching table found in postgres --- Inserting.');

              const columns = state.data.columns.filter(x => x.name !== undefined);
              return insertTable(name, state => columns)(state);
            } else {
              const columnNames = rows.map(x => x.column_name);

              console.log('----------------------');
              const newColumns = state.data.columns.filter(
                x => x.name !== undefined && !columnNames.includes(x.name.toLowerCase())
              );
              console.log(newColumns);
              if (newColumns.length > 0) {
                console.log('Existing table found in postgres --- Updating.');

                return modifyTable(name, state => newColumns)(state);
              } else {
                console.log('No new columns to add.');
                return state;
              }
            }
          })
          .catch(error => {
            console.log('here');
            console.log(error);
          });
      }
      return state;
    })
  )(state);
});

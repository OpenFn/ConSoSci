each(
  '$.forms[*]',
  each(
    '$.data[*]',
    alterState(state => {
      const { name, columns } = state.data;
      if (columns.length !== 0) {
        return describeTable(name)(state).then(response => {
          const { body } = response.table_data;
          const { rowCount, rows } = body;
          if (rowCount === 0 && name !== 'untitled' && columns.length !== 0) {
            console.log('No matching table found in postgres --- Inserting.');

            const columns = columns.filter(x => x.name !== undefined);
            return insertTable(name, state => columns)(state);
          } else {
            const columnNames = rows.map(x => x.column_name);

            const newColumns = columns.filter(
              x =>
                x.name !== undefined &&
                !columnNames.includes(x.name.toLowerCase())
            );

            console.log('------------');
            console.log('New columns: ');
            console.log(newColumns);

            if (newColumns.length > 0) {
              console.log('Existing table found in postgres --- Updating.');
              return modifyTable(name, state => newColumns)(state);
            } else {
              console.log('No new columns to add.');
              return state;
            }
          }
        });
      }
      return state;
    })
  )
);

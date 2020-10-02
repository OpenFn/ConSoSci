each(
  '$.tablesToBeCreated[*]',
  alterState(state => {
    const { table_name } = state.data[state.data.length - 1];

    return describeTable(table_name)(state)
      .then(postgresColumn => {
        const { rows } = postgresColumn.table_data.body;

        if (postgresColumn.table_data.body.rowCount === 0) {
          console.log('No matching table found in postgres --- Inserting.');

          const columns = state.data.filter(x => x.name !== undefined);
          return insertTable(table_name, state => columns)(state);
        } else {
          const columnNames = rows.map(x => x.column_name);

          console.log('----------------------');
          console.log('No new columns to add.');
          const newColumns = state.data.filter(
            x => x.name !== undefined && !columnNames.includes(x.name.toLowerCase())
          );
          console.log(newColumns);
          if (newColumns.length > 0) {
            console.log('Existing table found in postgres --- Updating.');

            return modifyTable(table_name, state => newColumns)(state);
          } else return state;
        }
      })
      .catch(error => {
        console.log('here');
        console.log(error);
      });
  })
);

alterState(state => {
  const mapType = {
    decimal: 'float4',
    integer: 'int4',
    text: 'text',
    select_one: 'varchar',
    calculate: 'varchar',
    date: 'date',
  };

  const types = ['integer', 'text', 'decimal', 'select_one', 'date', 'calculate'];

  const { survey } = state.data.content;
  state.kobo_form = survey.map(x => x);

  var index = -1;
  var index2 = -1;
  var val1 = 'begin_repeat';
  var val2 = 'end_repeat';
  survey.find((item, i) => {
    if (item.type === val1) {
      index = i;
    }
    if (item.type === val2) index2 = i;
  });

  var repeatGroup;
  var repeatGroup_columns;
  if (-1 !== (index | index2)) {
    repeatGroup = survey.splice(index, index2 - index + 1);
    repeatGroup_columns = repeatGroup.filter(elt => types.includes(elt.type));
    repeatGroup_columns.forEach(obj => (obj.type = mapType[obj.type]));
    repeatGroup_columns.push({ table_name: state.data.name.split(' ').join('_') + '_char'.toLowerCase() });
  }

  const columns = survey.filter(elt => types.includes(elt.type));

  columns.forEach(obj => (obj.type = mapType[obj.type]));

  columns.push({ table_name: state.data.name.split(' ').join('_').toLowerCase() });

  columns.forEach(obj => {
    if (obj.name === 'group') {
      obj.name = 'kobogroup';
    }
  });
  if (repeatGroup) {
    repeatGroup_columns.forEach(obj => {
      if (obj.name === 'group') {
        obj.name = 'kobogroup';
      }
    });
    return {
      ...state,
      tablesToBeCreated: [columns, repeatGroup_columns],
    };
  }

  return {
    ...state,
    tablesToBeCreated: [columns],
  };
});

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

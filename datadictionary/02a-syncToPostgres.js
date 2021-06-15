alterState(state => {
  const koboForm = [
    {
      name: 'form_name',
      type: 'varchar(100)',
    },
    {
      name: 'date_created',
      type: 'date',
    },
    {
      name: 'date_modified',
      type: 'date',
    },
    {
      name: 'form_owner',
      type: 'varchar(100)',
    },
    {
      name: 'languages',
      type: 'varchar(100)',
    },
    {
      name: 'form_id',
      type: 'varchar(100)',
    },
    {
      name: 'form_group',
      type: 'varchar(100)',
    },
    {
      name: 'table_id',
      type: 'varchar(100)',
    },
  ];

  const koboChoices = [
    {
      name: 'list_id',
      type: 'varchar(100)',
    },
    {
      name: 'list_name',
      type: 'varchar(100)',
    },
    {
      name: 'choice_name',
      type: 'varchar(100)',
    },
    {
      name: 'choice_label',
      type: 'varchar(100)',
    },
    {
      name: 'formUid',
      type: 'varchar(100)',
    },
  ];

  const forms = [
    {
      name: 'kobo_form',
      columns: koboForm,
    },
    {
      name: 'kobo_choices',
      columns: koboChoices,
    },
  ];

  return { ...state, forms };
});

each(
  '$.forms[*]',
  alterState(state => {
    const { name, columns } = state.data;
    

    return describeTable(name.toLowerCase(), {
      writeSql: true,
      execute: true,
    })(state).then(postgresColumn => {
      const { rows } = postgresColumn.response.body;
      if (postgresColumn.response.body.rowCount === 0) {
        console.log('No matching table found in postgres --- Inserting.');

        const cols = columns.filter(x => x.name !== undefined);
        cols.forEach(col =>
          col.type === 'select_one' || col.type === 'select_multiple'
            ? (col.type = 'text')
            : col.type
        );

        return insertTable(name, state => cols, {
          writeSql: true,
          execute: true,
        })(state);
      } else {
        const columnNames = rows.map(x => x.column_name);

        console.log('----------------------');
        const newColumns = columns.filter(
          x =>
            x.name !== undefined && !columnNames.includes(x.name.toLowerCase())
        );
        newColumns.forEach(col =>
          col.type === 'select_one' || col.type === 'select_multiple'
            ? (col.type = 'text')
            : col.type
        );
        console.log(newColumns);
        if (newColumns && newColumns.length > 0) {
          console.log('Existing table found in postgres --- Updating.');
          return modifyTable(name, state => newColumns, {
            writeSql: true,
            execute: true,
          })(state);
        } else {
          console.log('No new columns to add.');
          return state;
        }
      }
    });
  })
);

// upsert('kobo_forms', 'form_id', {
//   form_name: '',
//   date_created: '',
//   date_modified: '',
//   form_owner: '',
//   languages: '',
//   form_id: '',
//   form_group: '',
//   table_id: '',
// });

// alterState(state => {
//   console.log('----------------------');
//   console.log('Logging queries.');
//   for (query of state.queries) console.log(query);
//   console.log('----------------------');

//   return state;
// });


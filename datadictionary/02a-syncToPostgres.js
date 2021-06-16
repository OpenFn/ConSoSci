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
      unique: true,
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
      name: 'kobo_forms',
      columns: koboForm,
    },
    {
      name: 'kobo_choices',
      columns: koboChoices,
    },
  ];

  state.data = state.formDefinition;
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

upsert('kobo_forms', 'form_id', {
  form_name: state.formDefinition.name,
  date_created: state.formDefinition.date_created,
  date_modified: state.formDefinition.date_modified,
  form_owner: state.formDefinition.owner__username,
  languages: state.formDefinition.languages,
  form_id: state.formDefinition.uid,
  form_group: state => state.prefix2,
  table_id: state => `${state.prefix1}_${state.prefix2}_${state.tableId}`,
});

upsertMany('kobo_choices', '???', state => {
  const { choices } = state.formDefinition.content;
  const formId = state.formDefinition.uid;
  return choices.map(x => ({
    list_id: `${x.list_name}${formId}`, // proposing to add ${x.name} to list_id and use as uuid
    list_name: x.list_name,
    choice_name: x.name,
    choice_label: x.label,
    formUid: formId,
  }));
});

each('content.choices[*]', upsert('kobo_choices', '???', {}));

alterState(state => {
  console.log('----------------------');
  console.log('Logging queries.');
  for (query of state.queries) console.log(query);
  console.log('----------------------');

  return state;
});

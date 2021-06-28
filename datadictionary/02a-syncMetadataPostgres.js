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

  const koboQuestions = [
    {
      name: 'question_id',
      type: 'varchar(100)',
      unique: true,
    },
    {
      name: 'form_id',
      type: 'varchar(100)',
    },
    {
      name: 'analytics_label',
      type: 'text',
    },
    {
      name: 'question_name',
      type: 'text',
    },
    {
      name: 'label_EN',
      type: 'text',
    },
    {
      name: 'label_FR',
      type: 'text',
    },
    {
      name: 'question_type',
      type: 'varchar(100)',
    },
    {
      name: 'select_from_list_name',
      type: 'varchar(100)',
    },
    {
      name: 'question_constraint',
      type: 'varchar(100)',
    },
  ];

  const koboChoices = [
    {
      name: 'list_id',
      type: 'varchar(100)',
      unique: true,
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
      type: 'text',
    },
    {
      name: 'formUid',
      type: 'varchar(100)',
    },
  ];

  const MetadataForms = [
    {
      name: 'kobo_forms',
      columns: koboForm,
    },
    {
      name: 'kobo_questions',
      columns: koboQuestions,
    },
    {
      name: 'kobo_choices',
      columns: koboChoices,
    },
  ];

  state.data = state.formDefinition;
  return { ...state, MetadataForms };
});

each(
  '$.MetadataForms[*]',
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

upsertMany('kobo_choices', 'list_id', state => {
  const { choices } = state.formDefinition.content;
  const formId = state.formDefinition.uid;
  return choices.map(x => ({
    list_id: `${x.list_name}${formId}${x.name}`, // proposing to add ${x.name} to list_id and use as uuid
    list_name: x.list_name,
    choice_name: x.name,
    choice_label: x.label.join(','),
    formUid: formId,
  }));
});

upsertMany('kobo_questions', 'question_id', state => {
  const { survey } = state.formDefinition.content;
  const formId = state.formDefinition.uid;
  return survey.map(x => ({
    question_id: `${x['$kuid']}-${formId}`,
    form_id: formId,
    analytics_label: '',
    question_name: x.name,
    label_EN: x.label.join(','),
    label_FR: '',
    question_type: x.type,
    select_from_list_name: x.select_from_list_name,
    question_constraint: x.constraint,
  }));
});

alterState(state => {
  console.log('----------------------');
  console.log('Logging queries.');
  for (query of state.queries) console.log(query);
  console.log('----------------------');

  return state;
});

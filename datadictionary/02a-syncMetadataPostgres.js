alterState(state => {
  const KoboToolBox_Forms = [
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

  const KoboToolBox_Questions = [
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
      name: 'label',
      type: 'text',
    },
    {
      name: 'question_type',
      type: 'varchar(100)',
    },
    {
      name: 'list_id',
      type: 'varchar(100)',
    },
    {
      name: 'question_constraint',
      type: 'text',
    },
  ];

  const KoboToolBox_Choices = [
    {
      name: 'choice_id',
      type: 'varchar(100)',
      unique: true,
    },
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
      type: 'text',
    },
    {
      name: 'formUid',
      type: 'varchar(100)',
    },
  ];

  const MetadataForms = [
    {
      name: 'KoboToolBox_Forms',
      columns: KoboToolBox_Forms,
    },
    {
      name: 'KoboToolBox_Questions',
      columns: KoboToolBox_Questions,
    },
    {
      name: 'KoboToolBox_Choices',
      columns: KoboToolBox_Choices,
    },
  ];

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

fn(state => {
  const { openfnInboxUrl } = state.configuration;
  const data = {
    type: 'Form Definition',
    formDefinition: state.formDefinition,
    prefixes: state.prefixes,
    prefix2: state.prefix2,
    tableId: state.tableId,
  };
  console.log('Sending form definition to OpenFN inbox.');
  http.post({
    url: openfnInboxUrl,
    data,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  })(state);

  return state;
});

alterState(state => {
  console.log('----------------------');
  console.log('Logging queries.');
  for (query of state.queries) console.log(query);
  console.log('----------------------');
  return state;
});

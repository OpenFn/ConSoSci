fn(state => {
  const KoboToolBox_Forms = [
    {
      name: 'form_name',
      type: 'nvarchar(100)',
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
      type: 'nvarchar(100)',
    },
    {
      name: 'languages',
      type: 'nvarchar(100)',
    },
    {
      name: 'form_id',
      type: 'nvarchar(100)',
      unique: true,
    },
    {
      name: 'form_group',
      type: 'nvarchar(100)',
    },
    {
      name: 'table_id',
      type: 'nvarchar(100)',
    },
  ];

  const KoboToolBox_Questions = [
    {
      name: 'question_id',
      type: 'nvarchar(100)',
      unique: true,
    },
    {
      name: 'form_id',
      type: 'nvarchar(100)',
    },
    {
      name: 'analytics_label',
      type: 'nvarchar(max)',
    },
    {
      name: 'question_name',
      type: 'nvarchar(max)',
    },
    {
      name: 'label',
      type: 'nvarchar(max)',
    },
    {
      name: 'question_type',
      type: 'nvarchar(100)',
    },
    {
      name: 'list_id',
      type: 'nvarchar(100)',
    },
    {
      name: 'question_constraint',
      type: 'nvarchar(max)',
    },
  ];

  const KoboToolBox_Choices = [
    {
      name: 'choice_id',
      type: 'nvarchar(100)',
      unique: true,
    },
    {
      name: 'list_id',
      type: 'nvarchar(100)',
    },
    {
      name: 'list_name',
      type: 'nvarchar(100)',
    },
    {
      name: 'choice_name',
      type: 'nvarchar(100)',
    },
    {
      name: 'choice_label',
      type: 'nvarchar(max)',
    },
    {
      name: 'form_uid',
      type: 'nvarchar(100)',
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
  fn(state => {
    const { name, columns } = state.data;
    
    function insert(name, columns, execute, writeSql, state) {
      columns.forEach(col =>
        col.type === 'select_one' || col.type === 'select_multiple'
          ? (col.type = 'nvarchar(max)')
          : col.type
      );
      return insertTable(name, state => columns, {
        writeSql,
        execute,
      })(state);
    }

    function modify(name, newColumns, execute, writeSql, state) {
      newColumns.forEach(col =>
        col.type === 'select_one' || col.type === 'select_multiple'
          ? (col.type = 'nvarchar(max)')
          : col.type
      );
      if (newColumns && newColumns.length > 0) {
        console.log('Existing table found in mssql --- Updating.');
        // Note: Specify options here (e.g {writeSql: false, execute: true})
        return modifyTable(name, state => newColumns, {
          writeSql, // Keep to true to log query (otherwise make it false).
          execute, // keep to false to not alter DB
        })(state);
      } else {
        console.log('No new columns to add.');
        return state;
      }
    }

    // Note: Specify options here
    const execute = false;
    const writeSql = true;

    return describeTable(name.toLowerCase(), {
      writeSql: true,
      execute,
    })(state)
      .then(mssqlColumn => {
        const { rows } = mssqlColumn.response.body;
        if (mssqlColumn.response.body.rowCount === 0) {
          console.log('No matching table found in mssql --- Inserting.');

          const cols = columns.filter(x => x.name !== undefined);
          return insert(name, cols, execute, writeSql, state);
        } else {
          const columnNames = rows.map(x => x.column_name);

          console.log('----------------------');
          const newColumns = columns.filter(
            x =>
              x.name !== undefined &&
              !columnNames.includes(x.name.toLowerCase())
          );

          console.log(newColumns);
          return modify(name, newColumns, execute, writeSql, state);
        }
      })
      .catch(() => {
        return insert(name, columns, execute, writeSql, state);
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

fn(state => {
  console.log('----------------------');
  console.log('Logging queries.');
  for (query of state.queries) console.log(query);
  console.log('----------------------');
  return state;
});

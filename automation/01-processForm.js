get(`${state.data.url}`, {}, state => {
  state.formDefinition = state.data; // keeping form definition for data dictionary
  const tablesToBeCreated = [];
  const { survey, choices } = state.data.content;
  if (survey.length === 0) {
    console.log(
      'No survey available or defined to analyze. Please check the Kobo form deployment status'
    );
    return state;
  }
  // PREFIX HANDLER
  const prefix1 = state.references[0].prefix1 || 'WCS';
  const prefix2 = state.references[0].prefix2 || '';
  const tableId = state.references[0].tableId;
  const uuid = 'generated_uuid';
  const prefixes = [prefix1, prefix2].filter(x => x).join('_');
  // END OF PREFIX HANDLER

  // TODO: Decide which metadata field to include. ========================
  //survey.push({ name: 'generated_uuid', type: 'text' });
  // ======================================================================

  const multiSelectIds = [];

  const mapType = {
    calculate: 'varchar(100)',
    date: 'date',
    decimal: 'float4',
    end: 'date',
    integer: 'int4',
    select_one: 'select_one',
    start: 'date',
    text: 'text',
    today: 'date',
    jsonb: 'jsonb',
    select_multiple: 'select_multiple',
    geopoint: 'text',
  };

  const discards = [
    'begin_group',
    'begin_repeat',
    'end_group',
    'end_repeat',
    'note',
  ];

  // Camelize columns and table name
  function toCamelCase(str) {
    if (!str) return '';
    let underscores = [];
    let i = 0;
    while (str[i] === '_') {
      underscores.push(str[i]);
      i++;
    }
    let words = str.match(/[0-9a-zA-Z\u00C0-\u00FF]+/gi);
    if (!words) return '';
    words = words
      .map(word => {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
      })
      .join('');
    return `${underscores.join('')}${words}${underscores.join('')}`;
  }

  function questionsToColumns(questions, main) {
    var form = questions.filter(elt => !discards.includes(elt.type));

    form.forEach(obj => (obj.type = mapType[obj.type] || 'text'));

    form.forEach(obj => {
      // List of reserved keys in postgresql and their transformations
      if (obj.name === 'group') {
        obj.name = 'kobogroup';
      }
      if (obj.name == 'end') {
        obj.name = 'form_date__end';
      }
      if (obj.name == 'column') {
        obj.name = 'column_name';
      }
      if (obj.name == 'date') {
        obj.name = 'date_value';
      }
      if (obj.type === 'select_one') {
        obj.type = 'int4';
        obj.select_one = true;
        delete obj.default;
      }
    });

    form.forEach(q => {
      if (q.name === 'gps') {
        form.push({ name: 'latitude', type: 'float4' });
        form.push({ name: 'longitude', type: 'float4' });
      }
    });

    form = form.map(x => {
      let name = toCamelCase(x.name) || toCamelCase(x.$autoname);
      name = x.select_one
        ? `${prefixes}_${toCamelCase(x.select_from_list_name)}ID_${name}`
        : name;
      return {
        ...x,
        name: `${name.split(/-/).join('_')}`,
        findValue: x.select_one || false,
        required: x.required,
      };
    });

    const parentColumn =
      // questions[0].path.length > 1
      questions[0].depth > 1
        ? `${questions[0].path.slice(-2, -1)[0]}_uuid`
        : `${tableId}_uuid`;

    if (questions[0].depth > 0)
      form.push({ name: toCamelCase(parentColumn), type: 'text' });

    form.push(
      { name: 'AnswerId', type: 'text' },
      { name: toCamelCase(uuid), type: 'varchar(100)', unique: true }
    );

    return form;
  }

  function standardColumns(tableName) {
    // prettier-ignore
    return [
      // { name: `${prefix1}_${tableName}ID`, type: 'int4', required: true, identity: true },
      // { name: `${prefix1}_${tableName}Name`, type: 'varchar(255)', required: false },
      // { name: `${prefix1}_${tableName}ExtCode`, type: 'varchar(50)', required: true, default: '' },
      { name: `${prefixes}_${tableName}Code`, type: 'varchar(255)', required: false },
      { name: `${prefixes}_${tableName}Description`, type: 'varchar(255)', required: false },
      { name: `${prefixes}_OrganizationID_Owner`, type: 'int4', required: true, default: 1 },
      { name: `${prefixes}_SecuritySettingID_Row`, type: 'int4', required: true, default: 1 },
      { name: 'Archive', type: 'BIT', required: true, default: '0' },
      { name: 'IsPublic', type: 'BIT', required: true, default: '0' },
      { name: 'CRDate', type: 'timestamp', required: true, default: 'NOW()' },
      { name: 'LMDate', type: 'timestamp', required: true, default: 'NOW()' },
      { name: 'UserID_CR', type: 'int4', required: true, default: -1 },
      { name: 'UserID_LM', type: 'int4', required: true, default: -1 },
      { name: 'CRIPAddress', type: 'varchar(32)', required: true, default: '' },
      { name: 'LMIPAddress', type: 'varchar(32)', required: true, default: '' },
    ];
  }

  function customColumns(tableName) {
    // prettier-ignore
    return [
      { name: `${prefixes}_${tableName}ID`, type: 'int4', required: true, identity: true },
      { name: `${prefixes}_${tableName}Name`, type: 'varchar(255)', required: false },
      { name: `${prefixes}_${tableName}ExtCode`, type: 'varchar(50)', required: true, default: '' },
    ];
  }

  function buildLookupTableColumns(prefixes, q, i, arr) {
    return [
      {
        name: `${prefixes}_${toCamelCase(q.select_from_list_name)}ID`,
        type: 'int4',
        identity: true,
        required: q.required,
        depth: q.type === 'select_multiple' ? 3 : 0,
        select_multiple: q.type === 'select_multiple' ? true : false,
        path: i === 0 ? [] : [...arr[i - 1].path, q.name],
        rule: 'DO_NOT_MAP',
        parentColumn: q.name,
      },
      {
        name: `${prefixes}_${toCamelCase(q.select_from_list_name)}Name`,
        type: 'varchar(100)',
        required: q.required,
        depth: q.type === 'select_multiple' ? 3 : 0,
        select_multiple: q.type === 'select_multiple' ? true : false,
        path: i === 0 ? [] : [...arr[i - 1].path, q.name],
        parentColumn: q.name,
      },
      {
        name: `${prefixes}_${toCamelCase(q.select_from_list_name)}ExtCode`,
        type: 'varchar(100)',
        required: q.required,
        unique: true,
        depth: q.type === 'select_multiple' ? 3 : 0,
        select_multiple: q.type === 'select_multiple' ? true : false,
        path: i === 0 ? [] : [...arr[i - 1].path, q.name],
        parentColumn: q.name,
      },
    ];
  }

  // prettier-ignore
  function addLookupTable(tables, lookupTableName, prefixes, q, i, formName, arr) {
    tables.push({
      name: lookupTableName,
      columns: buildLookupTableColumns(prefixes, q, i, arr),
      defaultColumns: standardColumns(toCamelCase(q.select_from_list_name)),
      formName,
      depth: q.type === 'select_multiple' ? 1 : q.depth,
      ReferenceUuid: q.type === 'select_multiple' ? undefined : `${prefixes}_${toCamelCase(q.select_from_list_name)}ExtCode`,
    });
    tablesToBeCreated.push(lookupTableName)
  }

  function buildForeignTables(questions) {
    const foreignTables = [];
    questions.forEach(q => {
      if (q.select_one) {
        foreignTables.push({
          table: `${prefixes}_${toCamelCase(q.select_from_list_name)}`,
          id: `${prefixes}_${toCamelCase(q.select_from_list_name)}ID`,
          reference: `${prefixes}_${toCamelCase(
            q.select_from_list_name
          )}ID_${toCamelCase(q.name)}`,
        });
      }
    });
    return foreignTables;
  }

  function buildTablesFromSelect(questions, formName, tables) {
    questions.forEach((q, i, arr) => {
      if (q.type === 'select_multiple') {
        multiSelectIds.push(q.name);
        const getType = name => survey.find(s => s.name === name).type; // return the type of a question

        let suffix = q.path.slice(-1)[0];
        if (suffix && getType(suffix) === 'begin_group') suffix = undefined;
        // const lookupTableName = `${prefixes}_${toCamelCase(q.name)}`; // MC: TO CHANGE??
        const lookupTableName = `${prefixes}_${toCamelCase(
          q.select_from_list_name
        )}`;
        const junctionTableName = `${prefixes}_${toCamelCase(
          suffix || tableId
        )}${toCamelCase(q.select_from_list_name)}`; // MC: TO CHANGE?? -- CHANGED

        // prettier-ignore
        const parentTableName = `${prefixes}_${tableId}${toCamelCase(suffix)}`;
        // prettier-ignore
        const parentTableReferenceColumn = `${prefixes}_${toCamelCase(suffix || tableId)}ID`;

        tables.push({
          name: junctionTableName,
          dependencies: 3,
          columns: [
            {
              name: `${prefixes}_${toCamelCase(q.select_from_list_name)}ID`,
              type: 'select_multiple',
              required: q.required,
              referent: lookupTableName,
              parent: false,
              depth: 3,
              path: i === 0 ? [] : [...arr[i - 1].path, q.name],
            },
            {
              name: parentTableReferenceColumn,
              type: 'select_multiple',
              required: q.required,
              referent: parentTableName,
              parent: true,
              depth: 3,
              path: i === 0 ? [] : [...arr[i - 1].path, q.name],
            },
          ],
          defaultColumns: [
            // prettier-ignore
            ...[
            { name: `${prefixes}_${toCamelCase(q.name)}Name`, type: 'varchar(255)', required: false },
            { name: `${prefixes}_${toCamelCase(q.name)}ExtCode`, type: 'varchar(50)', required: true, default: '' },
          ],
            ...standardColumns(toCamelCase(q.name)),
          ],
          foreignTables: [
            {
              table: lookupTableName,
              id: `${lookupTableName}ID`,
            },
            {
              table: parentTableName,
              id: `${prefixes}_${toCamelCase(suffix || tableId)}ID`,
            },
          ],
          formName,
          depth: 1,
          // ReferenceUuid: `${prefixes}_${toCamelCase(q.name)}ExtCode`,
        });
        tablesToBeCreated.push(junctionTableName);
      }
      if (['select_one', 'select_multiple'].includes(q.type)) {
        // console.log('q', q);
        // const lookupTableName = `${prefixes}_${toCamelCase(q.name)}`;
        // Use list_name to name select_table
        const lookupTableName = `${prefixes}_${toCamelCase(
          q.select_from_list_name
        )}`;

        if (!tablesToBeCreated.includes(lookupTableName)) {
          //prettier-ignore
          addLookupTable(tables, lookupTableName, prefixes, q, i, formName, arr);
        }
      }
    });
    return tables;
  }

  function tablesFromQuestions(questions, formName, tables) {
    const backwardsFirstBegin = questions
      .reverse()
      .findIndex(item => item.type === 'begin_repeat');

    const lastBegin =
      backwardsFirstBegin !== -1
        ? questions.length - backwardsFirstBegin - 1
        : false;

    const tName = `${prefixes}_${tableId}`;

    if (lastBegin) {
      const firstEndAfterLastBegin =
        questions
          .reverse()
          .slice(lastBegin)
          .findIndex(item => item.type === 'end_repeat') + lastBegin;

      // Remove the deepest repeat group from the 'questions' array, parse it
      // and push it to the 'tables' array, and call tablesFromQuestions with
      // the remaining questions.
      const group = questions.splice(
        lastBegin,
        firstEndAfterLastBegin - lastBegin + 1
      );

      const tableName = toCamelCase(
        group[0].path
          .slice(-1)
          .pop()
          .split(/\s|-|'/)
          .join('_')
          .replace('.', '')
      );
      const name = `${prefixes}_${tableId}${tableName}`;

      tables.push({
        name,
        dependencies: 2,
        columns: questionsToColumns(group),
        defaultColumns: [
          // prettier-ignore
          ...[ { name: `${tName}ID`, type: 'int4', required: false } ],
          ...customColumns(tableName),
          ...standardColumns(tableName),
        ],
        foreignTables: [
          ...[
            {
              table: tName,
              id: `${tName}ID`,
            },
          ],
          ...buildForeignTables(group),
        ],
        formName,
        depth: group[0].depth,
      });
      tablesToBeCreated.push(name);

      return tablesFromQuestions(questions, formName, tables);
    }

    // This is the main table.
    tables.push(
      {
        name: tName,
        dependencies: 1,
        columns: [
          ...questionsToColumns(questions, 'main'),
          ...[
            {
              name: 'Payload',
              type: 'jsonb',
              depth: 0,
              path: [],
            },
          ],
        ],
        defaultColumns: [
          ...customColumns(tableId),
          ...standardColumns(tableId),
        ],
        foreignTables: buildForeignTables(questions),
        formName,
        depth: 0,
      },
      {
        name: `${prefix1}_KoboDataset`,
        columns: [
          {
            name: 'FormName',
            type: 'text',
            depth: 0,
            path: [],
          },
          {
            name: 'DatasetId',
            type: 'varchar(100)',
            depth: 0,
            path: [],
            unique: true,
          },
          {
            name: 'LastUpdated',
            type: 'timestamp',
            depth: 0,
            path: [],
          },
        ],
        defaultColumns: [
          ...customColumns('KoboDataset'),
          ...standardColumns('KoboDataset'),
        ],
        formName,
        depth: 0,
      }
    );
    tablesToBeCreated.push(tName);

    return tables;
  }

  // We build a dictionary of different select_one/select_multiple questions
  // and the diffferent values they hold ===================================
  function buildChoicesDictionary(choices) {
    const choicesDictionary = {};
    choices.forEach(choice => {
      if (!choicesDictionary[choice.list_name]) {
        choicesDictionary[choice.list_name] = [];
      }

      if (!choicesDictionary[choice.list_name].includes(choice.name))
        choicesDictionary[choice.list_name].push(choice.name);
    });
    return choicesDictionary;
  }

  let depth = 0;

  survey.forEach((q, i, arr) => {
    switch (q.type) {
      case 'begin_group':
        arr[i] = {
          ...q,
          depth,
          path: i === 0 ? [] : [...arr[i - 1].path, q.name],
        };
        break;

      case 'begin_repeat':
        depth++;
        arr[i] = {
          ...q,
          depth,
          path: i === 0 ? [] : [...arr[i - 1].path, q.name],
        };
        break;

      case 'end_repeat':
        arr[i] = {
          ...q,
          depth,
          path: i === 0 ? [] : [...arr[i - 1].path.slice(0, -1)],
        };
        depth--;
        break;

      case 'end_group':
        arr[i] = {
          ...q,
          depth,
          path: i === 0 ? [] : [...arr[i - 1].path.slice(0, -1)],
        };
        break;

      default:
        arr[i] = {
          ...q,
          depth,
          path: i === 0 ? [] : [...arr[i - 1].path],
        };
        break;
    }
  });

  const choiceDictionary = buildChoicesDictionary(choices);
  const lookupTables = buildTablesFromSelect(survey, state.data.name, []);
  let tables = tablesFromQuestions(survey, state.data.name, []).reverse();
  tables = lookupTables.concat(tables);

  return {
    ...state,
    tables,
    lookupTables,
    choiceDictionary,
    prefixes,
    prefix1,
    prefix2,
    uuid,
    tableId,
    data: {},
    response: {},
    multiSelectIds,
  };
});

fn(state => ({
  ...state,
  tables: state.tables.sort((a, b) =>
    !b.hasOwnProperty('dependencies')
      ? 1
      : a.dependencies > b.dependencies
      ? 1
      : -1
  ),
}));

fn(state => {
  console.log('====================DROP STATEMENT====================');
  console.log('Use this to clean database from created tables...');

  const { tables } = state;

  const query = `DROP TABLE ${tables.map(t => t.name).reverse()};`;

  console.log(`query: ${query}`);
  console.log('====================END DROP STATEMENT====================');

  return state;
});

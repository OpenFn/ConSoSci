get(`${state.data.url}`, {}, state => {
  state.formDefinition = state.data; // keeping form definition for data dictionary
  const { survey } = state.data.content;
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
    calculate: 'decimal',
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
    // identity: 'identity',
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

  function questionsToColumns(questions) {
    var form = questions.filter(elt => !discards.includes(elt.type));

    form.forEach(obj => (obj.type = mapType[obj.type] || 'text'));

    form.forEach(obj => {
      // At some point we might need a list of questions that should be renamed,
      // and their new values.

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
    });

    form.forEach(q => {
      if (q.name === 'gps') {
        form.push({ name: 'latitude', type: 'float4' });
        form.push({ name: 'longitude', type: 'float4' });
      }
    });

    form = form.map(x => {
      const name = toCamelCase(x.name) || toCamelCase(x.$autoname);
      return {
        ...x,
        name: `${name.split(/-/).join('_')}`,
        required: false,
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
      // Adding a column as jsonb to take the whole payload
      { name: 'Payload', type: 'jsonb' },
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
        name: `${prefixes}_${toCamelCase(q.name)}ID`,
        type: 'int4',
        identity: true,
        depth: q.type === 'select_multiple' ? 3 : 0,
        select_multiple: q.type === 'select_multiple' ? true : false,
        path: i === 0 ? [] : [...arr[i - 1].path, q.name],
        rule: 'DO_NOT_MAP',
        parentColumn: q.name,
      },
      {
        name: `${prefixes}_${toCamelCase(q.name)}Name`,
        type: 'varchar(100)',
        depth: q.type === 'select_multiple' ? 3 : 0,
        select_multiple: q.type === 'select_multiple' ? true : false,
        path: i === 0 ? [] : [...arr[i - 1].path, q.name],
        parentColumn: q.name,
      },
      {
        name: `${prefixes}_${toCamelCase(q.name)}ExtCode`,
        type: 'varchar(100)',
        unique: true,
        depth: q.type === 'select_multiple' ? 3 : 0,
        select_multiple: q.type === 'select_multiple' ? true : false,
        path: i === 0 ? [] : [...arr[i - 1].path, q.name],
        parentColumn: q.name,
      },
      { name: 'Payload', type: 'jsonb' },
    ];
  }

  // prettier-ignore
  function addLookupTable(tables, lookupTableName, prefixes, q, i, formName, arr) {
    tables.push({
      name: lookupTableName,
      columns: buildLookupTableColumns(prefixes, q, i, arr),
      defaultColumns: standardColumns(toCamelCase(q.name)),
      formName,
      depth: q.type === 'select_multiple' ? 1 : 0,
      ReferenceUuid: q.type === 'select_multiple' ? undefined : `${prefixes}_${toCamelCase(q.name)}ExtCode`,
    });
  }

  function buildTablesFromSelect(questions, formName, tables) {
    questions.forEach((q, i, arr) => {
      if (['select_one', 'select_multiple'].includes(q.type)) {
        const lookupTableName = `${prefixes}_${toCamelCase(q.name)}`;
        addLookupTable(tables, lookupTableName, prefixes, q, i, formName, arr);
      }
      if (q.type === 'select_multiple') {
        multiSelectIds.push(q.name);
        const lookupTableName = `${prefixes}_${toCamelCase(q.name)}`;
        const junctionTableName = `${prefixes}_${toCamelCase(
          q.path[q.path.length - 1]
        )}${toCamelCase(q.name)}`;

        // prettier-ignore
        const parentTableName = `${prefixes}_${tableId}${toCamelCase(q.path[q.path.length - 1])}`;
        // prettier-ignore
        const parentTableReferenceColumn = `${prefixes}_${tableId}_${toCamelCase(q.path[q.path.length - 1])}ID`;

        tables.push({
          name: junctionTableName,
          columns: [
            {
              name: `${prefixes}_${toCamelCase(q.name)}ID`,
              type: 'select_multiple',
              referent: lookupTableName,
              parent: false,
              depth: 3,
              path: i === 0 ? [] : [...arr[i - 1].path, q.name],
            },
            {
              name: parentTableReferenceColumn, // WCSPROGRAMS__SharksRays_CatchDetails
              type: 'select_multiple',
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
          formName,
          depth: 1,
          // ReferenceUuid: `${prefixes}_${toCamelCase(q.name)}ExtCode`,
        });
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
        columns: questionsToColumns(group),
        defaultColumns: [
          // prettier-ignore
          ...[ { name: `${tName}ID`, type: 'int4', required: false } ],
          ...customColumns(tableName),
          ...standardColumns(tableName),
        ],
        FK: true,
        parentTable: tName,
        formName,
        depth: group[0].depth,
      });

      return tablesFromQuestions(questions, formName, tables);
    }

    tables.push(
      {
        name: tName,
        columns: questionsToColumns(questions),
        defaultColumns: [
          ...customColumns(tableId),
          ...standardColumns(tableId),
        ],
        formName,
        depth: 0,
      },
      {
        name: `${prefixes}__KoboDataset`,
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
          {
            name: 'Payload',
            type: 'jsonb',
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

    return tables;
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

  const tempTables = buildTablesFromSelect(survey, state.data.name, []);
  const tables = tablesFromQuestions(
    survey,
    state.data.name,
    tempTables
  ).reverse();

  return {
    ...state,
    forms: [tables],
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

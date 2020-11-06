get(`${state.data.url}`, {}, state => {
  const { survey } = state.data.content;

  // TODO: Decide which metadata field to include. ========================
  survey.push({ name: 'generated_uuid', type: 'text' });
  // ======================================================================

  const mapType = {
    calculate: 'varchar',
    date: 'date',
    decimal: 'float4',
    end: 'date',
    integer: 'int4',
    select_one: 'varchar',
    start: 'date',
    text: 'text',
    today: 'date',
    jsonb: 'jsonb',
    select_multiple: 'text',
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
    const words = str.match(/[0-9a-z]+/gi); // we split using split('_')."
    if (!words) return '';
    return words
      .map(word => {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
      })
      .join('');
  }

  function questionToType(questions) {
    var form = questions.filter(elt => !discards.includes(elt.type));
    form.forEach(obj => (obj.type = mapType[obj.type] || 'text'));
    form.forEach(obj => {
      // At some point we might need a list of 'question' that should be renamed, and their new values.
      if (obj.name === 'group') {
        obj.name = 'kobogroup';
      }
      if (obj.name == 'end') {
        // end is reserved in postgresql
        obj.name = 'end_date';
      }
      if (obj.name == 'column') {
        // end is reserved in postgresql
        obj.name = 'column_name';
      }
      if (obj.name == 'date') {
        // end is reserved in postgresql
        obj.name = 'date_value';
      }
    });
    form = form
      .map(x => {
        if (x && x.name) {
          x.name = /^\d+$/.test(x.name.charAt(1))
            ? `_${toCamelCase(x.name.split(/-/).join('_'))}`
            : toCamelCase(x.name.split(/-/).join('_'));
        }
        return x;
      })
      .filter(x => x.name !== undefined);
    // Adding a column as jsonb to take the whole payload
    form.push({ name: 'Payload', type: 'jsonb' });

    return form;
  }

  function tablesFromQuestions(questions, formName, tables) {
    const backwardsFirstBegin = questions
      .reverse()
      .findIndex(item => item.type === 'begin_repeat');

    const lastBegin =
      backwardsFirstBegin !== -1
        ? questions.length - backwardsFirstBegin - 1
        : false;

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

      tables.push({
        name:
          'WCS__FormGroup_' +
          toCamelCase(
            (formName + '_' + group[0].path.join('_'))
              .split(/\s|-|'/)
              .join('_')
              .replace('.', '')
          ),
        columns: questionToType(group),
        formName,
        depth: group[0].depth,
      });

      return tablesFromQuestions(questions, formName, tables);
    }

    tables.push(
      {
        name:
          'WCS__FormGroup_' +
          toCamelCase(
            formName
              .split(/\s|-|'/)
              .join('_')
              .replace('.', '')
          ),
        columns: questionToType(questions),
        formName,
        depth: 0,
      },
      {
        name: 'WCS__KoboDataset',
        columns: [
          {
            name: 'FormName',
            type: 'text',
            depth: 0,
            path: [],
          },
          {
            name: 'DatasetId',
            type: 'text',
            depth: 0,
            path: [],
          },
          {
            name: 'LastUpdated',
            type: 'date',
            depth: 0,
            path: [],
          },
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

      default:
        arr[i] = {
          ...q,
          depth,
          path: i === 0 ? [] : [...arr[i - 1].path],
        };
        break;
    }
  });

  const tables = tablesFromQuestions(survey, state.data.name, []).reverse();

  return {
    ...state,
    forms: [tables],
  };
});

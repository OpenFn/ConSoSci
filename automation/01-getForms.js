get('https://kf.kobotoolbox.org/api/v2/assets/?format=json', {}, state => {
  console.log(`Previous cursor: ${state.lastEnd}`);
  // Set a manual cursor if you'd like to only fetch form after a certain date
  const manualCursor = '2019-05-25T14:32:43.325+01:00';
  state.data.forms = state.data.results
    .filter(resource => resource.date_modified > (state.lastEnd || manualCursor))
    .map(form => {
      const url = form.url.split('?').join('?');
      return {
        formId: form.uid,
        tag: form.name,
        url,
      };
    });

  const lastEnd = state.data.results
    .filter(item => item.date_modified)
    .map(s => s.date_modified)
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  console.log(`Forms to fetch: ${JSON.stringify(state.data.forms, null, 2)}`);

  return { ...state, lastEnd, forms: [] };
});

each(
  // for each form that has been created/updated since the last run...
  dataPath('forms[*]'),
  // get the form definition...
  state =>
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
      };

      const discards = ['begin_group', 'begin_repeat', 'end_group', 'end_repeat', 'note'];

      function questionToType(questions) {
        var form = questions.filter(elt => !discards.includes(elt.type));
        form.forEach(obj => (obj.type = mapType[obj.type] || 'text'));
        form.forEach(obj => {
          if (obj.name === 'group') {
            obj.name = 'kobogroup';
          }
          if (obj.name == 'end') {
            // end is reserved in postgresql
            obj.name = 'end_date';
          }
        });
        form = form
          .map(x => {
            if (x.name !== undefined) {
              x.name = x.name.split(/-/).join('_');
            }
            return x;
          })
          .filter(x => x.name !== undefined);
        // Adding a column as jsonb to take the whole payload
        form.push({ name: 'payload', type: 'jsonb' });

        return form;
      }

      function tablesFromQuestions(questions, formName, tables) {
        var index_begin = -1;
        var index_end = -1;

        index_begin = questions.lastIndexOf(questions.find(item => item.type === 'begin_repeat'));
        index_end = questions.indexOf(questions.find(item => item.type === 'end_repeat'));

        if (-1 !== (index_begin | index_end)) {
          const group = questions.splice(index_begin, index_end - index_begin + 1);
          tables.push({
            name: (formName + '_' + questions[index_begin].name)
              .split(/\s|-|'/)
              .join('_')
              .toLowerCase(),
            columns: questionToType(group),
            formDef: group,
            group: 'repeat_group',
          });
          return tablesFromQuestions(questions, formName, tables);
        }
        tables.push({
          name: formName
            .split(/\s|-|'/)
            .join('_')
            .toLowerCase(),
          columns: questionToType(questions),
          formDef: questions,
          group: 'parent',
        });
        return tables;
      }

      const tables = tablesFromQuestions(survey, state.data.name, []);

      return {
        ...state,
        forms: [...state.forms, tables],
      };
    })(state)
);

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

  return { ...state, lastEnd, tablesToBeCreated: [] };
});

each(
  // for each form that has been created/updated since the last run...
  dataPath('forms[*]'),
  // get the form definition...
  state =>
    get(`${state.data.url}`, {}, state => {
      const { survey } = state.data.content;

      const mapType = {
        decimal: 'float4',
        integer: 'int4',
        text: 'text',
        select_one: 'varchar',
        calculate: 'varchar',
        date: 'date',
      };

      const types = ['integer', 'text', 'decimal', 'select_one', 'date', 'calculate'];

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
        //repeatGroup_columns.push({ table_name: state.data.name.split(' ').join('_') + '_char'.toLowerCase() });
      }

      const columns = survey.filter(elt => types.includes(elt.type));

      columns.forEach(obj => (obj.type = mapType[obj.type]));
      columns.forEach(obj => {
        if (obj.name === 'group') {
          obj.name = 'kobogroup';
        }
      });

      const table = { name: state.data.name.split(/\s|-/).join('_').toLowerCase(), columns };

      if (repeatGroup) {
        repeatGroup_columns.forEach(obj => {
          if (obj.name === 'group') {
            obj.name = 'kobogroup';
          }
        });
        const repeatgroup_table = {
          name: state.data.name.split(/\s|_/).join('_').toLowerCase() + '_char',
          columns: repeatGroup_columns,
        };
        return { ...state, tablesToBeCreated: [...state.tablesToBeCreated, table, repeatgroup_table] };
      }

      return { ...state, tablesToBeCreated: [...state.tablesToBeCreated, table] };
    })(state)
);

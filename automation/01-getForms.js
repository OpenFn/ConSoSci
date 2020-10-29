get('https://kf.kobotoolbox.org/api/v2/assets/?format=json', {}, state => {
  console.log(`Previous cursor: ${state.lastEnd}`);
  // Set a manual cursor if you'd like to only fetch form after a certain date
  const manualCursor = '2019-05-25T14:32:43.325+01:00';
  state.data.forms = state.data.results
    .filter(
      resource => resource.date_modified > (state.lastEnd || manualCursor)
    )
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
  state => {
    // if (
    //   state.data.tag !==
    //   'Copie_de_Questionnaire_conso-ménage_29092020 derniere version'
    // ) {
    //   return state;
    // }
    return get(`${state.data.url}`, {}, state => {
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

      const discards = [
        'begin_group',
        'begin_repeat',
        'end_group',
        'end_repeat',
        'note',
      ];

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

          console.log('lastBegin', lastBegin, questions[lastBegin]);
          console.log(
            'firstEndAfterLastBegin',
            firstEndAfterLastBegin,
            questions[firstEndAfterLastBegin]
          );

          // Remove the deepest repeat group from the 'questions' array, parse it
          // and push it to the 'tables' array, and call tablesFromQuestions with
          // the remaining questions.
          const group = questions.splice(
            lastBegin,
            firstEndAfterLastBegin - lastBegin + 1
          );
          tables.push({
            name: (formName + '_' + group[0].name)
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

      console.log('Form:', state.data.name);
      const tables = tablesFromQuestions(survey, state.data.name, []);

      return {
        ...state,
        forms: [...state.forms, tables],
      };
    })(state);
  }
);

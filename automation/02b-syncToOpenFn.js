alterState(state => {
  return { ...state, projectId: 1087 };
});

each(
  '$.forms[*]',
  each(
    '$.data[*]',
    alterState(state => {
      const { formDef, columns, name } = state.data;
      const validTypes = [
        'float4',
        'int4',
        'text',
        'varchar',
        'varchar',
        'date',
      ];
      var paths = [];
      var prefix = '';

      for (var i = 0; i < formDef.length; i++) {
        if (
          formDef[i].type == 'begin_group' ||
          formDef[i].type == 'begin_repeat'
        ) {
          prefix += '/' + formDef[i].name;
        } else if (
          // if we have a 'end_group' or 'end_repeat',
          //it means we must close a group = removing last element of prefix
          formDef[i].type == 'end_group' ||
          formDef[i].type == 'end_repeat'
        ) {
          const prefixes = prefix.split('/');
          prefixes.splice(prefixes.length - 1);
          prefix = prefixes.join('/');
        } else {
          // if none of those cases are met, it means we have potentially a column then we must add it to the path.
          if (formDef[i].name && validTypes.includes(formDef[i].type))
            paths.push(prefix + '/' + formDef[i].name + '/');
        }
      }

      const mapKoboToPostgres = {}; // This is the jsonBody that should be given to our upsert

      for (var i = 0; i < columns.length; i++) {
        mapKoboToPostgres[columns[i].name] = `dataValue('${paths[i]}')`;
      }
      mapKoboToPostgres.generated_uuid =
        'state.data._id + state.data._xform_id_string';

      const expression = `upsert('${name}', '_id', ${JSON.stringify(
        mapKoboToPostgres,
        null,
        2
      ).replace(/"/g, '')});`;

      state.data.expression = expression;
      state.data.triggerCriteria = { form: `${name}` };

      return state;
    })
  )
);

alterState(state => {
  return request(
    {
      method: 'get',
      path: 'triggers',
      params: {
        project_id: state.projectId,
      },
    },
    state => ({ ...state, triggers: state.data })
  )(state);
});

alterState(state => {
  return request(
    {
      method: 'get',
      path: 'jobs',
      params: {
        project_id: state.projectId,
      },
    },
    state => ({ ...state, jobs: state.data.filter(job => !job.archived) })
  )(state);
});

each(
  '$.forms[*]',
  each(
    '$.data[*]',
    alterState(state => {
      const triggerNames = state.triggers.map(t => t.name);
      const name = `auto/${state.data.name}`;
      const triggerIndex = triggerNames.indexOf(name);

      const trigger = {
        project_id: state.projectId,
        name,
        type: 'message',
        criteria: state.data.triggerCriteria,
      };

      if (triggerIndex === -1) {
        console.log('Inserting triggers.');
        return request(
          {
            method: 'post',
            path: 'triggers',
            data: {
              trigger,
            },
          },
          state => {
            return { ...state, triggers: [...state.triggers, state.data] };
          }
        )(state);
      } else {
        console.log('Trigger already existing.');
      }

      return state;
    })
  )
);

each('$.forms[*]', state => {
  return each(
    '$.data[*]',
    alterState(state => {
      const { expression } = state.data;
      const jobNames = state.jobs.map(j => j.name);
      const triggersName = state.triggers.map(t => t.name);
      const name = `auto/${state.data.name}`;
      const jobIndex = jobNames.indexOf(name); // We check if there is a job with that name.
      const triggerIndex = triggersName.indexOf(name);
      const triggerId = state.triggers[triggerIndex].id;

      const job = {
        adaptor: 'postgresql',
        expression,
        name,
        project_id: state.projectId,
        trigger_id: triggerId, // we (1) create a trigger first; (2) get the id ; (3) assign it here!
      };
      const method = jobIndex !== -1 ? 'put' : 'post';
      const path =
        method === 'put' ? `jobs/${state.jobs[jobIndex].id}` : 'jobs/';

      return request({ method, path, data: { job } })(state);
    })
  )(state);
});

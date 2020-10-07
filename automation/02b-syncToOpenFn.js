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
      //console.log(paths);

      const mapKoboToPostgres = {}; // This is the jsonBody that should be given to our upsert

      for (var i = 0; i < columns.length; i++) {
        mapKoboToPostgres[columns[i].name] = paths[i];
      }
      console.log(mapKoboToPostgres);

      const expression = `UPSERT(${name}, '_id', ${JSON.stringify(
        mapKoboToPostgres,
        null,
        2
      )})`;

      state.data.expression = expression;
      state.data.triggerCriteria = `{"form": "${name}"}`;

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
    state => ({ ...state, jobs: state.data })
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
        return request(
          {
            method: 'post',
            path: 'triggers',
            data: {
              trigger,
            },
          },
          state => {
            console.log(state.data);
            return { ...state, triggers: [...state.triggers, state.data] };
          }
        )(state);
      }

      return state;
    })
  )
);

/* each('$.forms[*]', state => {
  return each(
    '$.data[*]',
    alterState(state => {
      const { expression } = state.data;
      const jobNames = state.jobs.map(job => job.name);
      const name = `auto/${state.data.name}`;
      const jobIndex = jobNames.indexOf(name); // We check if there is a job with that name.
      const triggerIndex = state.triggers.indexOf(name);
      const triggerId = state.triggers[triggerIndex];

      const data = {
        name,
        project_id: state.projectId,
        trigger_id: triggerId, // we (1) create a trigger first; (2) get the id ; (3) assign it here!
        adaptor: 'postgresql',
        expression,
      };
      const method = jobIndex !== -1 ? 'put' : 'post';
      const path =
        method === 'put' ? `jobs/${state.jobs[jobIndex].id}` : 'jobs/';

      return request({ method, path, data })(state);
    })
  )(state);
});
 */

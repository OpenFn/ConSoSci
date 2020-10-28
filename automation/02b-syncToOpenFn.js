alterState(state => {
  console.log(state.configuration);
  return { ...state, projectId: 1168 };
});

each(
  '$.forms[*]',
  alterState(state => {
    var expression = '';
    var form_name = '';
    const expressions = [];

    for (var i = 0; i < state.data.length; i++) {
      const { formDef, columns, name, group } = state.data[i];
      if (name !== 'untitled') {
        const validTypes = ['float4', 'int4', 'text', 'varchar', 'varchar', 'date'];
        var paths = [];
        var prefix = '';
        form_name = name;
        for (var j = 0; j < formDef.length; j++) {
          if (formDef[j].type == 'begin_group' || formDef[j].type == 'begin_repeat') {
            prefix += '/' + formDef[j].name;
          } else if (
            // if we have a 'end_group' or 'end_repeat',
            //it means we must close a group = removing last element of prefix
            formDef[j].type == 'end_group' ||
            formDef[j].type == 'end_repeat'
          ) {
            const prefixes = prefix.split('/');
            prefixes.splice(prefixes.length - 1);
            prefix = prefixes.join('/');
          } else {
            // if none of those cases are met, it means we have potentially a column then we must add it to the path.
            if (formDef[j].name && validTypes.includes(formDef[j].type))
              paths.push(prefix + '/' + formDef[j].name + '/');
          }
        }

        var mapKoboToPostgres = {}; // This is the jsonBody that should be given to our upsert

        for (var k = 0; k < columns.length - 1; k++) {
          mapKoboToPostgres[columns[k].name] = `dataValue('${paths[k]}')`;
        }
        mapKoboToPostgres.generated_uuid = `state.data._id + '-' + state.data._xform_id_string`;
        group === 'repeat_group'
          ? (mapKoboToPostgres.generated_uuid += '-' + (i + 1))
          : mapKoboToPostgres.generated_uuid;

        if (group === 'repeat_group') {
          const delete_expression = `sql({ query: state => 'DELETE FROM ${name} where generated_uuid = ${mapKoboToPostgres.generated_uuid}' });`;
          expression += delete_expression + '\n';
        }

        expression +=
          `upsert('${name}', 'generated_uuid', ${JSON.stringify(mapKoboToPostgres, null, 2).replace(/"/g, '')});` +
          '\n';
        state.data[i].expression = expression;
        state.data[i].triggerCriteria = { form: `${form_name}` };
      }
    }

    return state;
  })
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
  alterState(state => {
    const triggerNames = state.triggers.map(t => t.name);

    const name = `auto/${state.data[state.data.length - 1].name}`;

    const criteria = state.data[state.data.length - 1].triggerCriteria;

    const triggerIndex = triggerNames.indexOf(name);

    const trigger = {
      project_id: state.projectId,
      name,
      type: 'message',
      criteria,
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
);

each(
  '$.forms[*]',
  alterState(state => {
    const expression = state.data[state.data.length - 1].expression;
    console.log('Inserting / Updating job');
    const jobNames = state.jobs.map(j => j.name);
    const triggersName = state.triggers.map(t => t.name);

    const name = `auto/${state.data[state.data.length - 1].name}`;

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
    const path = method === 'put' ? `jobs/${state.jobs[jobIndex].id}` : 'jobs/';

    return request({ method, path, data: { job } }, state => {
      return state;
    })(state);
  })
);
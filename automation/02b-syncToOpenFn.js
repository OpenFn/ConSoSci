alterState(state => {
  return { ...state, projectId: 1168 };
});

each(
  '$.forms[*]',
  alterState(state => {
    var expression = `alterState(state => {
  function generateUuid(body, uuid) {
    for (const property in body) {
      if (Array.isArray(body[property]) && body !== null) {
        body['__generatedUuid'] = uuid;

        body[property].forEach((thing, i, arr) => {
          if (thing !== null) {
            let newUuid = uuid + '-' + (i + 1);
            thing['__generatedUuid'] = newUuid;
            for (const property in thing) {
              if (Array.isArray(thing[property])) {
                generateUuid(thing, newUuid);
              }
            }
          }
        });
      }
    }
  }

  generateUuid(
    state.data.body,
    state.data.body._id+'-'+state.data.body._xform_id_string
  );
  return state;
}); \n`;
    var form_name = '';
    for (var i = 0; i < state.data.length; i++) {
      const { columns, name, formName, depth, __newUuid } = state.data[i];
      if (name !== `${state.prefix1}_${state.prefix2}_Untitled`) {
        var paths = [];
        form_name = name;
        for (var j = 0; j < columns.length; j++) {
          // Handling master parent table
          if (name === `${state.prefix1}__KoboDataset`) {
            const values = {
              FormName: `'${formName}'`,
              DatasetId: 'state.data.body._xform_id_string',
              LastUpdated: 'new Date()',
            };
            for (x in values) paths.push(values[x]);
            break;
          }
          // end of master parent table
          paths.push(
            (columns[j].path ? columns[j].path.join('/') + '/' : '') +
              columns[j].$autoname
          );
        }

        var mapKoboToPostgres = {}; // This is the jsonBody that should be given to our upsert

        function wrapper(column, mapping) {
          let prefix = '';
          const depth = column.depth;
          if (depth > 1) {
            for (var i = 0; i < depth - 1; i++) {
              prefix += `each(dataPath('body.${column.path[i]}[*]'), `;
            }
            prefix += mapping;
            for (var i = 0; i < depth - 1; i++) {
              prefix += ') \n';
            }

            return prefix;
          }
          return mapping;
        }

        // FROM HERE WE ARE BUILDING MAPPINGS
        for (var k = 0; k < columns.length; k++) {
          if (columns[k].depth > 0)
            mapKoboToPostgres[columns[k].name] = `x['${paths[k]}']`;
          else
            mapKoboToPostgres[columns[k].name] =
              name !== `${state.prefix1}__KoboDataset`
                ? `state.data.body.${paths[k].replace('/', '')}`
                : `${paths[k]}`;
        }
        mapKoboToPostgres.Payload = `state.data${
          columns[0].depth > 1 ? '' : '.body'
        }`;

        if (name !== `${state.prefix1}__KoboDataset`)
          mapKoboToPostgres[state.uuid] =
            columns[0].depth > 0
              ? `x['__generatedUuid']`
              : `dataValue('body.__generatedUuid')`;

        const operation = depth > 0 ? `upsertMany` : `upsert`;
        var uuid =
          name === `${state.prefix1}__KoboDataset` ? 'DatasetId' : state.uuid;

        let mapping = `${operation}('${name}', '${uuid}',`;

        if (columns[0].depth > 0) {
          mapping += `state => state.data${
            columns[0].depth > 1 ? '' : '.body'
          }['${columns[0].path.join('/')}'].map(x => (${JSON.stringify(
            mapKoboToPostgres,
            null,
            2
          ).replace(/"/g, '')}))`;
        } else {
          mapping += JSON.stringify(mapKoboToPostgres, null, 2).replace(
            /"/g,
            ''
          );
        }
        mapping += ') \n';
        // END OF BUILDING MAPPINGS
        expression += wrapper(columns[0], mapping);
      }
    }
    state.data.expression = expression;
    state.data.triggerCriteria = { form: `${form_name}` };
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

    const name = `auto/${state.data[1].name}`;

    const criteria = state.data.triggerCriteria;

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
    const expression = state.data.expression;
    console.log('Inserting / Updating job: ', `auto/${state.data[1].name}`);
    const jobNames = state.jobs.map(j => j.name);
    const triggersName = state.triggers.map(t => t.name);
    const name = `auto/${state.data[1].name}`;
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
    return state;
  })
);

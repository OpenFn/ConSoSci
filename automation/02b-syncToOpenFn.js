alterState(state => {
  return { ...state, projectId: 1168 };
});

alterState(state => {
  function addUUIDs(object, key, initialUuid) {
    if (initialUuid) {
      object[key] = initialUuid;
    }

    for (const property in object) {
      if (Array.isArray(object[property]) && object !== null) {
        object[property].forEach((thing, i, arr) => {
          if (thing !== null) {
            thing[key] = `${object[key]}-${i}`;
            for (const property in thing) {
              if (Array.isArray(thing[property])) {
                addUUIDs(thing, key);
              }
            }
          }
        });
      }
    }
  }
  addUUIDs(
    state.forms,
    '__newUuid',
    'state.data._id-state.data._xform_id_string'
  );

  return state;
});

each(
  '$.forms[*]',
  alterState(state => {
    var expression = '';
    var form_name = '';
    for (var i = 0; i < state.data.length; i++) {
      const { columns, name, formName, depth, __newUuid } = state.data[i];
      if (name !== `${state.prefix1}__${state.prefix2}_Untitled`) {
        var paths = [];
        form_name = name;
        for (var j = 0; j < columns.length; j++) {
          // Handling master parent table
          if (name === `${state.prefix1}__KoboDataset`) {
            const values = {
              FormName: `'${formName}'`,
              DatasetId: 'state.data._xform_id_string',
              LastUpdated: `'${Math.floor(new Date() / 1000)}'`,
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

        // FROM HERE WE ARE BUILDING MAPPINGS
        for (var k = 0; k < columns.length; k++) {
          if (columns[k].depth > 0)
            mapKoboToPostgres[columns[k].name] = `x['${paths[k]}']`;
          else
            mapKoboToPostgres[columns[k].name] =
              name !== `${state.prefix1}__KoboDataset`
                ? `state.data.${paths[k].replace('/', '')}`
                : `${paths[k]}`;
        }

        mapKoboToPostgres.Payload = 'state.data';

        if (name !== `${state.prefix1}__KoboDataset`)
          mapKoboToPostgres.GeneratedUuid = __newUuid; // This is the Uuid of the current table in form[]

        let mapping = '';
        if (columns[0].depth > 0) {
          mapping = `state => state.data.${columns[0].path.join(
            '.'
          )}.map(x => (${JSON.stringify(mapKoboToPostgres, null, 2).replace(
            /"/g,
            ''
          )}))`;
        }
        // END OF BUILDING MAPPINGS

        const operation = depth > 0 ? `upsertMany` : `upsert`;

        var uuid =
          name === `${state.prefix1}__KoboDataset`
            ? 'DatasetId'
            : 'GeneratedUuid';
        expression +=
          `${operation}('${name}', '${uuid}', ${
            depth > 0
              ? mapping
              : JSON.stringify(mapKoboToPostgres, null, 2).replace(/"/g, '')
          });` + '\n';
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

    const name = `auto/${state.data[1].name}`;

    const criteria = state.data[1].triggerCriteria;

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
  })
);

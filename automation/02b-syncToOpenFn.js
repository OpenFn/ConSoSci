each('$.forms[*]', state => {
  return each(
    '$.data[*]',
    alterState(state => {
      const validTypes = ['float4', 'int4', 'text', 'varchar', 'varchar', 'date'];
      var path = [];
      var prefix = '';

      for (var i = 0; i < state.data.formDef.length; i++) {
        if (state.data.formDef[i].type == 'begin_group' || state.data.formDef[i].type == 'begin_repeat') {
          prefix += '/' + state.data.formDef[i].name;
        } else if (
          // if we have a 'end_group' or 'end_repeat',
          //it means we must close a group = removing last element of prefix
          state.data.formDef[i].type == 'end_group' ||
          state.data.formDef[i].type == 'end_repeat'
        ) {
          const prefixes = prefix.split('/');
          prefixes.splice(prefixes.length - 1);
          prefix = prefixes.join('/');
        } else {
          // if none of those cases are met, it means we have potentially a column then we must add it to the path.
          if (state.data.formDef[i].name && validTypes.includes(state.data.formDef[i].type))
            path.push(prefix + '/' + state.data.formDef[i].name + '/');
        }
      }
      //console.log(path);

      const mapPostgresToKobo = {}; // This is the jsonBody that should be given to our upsert

      for (var i = 0; i < state.data.columns.length; i++) {
        mapPostgresToKobo[state.data.columns[i].name] = path[i];
      }
      console.log(mapPostgresToKobo);

      const trigger = `{"form": ${state.data.name}}`;
      const expression = `UPSERT(${state.data.name}, ${state.data.name}, ${JSON.stringify(
        mapPostgresToKobo,
        null,
        2
      )})`;

      state.data.expression = expression;
      state.data.trigger = trigger;
      return state;
    })
  )(state);
});

request(
  {
    method: 'get',
    path: 'triggers',
    params: {
      project_id: 1087,
    },
  },
  state => ({ ...state, triggers: state.data })
);

request(
  {
    method: 'get',
    path: 'jobs',
    params: {
      project_id: 1087,
    },
  },
  state => ({ ...state, jobs: state.data })
);

each('$.forms[*]', state => {
  return each(
    '$.data[*]',
    alterState(state => {
      const jobs = state.jobs.map(job => job.name);
      const job_index = jobs.indexOf('auto/' + state.data.name); // We check if there is a job with that name.

      if (job_index !== -1) {
        console.log(`There is already a job called ${state.data.name}`);
        //const new_expression = state.data.expression;
        state.jobs[job_index].expression = 'test';

        return request({
          method: 'put',
          path: 'jobs/' + state.jobs[job_index].id,
          data: {
            job: state.jobs[job_index],
          },
        })(state);
      }
      /* else {
        const job = {
          name: 'auto/' + state.data.name,
          project_id: state.jobs[0].project_id,
          trigger_id: state.jobs[0].trigger_id, // Im assigning the same trigger than before. But should we...
          // ... (1) create a trigger first; (2) get the id ; (3) assign it here?
          adaptor: 'postgresql',
          expression: state.data.expression,
        };

        return request({
          method: 'post',
          path: 'jobs/',
          data: {
            job: job,
          },
        })(state);
      } */ return state;
    })
  )(state);
});

/* 
each(
  '$.tablesToBeCreated[*]',
  alterState(state => {
    const jobs = state.jobs.map(job => job.name);
    const job_index = jobs.indexOf('auto/' + state.data.name); // We check if there is a job with that name.

    if (state.jobs[job_index].name !== -1) {
      console.log(`There is already a job called ${state.data.name}`);
      state.job[job_index].expression = state.data.expression;

      return request({
        method: 'put',
        path: 'jobs/' + state.job[job_index].id,
        data: {
          job: state.jobs[job_index],
        },
      })(state);
    } else {
      const job = {
        name: 'auto/' + state.data.name,
        project_id: state.jobs[0].project_id,
        trigger_id: state.jobs[0].trigger_id, // Im assigning the same trigger than before. But should we...
        // ... (1) create a trigger first; (2) get the id ; (3) assign it here?
        adaptor: 'postgresql',
        expression: state.data.expression,
      };

      return request({
        method: 'post',
        path: 'jobs/',
        data: {
          job: job,
        },
      })(state);
    }
  })
);
 */

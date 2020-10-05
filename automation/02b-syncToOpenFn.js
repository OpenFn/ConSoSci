each(
  '$.tablesToBeCreated[*]',
  alterState(state => {
    const validTypes = ['float4', 'int4', 'text', 'varchar', 'varchar', 'date'];
    var path = [];
    var prefix = '';

    for (var i = 0; i < state.data.form.length; i++) {
      if (state.data.form[i].type == 'begin_group' || state.data.form[i].type == 'begin_repeat') {
        prefix += '/' + state.data.form[i].name;
      } else if (
        // if we have a 'end_group' or 'end_repeat',
        //it means we must close a group = removing last element of prefix
        state.data.form[i].type == 'end_group' ||
        state.data.form[i].type == 'end_repeat'
      ) {
        const prefixes = prefix.split('/');
        prefixes.splice(prefixes.length - 1);
        prefix = prefixes.join('/');
      } else {
        // if none of those cases are met, it means we have potentially a column then we must add it to the path.
        if (state.data.form[i].name && validTypes.includes(state.data.form[i].type))
          path.push(prefix + '/' + state.data.form[i].name + '/');
      }
    }
    //console.log(path);

    const mapPostgresToKobo = {}; // This is the jsonBody that should be given to our upsert

    for (var i = 0; i < state.data.columns.length; i++) {
      mapPostgresToKobo[state.data.columns[i].name] = path[i];
    }
    //console.log(mapPostgresToKobo);

    const expression = `UPSERT(${state.data.name}, ${state.data.name}, ${JSON.stringify(mapPostgresToKobo, null, 2)})`;
    //console.log(expression);
    state.data.expression = expression;
    //return { ...state, tablesToBeCreated: [...state.tablesToBeCreated, expression] };
    return state;
  })
);

request(
  {
    method: 'get',
    path: 'jobs',
    params: {
      project_id: 1087,
    },
  },
  // we are trying to get one job whose externalId matches our UUID
  state => ({ ...state, job: state.data })
);

each(
  '$.tablesToBeCreated[*]',
  alterState(state => {
    const jobs = state.job.map(job => job.name);
    const job_index = jobs.indexOf('auto/' + state.data.name); // We check if there is a job with that name.

    if (state.job[job_index].name !== -1) {
      console.log('There is a job.');
      state.job[job_index].expression = state.data.expression;

      return request({
        method: 'put',
        path: 'jobs/' + state.job[job_index].id,
        data: {
          job: state.job[job_index],
        },
      })(state);
    } else {
      const job = {
        name: 'auto/' + state.data.name,
        project_id: state.job[0].project_id,
        trigger_id: state.job[0].trigger_id, // Im assigning the same trigger than before. But should we...
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

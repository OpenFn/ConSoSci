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

    const expression = `UPSERT(${state.data.name}, auto/${state.data.name}, ${JSON.stringify(mapPostgresToKobo, null, 2)}})`;
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
    console.log(state.data.name);
    console.log(state.job[0].name);
    if (state.job[0] && state.job[0].name === state.data.name) {
      //state.data[0].expression = state.expression;
      //"createTEI({\n  trackedEntityType: 'nEenWmSyUEp', // a person\n  orgUnit: 'g8upMTyEZGZ', // Njandama MCHP\n  attributes: [\n    {\n      attribute: 'w75KJ2mc4zz', // attribute id for first name\n      value: dataValue('case.firstName')(state) // data from submission \n    },\n    {\n      attribute: 'zDhUuAYrxNC', // attribute id for last name\n      value: dataValue('case.lastName')(state) // data from another submission field\n    }\n  ],\n  enrollments: [\n    {\n        orgUnit: 'g8upMTyEZGZ', // Njandama MCHP\n        program: 'IpHINAT79UW', // enroll in Child Program \n        enrollmentDate: new Date().toISOString().slice(0,10), // some custom javascript \n        incidentDate: state.data.metadata.timeStart.slice(0,10) // more custom javascript\n     }\n   ]\n});";
      // There's already a job, so we update...
      console.log('There is a job.');
      //return state;
      return request({
        method: 'put',
        path: 'jobs/' + state.data[0].id,
        data: {
          job: state.data[0],
        },
      })(state);
    } else {
      // There isn't an openfn job in this project, so we create...
      return request({
        method: 'post',
        path: 'jobs/',
        data: {
          job: state.data,
        },
      })(state);
    }

    return state;
  })
);

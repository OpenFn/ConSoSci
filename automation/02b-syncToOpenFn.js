alterState(state => {
  const { kobo_form } = state;

  var index = -1;
  var index2 = -1;
  var val1 = 'begin_repeat';
  var val2 = 'end_repeat';
  kobo_form.find((item, i) => {
    if (item.type === val1) {
      index = i;
    }
    if (item.type === val2) index2 = i;
  });

  const repeatGroup = kobo_form.splice(index, index2 - index + 1);

  return {
    ...state,
    kobo_columns: [kobo_form, repeatGroup],
  };
});

each(
  '$.tablesToBeCreated[*]',
  alterState(state => {
    const validTypes = ['float4', 'int4', 'text', 'varchar', 'varchar', 'date'];

    const { table_name } = state.data[state.data.length - 1];
    return describeTable(table_name)(state)
      .then(postgresColumn => {
        const columnNames = postgresColumn.data.map(x => x.name);

        var path = [];
        var prefix = '';
        for (var i = 0; i < state.kobo_columns[state.index].length; i++) {
          // We 1st test if we meet those keyword so we can start assigning our prefix.
          if (
            state.kobo_columns[state.index][i].type == 'begin_group' ||
            state.kobo_columns[state.index][i].type == 'begin_repeat'
          ) {
            prefix += '/' + state.kobo_columns[state.index][i].name;
          } else if (
            // if we have a 'end_group' or 'end_repeat',
            //it means we must close a group = removing last element of prefix
            state.kobo_columns[state.index][i].type == 'end_group' ||
            state.kobo_columns[state.index][i].type == 'end_repeat'
          ) {
            const prefixes = prefix.split('/');
            prefixes.splice(prefixes.length - 1);
            prefix = prefixes.join('/');
          } else {
            // if none of those cases are met, it means we have potentially a column then we must add it to the path.
            if (state.kobo_columns[state.index][i].name && validTypes.includes(state.kobo_columns[state.index][i].type))
              path.push(prefix + '/' + state.kobo_columns[state.index][i].name + '/');
          }
        }
        //console.log(path);
        const mapPostgresToKobo = {}; // This is the jsonBody that should be given to our upsert

        columnNames.forEach((key, i) => (mapPostgresToKobo[key] = path[i]));
        console.log(mapPostgresToKobo);

        const expression = `UPSERT(${table_name}, uuid, ${JSON.stringify(mapPostgresToKobo, null, 2)}})`;

        console.log(expression);

        return { ...state, expression };
      })
      .catch(error => {
        console.log(error);
      });
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

alterState(state => {
  if (state.data[0]) {
    state.data[0].expression = state.expression;
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
    return request({ method: 'post', data: {} })(state);
  }
});

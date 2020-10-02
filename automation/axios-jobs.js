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

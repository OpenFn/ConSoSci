upsertTask('1201382240883590', { //e.g., dataValue('body._id') to use the Kobo id from state.data
  externalId: state.data.GrievanceID, //Per the docs, I think here we put the Asana external Id field name (e.g., 'gid')
  data: {
    //Then we need to map the value for whichever external field we identify of Float32Array
    //gid: dataValue('body._id') //fyi, in kobo _id is unique to the form submission
    name: 'Joseph test task2',
    projects: ['1201382240883590'],  //WCS project gid
    created_at: state.data.start,
    completed_at: state.data.end,
    notes: state.data.ReporterFullName,
  },
},

state => {
    console.log(JSON.stringify(state.data, null, 2 )); //log data
    return state;
  }
);

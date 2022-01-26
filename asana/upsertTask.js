fn(state => {
  const formatMapping = {
    InPerson: '1192836094355011',
  };

  return { ...state, formatMapping };
});

upsertTask(
  '1201382240883590',
  {
    externalId: 'gid', //Per the docs, I think here we put the Asana external Id field name (e.g., 'gid')
    data: {
      gid: '1201687476823315',
      name: 'Joseph test task 2',
      projects: ['1201382240883590'], //WCS project gid
      /*created_at: dataValue('body.start'),
    completed_at: dataValue('body.end'),*/
      notes: dataValue('body.ReporterFullName'),
      custom_fields: {
        /*'1200603908440348': dataValue('body.GrievanceOrSuggestion'), */ //GrievanceOrSuggestion
        // 1192836094355010: '1192836094355011', //Grievance Report Format
        1192836094355010: state =>
          state.formatMapping[dataValue('body.ReportFormat')(state)],
      },
    },
  },
  state => {
    console.log(JSON.stringify(state.data, null, 2)); //log data
    return state;
  }
);

/*
updateTask('1201687476823315', {   //my task_gid
  name: 'Joseph test task2',
  custom_fields: {
      '1200603908440348': dataValue('body.GrievanceOrSuggestion'),   //GrievanceOrSuggestion
      '1192836094355010': dataValue('body.FormatReport')           //Grievance Report Format
  },
  
  
},
state => {
    console.log(JSON.stringify(state.data, null, 2 )); //log data
    return state;
  }


);*/

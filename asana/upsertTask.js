upsertTask('1201382240883590', { 
  externalId: state.data.GrievanceID, //Per the docs, I think here we put the Asana external Id field name (e.g., 'gid')
  data: {
    name: 'Joseph test task2',
    projects: ['1201382240883590'],  //WCS project gid
    created_at: state.data.start,
    completed_at: state.data.end,
    notes: 'reported by Aleksa in Kobo',
  
    
  },
},

state => {
    console.log(JSON.stringify(state.data, null, 2 )); //log data
    return state;
  }

);

updateTask('1201382240883590/1201687476823315', {   //my task_gid
  name: 'Joseph test task2',
  custom_fields: {
      '1200603908440348': state.data.GrievanceOrSuggestion,   //GrievanceOrSuggestion
      '1192836094355010': state.data.FormatReport           //Grievance Report Format
  },
  
  
},
state => {
    console.log(JSON.stringify(state.data, null, 2 )); //log data
    return state;
  }


);
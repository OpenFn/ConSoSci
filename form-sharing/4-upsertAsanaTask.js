//This job will add a task to Asana if a new Kobo form was shared 
fn(state => {
  const dueDate = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  state.asanaTasks = state.activeForms.map(form => {
    return {
      name: `New form added to OpenFn: ${form.name}`,
      approval_status: 'pending',
      projects: ['1198901998266253'],
      assignee_section: '1207247884457665', //OLD General Section: '1203181218738601',
      assignee: '473999120764595',
      due_on: dueDate,
      notes: `New form added to OpenFn: ${form.name}. Please review the Google Sheet and look for cells where it says "ADD MANUALLY" to add any values missing (e.g., "Instance" the form belongs to): https://docs.google.com/spreadsheets/d/1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY/edit#gid=1559623602`,
    };
  });

  state.archivedFormsTasks = state.archivedForms.map(form => {
    return {
      name: `Form archived: ${form.name}`,
      projects: ['1198901998266253'],
      assignee_section: '1207247884457665', //OLD General Section: '1203181218738601',
      assignee: '473999120764595',
      due_on: dueDate,
      notes: `Kobo form was archived: ${form.name}. Please review the Google Sheet to confirm this is correct & consider if you want to remove from the OpenFn Sync: https://docs.google.com/spreadsheets/d/1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY/edit#gid=1559623602`,
    };
  });

  console.log('# of Asana Tasks to add:: ', state.asanaTasks.length);
  console.log('Tasks to upsert:: ', state.asanaTasks);
  return state;
});

//upsert Asana task if new form shared notification needed
each(
  '$.asanaTasks[*]',
  upsertTask('1198901998266253', {
    //project_id
    externalId: 'name',
    data: state => state.data,
  })
);

each(
  '$.archivedFormsTasks[*]',
  upsertTask('1198901998266253', {
    //project_id
    externalId: 'name',
    data: state => state.data,
  })
);

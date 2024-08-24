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
      notes: `New form added to OpenFn: ${form.name} (uid: ${form.uid}). Please review the Google Sheet to (1) update columns L, N, & O, and (2) update column E (look for cells where it says "ADD MANUALLY" to add any values missing e.g., "Instance"): https://docs.google.com/spreadsheets/d/1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY/edit#gid=1559623602`,
    };
  });

  state.archivedFormsTasks = state.archivedForms.map(form => {
    return {
      name: `Form archived: ${form.name}`,
      projects: ['1198901998266253'],
      assignee_section: '1207247884457665', //OLD General Section: '1203181218738601',
      assignee: '473999120764595',
      due_on: dueDate,
      notes: `Kobo form was archived: ${form.name} (uid: ${form.uid}). Please review the Google Sheet to (1) confirm this is correct, (2) remove from the "Deployed" sheet if you want to remove from the OpenFn Sync, and (3) update notes in the "Archived" sheet: https://docs.google.com/spreadsheets/d/1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY/edit#gid=1559623602`,
    };
  });

  console.log('# of New Form Asana Tasks to add:: ', state.asanaTasks.length);
  console.log('New form alert tasks to upsert:: ', state.asanaTasks);
  console.log(
    '# of Archibed Form Asana Tasks to add:: ',
    state.archivedFormsTasks.length
  );
  console.log(
    'Archived form alert tasks to upsert:: ',
    state.archivedFormsTasks
  );
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

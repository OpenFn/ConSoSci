fn(state => ({
  ...state,
  formDefinition: state.data.formDefinition,
  data: { ...state.data, formDefinition: {} },
}));

upsert('KoboToolBox_Forms', 'form_id', state => ({
  form_name: state.formDefinition.name,
  date_created: state.formDefinition.date_created,
  date_modified: state.formDefinition.date_modified,
  form_owner: state.formDefinition.owner__username,
  languages: state.formDefinition.summary.languages.join(','),
  form_id: state.formDefinition.uid,
  form_group: state.data.prefix2,
  table_id: `${state.data.prefix1}_${state.data.prefix2}_${state.data.tableId}`,
}));

upsertMany('KoboToolBox_Choices', 'list_id', state => {
  const { choices } = state.formDefinition.content;
  const formId = state.formDefinition.uid;
  return choices.map(x => ({
    list_id: `${x.list_name}${formId}${x['$kuid']}`,
    list_name: x.list_name,
    choice_name: x.name,
    choice_label: x.label ? x.label.join(',') : '',
    form_uid: formId,
  }));
});

upsertMany('KoboToolBox_Questions', 'question_id', state => {
  const { survey } = state.formDefinition.content;
  const formId = state.formDefinition.uid;
  return survey.map(x => ({
    question_id: `${x['$kuid']}-${formId}`,
    form_id: formId,
    analytics_label: '',
    question_name: x.name,
    label: x.label ? x.label.join(',') : '',
    question_type: x.type,
    select_from_list_name: x.select_from_list_name,
    question_constraint: x.constraint,
  }));
});

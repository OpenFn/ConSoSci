fn(state => ({
  ...state,
  formDefinition: state.data.formDefinition,
  data: { ...state.data, formDefinition: {} },
}));

upsert('KoboToolBox_Forms', 'form_id', {
  form_name: state.formDefinition.name,
  date_created: state.formDefinition.date_created,
  date_modified: state.formDefinition.date_modified,
  form_owner: state.formDefinition.owner__username,
  languages: state.formDefinition.summary.languages.join(',') || 'English',
  form_id: state.formDefinition.uid,
  form_group: state.prefix2,
  table_id: `${state.data.prefixes}_${state.data.tableId}`,
});

upsertMany('KoboToolBox_Choices', 'choice_id', state => {
  const { choices } = state.formDefinition.content;
  const formId = state.formDefinition.uid;
  return choices.map(x => ({
    choice_id: `${x.list_name}${formId}${x['$kuid']}`,
    list_id: `${x.list_name}${formId}`,
    list_name: x.list_name,
    choice_name: x.name,
    choice_label: x.label ? x.label.join(',') : '',
    formUid: formId,
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
    list_id: `${x.select_from_list_name}${formId}`,
    question_constraint: x.constraint,
  }));
});

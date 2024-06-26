//Compare new forms in Kobo with GoogleSheet list to see if new forms were shared in Kobo
fn(state => {
  const { formsToCreate, formsToUpdate } = state;
  const keywords = ['price', 'prix', 'bns', 'nrgt', 'grm', 'feedback'];

  const tagMapping = {
    price: 'bns_price',
    prix: 'bns_price',
    bns: 'bns_survey',
    nrgt: 'nrgt_current',
    grm: 'grm',
    feedback: 'grm',
  };

  const createTagName = name => {
    let tag = '';
    const keyword = keywords.find(keyword =>
      name.toLowerCase().includes(keyword)
    );

    if (keyword) {
      tag = tagMapping[keyword] || keyword;
    }
    return tag;
  };

  const containsGRMFeedback = name =>
    !name.toLowerCase().includes('grm', 'feedback');

  const instance = name =>
    containsGRMFeedback(name) ? 'ADD MANUALLY @Admin!' : '';

  const projectId = name =>
    containsGRMFeedback(name) ? 'ADD MANUALLY @Admin!' : '';

  const grmID = name => (containsGRMFeedback(name) ? 'GRM ID. XX' : '');

  const workspaceName = name =>
    containsGRMFeedback(name) ? 'Grievances' : 'ConSoSci';

  const sheetRowMap = form => [
    form.uid,
    form.name,
    createTagName(form.name),
    form.owner__username,
    instance(form.name),
    //projectId(form.name), //for GRM only
    //grmID(form.name), //for GRM only
    form.deployment__active ? 'deployed' : 'archived', //deployment status //if we assume only deployed forms will be fetched
    workspaceName(form.name), //openfn project space
    form.url,
    form.date_modified, //kobo_form_date_modified
    form.date_created, //kobo_form_date_created
    new Date().toISOString(), //row_date_modified
    false, //auto_sync checkbox
  ];

  state.rowValuesToCreate = formsToCreate.map(form => sheetRowMap(form));
  state.rowValuesToUpdate = formsToUpdate.map(form => ({
    range: `wcs-bns-test!A${form.rowIndex + 2}:N${form.rowIndex + 2}`,
    values: [sheetRowMap(form)],
  }));

  console.log('# of new forms detected:: ', state.rowValuesToCreate.length);
  console.log('Forms to add to the master sheet:: ', state.rowValuesToCreate);
  return state;
});

//if new Kobo form shared, adding to the Google Sheet...
appendValues({
  spreadsheetId: '1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY', //sheet id
  range: 'wcs-bns-test!A:N', //range of columns in sheet
  values: state => state.rowValuesToCreate,
});

each(
  '$.rowValuesToUpdate[*]',
  batchUpdateValues({
    spreadsheetId: '1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY', //sheet id
    range: state => state.data.range, //range of columns in sheet
    values: state => state.data.values,
  })
);

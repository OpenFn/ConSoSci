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
    
  state.formLastModified = form => form.date_modified; 

  const sheetRowMap = form => [
    form.uid,
    form.name,
    createTagName(form.name),
    form.owner__username,
    instance(form.name),
    //projectId(form.name), //for GRM only
    //grmID(form.name), //for GRM only
    form.deployment__active ? 'deployed' : 'archived', //deployment status //if we assume only deployed forms will be fetched
    'ConSoSci', //openfn project space --> OLD dynamic mapping: //workspaceName(form.name),
    `https://kf.kobotoolbox.org/#/forms/${form.url}/summary`, //form.url,
    form.date_modified, //kobo_form_date_modified
    form.date_created, //kobo_form_date_created
    new Date().toISOString(), //row_date_modified
    false, //auto_sync checkbox
    //job code template
    `"{id: '${form.uid}', tag: '${createTagName(form.name)}', name: '${
      form.name
    }', owner: '${form.owner__username}', instance: '${instance(form.name)}'},"`,
  ];

  state.rowValuesToCreate = formsToCreate.map(form => sheetRowMap(form));
  state.rowValuesToUpdate = formsToUpdate.map(form => ({
    range: `wcs-bns-DEPLOYED!A${form.rowIndex + 2}:N${form.rowIndex + 2}`,
    values: [sheetRowMap(form)],
  }));
  state.rowValuesToArchive = formsToUpdate.map(form => sheetRowMap(form));

  console.log('# of new forms detected:: ', state.rowValuesToCreate.length);
  console.log('Forms to add to the master sheet:: ', state.rowValuesToCreate);
  return state;
});

//if new Kobo form shared, adding to the "Deployed"" Sheet...
appendValues({
  spreadsheetId: '1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY', //sheet id
  range: 'wcs-bns-DEPLOYED!A:O', //range of columns in sheet
  values: state => state.rowValuesToCreate,
});

//updating rows in Sheet where forms are archived
each(
  '$.rowValuesToUpdate[*]',
  batchUpdateValues({
    spreadsheetId: '1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY', //sheet id
    range: state => state.data.range, //range of columns in sheet
    values: state => state.data.values,
  })
);

//also adding archived rows to "Archived" Sheet...
appendValues({
  spreadsheetId: '1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY', //sheet id
  range: 'wcs-bns-ARCHIVED!A:O', //range of columns in sheet
  values: state => state.rowValuesToArchive,
});

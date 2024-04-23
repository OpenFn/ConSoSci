//Compare new forms in Kobo with GoogleSheet list to see if new forms were shared in Kobo
fn(state => {
  const { filteredKoboFormsData } = state;
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
    name.toLowerCase().includes('grm', 'feedback');

  const instance = name =>
    containsGRMFeedback(name) ? '' : 'Add manually';

  const projectId = name =>
    containsGRMFeedback(name) ? 'Add manually' : '';

  const grmID = name => (containsGRMFeedback(name) ? 'GRM ID. XX' : '');

  const workspaceName = name =>
    containsGRMFeedback(name) ? 'Grievances' : 'ConSoSci';

  state.sheetsData = filteredKoboFormsData.map(form => {
    const formName = form.name;
    return [
      form.uid,
      form.name,
      createTagName(formName),
      form.owner__username,
      instance(formName),
      projectId(formName),
      grmID(formName),
      workspaceName(formName),
      form.url,
      form.date_modified,
      form.date_created,
    ];
  });

  return state;
});

//if new Kobo form shared, adding to the Google Sheet... 
appendValues({
  spreadsheetId: '1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY', //sheet id
  range: 'sheetsList of kobo forms!A:L',
  values: state => state.sheetsData,
});
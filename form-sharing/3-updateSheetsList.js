fn(state => {
  const koboFormsData = state.filteredKoboFormsData;
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

  const createInstance = name => {
    if (name.toLowerCase().includes('grm', 'feedback')) {
      return '';
    } else {
      return 'Add manually';
    }
  };

  const createProjectId = name => {
    if (name.toLowerCase().includes('grm', 'feedback')) {
      return 'Add manually';
    } else {
      return '';
    }
  };

  const createGRMiD = name => {
    if (name.toLowerCase().includes('grm', 'feedback')) {
      return 'GRM ID. XX';
    } else {
      return '';
    }
  };

  const createWorkspaceName = name => {
    if (name.toLowerCase().includes('grm', 'feedback')) {
      return 'Grievances';
    } else {
      return 'ConSoSci';
    }
  };

  const googleSheetsAppendData = [];

  koboFormsData.forEach(form => {
    const formName = form.name;
    const data = [
      form.uid,
      form.name,
      createTagName(formName),
      form.owner__username,
      createInstance(formName),
      createProjectId(formName),
      createGRMiD(formName),
      createWorkspaceName(formName),
      form.url,
      form.date_modified,
      form.date_created,
    ];
  
    googleSheetsAppendData.push(data);
  });

  state.googleSheetsAppendData = googleSheetsAppendData
  return state;
});

appendValues(
    {
        spreadsheetId: '1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY',
        range: 'sheetsList of kobo forms!A:K',
        values: state.googleSheetsAppendData,
      }
)

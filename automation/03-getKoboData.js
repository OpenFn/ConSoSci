//== Job to be used for fetching data from Kobo on repeated, timer basis  ==//
// This can be run on-demand at any time by clicking "run" //

alterState(state => {
  console.log('Current cursor value:', state.lastEnd);

  // Set a manual cursor if you'd like to only fetch data after this date.
  const manualCursor = '2020-05-25T14:32:43.325+01:00';
  state.data = {
    surveys: [
      //** Specify new forms to fetch here **//
     //{ id: 'acZdoLnafZ5WZscgVErALo', name: 'Form Project Name'},
    // { id: 'a83rSAZ9Cehk26SSkSJm8Z', name: 'WCS_KidsOR_V323novCopyOfKidsorDemo'},
    // { id: 'aeUjHuADwhK9RKGz8cgr5W', name: 'WCS_KidsOR_V423novCopyOfKidsorDemo'},
    // { id: 'aEAqMfzhGtgx5ZoYp3rPCb', name: 'WCS_Marche_24novSwmMarcheTest'},
    // { id: 'aq8jbMUZ89LndzDdUiWeA4', name: 'WCS_marche_V224novSwmMarcheTest'},
    // { id: 'avW25WTT7t2LDcgeq426dM', name: 'WCS_KidsOR_24novCopyOfKidsorDemo'},
    // { id: 'aRfFb8z8HGiaUfTCZoe7t8', name: 'test_form_from_xls_2.xls'},
    // { id: 'an2x2PxChR6SjmASEFQcmh', name: 'WCS_RuralConsumption_25novWcsRuralConsumptionTest'}
    //{ id: 'a3fpvhRAUoGPrPGZvSdzAW', name: 'BwalyaSurvey_V2'}
    { id: 'aDVDagX8TE9NUY7xmvAUpv', name: 'WCS_marche_SwmEtudeMarché2020VendorSales'},
    //{ id: 'a9eJJ2hrRSMCJZ95WMc93j', name: 'WCS_swm_ConsommationUrbaineSwm'},
    { id: 'aaayFwZcjbp8gFeYeqohHu', name: 'WCS_swm_26novSwmMarcheTest'},
    { id: 'atFB5uoXJtzwJoPCKtNPjg', name: 'WCS_swm_26novSwmMarcheTest'},

    

    
      
      
    ].map(survey => ({
      formId: survey.id,
      tag: survey.tag,
      name: survey.name, 
      owner: survey.owner,
      url: `https://kf.kobotoolbox.org/api/v2/assets/${survey.id}/data/?format=json`,
      query: `&query={"end":{"$gte":"${state.lastEnd || manualCursor}"}}`,
    })),
  };
  return state;
});

each(dataPath('surveys[*]'), state => {
  const { url, tag, formId, name, owner } = state.data;
  return get(url, {}, state => {
    state.data.submissions = state.data.results.map((submission, i) => {
      return {
        i,
        // Here we append the tags defined above to the Kobo form submission data
        form: name,
        formName: name, 
        formOwner: owner,
        body: submission,
      };
    });
    const count = state.data.submissions.length;
    console.log(`Fetched ${count} submissions from ${formId} (${tag}).`);
    //Once we fetch the data, we want to post each individual Kobo survey
    //back to the OpenFn inbox to run through the jobs =========================
    return each(dataPath('submissions[*]'), state => {
      console.log(`Posting ${state.data.i + 1} of ${count}...`);
      return post(state.configuration.openfnInboxUrl, { body: state => state.data })(state);
    })(state);
    // =========================================================================
  })(state);
});

alterState(state => {
  const lastEnd = state.references
    .filter(item => item.body)
    .map(s => s.body.end)
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    
  console.log('New cursor value:', lastEnd);
  return { ...state, data: {}, references: [], lastEnd };
});
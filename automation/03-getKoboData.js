//== Job to be used for fetching data from Kobo on repeated, timer basis  ==//
// This can be run on-demand at any time by clicking "run" //

alterState(state => {
  // Set a manual cursor if you'd like to only fetch data after this date.
  const manualCursor = '2020-05-25T14:32:43.325+01:00';
  state.data = {
    surveys: [
      //** Specify new forms to fetch here **//
     //{ id: 'acZdoLnafZ5WZscgVErALo', name: 'Form Project Name'},
     { id: 'a83rSAZ9Cehk26SSkSJm8Z', name: 'WCS_KidsOR_V323novCopyOfKidsorDemo'},
     { id: 'aeUjHuADwhK9RKGz8cgr5W', name: 'WCS_KidsOR_V423novCopyOfKidsorDemo'},
     { id: 'aEAqMfzhGtgx5ZoYp3rPCb', name: 'WCS_Marche_24novSwmMarcheTest'},
     { id: 'aq8jbMUZ89LndzDdUiWeA4', name: 'WCS_KidsOR_24novCopyOfKidsorDemo'},

    
      
      
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
    
  return { ...state, data: {}, references: [], lastEnd };
});
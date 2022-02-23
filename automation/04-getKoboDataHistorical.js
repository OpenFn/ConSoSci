//== Job to be used for fetching historical data from Kobo in one-time migrations ==//
// This can be run on-demand at any time by clicking "run" //

alterState(state => {
  // BEFORE RUNNING THIS JOB...
  // Set this manual cursor to the earliest submission date you want fetch. 
  // Set this to a very early date if you want to fetch ALL data. 
  const manualCursor = '2017-01-01T14:32:43.325+01:00';
  console.log('Fetching Kobo submissions starting at: ', manualCursor); 
  state.data = {
    surveys: [
    //--------LIST FORMS HERE THAT YOU WANT TO SYNC HIST DATA
    // {uid: 'aFjJFy7fByoPQ4btGXxf4X',
    //  formName: 'Moz_Sharks_Rays',
    //  tableId: 'WCSPROGRAMS_SharksRays',}, //Resynced on Feb23, 2022
      
    // {uid: 'awjdb6AEFF5WgN3bYVNbof',
    // formName: 'Sharks_Rays_20220110_Kenya',
    // tableId: 'WCSPROGRAMS_SharksRays',}, //Resynced on Feb21, 2022
    
    //  {uid: 'aStMvYShWXZsKYa7AyN6sr',
    //  formName: 'Sharks_Rays_20210521_Kenya',
    //  tableId: 'WCSPROGRAMS_SharksRays',}, //Resynced on Feb16, 2022
    
    // {uid: 'aQeXAtEkgg8PGwxDiCUnPW',
    //  formName: 'Sharks_Rays_20210627_Kenya',
    //  tableId: 'WCSPROGRAMS_SharksRays',}, //Resynced on Feb16, 2022
    
    //{uid: 'ayvuo4RnYJBvMLUdNzhYgQ',
    //  formName: 'Sharks_Rays_20210701_Kenya',
    //  tableId: 'WCSPROGRAMS_SharksRays',}, //Resynced on Feb16, 2022
    
    //{uid: 'aCp2CojjXBoazzhweWrRUr',
    //  formName: 'Sharks_Rays_20210920_Mada',
    //  tableId: 'WCSPROGRAMS_SharksRays',}, //Resynced on Feb23, 2022
    
    //{uid: 'aSDqbJNRcEkvgKHJSMK2z7',
    //  formName: 'Sharks_Rays_20220111_Mada',
    //  tableId: 'WCSPROGRAMS_SharksRays',}, //Resynced on Feb23, 2022
    
    // {uid: 'aaknL3DQQgkgZ8iay89X5P',
    //  formName: 'SHARC',
    //  tableId: 'WCSPROGRAMS_SharksRaysV2',}, //Resynced on Feb21, 2022
    
    // {uid: 'aDgPJqN4SAYohZ4ZueEeYU',
    // formName: 'WCS Data Collection Site Survey',
    // tableId: 'WCSPROGRAMS_ProjectAnnualDataPlan',},
    
    // {uid: 'aukhdejQU76K33caCkF4rP',
    // formName: 'WCS Socio-Economic Projects Database',
    // tableId: 'WCSPROGRAMS_SocioEco_SocioEcoSurvey',},

    //=========================//
    ].map(survey => ({
      ...survey,
      formId: survey.uid,
      url: `https://kf.kobotoolbox.org/api/v2/assets/${survey.uid}/data/?format=json`,
      query: `&query={"_submission_time":{"$gte":"${manualCursor}"}}`,
    })),
  };
  return state;
});

each(dataPath('surveys[*]'), state => {
  const { url, query, tag, formId, formType, formName, tableId, owner } = state.data;
  return get(`${url}${query}`, {}, state => {
    state.data.submissions = state.data.results.map(submission => {
      return {
        // Here we append the tags defined above to the Kobo form submission data
        tableId,
        formName,
        formOwner: owner,
        formType,
        body: submission,
      };
    });
    const count = state.data.submissions.length;
    console.log(`Fetched ${count} submissions from ${formName} (${tableId}).`);
    //Once we fetch the data, we want to post each individual Kobo survey
    //back to the OpenFn inbox to run through the jobs =========================
    return each(dataPath('submissions[*]'), state => {
      console.log(`Posting 1 of ${count}...`);
      return post(state.configuration.openfnInboxUrl, {
        body: state => state.data,
      })(state);
    })(state);
    // =========================================================================
  })(state);
});

alterState(state => {
  let lastEnd = state.references
    .filter(item => item.body)
    .map(s => s.body.end)
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  lastEnd = new Date(lastEnd) > new Date() ? lastEnd : new Date().toISOString();
  return { ...state, data: {}, references: [], lastEnd };
});

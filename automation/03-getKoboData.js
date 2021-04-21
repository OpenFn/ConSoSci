//== Job to be used for fetching data from Kobo on repeated, timer basis  ==//
// This can be run on-demand at any time by clicking "run" //

alterState(state => {
  console.log('Current cursor value:', state.lastEnd);

  // Set a manual cursor if you'd like to only fetch data after this date.
  const manualCursor = '2020-05-25T14:32:43.325+01:00';
  state.data = {
    surveys: [
      {
        uid: 'aQ8cyLSn8TyJWJQnSg7p63',
        formName: 'SWM Etude Marché 9Feb',
        tableId: 'WCS_marche_SWMEtudeMarché9Feb'
      },
      {
        uid: 'azg4rJb2Kk8DT2upSPyYjB',
        formName: 'Livestock production demo',
        tableId: 'WCS_Livestock_LivestockProduction'
      },
      {
        uid: 'aDgPJqN4SAYohZ4ZueEeYU',
        formName: 'Arcadia Data Collection Site Survey',
        tableId: 'WCSPROGRAMS_ProjectAnnualDataPlan'
      },
      //{
      //  uid: 'apZrpKcK78xzrPcAfRrfac',
      //  formName: 'Sharks & Rays 24 March',
      //  tableId: 'WCS_SR_SharkAndRaysTraining'
      //}
    ].map(survey => ({
      ...survey,
      formId: survey.uid,
      url: `https://kf.kobotoolbox.org/api/v2/assets/${survey.uid}/data/?format=json`,
      query: `&query={"end":{"$gte":"${state.lastEnd || manualCursor}"}}`,
    })),
  };
  return state;
});

each(dataPath('surveys[*]'), state => {
  const { url, query, tag, formId, formName, tableId, owner } = state.data;
  return get(`${url}${query}`, {}, state => {
    state.data.submissions = state.data.results.map(submission => {
      return {
        // Here we append the tags defined above to the Kobo form submission data
        tableId,
        formName,
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
      return post(state.configuration.openfnInboxUrl, {
        body: state => state.data,
      })(state);
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

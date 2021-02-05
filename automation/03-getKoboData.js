//== Job to be used for fetching data from Kobo on repeated, timer basis  ==//
// This can be run on-demand at any time by clicking "run" //

alterState(state => {
  console.log('Current cursor value:', state.lastEnd);

  // Set a manual cursor if you'd like to only fetch data after this date.
  const manualCursor = '2020-05-25T14:32:43.325+01:00';
  state.data = {
    surveys: [
        {
        id: 'an92wDyVMw4yUtCo4d7EWi',
        formName: 'WCS 4th Groups Test',
        destination: 'WCS_4levelrepeat_fourlevel'
      },
       {
        id: 'axGKmEwWdNAqWERTMGrPpy',
        formName: 'Dec3 WCS 2nd Level Groups',
        destination: 'WCS_group_GroupTest'
      },
      {
        id: 'a2eNZrDoyreoMhCemg6R3j',
        formName: 'Dec3 SWM Marche Test',
        destination: 'WCS_marche_Dec3SWMMarcheTest'
      },
      {
        id: 'azMgdwsbGuAhZDaMnVVBUs',
        formName: 'Sharks & Rays Demo 0',
        destination: 'WCS_sharksandrays_SharksandRaysDemo0'
      },
      {
        id: 'ajHtokWFi96KE7CBFMu58f',
        formName: 'Sharks And Rays 1',
        destination: 'WCS_sharks_SharksAndRays1'
      },
      /*
      {
        id: 'a3mbXtJccsMaRRC5sn8fsv',
        formName: 'WCS New Kobo Form',
        destination: 'WCS_swm_WCSNewKoboForm'
      }*/
      /*{
        id: 'a9eJJ2hrRSMCJZ95WMc93j',
        formName: 'Consommation Urbaine SWM',
        destination: 'WCS_swm_ConsommationUrbaineSwm'
      }*/
      /*{
        id: 'aDVDagX8TE9NUY7xmvAUpv',
        formName: 'WCS_marche_SwmEtudeMarché2020VendorSales',
        destination: 'WCS_marche_marche',
      },
      // { id: 'a9eJJ2hrRSMCJZ95WMc93j', name: 'WCS_swm_ConsommationUrbaineSwm'},
      {
        id: 'aaayFwZcjbp8gFeYeqohHu',
        formName: '26Nov SWM Marche Test',
        destination: 'WCS_marche_marche',
      },*/
    ].map(survey => ({
      ...survey,
      formId: survey.id,
      url: `https://kf.kobotoolbox.org/api/v2/assets/${survey.id}/data/?format=json`,
      query: `&query={"end":{"$gte":"${state.lastEnd || manualCursor}"}}`,
    })),
  };
  return state;
});

each(dataPath('surveys[*]'), state => {
  const { url, query, tag, formId, formName, destination, owner } = state.data;
  return get(`${url}${query}`, {}, state => {
    state.data.submissions = state.data.results.map(submission => {
      return {
        // Here we append the tags defined above to the Kobo form submission data
        destination,
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

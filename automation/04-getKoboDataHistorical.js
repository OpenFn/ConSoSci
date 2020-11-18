//== Job to be used for fetching data from Kobo for historical, once-off migrations  ==//
// This can be run on-demand at any time by clicking "run" //

alterState(state => {
  console.log(`Started at: ${new Date().toISOString()}`);
  state.submissions = [];
  state.data = {
    surveys: [
      //** Specify new forms to fetch here **//
      // TODO: Add tag options
      //** Tag options:  **//
      // Historical  forms to migrate:
      //Make sure the tag matches the Trigger of the related Job
     // { id: 'ar9wXnLW2sdaamGgJsUrjP', tag: 'bns_survey', name: 'BNS extended Uganda 2020', owner: 'wcs_uganda_carbon'}, // synced Nov16,2020
      
      //******* OPENFN TEST FORMS ******///
      //{ id: 'aijj9FSpuCzMTRnMPGike8', tag: 'nrgt_historical', name: 'NRGT Makira 2017 - Test OpenFn', owner: 'bns' }, // TEST
      
      //****** Ongoing Forms to Rerun ****// 
     
     //******* WCS HISTORICAL FORMS ******///
 
    ].map(survey => ({
      formId: survey.id,
      tag: survey.tag,
      name: survey.name, 
      owner: survey.owner,
      url: `https://kf.kobotoolbox.org/api/v2/assets/${survey.id}/data/?format=json`,
    })),
  };
  console.log(`Fetching data for ${state.data.surveys.length} surveys.`);
  return state;
});

each(dataPath('surveys[*]'), state => {
  const { url, tag, formId, name, owner } = state.data;
  return get(url, {}, state => {
    state.data.submissions = state.data.results.map((submission, i) => {
      return {
        i,
        // Here we append the tags defined above to the Kobo form submission data
        form: tag,
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
  console.log(`Finished at: ${new Date().toISOString()}`);
  return {
    data: {
      message: "No cursor required. Job fetches all submission for given forms."
    },
    references: []
  };
});

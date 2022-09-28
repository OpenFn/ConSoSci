//== Job to be used for fetching data from Kobo on repeated, timer basis  ==//
// This can be run on-demand at any time by clicking "run" //

alterState(state => {
  console.log('Current cursor value:', state.lastEnd);
  // Set a manual cursor if you'd like to only fetch data after this date.
  const manualCursor = '2020-11-20T14:32:43.325+01:00';
  state.data = {
    surveys: [
      //** Specify new forms to fetch here **//
      //** Tag options: bns_survey, bns_price, nrgt_current, nrgt_historical  **//
      //{ id: 'aMpW7wwRBRbtCfidtK2rRn', tag: 'bns_survey', name: 'Form Project Name', owner: 'wcs'},
      { 
        id: 'aXc8nMwPbqrKMDqrBPu4LW', 
        tag: 'bns_survey', 
        name: 'hunter BNS', 
        owner: 'cemogor', 
        instance: 'C. Emogor unpublished data 2022' ,
      }, 
        { 
        id: 'aLJLeHSYsN7DCLQmmYJR8w', 
        tag: 'bns_survey', 
        name: 'BNS EPP Poulet 2022', 
        owner: 'wcs_poultry', 
        instance: 'WCS Congo - Environmental Partnership Program, Livelihood diversification and poultry production - unpublished data 2022' ,
      }, 
      { 
        id: 'aPH34CUc7zGbzeowRALdTu', 
        tag: 'bns_survey', 
        name: 'Basic Necessity Survey Cross River', 
        owner: 'cemogor', 
        instance: 'C. Emogor unpublished data 2020' ,
      }, 
      
       { 
        id: 'aDvmfKGNq6H2yhcMTbP5tB', 
        tag: 'bns_survey', 
        name: 'BNS ménage Kahuzi 2022', 
        owner: 'wcs_mtkb', 
        instance: 'Kahuzi Biega National Park unpublished data 2022' ,
      }, 
      { 
        id: 'aaCTf3buZnjjQDu9wmyACF', 
        tag: 'bns_price', 
        name: 'BNS Prix Kahuzi 2022', 
        owner: 'wcs_mtkb', 
        instance: 'Kahuzi Biega National Park unpublished data 2022' ,
      }, 
      { 
        id: 'aF9PF9YUE5yBVsUvWUr2pV', 
        tag: 'bns_survey', 
        name: 'BNS_Individual_Niassa_2022', 
        owner: 'wcs_niassa', 
        instance: 'Niassa Special Reserve unpublished data 2022' ,
      }, 
      
      { 
        id: 'aZgCs6vmSVdDMmYWoW9hfe', 
        tag: 'bns_price', 
        name: 'BNS_Precos_Niassa_2022', 
        owner: 'wcs_niassa', 
        instance: 'Niassa Special Reserve unpublished data 2022' ,
        
      }, 
      { 
        id: 'aMBGNEH6BzFVjxSZ2zHegc', 
        tag: 'nrgt_current', 
        name: 'NRGT_Niassa_2022', 
        owner: 'wcs_niassa', 
        instance: 'Niassa Special Reserve unpublished data 2022' ,
        
      }, 
      { 
        id: 'aF9PF9YUE5yBVsUvWUr2pV', 
        tag: 'bns_survey', 
        name: 'BNS_Individual_Niassa_2022', 
        owner: 'wcs_niassa', 
        instance: 'WCS Niassa unpublished data 2022' ,
      }, 
      
      { 
        id: 'aKTbms2Fw6fa2XS3rKMwxv', 
        tag: 'bns_price', 
        name: 'BNS Ndoki Prix 2022', 
        owner: 'wcs_ndoki', 
        instance: 'SWM Ndoki unpublished data 2022' ,
        
      }, 


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
  const { url, query, tag, formId, name, owner } = state.data;
  return get(`${url}${query}`, {}, state => {
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
    .filter(s => s)
    .sort()
    .reverse()[0];

  console.log('New cursor value:', lastEnd);
  return { ...state, data: {}, references: [], lastEnd };
});

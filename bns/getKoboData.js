//== Job to be used for fetching data from Kobo on repeated, timer basis  ==//
// This can be run on-demand at any time by clicking "run" //

alterState(state => {
  console.log('Current cursor value:', state.lastEnd);
  // Set a manual cursor if you'd like to only fetch data after this date.
  const manualCursor = '2023-01-01T23:51:45.491+01:00';
  state.data = {
    surveys: [
      //** Specify new forms to fetch here **//
      //** Tag options: bns_survey, bns_price, nrgt_current, nrgt_historical  **//
      //{ id: 'aMpW7wwRBRbtCfidtK2rRn', tag: 'bns_survey', name: 'Form Project Name', owner: 'wcs'},
      { 
        id: 'aLa2L2dNrkhceAsp2AWD4A', 
        tag: 'bns_price', 
        name: 'Prix_BNS_ABS_2022', 
        owner: 'wcs_antongil', 
        instance: 'WCS Madagascar Marine program unpublished data 20222' ,
      }, 
      { 
        id: 'aGT9DSs6zf6q54okHR6UxY', 
        tag: 'bns_survey', 
        name: 'BNS_ABS_2022', 
        owner: 'wcs_antongil', 
        instance: 'WCS Madagascar Marine program unpublished data 2022' ,
      }, 
      { 
        id: 'aSuJPLgRj4vTA8gMmDyKJK', 
        tag: 'bns_price', 
        name: 'Prix_BNS_Ankarea/Ankivony_2022', 
        owner: 'wcs_soariake', 
        instance: 'WCS Madagascar Marine program unpublished data 20222' ,
      }, 
      { 
        id: 'aGKL3jhaGpvfCP7ekPNyr4', 
        tag: 'bns_survey', 
        name: 'BNS_Ankarea/Ankivonjy_2022', 
        owner: 'wcs_soariake', 
        instance: 'WCS Madagascar Marine program unpublished data 2022' ,
      }, 
      { 
        id: 'a4pMJRa3jn264kvVSv3vm7', 
        tag: 'bns_price', 
        name: 'Prix_BNS_Soariake_2022', 
        owner: 'wcs_soariake', 
        instance: 'WCS Madagascar Marine program unpublished data 20222' ,
      }, 
      { 
        id: 'a5MyeTAhZ5WHadabcNVMcU', 
        tag: 'bns_survey', 
        name: 'BNS_Soariake_2022_FINAL', 
        owner: 'wcs_soariake', 
        instance: 'WCS Madagascar Marine program unpublished data 2022' ,
      }, 
      { 
        id: 'aXFnVax8EugC22oRJAnWoV', 
        tag: 'nrgt_current', 
        name: 'NRGT Kahuzi 2022', 
        owner: 'wcs_mtkb', 
        instance: 'A. Twendilonge, F. Kavuba, WCS Kahuzi unpublished data 2022' ,
      }, 
      { 
        id: 'aBfgRPninKvZEtfpMMqchu', 
        tag: 'nrgt_current', 
        name: 'NRGT Ituri 2022', 
        owner: 'wcs_ituri', 
        instance: 'WCS Ituri unpublished data 2022' ,
      }, 
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
        id: 'aAGC9q7nwXPnVLP6bFNAEw', 
        tag: 'bns_survey', 
        name: 'BNS_Individual_Niassa_2023', 
        owner: 'wcs_niassa', 
        instance: 'WCS Niassa unpublished data 2023' ,
      }, 
      
      { 
        id: 'aAKdquWgPSLjzB3UgGBcsW', 
        tag: 'bns_price', 
        name: 'BNS_Precos_Niassa_2023', 
        owner: 'wcs_ndoki', 
        instance: 'WCS Niassa unpublished data 2023' ,
      }, 
     { 
        id: 'a8KBiBL44hEpNfkS4RmxeN', 
        tag: 'nrgt_current', 
        name: 'NRGT_Niassa_2023', 
        owner: 'wcs_niassa', 
        instance: 'WCS Niassa unpublished data 2023' ,
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

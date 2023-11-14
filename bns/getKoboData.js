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

// ONGOING BNS household forms
  { id: 'aK3MS8ATY53KXsKCm7xzpY', tag: 'bns_survey', name: 'BNS Ituri : Enquête Ménages 2023', owner: 'wcs_ituri', instance: 'WCS DRC unpublished data 2023' }, 
  { id: 'aJVZmRRfj442Li5F6r6M8y', tag: 'bns_survey', name: 'BNS ménage Kahuzi 2023', owner: 'wcs_mtkb', instance: 'WCS DRC unpublished data 2023'}, 
  { id: 'a5s3aXxviNV3GhMANSSaGk', tag: 'bns_survey', name: 'BNS ménage Kabobo 2023', owner: 'wcs_pcbk', instance: 'WCS DRC unpublished data 2023'}, 
  { id: 'aAGC9q7nwXPnVLP6bFNAEw', tag: 'bns_survey', name: 'BNS_Individual_Niassa_2023', owner: 'wcs_niassa', instance: 'WCS Niassa unpublished data 2023'}, 
  { id: 'a9SgR3L9Vzn8CC5UPAa2ou', tag: 'bns_survey', name: 'BNS EPP 2e/3e cohortes 2023', owner: 'wcs_poultry', instance: 'WCS Congo unpublished data 2023' },// New landscape: NdokiPeriphery

// ONGOING BNS prices forms
  { id: 'a4oeehbiGuXrEWK7rkUv82', tag: 'bns_price', name: 'BNS Prix Ituri 2023',  owner: 'wcs_ituri', instance: 'WCS DRC unpublished data 2023'  }, 
  { id: 'a3kbAt2freW3q8Ht48V3q2', tag: 'bns_price', name: 'BNS Prix Kahuzi 2023', owner: 'wcs_mtkb', instance: 'WCS DRC unpublished data 2023' }, 
  { id: 'aH2dvuU2G8wiVZQ3k4fiRE', tag: 'bns_price', name: 'BNS Prix Kabobo 2023', owner: 'wcs_pcbk', instance: 'WCS DRC unpublished data 2023'}, 
  { id: 'aAKdquWgPSLjzB3UgGBcsW', tag: 'bns_price', name: 'BNS_Precos_Niassa_2023', owner: 'wcs_niassa', instance: 'WCS Niassa unpublished data 2023'},  
      
// ONGOING NRGT forms
  { id: 'a33XvMuPQLpeygLURuNUBP', tag: 'nrgt_current', name: 'NRGT SWM 2023', owner: 'wcs_ndoki', instance: 'WCS Congo unpublished data 2023' }, 
  { id: 'aqDKwe8AD3ykFeNEDuLSnv', tag: 'nrgt_current', name: 'Nosy Be NRGT 2023', owner: 'wcs_library', instance: 'WCS Madagascar unpublished data 2023' }, 
  { id: 'a8KBiBL44hEpNfkS4RmxeN', tag: 'nrgt_current', name: 'NRGT_Niassa_2023', owner: 'wcs_niassa', instance: 'WCS Niassa unpublished data 2023'}, 

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

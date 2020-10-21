//== Job to be used for fetching data from Kobo for historical, once-off migrations  ==//
// This can be run on-demand at any time by clicking "run" //

alterState(state => {
  console.log(`Started at: ${new Date().toISOString()}`);
  state.submissions = [];
  state.data = {
    surveys: [
      //** Specify new forms to fetch here **//
      //** Tag options: bns_survey, bns_price, nrgt_current, nrgt_historical  **//
      // Historical  forms to migrate:
      //Make sure the tag matches the Trigger of the related Job
      { id: 'aijj9FSpuCzMTRnMPGike8', tag: 'nrgt_historical', name: 'NRGT Makira 2017 - Test OpenFn', owner: 'bns' }, // ✓
      // { id: 'av4hQ37rMgwFoh9ogjeyKh', tag: 'nrgt_current', name: 'NRGT 2019 - Test OpenFn', owner: 'bns' }, // ✓
      // { id: 'azrSYMFpj3M8jdFkApT3o6/', tag: 'bns_price', name: 'BNS Prix Ndoki 2019 - Test OpenFn', owner: 'bns' }, // ✓
      // { id: 'aMpW7wwRBRbtCfidtK2rRn', tag: 'bns_survey', name: 'BNS Ndoki 2019 - OpenFn Test', owner: 'bns' }, // ✓
      // { id: 'atyo55YdBdfxzXiaBdrbvr', tag: 'bns_survey', name: 'BNS Ndoki 2020', owner: 'wcs_ndoki' }, // ✓
      // { id: 'aTRKQW2b8TJGxF7DVPfjFv', tag: 'bns_price', name: 'BNS Ndoki Prix 2020', owner: 'wcs_ndoki' }, // ✓
      // { id: 'ad7S4hPBN7qM4Ac3mpEdwZ', tag: 'bns_survey', name: 'BNS_Nosy Be_2020', owner: 'wcs_soariake' }, // ✓ changed by j
      // { id: 'amD3cUsR4Jurj3ZSUyQdBH', tag: 'bns_survey', name: 'BNS Crossriver 2017', owner: 'wcs_crossriver' }, // ✓
      // { id: 'a2m5Hp4BoN956CBxfKHdJY', tag: 'bns_survey', name: 'BNS Ituri: Enquête Ménages 2017', owner: 'wcs_ituri' }, // ✓
      // { id: 'aFQWAYHXXfh8i2cmXw9BFi', tag: 'bns_survey', name: 'BNS Ituri: Enquête Ménages 2019', owner: 'wcs_ituri' }, // ✓
      // { id: 'auqBASwJMLvkqtAJnZ8SXx', tag: 'bns_survey', name: 'BNS Lac Télé 2017', owner: 'wcs_lactele' }, // ✓
      // { id: 'a9R68Er4oeDx6quZre2DM7', tag: 'bns_survey', name: 'BNS Makira 2017', owner: 'wcs_mamabaie' }, // ✓
      // { id: 'arJkDGmkhhCiJ2eYwRcCit', tag: 'bns_survey', name: 'BNS Makira 2019', owner: 'wcs_mamabaie' }, // ✓
      // { id: 'aEypYtcfNGvDtpkSUPXrJN', tag: 'bns_survey', name: 'BNS Ménage Kahuzi 2017', owner: 'wcs_mtkb' }, // ✓
      // { id: 'aCShrrKNApccvaAPzxzbxK', tag: 'bns_survey', name: 'NRGT 2019 - Test OpenFn', owner: 'wcs_mtkb' }, // ✓
      // { id: 'aQbjGLfvPTEUjdTmsdTu46', tag: 'bns_survey', name: 'NRGT 2019 - Test OpenFn', owner: 'bns' }, // ✓
      // { id: 'ahz5DN45juUzp7eUfGS5QA', tag: 'bns_survey', name: 'NRGT 2019 - Test OpenFn', owner: 'bns' }, // ✓
      // { id: 'a6BjZ8ncLtTtfBSGZ9PqoJ', tag: 'bns_price', name: 'NRGT 2019 - Test OpenFn', owner: 'bns' }, // ✓
      // { id: 'awQmCEf63g5KN2G4kcBWrc', tag: 'bns_price', name: 'NRGT 2019 - Test OpenFn', owner: 'bns' }, // ✓
      // { id: 'apMTFWRd9fQWHvpJHLfvk6', tag: 'bns_price', name: 'NRGT 2019 - Test OpenFn', owner: 'bns' }, // ✓
      // { id: 'ao52kp6BgLgooE3MRsdy4B', tag: 'bns_price', name: 'NRGT 2019 - Test OpenFn', owner: 'bns' }, // ✓
      // { id: 'aq5r9cKQYBRDT9SBqYanUP', tag: 'bns_price', name: 'NRGT 2019 - Test OpenFn', owner: 'bns' }, // ✓
      // { id: 'auPGpyWbn4PhTuWFBfKYES', tag: 'bns_survey', name: 'NRGT 2019 - Test OpenFn', owner: 'bns' }, // ✓
      // { id: 'azepksQ62i8vETEzUfz8jj', tag: 'bns_survey', name: 'NRGT 2019 - Test OpenFn', owner: 'bns' }, // ✓
      // { id: 'acK4WZ2ueqk8NvUdwctxz8', tag: 'bns_survey', name: 'NRGT 2019 - Test OpenFn', owner: 'bns' }, // ✓
      // { id: 'apnzrb2RuoKu8Uxy2svwF6', tag: 'nrgt_historical', name: 'NRGT 2019 - Test OpenFn', owner: 'bns' }, // ✓
      // { id: 'aeWW3VLbdMDgUHHdoRCUH9', tag: 'nrgt_historical', name: 'NRGT 2019 - Test OpenFn', owner: 'bns' }, // ✓
      // { id: 'aZZV4KikgRKz79LqqQR5Ma', tag: 'nrgt_historical', name: 'NRGT 2019 - Test OpenFn', owner: 'bns' }, // ✓
      // { id: 'apFFEwXk38TQ2SCkV99bFY', tag: 'nrgt_historical', name: 'NRGT 2019 - Test OpenFn', owner: 'bns' }, // ✓
      // { id: 'anAcQ9on4inNnmtqFVpabh', tag: 'nrgt_historical', name: 'NRGT 2019 - Test OpenFn', owner: 'bns' }, // ✓
      // { id: 'aU6gbhMjfHyGekAma8wHhG', tag: 'nrgt_historical', name: 'NRGT 2019 - Test OpenFn', owner: 'bns' }, // ✓
      // { id: 'asRbCJuyX3KJMFkB2p9Hh7', tag: 'nrgt_historical', name: 'NRGT 2019 - Test OpenFn', owner: 'bns' }, // ✓
      // { id: 'ajDeQVDrz2AZxvxLLWjiBE', tag: 'nrgt_current' },, name: 'NRGT 2019 - Test OpenFn', owner: 'bns' // ✓
      // { id: 'aLhFXhkmM4rZJvtqiSjChE', tag: 'nrgt_historical', name: 'NRGT 2019 - Test OpenFn', owner: 'bns' }, // ✓
      // { id: 'aTkDkjcfNN7vQJdZeJHkJq', tag: 'bns_survey', name: 'NRGT 2019 - Test OpenFn', owner: 'bns' }, // ✓
      // { id: 'awAV28ebngN7GTV2nqmyKU', tag: 'bns_survey', name: 'NRGT 2019 - Test OpenFn', owner: 'bns' }, // ✓
      // { id: 'aqwNyk7ikXxU9x4u77YfnS', tag: 'bns_survey', name: 'NRGT 2019 - Test OpenFn', owner: 'bns' }, // ✓
      // { id: 'aiRKYSPhXEhzkLtjPQbD9x', tag: 'bns_survey', name: 'NRGT 2019 - Test OpenFn', owner: 'bns' }, // ✓
      // { id: 'aJZxvpgS73vJu4NUxTtvwJ', tag: 'bns_survey', name: 'NRGT 2019 - Test OpenFn', owner: 'bns' }, // ✓
      // { id: 'a2bwTreEbymbWD3JGJ2qXT', tag: 'bns_survey', name: 'NRGT 2019 - Test OpenFn', owner: 'bns' }, // ✓
      // { id: 'aj67aaDZa52oLBFPVGWWwu', tag: 'bns_survey', name: 'NRGT 2019 - Test OpenFn', owner: 'bns' }, // ✓
      // { id: 'av3SpGmYTBP9A6dLMbzhZR', tag: 'bns_survey', name: 'NRGT 2019 - Test OpenFn', owner: 'bns' }, // ✓
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
  return state;
});

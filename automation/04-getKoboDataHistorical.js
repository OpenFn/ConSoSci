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
     //  { id: 'atyo55YdBdfxzXiaBdrbvr', tag: 'bns_survey', name: 'BNS Ndoki 2020', owner: 'atyo55YdBdfxzXiaBdrbvr' },
     //  { id: 'aTRKQW2b8TJGxF7DVPfjFv', tag: 'bns_price', name: 'BNS Ndoki Prix 2020', owner: 'aTRKQW2b8TJGxF7DVPfjFv' },
     //  { id: 'ad7S4hPBN7qM4Ac3mpEdwZ', tag: 'bns_survey', name: 'BNS_Nosy Be_2020', owner: 'ad7S4hPBN7qM4Ac3mpEdwZ' },
     //  { id: 'amD3cUsR4Jurj3ZSUyQdBH', tag: 'bns_survey', name: 'BNS Crossriver 2017', owner: 'amD3cUsR4Jurj3ZSUyQdBH' },
     //  { id: 'a2m5Hp4BoN956CBxfKHdJY', tag: 'bns_survey', name: 'BNS Ituri: Enquête Ménages 2017', owner: 'a2m5Hp4BoN956CBxfKHdJY' },
     //  { id: 'aFQWAYHXXfh8i2cmXw9BFi', tag: 'bns_survey', name: 'BNS Ituri: Enquête Ménages 2019', owner: 'aFQWAYHXXfh8i2cmXw9BFi' },
     //  { id: 'auqBASwJMLvkqtAJnZ8SXx', tag: 'bns_survey', name: 'BNS Lac Télé 2017', owner: 'auqBASwJMLvkqtAJnZ8SXx' },
     //  { id: 'a9R68Er4oeDx6quZre2DM7', tag: 'bns_survey', name: 'BNS Makira 2017', owner: 'a9R68Er4oeDx6quZre2DM7' },
       { id: 'arJkDGmkhhCiJ2eYwRcCit', tag: 'bns_survey', name: 'BNS Makira 2019', owner: 'arJkDGmkhhCiJ2eYwRcCit' },
       { id: 'aEypYtcfNGvDtpkSUPXrJN', tag: 'bns_survey', name: 'BNS Ménage Kahuzi 2017', owner: 'aEypYtcfNGvDtpkSUPXrJN' },
       { id: 'aCShrrKNApccvaAPzxzbxK', tag: 'bns_survey', name: 'BNS ménage Kahuzi 2019', owner: 'aCShrrKNApccvaAPzxzbxK' },
       { id: 'aQbjGLfvPTEUjdTmsdTu46', tag: 'bns_survey', name: 'BNS Ndoki 2018', owner: 'aQbjGLfvPTEUjdTmsdTu46' },
      // { id: 'ahz5DN45juUzp7eUfGS5QA', tag: 'bns_survey', name: 'BNS Ndoki 2019', owner: 'ahz5DN45juUzp7eUfGS5QA' },
      // { id: 'a6BjZ8ncLtTtfBSGZ9PqoJ', tag: 'bns_price', name: 'BNS Prix Ituri 2017', owner: 'a6BjZ8ncLtTtfBSGZ9PqoJ' },
      // { id: 'awQmCEf63g5KN2G4kcBWrc', tag: 'bns_price', name: 'BNS Prix Ituri 2019', owner: 'awQmCEf63g5KN2G4kcBWrc' },
      // { id: 'apMTFWRd9fQWHvpJHLfvk6', tag: 'bns_price', name: 'BNS Prix Lac Télé 2017', owner: 'apMTFWRd9fQWHvpJHLfvk6' },
      // { id: 'ao52kp6BgLgooE3MRsdy4B', tag: 'bns_price', name: 'BNS Prix Ndoki 2018', owner: 'ao52kp6BgLgooE3MRsdy4B' },
      // { id: 'aq5r9cKQYBRDT9SBqYanUP', tag: 'bns_price', name: 'BNS Prix Ndoki 2019', owner: 'aq5r9cKQYBRDT9SBqYanUP' },
      // { id: 'auPGpyWbn4PhTuWFBfKYES', tag: 'bns_survey', name: 'BNS_ABS_2019_FINAL', owner: 'auPGpyWbn4PhTuWFBfKYES' },
      // { id: 'azepksQ62i8vETEzUfz8jj', tag: 'bns_survey', name: 'BNS_Ankarea/Ankivonjy_2019', owner: 'azepksQ62i8vETEzUfz8jj' },
      // { id: 'acK4WZ2ueqk8NvUdwctxz8', tag: 'bns_survey', name: 'BNS_Soariake_2019', owner: 'acK4WZ2ueqk8NvUdwctxz8' },
      // { id: 'apnzrb2RuoKu8Uxy2svwF6', tag: 'nrgt_historical', name: 'NRGT Crossriver 2017', owner: 'apnzrb2RuoKu8Uxy2svwF6' },
      // { id: 'aeWW3VLbdMDgUHHdoRCUH9', tag: 'nrgt_historical', name: 'NRGT Ituri 2017', owner: 'aeWW3VLbdMDgUHHdoRCUH9' },
      // { id: 'aZZV4KikgRKz79LqqQR5Ma', tag: 'nrgt_historical', name: 'NRGT Ituri 2019', owner: 'aZZV4KikgRKz79LqqQR5Ma' },
      // { id: 'apFFEwXk38TQ2SCkV99bFY', tag: 'nrgt_historical', name: 'NRGT Kahuzi Biega 2018', owner: 'apFFEwXk38TQ2SCkV99bFY' },
      // { id: 'anAcQ9on4inNnmtqFVpabh', tag: 'nrgt_historical', name: 'NRGT Kahuzi Biega 2019', owner: 'anAcQ9on4inNnmtqFVpabh' },
      // { id: 'aU6gbhMjfHyGekAma8wHhG', tag: 'nrgt_historical', name: 'NRGT Lac Télé 2017', owner: 'aU6gbhMjfHyGekAma8wHhG' },
      // { id: 'asRbCJuyX3KJMFkB2p9Hh7', tag: 'nrgt_historical', name: 'NRGT Makira 2017', owner: 'asRbCJuyX3KJMFkB2p9Hh7' },
      // { id: 'ajDeQVDrz2AZxvxLLWjiBE', tag: 'nrgt_current', name: 'NRGT Makira 2019', owner: 'ajDeQVDrz2AZxvxLLWjiBE' },
      // { id: 'aLhFXhkmM4rZJvtqiSjChE', tag: 'nrgt_historical', name: 'NRGT Ndoki 2018', owner: 'aLhFXhkmM4rZJvtqiSjChE' },
      // { id: 'aTkDkjcfNN7vQJdZeJHkJq', tag: 'bns_price', name: 'Price Makira 2017', owner: 'aTkDkjcfNN7vQJdZeJHkJq' },
      // { id: 'awAV28ebngN7GTV2nqmyKU', tag: 'bns_price', name: 'Price Makira 2019', owner: 'awAV28ebngN7GTV2nqmyKU' },
      // { id: 'aqwNyk7ikXxU9x4u77YfnS', tag: 'bns_price', name: 'Prices Crossriver 2017 ', owner: 'aqwNyk7ikXxU9x4u77YfnS' },
      // { id: 'aiRKYSPhXEhzkLtjPQbD9x', tag: 'bns_price', name: 'Prices MTKB 2017', owner: 'aiRKYSPhXEhzkLtjPQbD9x' },
     //  { id: 'aJZxvpgS73vJu4NUxTtvwJ', tag: 'bns_price', name: 'Prix_BNS_ABS_2019', owner: 'aJZxvpgS73vJu4NUxTtvwJ' },
     //  { id: 'a2bwTreEbymbWD3JGJ2qXT', tag: 'bns_price', name: 'Prix_BNS_Ankarea/Ankivony_2019', owner: 'a2bwTreEbymbWD3JGJ2qXT' },
      // { id: 'aj67aaDZa52oLBFPVGWWwu', tag: 'bns_price', name: 'Prix_BNS_Nosy Be_2020', owner: 'aj67aaDZa52oLBFPVGWWwu' },
     //  { id: 'av3SpGmYTBP9A6dLMbzhZR', tag: 'bns_price', name: 'Prix_BNS_Soariake_2019', owner: 'av3SpGmYTBP9A6dLMbzhZR' },
 
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

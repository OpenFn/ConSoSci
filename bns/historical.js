//== Job to be used for fetching data from Kobo for historical, once-off migrations  ==//
// This can be run on-demand at any time by clicking "run" //

alterState(state => {
  console.log(`Started at: ${new Date().toISOString()}`);
  state.submissions = [];
  state.data = {
    surveys: [
      //Tag options: nrgt_2017, nrgt_2019, bns_2019, bns_price_2019
      //Form Id, Tag of test OpenFN BNS Survey form
      // Historical  forms to migrate:
      //Make sure the tag matches the Trigger of the related Job
      // { id: 'aijj9FSpuCzMTRnMPGike8', tag: 'nrgt_2017' }, // ✓
      // { id: 'av4hQ37rMgwFoh9ogjeyKh', tag: 'nrgt_2019' }, // ✓
      // { id: 'azrSYMFpj3M8jdFkApT3o6/', tag: 'bns_price_2019' }, // ✓
      // { id: 'aMpW7wwRBRbtCfidtK2rRn', tag: 'bns_2019' }, // ✓
      // { id: 'atyo55YdBdfxzXiaBdrbvr', tag: 'bns_2019' }, // ✓
      // { id: 'aTRKQW2b8TJGxF7DVPfjFv', tag: 'bns_price_2019' }, // ✓
      // { id: 'ad7S4hPBN7qM4Ac3mpEdwZ', tag: 'bns_price_2019' }, // This isn't bns_price_2019?
      // { id: 'amD3cUsR4Jurj3ZSUyQdBH', tag: 'bns_2019' }, // ✓
      // { id: 'a2m5Hp4BoN956CBxfKHdJY', tag: 'bns_2019' }, // ✓
      // NOTE: The above have been finished. ===================================
      // { id: 'aFQWAYHXXfh8i2cmXw9BFi', tag: 'bns_2019' },
      // { id: 'auqBASwJMLvkqtAJnZ8SXx', tag: 'bns_2019' },
      // { id: 'a9R68Er4oeDx6quZre2DM7', tag: 'bns_2019' },
      // { id: 'arJkDGmkhhCiJ2eYwRcCit', tag: 'bns_2019' },
      // { id: 'aEypYtcfNGvDtpkSUPXrJN', tag: 'bns_2019' },
      // { id: 'aCShrrKNApccvaAPzxzbxK', tag: 'bns_2019' },
      // { id: 'aQbjGLfvPTEUjdTmsdTu46', tag: 'bns_2019' },
      // { id: 'ahz5DN45juUzp7eUfGS5QA', tag: 'bns_2019' },
      // { id: 'a6BjZ8ncLtTtfBSGZ9PqoJ', tag: 'bns_price_2019' }, // ✓
      // { id: 'awQmCEf63g5KN2G4kcBWrc', tag: 'bns_price_2019' }, // ✓
      // { id: 'apMTFWRd9fQWHvpJHLfvk6', tag: 'bns_price_2019' }, // ✓
      // { id: 'ao52kp6BgLgooE3MRsdy4B', tag: 'bns_price_2019' }, // ✓
      // { id: 'aq5r9cKQYBRDT9SBqYanUP', tag: 'bns_price_2019' }, // ✓
      // { id: 'auPGpyWbn4PhTuWFBfKYES', tag: 'bns_2019' },
      // { id: 'azepksQ62i8vETEzUfz8jj', tag: 'bns_2019' },
      // { id: 'acK4WZ2ueqk8NvUdwctxz8', tag: 'bns_2019' },
      // { id: 'apnzrb2RuoKu8Uxy2svwF6', tag: 'nrgt_2017' }, // ✓
      // { id: 'aeWW3VLbdMDgUHHdoRCUH9', tag: 'nrgt_2017' }, // ✓
      // { id: 'aZZV4KikgRKz79LqqQR5Ma', tag: 'nrgt_2017' }, // ✓
      // { id: 'apFFEwXk38TQ2SCkV99bFY', tag: 'nrgt_2017' }, // ✓
      // { id: 'anAcQ9on4inNnmtqFVpabh', tag: 'nrgt_2017' }, // ✓
      // { id: 'aU6gbhMjfHyGekAma8wHhG', tag: 'nrgt_2017' }, // ✓
      // { id: 'asRbCJuyX3KJMFkB2p9Hh7', tag: 'nrgt_2017' }, // ✓
      // { id: 'ajDeQVDrz2AZxvxLLWjiBE', tag: 'nrgt_2019' }, // ✓
      // NOTE: The below have been finished. ===================================
      // { id: 'aLhFXhkmM4rZJvtqiSjChE', tag: 'nrgt_2017' }, // ✓
      // { id: 'aTkDkjcfNN7vQJdZeJHkJq', tag: 'bns_price_2019' }, // ✓
      // { id: 'awAV28ebngN7GTV2nqmyKU', tag: 'bns_price_2019' }, // ✓
      // { id: 'aqwNyk7ikXxU9x4u77YfnS', tag: 'bns_price_2019' }, // ✓
      // { id: 'aiRKYSPhXEhzkLtjPQbD9x', tag: 'bns_price_2019' }, // ✓
      // { id: 'aJZxvpgS73vJu4NUxTtvwJ', tag: 'bns_price_2019' }, // ✓
      // { id: 'a2bwTreEbymbWD3JGJ2qXT', tag: 'bns_price_2019' }, // ✓
      // { id: 'aj67aaDZa52oLBFPVGWWwu', tag: 'bns_price_2019' }, // ✓
      // { id: 'av3SpGmYTBP9A6dLMbzhZR', tag: 'bns_price_2019' }, // ✓
    ].map(survey => ({
      formId: survey.id,
      tag: survey.tag,
      url: `https://kf.kobotoolbox.org/api/v2/assets/${survey.id}/data/?format=json`,
    })),
  };
  console.log(`Fetching data for ${state.data.surveys.length} surveys.`);
  return state;
});

each(dataPath('surveys[*]'), state => {
  const { url, tag, formId } = state.data;
  return get(url, {}, state => {
    state.data.submissions = state.data.results.map((submission, i) => {
      return {
        i,
        // Here we append the tags defined above to the Kobo form submission data
        form: tag,
        body: submission,
      };
    });
    const count = state.data.submissions.length;
    console.log(`Fetched ${count} submissions from ${formId} (${tag}).`);
    //Once we fetch the data, we want to post each individual Kobo survey
    //back to the OpenFn inbox to run through the jobs =========================
    // return state;
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

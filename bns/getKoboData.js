//== Job to be used for fetching data from Kobo on repeated, timer basis  ==//
// This can be run on-demand at any time by clicking "run" //
getValues(
  '1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY',
  'wcs-bns-DEPLOYED!A:L',
  state => {
    const [headers, ...values] = state.data.values;

    const mapHeaderToValue = value => {
      return headers.reduce((obj, header) => {
        obj[header] = value[headers.indexOf(header)];
        return obj;
      }, {});
    };

    state.sheetsData = values
      .filter(
        item =>
          item.includes('TRUE') 
          //&& item.includes('bns_survey', 'nrgt_current') 
      )
      .map(item => mapHeaderToValue(item));

    return state;
  }
);

fn(state => {
  const { sheetsData } = state;

  console.log('Current cursor value:', state.lastEnd);
  // Set a manual cursor if you'd like to only fetch data after this date.
  const manualCursor = '2023-01-01T23:51:45.491+01:00';

  const formsList = sheetsData.map(survey => ({
      formId: survey.uid,
      tag: survey.tag,
      name: survey.name 
  })); 

  console.log('Active forms to sync:: ', JSON.stringify(formsList, null, 2)); 

  state.data = {
    surveys: sheetsData.map(survey => ({
      formId: survey.uid,
      tag: survey.tag,
      name: survey.name,
      owner: survey.owner,
      url: `https://kf.kobotoolbox.org/api/v2/assets/${survey.uid}/data/?format=json`,
      query: `&query={"end":{"$gte":"${state.lastEnd || manualCursor}"}}`,
    })),
  };
  return state;
});

each(dataPath('surveys[*]'), state => {
  const { url, query, tag, formId, name, owner } = state.data;
  return http.get(`${url}${query}`, {}, state => {
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
      return http.post(state.configuration.openfnInboxUrl, {
        body: state => state.data,
      })(state);
    })(state);
    // =========================================================================
  })(state);
});

fn(state => {
  const lastEnd = state.references
    .filter(item => item.body)
    .map(s => s.body.end)
    .filter(s => s)
    .sort()
    .reverse()[0];

  console.log('New cursor value:', lastEnd);
  return { ...state, data: {}, references: [], lastEnd };
});

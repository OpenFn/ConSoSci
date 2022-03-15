//== Job to be used for fetching Sharks & Rays data from Kobo on repeated, timer basis  ==//
// This can be run on-demand at any time by clicking "run" //

alterState(state => {
  console.log('Current cursor value:', state.lastEnd);

  // IF YOU CLEAR STATE...
  // Set this manual cursor to the earliest submission date you want fetch.
  const manualCursor = '2021-01-21T05:32:43.325+01:00';
  //const manualCursor = '2017-05-01T14:32:43.325+01:00';
  state.data = {
    surveys: [

      //==== Tanzania Sharks & Rays ===============//
    {
        uid: 'aaknL3DQQgkgZ8iay89X5P',
        formName: 'SHARC',
        tableId: 'WCSPROGRAMS_SharksRaysV2',
      },
    
    //==== Kenya  Sharks & Rays ===============//
    {
      uid: 'awjdb6AEFF5WgN3bYVNbof',
      formName: 'Sharks_Rays_20220110_Kenya',
      tableId: 'WCSPROGRAMS_SharksRays',
    },

    //==== Madagascar Sharks & Rays ===============//
    {
      uid: 'aCp2CojjXBoazzhweWrRUr',
      formName: 'Sharks_Rays_20210920_Mada',
      tableId: 'WCSPROGRAMS_SharksRays',
    },
    {
      uid: 'aSDqbJNRcEkvgKHJSMK2z7',
      formName: 'Sharks_Rays_20220111_Mada',
      tableId: 'WCSPROGRAMS_SharksRays',
    },

    //==== Mozambique Sharks & Rays ===============//
    {
      uid: 'aFjJFy7fByoPQ4btGXxf4X',
      formName: 'Moz_Sharks_Rays',
      tableId: 'WCSPROGRAMS_SharksRays',
    },
    {
      uid: 'apvnF2HXfGwJE8akDcgQzT',
      formName: 'Moz_Sharks_Rays_20220225',
      tableId: 'WCSPROGRAMS_SharksRays',
    },

    //========================//
    ].map(survey => ({
      ...survey,
      formId: survey.uid,
      url: `https://kf.kobotoolbox.org/api/v2/assets/${survey.uid}/data/?format=json`,
      query: `&query={"_submission_time":{"$gte":"${
        state.lastEnd || manualCursor
      }"}}`,
    })),
  };
  return state;
});

each(dataPath('surveys[*]'), state => {
  const { url, query, tag, formId, formType, formName, tableId, owner } = state.data;
  return get(`${url}${query}`, {}, state => {
    state.data.submissions = state.data.results.map(submission => {
      return {
        // Here we append the tags defined above to the Kobo form submission data
        tableId,
        formName,
        formOwner: owner,
        formType,
        body: submission,
      };
    });
    const count = state.data.submissions.length;
    console.log(`Fetched ${count} submissions from ${formName} (${tableId}).`);
    //Once we fetch the data, we want to post each individual Kobo survey
    //back to the OpenFn inbox to run through the jobs =========================
    return each(dataPath('submissions[*]'), state => {
      console.log(`Posting 1 of ${count}...`);
      return post(state.configuration.openfnInboxUrl, {
        body: state => state.data,
      })(state);
    })(state);
    // =========================================================================
  })(state);
});

alterState(state => {
  let lastEnd = state.references
    .filter(item => item.body)
    .map(s => s.body.end)
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  lastEnd = new Date(lastEnd) > new Date() ? lastEnd : new Date().toISOString();

  console.log('New cursor value:', lastEnd);
  return { ...state, data: {}, references: [], lastEnd };
});

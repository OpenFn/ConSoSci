fn(state => {
  console.log('Current cursor value:', state.lastEnd);

  // IF YOU CLEAR STATE...
  // Set this manual cursor to the earliest submission date you want fetch.
  const manualCursor = '2022-04-10T14:32:43.325+01:00';
  state.data = {
    surveys: [
    //==== GRIEVENCES FORM ===============//
     {
       uid: 'aEQjRDMcEgLzRDQYcFqSCC',
       formName: 'SSMT GRM Intake Form Template', //Kobo form name
       projectid: '1201382240883590' //Asana project ID obtained from the Fetch Asana ID job.
     },
    // {
    //   uid: 'aEQjRDMcEgLzRDQYcFqSCC',
    //   formName: 'SSMT GRM Intake Form Template', //Kobo form name
    //   projectid: '1201871867457230' // Asana project ID: Indonesia GRM
    // },
     //==== OTHER FORMS ===============//
    // {
    //   uid: 'kobo-id',
    //   formName: 'Form Name', //Kobo form name
    //   projectid: 'asana-id-from-url' //Asana project ID
    // },
    //================================//
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
  const { url, query, tag, formId, formType, formName, owner, projectid } = state.data;
  return get(`${url}${query}`, {}, state => {
    state.data.submissions = state.data.results.map(submission => {
      return {
        // Here we append the tags defined above to the Kobo form submission data
        projectid,
        formName,
        formOwner: owner,
        formType,
        body: submission,
      };
    });
    const count = state.data.submissions.length;
    console.log(`Fetched ${count} submissions from ${formName}.`);
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

fn(state => {
  let lastEnd = state.references
    .filter(item => item.body)
    .map(s => s.body.end)
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  lastEnd = new Date(lastEnd) > new Date() ? lastEnd : new Date().toISOString();

  console.log('New cursor value:', lastEnd);
  return { ...state, data: {}, references: [], lastEnd };
});
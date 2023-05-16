fn(state => {
  console.log('Current cursor value:', state.lastEnd);

  // IF YOU CLEAR STATE...
  // Set this manual cursor to the earliest submission date you want fetch.
  const manualCursor = '2023-04-11T11:01:18.729Z';
  state.data = {
    surveys: [
    //==== KOBO FORMS ===============//
     {
       uid: 'kobo-form-id', // E.g., 'aYnnCn9Pi4m8M7Fakihs381' from Kobo form id 
       formName: 'Kobo-form-Name', // E.g., 'Mozambique Grievances
       projectid: 'Asana-Proj-ID' // E.g., '1344128806220991' from Asana Project URL
     },
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

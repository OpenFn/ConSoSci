// Here we fetch submissions for all "Deployed" forms in GoogleSheet
// NOTE: See linked job "[BNS-1A] 1.Get FormsList (Ongoing)" for cursor & GoogleSheet query logic
//**********************************************************//

fn(state => {
  state.surveySubmissions = [];
  state.errors = [];
  state.count = 0
  console.log('surveys ::', JSON.stringify(state.data.surveys, null, 2));
  return state;
});

each('$.data.surveys[*]', state => {
  const { url, query, tag, formId, name, owner } = state.data;
  console.log('Sending GET to ::', `${url}${query}`);

  return get(`${url}${query}`, {}, state => {
    const results = state.data.results.map((submission, i) => {
      return {
        i,
        // Here we append the tags defined above to the Kobo form submission data
        form: tag,
        formName: name,
        formOwner: owner,
        body: submission,
      };
    });

    state.surveySubmissions.push(...results);
    const count = results.length;
    console.log(`Fetched ${count} submissions from ${formId} (${tag}).`);
    //Once we fetch the data, we want to post each individual Kobo survey
    //back to the OpenFn inbox to run through the jobs =========================
  })(state)
    .then(() => {
      return state;
    })
    .catch(err => {
      state.errors = state.errors || [];
      state.errors.push({
        formId,
        message: err.message,
      });
      console.log(`Error fetching submissions from  ${formId}::`, err.message);
      return state;
    });
});

each(
  '$.surveySubmissions[*]',
  post(state => state.configuration.openfnInboxUrl, {
    body: state => {
      const count = state.surveySubmissions.length;
      console.log(`Posting ${state.count} of ${count}...`);
      state.count = state.count++      
      return state.data;
    },
  })
);

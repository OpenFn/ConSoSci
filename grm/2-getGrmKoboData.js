// Here we fetch submissions for all deployed "GRM" forms in GoogleSheet
// NOTE: See linked job "[GRM-1A] 1.Get FormsList (Ongoing)" for cursor & GoogleSheet query logic
//**********************************************************//
each(dataPath('surveys[*]'), state => {
  const { url, query, tag, formId, formType, formName, owner, projectid } =
    state.data;
  return get(`${url}${query}`, {}, state => {
    state.data.submissions = state.data.results.map(submission => {
      //console.log('Submissions ');
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
      console.log(`Submission with uuid ${state.data.body._id}`);
      if (!state.data) {
        if (!state.emptySubmissions[formId]) {
          state.emptySubmissions[formId] = [state.data];
        }
        state.emptySubmissions[formId].push(state.data);
      }
      return post(state.configuration.openfnInboxUrl, {
        body: state => state.data,
      })(state);
    })(state);
    // =========================================================================
  })(state);
});

// Throw an error for empty submissions
fn(state => {
  const forms = Object.keys(state.emptySubmissions);
  const formSubmission = id => state.emptySubmissions[id];

  if (!forms.length > 0) return state;

  forms.forEach(id => {
    console.warn(
      `OpenFn sent ${
        formSubmission(id).length
      } empty message to the inbox for ${id}`
    );
  });

  throw new Error(
    'Please troubleshoot why this happened. No data will be sent to Asana for these records.'
  );
});

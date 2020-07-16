//== Job to be used for historical, once-off migrations  ==//
// This can be run on-demand at any time by clicking "run" //

//NOTE: This job is currently configured to support BNS historical migration, but another version is in development to
//support other survey types. Please test migrating historical BNS forms for now.
alterState(state => {
  state.data.surveys = [
    { id: 'aMpW7wwRBRbtCfidtK2rRn', tag: 'bns_2019' }, //Form Id of test OpenFN BNS Survey form
    // Historical BNS forms to migrate:
    // { id: 'ad7S4hPBN7qM4Ac3mpEdwZ', tag: 'foo' },
    // { id: 'amD3cUsR4Jurj3ZSUyQdBH', tag: 'foo' },
    // { id: 'a2m5Hp4BoN956CBxfKHdJY', tag: 'foo' },
    // { id: 'aFQWAYHXXfh8i2cmXw9BFi', tag: 'foo' },
    // { id: 'auqBASwJMLvkqtAJnZ8SXx', tag: 'foo' },
    // { id: 'a9R68Er4oeDx6quZre2DM7', tag: 'foo' },
    // { id: 'arJkDGmkhhCiJ2eYwRcCit', tag: 'foo' },
    // { id: 'aEypYtcfNGvDtpkSUPXrJN', tag: 'foo' },
    // { id: 'aCShrrKNApccvaAPzxzbxK', tag: 'foo' },
    // { id: 'aQbjGLfvPTEUjdTmsdTu46', tag: 'foo' },
    // { id: 'ahz5DN45juUzp7eUfGS5QA', tag: 'foo' },
    // Add more ids and tags to this list to perform more daily syncs.
  ].map(survey => ({
    formId: survey.id,
    tag: survey.tag,
    url: `https://kf.kobotoolbox.org/api/v2/assets/${survey.id}/data/?format=json`,
  }));
  return state;
});

each(dataPath('surveys[*]'), state =>
  get(state.data.url, {}, state => {
    state.data.submissions = state.data.results.map(submission => ({
      //Here we add form name tag to trigger the other jobs
      //Because bns survey.js job trigger is currently configured to run
      //for any survey with this {form: 'bns_2019'} tag.
      form: lastReferenceValue('tag')(state),
      body: submission,
    }));
    console.log(`Fetched ${state.data.count} submissions.`);
    //Once we fetch the data, we want to post each individual survey
    //back to the OpenFn inbox to run through the jobs
    return each(
      dataPath('submissions[*]'),
      post(state.configuration.openfnInboxUrl, { body: state => state.data }, state => {
        const delay = 1000;
        console.log(`Waiting ${delay}ms. ⏱️`);
        function timer() {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve('Done. 👍');
            }, delay);
          });
        }

        async function msg() {
          const msg = await timer();
          console.log(msg);
          return state;
        }

        return msg();
      })
    )(state);
  })(state)
);

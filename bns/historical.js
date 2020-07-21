//== Job to be used for fetching data from Kobo for historical, once-off migrations  ==//
// This can be run on-demand at any time by clicking "run" //

alterState(state => {
  let state.data = {};
  state.data.surveys = [
    { id: 'aMpW7wwRBRbtCfidtK2rRn', tag: 'bns_2019' }, //Form Id, Tag of test OpenFN BNS Survey form
    // Historical BNS forms to migrate:
    // { id: 'ad7S4hPBN7qM4Ac3mpEdwZ', tag: 'bns_2019' }, //Make sure the tag matches the Trigger of the related Job
    // { id: 'amD3cUsR4Jurj3ZSUyQdBH', tag: 'bns_2019' },
    // { id: 'a2m5Hp4BoN956CBxfKHdJY', tag: 'bns_2019' },
    // { id: 'aFQWAYHXXfh8i2cmXw9BFi', tag: 'bns_2019' },
    // { id: 'auqBASwJMLvkqtAJnZ8SXx', tag: 'bns_2019' },
    // { id: 'a9R68Er4oeDx6quZre2DM7', tag: 'bns_2019' },
    // { id: 'arJkDGmkhhCiJ2eYwRcCit', tag: 'bns_2019' },
    // { id: 'aEypYtcfNGvDtpkSUPXrJN', tag: 'bns_2019' },
    // { id: 'aCShrrKNApccvaAPzxzbxK', tag: 'bns_2019' },
    // { id: 'aQbjGLfvPTEUjdTmsdTu46', tag: 'bns_2019' },
    // { id: 'ahz5DN45juUzp7eUfGS5QA', tag: 'bns_2019' },
    // Add more Form ids and tags to this list to perform more Kobo syncs...
    // { id: 'apnzrb2RuoKu8Uxy2svwF6', tag: 'nrgt_2017' },
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
      //Here we append the tags defined above to the Kobo form submission data
      form: lastReferenceValue('tag')(state),
      body: submission,
    }));
    console.log(`Fetched ${state.data.count} submissions.`);
    //Once we fetch the data, we want to post each individual Kobo survey
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

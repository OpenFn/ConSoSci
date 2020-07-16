//== Job to be used for historical, once-off migrations  ==//
// This can be run on-demand at any time by clicking "run" // 

alterState(state => {
  state.data.surveys = [
    'aMpW7wwRBRbtCfidtK2rRn', //Form Id of test OpenFN BNS Survey form
    //'ad7S4hPBN7qM4Ac3mpEdwZ', //Historical BNS forms to migrate
    //'amD3cUsR4Jurj3ZSUyQdBH',
    //'a2m5Hp4BoN956CBxfKHdJY',
    //'aFQWAYHXXfh8i2cmXw9BFi',
    //'auqBASwJMLvkqtAJnZ8SXx',
    //'a9R68Er4oeDx6quZre2DM7',
    //'arJkDGmkhhCiJ2eYwRcCit',
    //'aEypYtcfNGvDtpkSUPXrJN',
    //'aCShrrKNApccvaAPzxzbxK',
    //'aQbjGLfvPTEUjdTmsdTu46',
    //'ahz5DN45juUzp7eUfGS5QA'
    // 'add more ids to this list',
    // 'to perform more daily syncs',
  ].map(id => ({
    formId: id,
    url: `https://kf.kobotoolbox.org/api/v2/assets/${id}/data/?format=json`,
  }));
  return state;
});

each(dataPath('surveys[*]'), state =>
  get(state.data.url, {}, state => {
    console.log(`Fetched ${state.data.count} submissions.`);
    state.data.submissions = state.data.results;
    //Once we fetch the data, we want to post each individual survey
    //back to the OpenFn inbox to run through the jobs
    return each(
      dataPath('submissions[*]'),
      post(
        state.configuration.openfnInboxUrl,
        {
          //Here we add form name tag to trigger the other jobs
          //Because bns survey.js job trigger is currently configured to run
          //for any survey with this {form: 'bns_2019'} tag.
          body: state => ({ form: 'bns_2019', body: state.data }),
        },
        state => {
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
        }
      )
    )(state);
  })(state)
);

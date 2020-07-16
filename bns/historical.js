//== Job to be used for historical, once-off migrations  ==//
// This can be run on-demand at any time by clicking "run" // 

alterState(state => {
  state.data.surveys = [
    'aMpW7wwRBRbtCfidtK2rRn',
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
    //Once we fetch the data, we want to put each individual survey
    //back to the OpenFn inbox to run through the jons
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

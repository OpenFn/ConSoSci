//== Job to be used for fetching data from Kobo on repeated, timer basis  ==//
// This can be run on-demand at any time by clicking "run" //

alterState(state => {
  let state.data = {};
  state.data.surveys = [
    { id: 'aMpW7wwRBRbtCfidtK2rRn', tag: 'bns_2019' }, //Form Id, Tag of test OpenFN BNS Survey form --> For Testing
    // Add more Form ids and tags to this list to perform more Kobo syncs...
    //{ id: 'atyo55YdBdfxzXiaBdrbvr', tag: 'bns_2019' }, //BNS Price survey to be synced regularly
    //{ id: 'aTRKQW2b8TJGxF7DVPfjFv', tag: 'bns_price_2019' }, //BNS Price survey to be synced regularly
    
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
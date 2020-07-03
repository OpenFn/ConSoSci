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
    return each(
      dataPath('submissions[*]'),
      post(
        state.configuration.openfnInboxUrl,
        {
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

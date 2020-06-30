get('https://kf.kobotoolbox.org/api/v2/assets/aMpW7wwRBRbtCfidtK2rRn/data/?format=json', {}, state => {
  console.log(`Fetched ${state.data.count} submissions.`);
  state.data.submissions = state.data.results;
  return state;
});

each(
  dataPath('submissions[*]'),
  post(
    state.configuration.openfnInboxUrl,
    {
      body: state => ({ form: 'bns_2019', body: state.data }),
    },
    state => {
      const delay = 2000;
      console.log(`Waiting ${delay}ms. ⏱️`);
      function timer() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('Done. 👍');
          }, 2000);
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
);

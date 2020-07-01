// Get old Kobo BNS data
get('https://kf.kobotoolbox.org/api/v2/assets/aMpW7wwRBRbtCfidtK2rRn/data/?format=json', {}, state => {
  console.log(`Fetched ${state.data.count} submissions.`);
  state.data.submissions = state.data.results;
  return state;
});

// Then post it to the inbox to use existing flows
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
);

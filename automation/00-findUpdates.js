get('https://kf.kobotoolbox.org/api/v2/assets/?format=json', {}, state => {
  console.log(`Previous cursor: ${state.lastEnd}`);
  // Set a manual cursor if you'd like to only fetch form after a certain date
  const manualCursor = '2019-05-25T14:32:43.325+01:00';
  state.data.forms = state.data.results
    .filter(
      resource => resource.date_modified > (state.lastEnd || manualCursor)
    )
    .map(form => {
      const url = form.url.split('?').join('?');
      return {
        formId: form.uid,
        tag: form.name,
        url,
      };
    });

  const lastEnd = state.data.results
    .filter(item => item.date_modified)
    .map(s => s.date_modified)
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  console.log(`Forms to fetch: ${JSON.stringify(state.data.forms, null, 2)}`);

  return { ...state, lastEnd, forms: [] };
});

each(
  dataValue('forms[*]'),
  post(state.configuration.openfnInboxUrl, { body: state.data }, state => {
    console.log(`Sent ${state.data.tag} for processing.`);
    return state;
  })
);
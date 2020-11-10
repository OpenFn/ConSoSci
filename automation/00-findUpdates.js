get('https://kf.kobotoolbox.org/api/v2/assets/?format=json', {}, state => {
  console.log(`Previous cursor: ${state.lastEnd}`);
  // Set a manual cursor if you'd like to only fetch form after a certain date
  const manualCursor = '2019-05-25T14:32:43.325+01:00';

  const manualFormList = [
    { uid: 'aZv8deXKd8AqfSVGXCdHrX', p1: 'WCS', p2: 'Questionnaire' },
    { uid: 'aDVDagX8TE9NUY7xmvAUpv', p1: 'WCS', p2: 'Marché' },
  ];

  state.data.forms = state.data.results
    // Filter the response from Kobo to show only those forms we want to update.
    .filter(form => manualFormList.map(x => x.uid).includes(form.uid))
    .filter(form => {
      // Note: If a form in manualFormList was not present in the list during
      // the last run of the job (formsWatched), then we always trigger an
      // update for that form.
      if (state.formsWatched.indexOf(form) === -1) {
        console.log(`New form ${form.uid} (${form.name}) added to watch list.`);
        return true;
      }
      // Note: If a form is not NEW to the watch list, then we only trigger an
      // update if it has been modified more recently than the greatest
      // last-modified date across all forms from our last run.
      return form.date_modified > (state.lastEnd || manualCursor);
    })
    // Map those forms so that we can post each to the inbox later.
    .map(form => {
      const url = form.url.split('?').join('?');
      return {
        formId: form.uid,
        // tag: manualFormList[form.uid].customName || form.name,
        tag: form.name,
        url,
        prefix1: manualFormList[form.uid].prefix1,
        prefix2: manualFormList[form.uid].prefix2,
      };
    });

  // Set lastEnd to the greatest date_modified value for all forms we care about.
  const lastEnd = state.data.results
    .filter(item => item.date_modified)
    .map(s => s.date_modified)
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  console.log(
    'Detected changes for:',
    JSON.stringify(
      state.data.forms.map(f => f.url),
      null,
      2
    )
  );

  return { ...state, lastEnd, formsWatched: manualFormList };
});

each(dataPath('forms[*]'), state => {
  const form = state.data;
  return post(
    state.configuration.openfnInboxUrl,
    { body: { ...form, formUpdate: true } },
    state => {
      console.log('Sent ', form.tag, ' for handling:');
      console.log(form);
      return state;
    }
  )(state);
});

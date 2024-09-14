//== Job to be used for getting a list of deployed GRM Kobo forms from sheets to auto-sync  ==//
// This can be run on-demand at any time by clicking "run" //
getValues(
  '1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY',
  'grm-DEPLOYED!A:O', //get Deployed GRM forms list from Sheet
  state => {
    const [headers, ...values] = state.data.values;

    const mapHeaderToValue = value => {
      return headers.reduce((obj, header) => {
        obj[header] = value[headers.indexOf(header)];
        return obj;
      }, {});
    };

    state.sheetsData = values
      .filter(
        item => item.includes('TRUE') //return forms where auto-sync = TRUE
        //&& item.includes('bns_survey', 'nrgt_current')
      )
      .map(item => mapHeaderToValue(item));

    return state;
  }
);

fn(state => {
  const { sheetsData } = state;

  // OpenFn will not sync Kobo records that are older than 1 week to avoid overwriting data in Asana
  const isMoreThanAWeekOld = dateString => {
    const currentDate = new Date();
    const inputDate = new Date(dateString);
    // Calculate the difference in time (in milliseconds) and convert to days
    const daysDifference = (currentDate - inputDate) / (1000 * 60 * 60 * 24);

    return daysDifference > 7;
  };
  // IF YOU CLEAR STATE...
  // Set this manual cursor to the earliest submission date you want fetch.
  const manualCursor = '2024-07-16T06:01:18.729Z';

  state.cursor = state.lastEnd || manualCursor;

  if (!state.cursor)
    throw new Error(
      'Please define a cursor date no greater than 1 week ago and try again'
    );
  if (isMoreThanAWeekOld(state.cursor))
    throw new Error(
      `cursor ${state.cursor} is older than 1 week. OpenFn will not sync Kobo records that are older than 1 week to avoid overwriting data in Asana.`
    );

  console.log('Current cursor value:', state.cursor);

  const formsList = sheetsData.map(survey => ({
    formId: survey.uid,
    tag: survey.tag,
    name: survey.name,
  }));

  console.log('# of GRM forms detected in Sheet:: ', formsList.length);
  console.log(
    'List of forms to re-sync:: ',
    JSON.stringify(formsList, null, 2)
  );

  state.data = {
    surveys: sheetsData.map(survey => ({
      formId: survey.uid,
      tag: survey.tag,
      name: survey.name,
      owner: survey.owner,
      url: `https://kf.kobotoolbox.org/api/v2/assets/${survey.uid}/data/?format=json`,
      query: `&query={"_submission_time":{"$gte":"${state.cursor}"}}`,
    })),
  };
  return state;
});

fn(state => {
  let lastEnd = state.references
    .filter(item => item.body)
    .map(s => s.body.end)
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  lastEnd = new Date(lastEnd) > new Date() ? lastEnd : new Date().toISOString();

  console.log('New cursor value:', lastEnd);
  return { ...state, data: {}, references: [], lastEnd };
});

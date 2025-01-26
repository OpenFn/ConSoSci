//== Job to be used for getting a list of "deployed" Kobo forms from sheets to auto-sync  ==//
// This can be run on-demand at any time by clicking "run" or modify manualCursor below //
getValues(
   '1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY',
  'wcs-bns-DEPLOYED!A:L', //get Deployed forms list from Sheet
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
        item =>
          item.includes('TRUE') //return forms where auto-sync = TRUE
          //&& item.includes('bns_survey', 'nrgt_current') 
      )
      .map(item => mapHeaderToValue(item));

    return state;
  }
);

fn(state => {
  const { sheetsData } = state;

  // Set a manual cursor if you'd like to only fetch data after this date...
  //e.g., '2023-01-01T23:51:45.491+01:00'
  const manualCursor = '2024-10-00T00:00:00.000Z';  //lastUsed: 2024-11-21T00:00:00.000Z
  console.log('manualCursor defined?', manualCursor);
  
  //...otherwise the job will use this dynamicCursor
  const dynamicCursor = getTodayISODate(); 

  function getTodayISODate() {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
    return today.toISOString(); // Convert to ISO string
  }
  
  const cursorValue = dynamicCursor || manualCursor ; 
  // const cursorValue = manualCursor ; 
  console.log('Cursor value to use in query:', cursorValue);

  const formsList = sheetsData.map(survey => ({
      formId: survey.uid,
      tag: survey.tag,
      name: survey.name 
  })); 
  
  console.log('# of deployed forms detected in Sheet:: ', formsList.length);
  console.log('List of forms to auto-sync:: ', JSON.stringify(formsList, null, 2)); 

  state.data = {
    surveys: sheetsData.map(survey => ({
      formId: survey.uid,
      tag: survey.tag,
      name: survey.name,
      owner: survey.owner,
      url: `https://kf.kobotoolbox.org/api/v2/assets/${survey.uid}/data/?format=json`,
      query: `&query={"start":{"$gte":"${cursorValue}"}}`,
    })),
  };
  return state;
});
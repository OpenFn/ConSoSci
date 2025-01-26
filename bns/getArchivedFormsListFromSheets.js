getValues(
  '1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY',
  'wcs-bns-DEPLOYED!A:O', //get Deployed forms list from Sheet
  state => {
    const [headers, ...values] = state.data.values;

    const mapHeaderToValue = value => {
      return headers.reduce((obj, header) => {
        obj[header] = value[headers.indexOf(header)];
        return obj;
      }, {});
    };

    state.deployedData = values
      .map(item => mapHeaderToValue(item))
      .filter(item => item['historical_sync'] === 'TRUE');

    return state;
  }
);
//== Job to be used for getting a list of "archived" Kobo forms from sheets to auto-sync  ==//
// This can be run on-demand at any time by clicking "run" //
getValues(
  '1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY',
  'wcs-bns-ARCHIVED!A:O', //get Deployed forms list from Sheet
  state => {
    const [headers, ...values] = state.data.values;

    const mapHeaderToValue = value => {
      return headers.reduce((obj, header) => {
        obj[header] = value[headers.indexOf(header)];
        return obj;
      }, {});
    };

    state.archivedData = values
      .map(item => mapHeaderToValue(item))
      .filter(item => item['historical_sync'] === 'TRUE');

    return state;
  }
);

fn(state => {
  const { archivedData, deployedData } = state;

  // Set a manual cursor if you'd like to only fetch data after this date...
  //e.g., '2023-01-01T23:51:45.491+01:00'
  //   const manualCursor = ''; //lastUsed: 2024-04-01T00:00:00.000Z
  //   console.log('manualCursor defined?', manualCursor);
  //...otherwise the job will use this dynamicCursor
  // const dynamicCursor = getTodayISODate();

  //   function getTodayISODate() {
  //     const today = new Date();
  //     today.setUTCHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
  //     return today.toISOString(); // Convert to ISO string
  //   }

  //   const cursorValue = manualCursor || dynamicCursor;
  //   console.log('Cursor value to use in query:', cursorValue);
  const combinedData = [...deployedData, ...archivedData];
  const formsList = combinedData.map(survey => ({
    formId: survey.uid,
    tag: survey.tag,
    name: survey.name,
  }));

  console.log('# of forms detected in Sheet:: ', formsList.length);
  console.log(
    'List of forms to re-sync:: ',
    JSON.stringify(formsList, null, 2)
  );

  state.data = {
    surveys: combinedData.map(survey => ({
      formId: survey.uid,
      tag: survey.tag,
      name: survey.name,
      owner: survey.owner,
      url: `https://kf.kobotoolbox.org/api/v2/assets/${survey.uid}/data/?format=json`,
      //query: `&query={"end":{"$gte":"${cursorValue}"}}`, //get ALL forms for historical job
    })),
  };
  return state;
});

//Clear final state
fn(state => {
  delete state.references;
  delete state.response;
  return state;
});

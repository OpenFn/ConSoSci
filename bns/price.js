// NOTE: This data cleaning operation returns state, modified as needed.
alterState(state => {
  //try {
  const { body, formName, instance, formOwner} = state.data;
  const { _submission_time, _id, _xform_id_string } = body;
  let cleanedSubmission = {};

  for (const key in body) {
    switch (body[key]) {
      case 'yes':
        cleanedSubmission[key] = 1;
        break;

      case 'no':
        cleanedSubmission[key] = 0;
        break;

      default:
        cleanedSubmission[key] = body[key];
        break;
    }
  }
  
  cleanedSubmission.instance = instance;

  const landscapeMap = {
    Ndoki: 'ndoki',
    'Lac Télé': 'lac_tele',
    Ituri: 'ituri',
    Kahuzi: 'kahuzi',
    MTKB: 'kahuzi',
    'Cross River': 'crossriver',
    Soariake: 'soariake',
    Ankarea: 'ankarea',
    ABS: 'baie_antongil',
    'Nosy Be': 'tandavandriva',
    Makira: 'makira',
    'BNS Ndoki Prix 2020': 'ndoki',

    //formName: landscapeValue,
    //other values
  };

  return {
    ...state,
    landscapeMap,
    data: {
      ...cleanedSubmission,
      durableUUID: `${_submission_time}-${_xform_id_string}-${_id}`,
      datasetId: `${formName}-${_xform_id_string}`,
      end: cleanedSubmission.end.slice(0, 10),
    },
    formName,
  };
  /* } catch (error) {
    state.connection.close();
    throw error;
  }*/
});

// Refactor this for scale so it doesn't perform a no-op delete 9/10 times.
// Maybe check result of previous op, then only delete if it was an update.
sql({
  query: state =>
    `DELETE FROM WCSPROGRAMS_KoboBnsPrice where AnswerId = '${state.data._id}'`,
});

alterState(state => {
  const data = state.data.good.map((g, i) => ({
    // Id: state.data._id,
    Id: i + 1,
    AnswerId: state.data._id,
    DatasetUuidId: state.data.datasetId,
    Surveyor: state.data.surveyor,
    Village: state.data.village,
    Gs: g[`good/name`],
    Price: g[`good/price`],
    LastUpdate: new Date().toISOString(),
    //Landscape: state.landscapeMap[state.data.formName], //see L24 for mappings. We want to use formName to look-up a new value
    Landscape: state => {
      for (let val in state.landscapeMap)
        if (state.formName.includes(val)) return state.landscapeMap[val];
      return '';
    },
    SurveyDate: state.data.today,
  }));
  // console.log('data', data);
  return insertMany('WCSPROGRAMS_KoboBnsPrice', state => data)(state);
});

alterState(state => {
  console.log('DatasetName ::', dataValue('formName'));
  console.log('DatasetOwner ::', dataValue('formOwner'));
  console.log('data to upload ::', state.data);
  return state;
});

upsert('WCSPROGRAMS_KoboData', 'DatasetUuidId', {
  //AnswerId: dataValue('durableUUID'),
  DatasetName: state.data.formName,
  DatasetOwner: dataValue('formOwner'),
  DatasetUuidId: dataValue('datasetId'),
  DatasetYear: new Date().getFullYear(),
  LastSubmissionTime: dataValue('_submission_time'),
  LastCheckedTime: dataValue('_submission_time'),
  LastUpdateTime: new Date().toISOString(),
  KoboManaged: true,
  Tags: dataValue('_tags'),
  Citation: dataValue('instance'),
});


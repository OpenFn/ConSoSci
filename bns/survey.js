// NOTE: This data cleaning operation returns state, modified as needed.
alterState(state => {
  const original = state.data.body;
  let cleanedSubmission = {};

  for (const key in original) {
    switch (original[key]) {
      case 'yes':
        cleanedSubmission[key] = 1;
        break;

      case 'no':
        cleanedSubmission[key] = 0;
        break;

      default:
        cleanedSubmission[key] = original[key];
        break;
    }
  }

  // QUESTION: How should the contract be set up? Should it be based on
  // `"gps_method" === 'device'` or on `Object.hasOwnProperty('geo')` ?
  if (cleanedSubmission.gps_method === 'device') {
    cleanedSubmission['gps/lat'] = cleanedSubmission.geo.split(' ')[0];
    cleanedSubmission['gps/long'] = cleanedSubmission.geo.split(' ')[1];
  }

  state.data = cleanedSubmission;

  // ===========================================================================
  // WARNING: In OpenFn's opinion, this is a very FRAGILE API contract!
  // ===========================================================================
  // If a partner creates a form with slightly different field names, this
  // section will need to be updated by WCS. If future forms are being designed,
  // we'd recommend using a repeat group that allows the partner to select the
  // type of 'nr' or 'matrix' they're reporting on. The current approach treats
  // the form field names in Kobo _AS_ data themselves.
  state.nr = Object.keys(state.data)
    .filter(key => key.startsWith('nr/'))
    .map(key => ({
      AnswerId: state.data._id,
      Id: state.data._id,
      LastUpdate: state.data._submission_time,
      Nr: key.substring(3),
      NrCollect: state.data[key],
    }));

  state.matrix = Object.keys(state.data)
    .filter(key => key.startsWith('bns_matrix_'))
    .filter(key => key.endsWith('_possess'))
    .map(key => {
      const item = key.substring(11, key.indexOf('/'));
      return {
        Dataset_id: state.data._uuid,
        Row_id: state.data._id,
        //AnswerId: state.data._id, //does not exist
        gs: item.replace(/_/g, ' '),
        have: state.data[`bns_matrix_${item}/bns_matrix_${item}_possess`],
        necessary: state.data[`bns_matrix_${item}/bns_matrix_${item}_necessary`],
        quantity: state.data[`bns_matrix_${item}/bns_matrix_${item}_number`],
      };
    });
  // ===========================================================================
    
  return state;
});

upsert('WCSPROGRAMS_KoboBnsAnswer', 'DatasetUuidId', {
  DatasetUuidId: dataValue('_uuid'),
  AnswerId: dataValue('_id'),
  LastUpdate: dataValue('_submission_time'),
  SurveyDate: dataValue('today'),
  Landscape: dataValue('landscape'),
  Surveyor: dataValue('surveyor'),
  Participant: dataValue('participant'),
  Arrival: dataValue('arrival'),
  District: dataValue('district'),
  Village: dataValue('village'),
  HhId: dataValue('hh_id'), 
  BenefProject: dataValue('benef_project'),
  HhTypeControl:  state =>{
    var control = dataValue('hh_type')(state)==='control'? 1 : 0;
    return control; 
  }, 
  HhTypeOrgBenef: state =>{
    var benef = dataValue('hh_type')(state)==='wcs_benef'? 1 : 0;
    return benef; 
  }, 
  HhTypeOtherBenef: state =>{
    var other = dataValue('hh_type')(state)==='other_benef'? 1 : 0;
    return other; 
  }, 
  ExplainProject: dataValue('explain_project'),
  KnowPa: dataValue('know_PA'),
  BenefPa: dataValue('benef_PA'),
  ExplainBenefPa: dataValue('explain_benef_PA'),
  Livelihood1: dataValue('livelihoods/l1'),
  Livelihood2: dataValue('livelihoods/l2'),
  Livelihood3: dataValue('livelihoods/l3'),
  Livelihood4: dataValue('livelihoods/l4'),
  BnsPlus: dataValue('bns_plus'),
});

// Refactor this for scale so it doesn't perform a no-op delete 9/10 times.
// Maybe check result of previous op, then only delete if it was an update.
sql({ query: state => `DELETE FROM WCSPROGRAMS_KoboBnsAnswerhhmembers where Id = ${state.data._id}` });
insertMany('WCSPROGRAMS_KoboBnsAnswerhhmembers', state =>
  state.data.hh_members.map(member => ({
    Id: state.data._id,
    // AnswerId: state.data._id,
    Head: member.gender_head ? 1 : 0,
    Gender: member.gender_head,
    Ethnicity: member.ethnicity_head,
    Birth: member.birth_head,
    LastUpdate: state.data._submission_time,
  }))
);

// Refactor this for scale so it doesn't perform a no-op delete 9/10 times.
// Maybe check result of previous op, then only delete if it was an update.
sql({ query: state => `DELETE FROM WCSPROGRAMS_KoboBnsAnswernr where AnswerId = '${state.data._id}'` });
insertMany('WCSPROGRAMS_KoboBnsAnswernr', state => state.nr);

// Refactor this for scale so it doesn't perform a no-op delete 9/10 times.
// Maybe check result of previous op, then only delete if it was an update.
//sql({ query: state => `DELETE FROM WCSPROGRAMS_KoboBnsAnswergs where AnswerId = '${state.data._id}'` }); //ERROR: AnswerId does not exist
sql({ query: state => `DELETE FROM WCSPROGRAMS_KoboBnsAnswergs where Dataset_id = '${state.data._uuid}'` });
insertMany('WCSPROGRAMS_KoboBnsAnswergs', state => state.matrix);

upsert('WCSPROGRAMS_KoboBnsAnswergps', 'AnswerId', {
  // DatasetUuidId: dataValue('_uuid'),
  AnswerId: dataValue('_id'),
  Id: dataValue('_id'),
  Geom: dataValue('_geolocation'), 
  Lat: dataValue('gps/lat'),
  Long: dataValue('gps/long'),
  LastUpdate: dataValue('_submission_time'),
});

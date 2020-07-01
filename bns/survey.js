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
      Nr: key.substring(3),
      NrCollect: state.data[key],
    }));

  state.matrix = Object.keys(state.data)
    .filter(key => key.startsWith('bns_matrix_'))
    .filter(key => key.endsWith('_possess'))
    .map(key => {
      const item = key.substring(11, key.indexOf('/'));
      return {
        AnswerId: state.data._id,
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
  SurveyDate: dataValue('today'),
  Landscape: dataValue('landscape'),
  Surveyor: dataValue('surveyor'),
  Participant: dataValue('participant'),
  Arrival: dataValue('arrival'),
  District: dataValue('district'),
  Village: dataValue('village'),
  //HhId: dataValue('hh_id'), //temp commenting out until 'undefined' string issue resolved in LP
  BenefProject: dataValue('benef_project'),
  //HhTypeControl: dataValue('hh_type'), // what is transformation? Need 0/1 values
  HhTypeOrgBenef: dataValue('hh_type'),
  HhTypeOtherBenef: dataValue('hh_type'),
  //ExplainProject: dataValue('explain_project'),
  KnowPa: dataValue('know_PA'),
  //BenefPa: dataValue('benef_PA'),
  //ExplainBenefPa: dataValue('explain_benef_PA'),
  Livelihood1: dataValue('livelihoods/l1'),
  Livelihood2: dataValue('livelihoods/l2'),
  //Livelihood3: dataValue('livelihoods/l3'),
  //Livelihood4: dataValue('livelihoods/l4'),
  BnsPlus: dataValue('bns_plus'),
  // more: dataValue('moreFields'), ...
});

// NOTE: Upsert behavior for child tables/ repeat groups --> TO DISCUSS

// Refactor this for scale so it doesn't perform a no-op delete 9/10 times.
// Maybe check result of previous op, then only delete if it was an update.
sql({ query: `DELETE FROM WCSPROGRAMS_KoboBnsAnswerhhmembers where AnswerId = ${state.data.AnswerId}` });
insertMany('WCSPROGRAMS_KoboBnsAnswerhhmembers', state => {
  state.data.hhMembers.map(member => {
    return {
      AnswerId: state.data.body._id, //is _id how we map to parent Answer? or _uuid?
      Head: member.gender_head ? 'yes' : 'no',
      Gender: member.gender_head,
      Ethnicity: member.ethnicity_head,
      Birth: member.birth_head,
    };
  });
});

// Refactor this for scale so it doesn't perform a no-op delete 9/10 times.
// Maybe check result of previous op, then only delete if it was an update.
sql({ query: `DELETE FROM WCSPROGRAMS_KoboBnsAnswernr where AnswerId = ${state.data.AnswerId}` });
insertMany('WCSPROGRAMS_KoboBnsAnswernr', state => state.nr);

// Refactor this for scale so it doesn't perform a no-op delete 9/10 times.
// Maybe check result of previous op, then only delete if it was an update.
sql({ query: `DELETE FROM WCSPROGRAMS_KoboBnsAnswergs where AnswerId = ${state.data.AnswerId}` });
insertMany('WCSPROGRAMS_KoboBnsAnswergs', state => state.matrix);

upsert('WCSPROGRAMS_KoboBnsAnswergps', 'DatasetUuidId', {
  DatasetUuidId: dataValue('_uuid'),
  AnswerId: dataValue('_id'),
  Geom: dataValue('_geolocation'), //this is a Kobo array -- transform?
  Lat: dataValue('gps/lat'),
  Long: dataValue('gps/long'),
  // more: dataValue('moreFields'),
});

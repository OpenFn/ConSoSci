// NOTE: This data cleaning operation returns state, modified as needed.
alterState(state => {
  try {
    const { body } = state.data;
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

    // NOTE: This assumes all device-collected geo data follows specific lat, log data format
    if (cleanedSubmission.gps_method === 'device') {
      cleanedSubmission['gps/lat'] = cleanedSubmission.geo ? cleanedSubmission.geo.split(' ')[0] : null;
      cleanedSubmission['gps/long'] = cleanedSubmission.geo ? cleanedSubmission.geo.split(' ')[1] : null;
    }

    cleanedSubmission.durableUUID = `${_submission_time}-${_xform_id_string}-${_id}`;
    state.data = cleanedSubmission;

    // ===========================================================================
    //  NOTE: These job mappings assume a specific Kobo form metadata naming syntax!
    //  'NR' and 'BNS matrix' questions should follow the naming conventions below
    //  See Docs to learn more about the assumptions made here.
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
        LastUpdate: state.data._submission_time, //Q: update runtime to now()
        Nr: key.substring(3),
        NrCollect: state.data[key],
      }));

    state.matrix = Object.keys(state.data)
      .filter(key => key.startsWith('bns_matrix_'))
      .filter(key => key.endsWith('_possess'))
      .map(key => {
        const item = key.substring(11, key.indexOf('/'));
        return {
          Dataset_id: state.data.durableUUID, //Rename?
          AnswerId: state.data._id,
          gs: item.replace(/_/g, ' '),
          have: state.data[`bns_matrix_${item}/bns_matrix_${item}_possess`],
          necessary: state.data[`bns_matrix_${item}/bns_matrix_${item}_necessary`],
          quantity: state.data[`bns_matrix_${item}/bns_matrix_${item}_number`],
        };
      });
    // ===========================================================================

    return state;
  } catch (error) {
    state.connection.close();
    throw error;
  }
});

upsert('WCSPROGRAMS_KoboBnsAnswer', 'DatasetUuidId', {
  DatasetUuidId: dataValue('durableUUID'),
  AnswerId: dataValue('_id'),
  LastUpdate: dataValue('_submission_time'), //Q: update runtime to now()
  SurveyDate: dataValue('today'),
  Landscape: dataValue('landscape'),
  Surveyor: dataValue('surveyor'),
  Participant: dataValue('participant'),
  Arrival: dataValue('arrival'),
  District: dataValue('district'),
  Village: dataValue('village'),
  HhId: dataValue('hh_id'),
  BenefProject: dataValue('benef_project'),
  HhTypeControl: state => (state.data.hh_type === 'control' ? 1 : 0),
  HhTypeOrgBenef: state => (state.data.hh_type === 'wcs_benef' ? 1 : 0),
  HhTypeOtherBenef: state => (state.data.hh_type === 'other_benef' ? 1 : 0),
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
insert('WCSPROGRAMS_KoboBnsAnswerhhmembers', {
  //insert hh head first
  Id: state.data._id,
  AnswerId: state.data._id, //Q: replace with AnswerId ?
  Head: state.data.gender_head ? '1' : '0',
  Gender: state.data.gender_head,
  Ethnicity: state.data.ethnicity_head,
  Birth: state.data.birth_head,
  LastUpdate: state.data._submission_time, //Q: update runtime to now()
});

alterState(state => {
  if (state.data.hh_members) {
    return insertMany('WCSPROGRAMS_KoboBnsAnswerhhmembers', (
      state //then insert other members
    ) =>
      state.data.hh_members.map(member => ({
        //Q: what if no members selected?
        Id: state.data._id, //Q: replace with AnswerId ?
        AnswerId: state.data._id,
        Head: '0',
        Gender: member[`hh_members/gender`],
        Ethnicity: member[`hh_members/ethnicity`],
        Birth: member[`hh_members/birth`],
        LastUpdate: state.data._submission_time, //Q: update runtime to now()
      }))
    )(state);
  }

  console.log('No household members found.');
  return state;
});

// Refactor this for scale so it doesn't perform a no-op delete 9/10 times.
// Maybe check result of previous op, then only delete if it was an update.
sql({ query: state => `DELETE FROM WCSPROGRAMS_KoboBnsAnswernr where AnswerId = '${state.data._id}'` });
insertMany('WCSPROGRAMS_KoboBnsAnswernr', state => state.nr);

// Refactor this for scale so it doesn't perform a no-op delete 9/10 times.
// Maybe check result of previous op, then only delete if it was an update.
//sql({ query: state => `DELETE FROM WCSPROGRAMS_KoboBnsAnswergs where AnswerId = '${state.data._id}'` }); //ERROR: AnswerId does not exist
sql({ query: state => `DELETE FROM WCSPROGRAMS_KoboBnsAnswerGS where Dataset_id = '${state.data.durableUUID}'` });
insertMany('WCSPROGRAMS_KoboBnsAnswerGS', state => state.matrix);

upsert('WCSPROGRAMS_KoboBnsAnswergps', 'AnswerId', {
  DatasetUuidId: dataValue('durableUUID'), //Q: Add new column
  AnswerId: dataValue('_id'),
  Id: dataValue('_id'),
  Geom: dataValue('_geolocation'),
  Lat: dataValue('gps/lat'),
  Long: dataValue('gps/long'),
  LastUpdate: dataValue('_submission_time'), //Q: update runtime to now()
});

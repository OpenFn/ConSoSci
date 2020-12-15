// NOTE: This data cleaning operation returns state, modified as needed.
alterState(state => {
  try {
    const { body, formName } = state.data;
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

    return {
      ...state,
      data: {
        ...cleanedSubmission,
        durableUUID: `${_submission_time}-${_xform_id_string}-${_id}`,
        datasetId: `${formName}-${_xform_id_string}`,
        end: cleanedSubmission.end.slice(0, 10),
      },
    };
  } catch (error) {
    state.connection.close();
    throw error;
  }
});

// Refactor this for scale so it doesn't perform a no-op delete 9/10 times.
// Maybe check result of previous op, then only delete if it was an update.
sql({
  query: state =>
    `DELETE FROM WCSPROGRAMS_KoboBnsPrice where AnswerId = '${state.data._id}'`,
});

insertMany('WCSPROGRAMS_KoboBnsPrice', state =>
  state.data.good.map(g => ({
    Id: state.data._id, 
    AnswerId: state.data._id,
    DatasetUuidId: state.data.datasetId,
    Surveyor: state.data.surveyor,
    Village: state.data.village,
    Gs: g[`good/name`],
    Price: g[`good/price`],
    LastUpdate: new Date().toISOString(),
  }))
);

upsert('WCSPROGRAMS_KoboData', 'DatasetUuidId', {
  //AnswerId: dataValue('durableUUID'),
  DatasetName: state.data.formName,
  DatasetOwner: state.data.formOwner,
  DatasetUuidId: dataValue('datasetId'),
  DatasetYear: new Date().getFullYear(),
  LastSubmissionTime: dataValue('_submission_time'),
  LastCheckedTime: dataValue('_submission_time'),
  LastUpdateTime: new Date().toISOString(),
  KoboManaged: true,
  Tags: dataValue('_tags'),
  
});

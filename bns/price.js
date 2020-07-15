// NOTE: This data cleaning operation returns state, modified as needed.
alterState(state => {
  const { form, body } = state.data;
  const { _submission_time, _id } = body;
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

  cleanedSubmission.durableUUID = `${_submission_time}-${form}-${_id}`;
  state.data = cleanedSubmission;
  return state;
});

// Refactor this for scale so it doesn't perform a no-op delete 9/10 times.
// Maybe check result of previous op, then only delete if it was an update.
sql({ query: state => `DELETE FROM WCSPROGRAMS_KoboBnsPrice where DatasetUuidId = '${state.data.durableUUID}'` });

insertMany('WCSPROGRAMS_KoboBnsPrice', state =>
  state.data.good.map(g => ({
    Id: state.data._id, //Q: Id vs AnswerId
    AnswerId: state.data._id,
    DatasetUuidId: dataValue('durableUUID')(state),
    Surveyor: state.data.surveyor,
    Village: state.data.village,
    Gs: g[`good/name`],
    Price: g[`good/price`],
    LastUpdate: state.data.end,
  }))
);

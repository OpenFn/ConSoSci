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

  state.data = cleanedSubmission;
  return state;
});

// Refactor this for scale so it doesn't perform a no-op delete 9/10 times.
// Maybe check result of previous op, then only delete if it was an update.
sql({ query: state => `DELETE FROM WCSPROGRAMS_KoboBnsPrice where DatasetUuidId = ${state.data._uuid}` });
/*ERROR: Executing query: DELETE FROM WCSPROGRAMS_KoboBnsPrice where DatasetUuidId = eeea1846-e88c-4c89-b030-ca77fd9daecd
Incorrect syntax near 'c89'.*/

insertMany('WCSPROGRAMS_KoboBnsPrice', state =>
  state.data.good.map(g => ({
    Id: state.data._id, //Q: Id vs AnswerId
    AnswerId: state.data._id,
    DatasetUuidId: dataValue('_uuid')(state),
    Surveyor: state.data.surveyor,
    Village: state.data.village,
    Gs: g[`good/name`],
    Price: g[`good/price`], 
    LastUpdate: state.data.end, 
  }))
);


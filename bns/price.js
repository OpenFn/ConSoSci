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
sql({ query: `DELETE FROM WCSPROGRAMS_KoboBnsPrice where AnswerId = ${state.data.AnswerId}` });
insertMany('WCSPROGRAMS_KoboBnsPrice', state => {
  state.data.good.map(good => {
    return {
      AnswerId: state.data.body._id, 
      DatasetUuidId: state.data._uuid,
      Id: state.data._id,
      Surveyor: state.data.surveyor,
      Village: state.data.village,
      Gs: good[`good/name`],
      Price: good[`good/price`], //repeat group --> to update
      LastUpdate: state.data._submission_time,
    };
  });
});

// upsert('WCSPROGRAMS_KoboBnsPrice', 'DatasetUuidId', {
//   DatasetUuidId: state.data._uuid,
//   Id: state.data._id,
//   Surveyor: state.data.surveyor,
//   Village: state.data.village,
//   Gs: state.data.good[0][`good/name`], //repeat group --> to update
//   Price: state.data.good[0][`good/price`], //repeat group --> to update
//   LastUpdate: state.data._submission_time, //Cannot insert the value NULL into column 'LastUpdate'--> use submission time?
// });

//Need a `for each` option in LP. Something like...
// each(
//   merge(
//     dataPath('body.good[*]'),
//     upsert('WCSPROGRAMS_KoboBnsPrice', 'DatasetUuidId', {
//       DatasetUuidId: state.data._uuid,
//       Id: state.data._id,
//       Surveyor: state.data.surveyor,
//       Village: state.data.village,
//       Gs: dataValue('good/name'),
//       Price: dataValue('good/price'),
//     })
//   )
// );

upsert('WCSPROGRAMS_KoboBnsPrice', 'DatasetUuidId', {
  DatasetUuidId: state.data.body._uuid,
  Id: state.data.body._id,
  Surveyor: state.data.body.surveyor,
  Village: state.data.body.village,
  Gs: state.data.body.good[0].good/name, //repeat group
  Price: state.data.body.good[0].good/price, //repeat group
});


//Need a for each option
/*each(
  merge(
    dataPath('body.good[*]'),
    upsert('WCSPROGRAMS_KoboBnsPrice', 'DatasetUuidId', {
      DatasetUuidId: state.data.body._uuid,
      Id: state.data.body._id,
      Surveyor: state.data.body.surveyor,
      Village: state.data.body.village,
      Gs: dataValue('good/name'),
      Price: dataValue('good/price'),
    })
  )
);*/

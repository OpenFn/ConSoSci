each(
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
);

alterState(state => {
  function generateUuid(body, uuid) {
    for (const property in body) {
      if (Array.isArray(body[property]) && body !== null) {
        body['__generatedUuid'] = uuid;
        body[property].forEach((thing, i, arr) => {
          if (thing !== null) {
            thing['__parentUuid'] = uuid;
            let newUuid = uuid + '-' + (i + 1);
            thing['__generatedUuid'] = newUuid;
            for (const property in thing) {
              if (Array.isArray(thing[property])) {
                generateUuid(thing, newUuid);
              }
            }
          }
        });
      }
    }
  }

  generateUuid(
    state.data.body,
    state.data.body._id + '-' + state.data.body._xform_id_string
  );

  state.data = { ...state.data, ...state.data.body };
  return state;
});
upsert('WCSPROGRAMS__KoboDataset', 'DatasetId', {
  DatasetName: dataValue('formName'),
  DatasetOwner: dataValue('formOwner'),
  DatasetUuidId: dataValue('_xform_id_string'),
  LastUpdateTime: new Date().toISOString(),
  KoboManaged: '1',
  //Payload: state.data.body,
  UserID_CR: '0', //TODO: Update User_ID and Address mappings?
  UserID_LM: '0',
});

alterState(async state => {
  return upsert('WCSPROGRAMS_Vegetation', 'Answer_ID', {
    sbght: dataValue('sbght'),
    sbdbh: dataValue('sbdbh'),
    sght: dataValue('sght'),
    sdbh: dataValue('sdbh'),
    comments: dataValue('comments'),
    out_plot_area: dataValue('out_plot_area'),
    out_plot_radius: dataValue('out_plot_radius'),
    tree_3cm: dataValue('tree_3cm'),
    sbrush_per: dataValue('sbrush_per'),
    shrubyes: dataValue('shrubyes'),
    inner_plot_area: dataValue('inner_plot_area'),
    inner_plot_radius: dataValue('inner_plot_radius'),
    grassyes: dataValue('grassyes'),
    center_plot_area: dataValue('center_plot_area'),
    center_plot_radius: dataValue('center_plot_radius'),
    radius: dataValue('radius'),
    // plotClass: dataValue('plotClass'),
    WCSPROGRAMS_VegetationClassID_Other: await findValue({
      uuid: 'WCSPROGRAMS_VegetationClassID',
      relation: 'WCSPROGRAMS_VegetationClass',
      where: { WCSPROGRAMS_VegetationCClassName: 'plotClass' },
    })(state),
    vegClass_same: dataValue('vegClass_same'),
    // Cropstatus: dataValue('Cropstatus'),
    WCSPROGRAMS_VegetationCropStatusID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationCropStatusID',
      relation: 'WCSPROGRAMS_VegetationCropStatus',
      where: { WCSPROGRAMS_VegetationCropStatusName: 'Cropstatus' },
    })(state),
    Year: dataValue('Year'),
    //ddriver: dataValue('ddriver'), //set as m:m table, see below
    WCSPROGRAMS_VegetationDegradationDriverID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationDegradationDriverID',
      relation: 'WCSPROGRAMS_VegetationDegradatationDriver',
      where: { WCSPROGRAMS_VegetationDegradatationDriverName: 'observername' },
    })(state),
    // forest_type: dataValue('forest_type'),
    WCSPROGRAMS_VegetationForestTypeID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationForestTypeID',
      relation: 'WCSPROGRAMS_VegetationForestType',
      where: { WCSPROGRAMS_VegetationForestTypeName: 'forest_type' },
    })(state),
    // vegclass: dataValue('vegclass'),
    WCSPROGRAMS_VegetationClassID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationClassID',
      relation: 'WCSPROGRAMS_VegetationClass',
      where: { WCSPROGRAMS_VVegetationClassName: 'vegclass' },
    })(state),
    // Ownership: dataValue('Ownership'),
    WCSPROGRAMS_VegetationOwnershipID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationOwnershipID',
      relation: 'WCSPROGRAMS_VegetationOwnership',
      where: { WCSPROGRAMS_VegetationOwnershipName: 'Ownership' },
    })(state),
    // rzon: dataValue('rzon'),
    WCSPROGRAMS_VegetationFireReasonID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationFireReasonID',
      relation: 'WCSPROGRAMS_VegetationFireReason',
      where: { WCSPROGRAMS_VegetationFireReasonName: 'rzon' },
    })(state),
    // cause: dataValue('cause'),
    WCSPROGRAMS_VegetationFireCauseID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationFireCauseID',
      relation: 'WCSPROGRAMS_VegetationFireCause',
      where: { WCSPROGRAMS_VegetationFireCauseName: 'cause' },
    })(state),
    // no.trees: dataValue('no.trees'),
    age: dataValue('age'),
    plot_burnt: dataValue('plot_burnt'),
    fire: dataValue('fire'),
    bareground: dataValue('bareground'),
    // seasonality: dataValue('seasonality'),
    WCSPROGRAMS_VegetationSoilSeasonalityID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationSeasonalityID',
      relation: 'WCSPROGRAMS_VegetationSeasonality',
      where: { WCSPROGRAMS_VegetationSeasonalityName: 'seasonality' },
    })(state),
    // erodability: dataValue('erodability'),
    WCSPROGRAMS_VegetationSoilErodabilityID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationSoilErodabilityID',
      relation: 'WCSPROGRAMS_VegetationSoilErodability',
      where: { WCSPROGRAMS_VegetationSoilErodabilityName: 'erodability' },
    })(state),
    // moisture: dataValue('moisture'),
    WCSPROGRAMS_VegetationSoilMoistureID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationSoilMoistureID',
      relation: 'WCSPROGRAMS_VegetationSoilMoisture',
      where: { WCSPROGRAMS_VegetationSoilMoistureName: 'moisture' },
    })(state),
    // colour: dataValue('colour'),
    WCSPROGRAMS_VegetationSoilColorID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationSoilColorID',
      relation: 'WCSPROGRAMS_VegetationSoilColor',
      where: { WCSPROGRAMS_VegetationSoilColorName: 'description' },
    })(state),
    // description: dataValue('description'),
    WCSPROGRAMS_VegetationSoilDescriptionID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationSoilDescriptionID',
      relation: 'WCSPROGRAMS_VegetationSoilDescription',
      where: { WCSPROGRAMS_VegetationSoilDescriptionName: 'description' },
    })(state),
    north: dataValue('north'),
    east: dataValue('east'),
    waypoint: dataValue('waypoint'),
    plot_gps: dataValue('plot_gps'),
    plot_number: dataValue('plot_number'),
    transect_no: dataValue('transect_no'),
    name: dataValue('name'),
    district: dataValue('district'),
    // drainage: dataValue('drainage'),
    WCSPROGRAMS_VegetationDrainageID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationDrainageID',
      relation: 'WCSPROGRAMS_VegetationDrainage',
      where: { WCSPROGRAMS_VegetationDrainageName: 'drainage' },
    })(state),
    // physiography: dataValue('physiography'),
    WCSPROGRAMS_VegetationPhysiographyID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationPhysiographyID',
      relation: 'WCSPROGRAMS_VegetationPhysiography',
      where: { WCSPROGRAMS_VegetationPhysiographyName: 'physiography' },
    })(state),
    // topography: dataValue('topography'),
    WCSPROGRAMS_VegetationTopographyID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationTopographyID',
      relation: 'WCSPROGRAMS_VegetationTopography',
      where: { WCSPROGRAMS_VegetationTopographyName: 'topography' },
    })(state),
    //obsevername: dataValue('obsevername'), //set as m:m table, see below
    start_time: dataValue('start_time'),
    surveydate: dataValue('surveydate'),
    Answer_ID: state.data.body_id,
    UserID_CR: '0', //TODO: Update User_ID and Address mappings?
    UserID_LM: '0',
  })(state);
});

//TODO: observername is a multi-select field; turn into an array in order to insert these m:m records
upsertMany(
  'WCSPROGRAMS_VegetationVegetationObserver',
  'Generated_ID',
  state => {
    const dataArray = state.data['observername'] || []; //TODO: turn select_multiple Kobo question into array
    return dataArray.map(async x => ({
      WCSPROGRAMS_VegetationObserverID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationObserverID',
        relation: 'WCSPROGRAMS_VegetationObserver',
        where: { WCSPROGRAMS_VegetationObserverName: x['observername'] },
      })(state), //select WCSPROGRAMS_VegetationObserverID from WCSPROGRAMS_VegetationObserver where WCSPROGRAMS_VegetationObserverName = observername
      WCSPROGRAMS_VegetationID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationID',
        relation: 'WCSPROGRAMS_Vegetation',
        where: { Answer_ID: state.data.body_id },
      })(state), //select WCSPROGRAMS_VegetationID from WCSPROGRAMS_Vegetation where Answer_ID = state.data.body_id
      Answer_ID: state.data.body_id,
      Generated_ID: state.data.body_id + x['observername'], //make sure this is setting correctly
      UserID_CR: '0', //TODO: Update User_ID and Address mappings?
      UserID_LM: '0',
    }));
  }
);

//TODO: ddriver is a multi-select field; turn into an array in order to insert these m:m records
upsertMany(
  'WCSPROGRAMS_VegetationVegetationDegradationDriver',
  'Generated_ID',
  state => {
    const dataArray = state.data['ddriver'] || []; //TODO: turn select_multiple Kobo question into array
    return dataArray.map(x => ({
      //WCSPROGRAMS_VegetationDegradationDriverID: ___ //select WCSPROGRAMS_VegetationDegradationDriverID from WCSPROGRAMS_VegetationDegradationDriver where WCSPROGRAMS_VegetationDegradationDriverName = ddriver
      //WCSPROGRAMS_VegetationID: ___ //select WCSPROGRAMS_VegetationID from WCSPROGRAMS_Vegetation where Answer_ID = state.data.body_id
      Answer_ID: state.data.body_id,
      Generated_ID: state.data.body_id + x['ddriver'], //make sure this is setting correctly
      UserID_CR: '0', //TODO: Update User_ID and Address mappings?
      UserID_LM: '0',
    }));
  }
);

upsertMany('WCSPROGRAMS_VegetationGrass', 'Generated_ID', state => {
  const dataArray = state.data['st_grass_repeat'] || [];
  return dataArray.map(async x => ({
    // grass_species: x['st_grass_repeat/grass_species'],
    WCSPROGRAMS_TaxaID: await findValue({
      uuid: 'WCSPROGRAMS_TaxaID',
      relation: 'WCSPROGRAMS_Taxa',
      where: { WCSPROGRAMS_TaxaName: x['st_grass_repeat/grass_species'] },
    })(state),
    noknown: x['st_grass_repeat/noknown'],
    grass_perc: x['st_grass_repeat/grass_perc'],
    grass_height: x['st_grass_repeat/grass_height'],
    //WCSPROGRAMS_VegetationGrassID: ___ //select WCSPROGRAMS_VegetationGrassID from WCSPROGRAMS_VegetationGrass where WCSPROGRAMS_VegetationGrassName = grass_species
    //WCSPROGRAMS_VegetationID: ___ //select WCSPROGRAMS_VegetationID from WCSPROGRAMS_Vegetation where Answer_ID = state.data.body_id
    Answer_ID: state.data.body_id,
    Generated_ID: state.data.body_id + x['st_grass_repeat/grass_species'],
    UserID_CR: '0', //TODO: Update User_ID and Address mappings?
    UserID_LM: '0',
  }));
});
upsertMany('WCSPROGRAMS_VegetationBrush', 'Generated_ID', state => {
  const dataArray = state.data['brush_repeat'] || [];
  return dataArray.map(async x => ({
    // brus_species: x['brush_repeat/brus_species'],
    WCSPROGRAMS_TaxaID: await findValue({
      uuid: 'WCSPROGRAMS_TaxaID',
      relation: 'WCSPROGRAMS_Taxa',
      where: { WCSPROGRAMS_TaxaName: x['brush_repeat/brus_species'] },
    })(state),
    brush_perc: x['brush_repeat/brush_perc'],
    //WCSPROGRAMS_VegetationBrushID: ___ //select WCSPROGRAMS_VegetationBrushID from WCSPROGRAMS_VegetationBrush where WCSPROGRAMS_VegetationBrushName = brus_species
    //WCSPROGRAMS_VegetationID: ___ //select WCSPROGRAMS_VegetationID from WCSPROGRAMS_Vegetation where Answer_ID = state.data.body_id
    Answer_ID: state.data.body_id,
    Generated_ID: state.data.body_id + x['brush_repeat/brus_species'],
    UserID_CR: '0', //TODO: Update User_ID and Address mappings?
    UserID_LM: '0',
  }));
});
upsertMany('WCSPROGRAMS_VegetationTrees', 'Generated_ID', state => {
  const dataArray = state.data['tree_repeat'] || [];
  return dataArray.map(async x => ({
    // shrub_species: x['tree_repeat/shrub_species'],
    WCSPROGRAMS_TaxaID: await findValue({
      uuid: 'WCSPROGRAMS_TaxaID',
      relation: 'WCSPROGRAMS_Taxa',
      where: { WCSPROGRAMS_TaxaName: x['tree_repeat/shrub_species'] },
    })(state),
    Specimen_no: x['tree_repeat/Specimen_no'],
    specimen_photo: x['tree_repeat/specimen_photo'],
    unlisted: x['tree_repeat/unlisted'],
    dbh: x['tree_repeat/dbh'],
    height: x['tree_repeat/height'],
    //WCSPROGRAMS_VegetationTreesID: ___ //select WCSPROGRAMS_VegetationTreesID from WCSPROGRAMS_VegetationTrees where WCSPROGRAMS_VegetationTreesCode = SpecimenNo
    //WCSPROGRAMS_VegetationID: ___ //select WCSPROGRAMS_VegetationID from WCSPROGRAMS_Vegetation where Answer_ID = state.data.body_id
    Answer_ID: state.data.body_id,
    Generated_ID: state.data.body_id + x['tree_repeat/Specimen_no'],
    UserID_CR: '0', //TODO: Update User_ID and Address mappings?
    UserID_LM: '0',
  }));
});
upsertMany('WCSPROGRAMS_VegetationBigTrees', 'Generated_ID', state => {
  const dataArray = state.data['tree_10cm'] || [];
  return dataArray.map(async x => ({
    // btspecies: x['tree_10cm/btspecies'],
    WCSPROGRAMS_TaxaID: await findValue({
      uuid: 'WCSPROGRAMS_TaxaID',
      relation: 'WCSPROGRAMS_Taxa',
      where: { WCSPROGRAMS_TaxaName: x['tree_10cm/btspecies'] },
    })(state),
    bspecimenNo: x['tree_10cm/bspecimenNo'],
    bspecimen_photo: x['tree_10cm/bspecimen_photo'],
    bunlisted: x['tree_10cm/bunlisted'],
    bdbh: x['tree_10cm/bdbh'],
    bheight: x['tree_10cm/bheight'],
    //WCSPROGRAMS_VegetationBigTreesID: ___ //select WCSPROGRAMS_VegetationBigTreesID from WCSPROGRAMS_VegetationBigTrees where WCSPROGRAMS_VegetationBigTreesCode = bspecimenNo
    //WCSPROGRAMS_VegetationID: ___ //select WCSPROGRAMS_VegetationID from WCSPROGRAMS_Vegetation where Answer_ID = state.data.body_id
    Answer_ID: state.data.body_id,
    Generated_ID: state.data.body_id + x['tree_10cm/bspecimenNo'],
    UserID_CR: '0', //TODO: Update User_ID and Address mappings?
    UserID_LM: '0',
  }));
});

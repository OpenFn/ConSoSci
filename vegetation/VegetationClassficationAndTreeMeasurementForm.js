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
upsert('WCSPROGRAMS_KoboData', 'DatasetUuidId', {
  DatasetName: dataValue('formName'),
  DatasetOwner: dataValue('formOwner'),
  DatasetUuidId: dataValue('_xform_id_string'),
  LastUpdateTime: new Date().toISOString(),
  KoboManaged: '1',
  //Payload: state.data.body,
  UserID_CR: '0', //TODO: Update User_ID and Address mappings?
  UserID_LM: '0',
  LastCheckedTime: new Date().toISOString()
});

alterState(async state => {
  return upsert('WCSPROGRAMS_Vegetation', 'Answer_ID', {
    //sbght: dataValue('sbght'),
    //sbdbh: dataValue('sbdbh'),
    //sght: dataValue('sght'),
    //sdbh: dataValue('sdbh'),
    //comments: dataValue('comments'),
    OutPlotArea: dataValue('out_plot_area'),
    OutPlotRadius: dataValue('out_plot_radius'),
    Tree3cm: dataValue('tree_3cm'),
    SbrushPer: dataValue('sbrush_per'),
    //shrubyes: dataValue('shrubyes'),
    InnerPlotArea: dataValue('inner_plot_area'),
    innerPlotRadius: dataValue('inner_plot_radius'),
    IsGrass: dataValue('grassyes'),
    CenterPlotArea: dataValue('center_plot_area'),
    CenterPlotRadius: dataValue('center_plot_radius'),
    Radius: dataValue('radius'),
    // plotClass: dataValue('plotClass'),
    WCSPROGRAMS_VegetationClassID_Other: await findValue({
      uuid: 'WCSPROGRAMS_VegetationClassID',
      relation: 'WCSPROGRAMS_VegetationClass',
      where: { WCSPROGRAMS_VegetationClassName: dataValue('plotClass')(state) },
    })(state),
    IsVegClassSame: dataValue('vegClass_same'),
    // Cropstatus: dataValue('Cropstatus'),
    WCSPROGRAMS_VegetationCropStatusID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationCropStatusID',
      relation: 'WCSPROGRAMS_VegetationCropStatus',
      where: { WCSPROGRAMS_VegetationCropStatusName: dataValue('Cropstatus')(state) },
    })(state),
    YearPlanted: dataValue('Year'),
    //ddriver: dataValue('ddriver'), //set as m:m table, see below
    WCSPROGRAMS_VegetationDegradationDriverID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationDegradationDriverID',
      relation: 'WCSPROGRAMS_VegetationDegradatationDriver',
      where: { WCSPROGRAMS_VegetationDegradatationDriverName: dataValue('ddriver')(state) },
    })(state),
    // forest_type: dataValue('forest_type'),
    WCSPROGRAMS_VegetationForestTypeID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationForestTypeID',
      relation: 'WCSPROGRAMS_VegetationForestType',
      where: { WCSPROGRAMS_VegetationForestTypeName: dataValue('forest_type')(state) },
    })(state),
    // vegclass: dataValue('vegclass'),
    WCSPROGRAMS_VegetationClassID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationClassID',
      relation: 'WCSPROGRAMS_VegetationClass',
      where: { WCSPROGRAMS_VegetationClassName: dataValue('vegclass')(state) },
    })(state),
    // Ownership: dataValue('Ownership'),
    WCSPROGRAMS_VegetationOwnershipID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationOwnershipID',
      relation: 'WCSPROGRAMS_VegetationOwnership',
      where: { WCSPROGRAMS_VegetationOwnershipName: dataValue('Ownership')(state) },
    })(state),
    // rzon: dataValue('rzon'),
    WCSPROGRAMS_VegetationFireReasonID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationFireReasonID',
      relation: 'WCSPROGRAMS_VegetationFireReason',
      where: { WCSPROGRAMS_VegetationFireReasonName: dataValue('rzon')(state) },
    })(state),
    // cause: dataValue('cause'),
    WCSPROGRAMS_VegetationFireCauseID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationFireCauseID',
      relation: 'WCSPROGRAMS_VegetationFireCause',
      where: { WCSPROGRAMS_VegetationFireCauseName: dataValue('cause')(state) },
    })(state),
    NumberOfTreesKilled: dataValue('no.trees'),
    Age: dataValue('age'),
    PlotBurnt: dataValue('plot_burnt'),
    IsEvidenceOfFire: dataValue('fire'),
    Bareground: dataValue('bareground'),
    // seasonality: dataValue('seasonality'),
    WCSPROGRAMS_VegetationSoilSeasonalityID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationSeasonalityID',
      relation: 'WCSPROGRAMS_VegetationSeasonality',
      where: { WCSPROGRAMS_VegetationSeasonalityName: dataValue('seasonality')(state) },
    })(state),
    // erodability: dataValue('erodability'),
    WCSPROGRAMS_VegetationSoilErodabilityID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationSoilErodabilityID',
      relation: 'WCSPROGRAMS_VegetationSoilErodability',
      where: { WCSPROGRAMS_VegetationSoilErodabilityName: dataValue('erodability')(state) },
    })(state),
    // moisture: dataValue('moisture'),
    WCSPROGRAMS_VegetationSoilMoistureID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationSoilMoistureID',
      relation: 'WCSPROGRAMS_VegetationSoilMoisture',
      where: { WCSPROGRAMS_VegetationSoilMoistureName: dataValue('moisture')(state) },
    })(state),
    // colour: dataValue('colour'),
    WCSPROGRAMS_VegetationSoilColorID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationSoilColorID',
      relation: 'WCSPROGRAMS_VegetationSoilColor',
      where: { WCSPROGRAMS_VegetationSoilColorName: dataValue('colour') },
    })(state),
    // description: dataValue('description'),
    WCSPROGRAMS_VegetationSoilDescriptionID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationSoilDescriptionID',
      relation: 'WCSPROGRAMS_VegetationSoilDescription',
      where: { WCSPROGRAMS_VegetationSoilDescriptionName: dataValue('description')(state) },
    })(state),
    North: dataValue('north'),
    East: dataValue('east'),
    Waypoint: dataValue('waypoint'),
    PlotGPS: dataValue('plot_gps'),
    PlotNumber: dataValue('plot_number'),
    TransectNo: dataValue('transect_no'),
    SurveySite: dataValue('name'),
    District: dataValue('district'),
    // drainage: dataValue('drainage'),
    WCSPROGRAMS_VegetationDrainageID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationDrainageID',
      relation: 'WCSPROGRAMS_VegetationDrainage',
      where: { WCSPROGRAMS_VegetationDrainageName: dataValue('drainage')(state) },
    })(state),
    // physiography: dataValue('physiography'),
    WCSPROGRAMS_VegetationPhysiographyID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationPhysiographyID',
      relation: 'WCSPROGRAMS_VegetationPhysiography',
      where: { WCSPROGRAMS_VegetationPhysiographyName: dataValue('physiography')(state) },
    })(state),
    // topography: dataValue('topography'),
    WCSPROGRAMS_VegetationTopographyID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationTopographyID',
      relation: 'WCSPROGRAMS_VegetationTopography',
      where: { WCSPROGRAMS_VegetationTopographyName: dataValue('topography')(state) },
    })(state),
    //obsevername: dataValue('obsevername'), //set as m:m table, see below
    StartTime: dataValue('start_time'),
    surveydate: dataValue('surveydate'),
    Answer_ID: state.data.body_id,
    UserID_CR: '0', //TODO: Update User_ID and Address mappings?
    UserID_LM: '0',
  })(state);
});

//TODO: If no dataArray source dataValue defined, returns SyntaxError: Unexpected token (212:55)
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
      })(state),
      WCSPROGRAMS_VegetationID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationID',
        relation: 'WCSPROGRAMS_Vegetation',
        where: { Answer_ID: state.data.body_id },
      })(state),
      Answer_ID: state.data.body_id,
      Generated_ID: state.data.body_id + x['observername'], //make sure this is setting correctly
      UserID_CR: '0', //TODO: Update User_ID and Address mappings?
      UserID_LM: '0',
    }));
  }
);

/*
//TODO: If no `ddriver`, returns SyntaxError: Unexpected token (212:55)
//https://openfn.org/projects/p5x4g4/runs/r5ed88xj
upsertMany(
  'WCSPROGRAMS_VegetationVegetationDegradationDriver',
  'Generated_ID',
  state => {
    const dataArray = state.data['ddriver'] || []; //TODO: turn select_multiple Kobo question into array
    return dataArray.map(x => ({
      WCSPROGRAMS_VegetationDegradationDriverID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationDegradationDriverID',
        relation: 'WCSPROGRAMS_VegetationDegradationDriver',
        where: { WCSPROGRAMS_VegetationDegradationDriverName: x['ddriver'] },
      })(state),
      WCSPROGRAMS_VegetationID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationID',
        relation: 'WCSPROGRAMS_Vegetation',
        where: { Answer_ID: state.data.body_id },
      })(state),
      Answer_ID: state.data.body_id,
      Generated_ID: state.data.body_id + x['ddriver'], //make sure this is setting correctly
      UserID_CR: '0', //TODO: Update User_ID and Address mappings?
      UserID_LM: '0',
    }));
  }
); */

//TODO: If no dataArray source dataValue defined, returns SyntaxError: Unexpected token (212:55)
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
    grassPerc: x['st_grass_repeat/grass_perc'],
    grassHeight: x['st_grass_repeat/grass_height'],
    WCSPROGRAMS_VegetationGrassID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationGrassID',
      relation: 'WCSPROGRAMS_VegetationGrass',
      where: { WCSPROGRAMS_VegetationGrassName: x['st_grass_repeat/grass_species'] },
    })(state),
    WCSPROGRAMS_VegetationID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationID',
      relation: 'WCSPROGRAMS_Vegetation',
      where: { Answer_ID: state.data.body_id },
    })(state),
    Answer_ID: state.data.body_id,
    Generated_ID: state.data.body_id + x['st_grass_repeat/grass_species'],
    UserID_CR: '0', //TODO: Update User_ID and Address mappings?
    UserID_LM: '0',
  }));
});

//TODO: If no dataArray source dataValue defined, returns SyntaxError: Unexpected token (212:55)
upsertMany('WCSPROGRAMS_VegetationBrush', 'Generated_ID', state => {
  const dataArray = state.data['brush_repeat'] || [];
  return dataArray.map(async x => ({
    // brus_species: x['brush_repeat/brus_species'],
    WCSPROGRAMS_TaxaID: await findValue({
      uuid: 'WCSPROGRAMS_TaxaID',
      relation: 'WCSPROGRAMS_Taxa',
      where: { WCSPROGRAMS_TaxaName: x['brush_repeat/brus_species'] },
    })(state),
    brushPerc: x['brush_repeat/brush_perc'],
    WCSPROGRAMS_VegetationBrushID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationBrushID',
      relation: 'WCSPROGRAMS_VegetationBrush',
      where: { WCSPROGRAMS_VegetationBrushName: x['brush_repeat/brus_species'] },
    })(state),
    WCSPROGRAMS_VegetationID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationID',
      relation: 'WCSPROGRAMS_Vegetation',
      where: { Answer_ID: state.data.body_id },
    })(state),
    Answer_ID: state.data.body_id,
    Generated_ID: state.data.body_id + x['brush_repeat/brus_species'],
    UserID_CR: '0', //TODO: Update User_ID and Address mappings?
    UserID_LM: '0',
  }));
});

//TODO: If no dataArray source dataValue defined, returns SyntaxError: Unexpected token (212:55)
upsertMany('WCSPROGRAMS_VegetationTrees', 'Generated_ID', state => {
  const dataArray = state.data['tree_repeat'] || [];
  return dataArray.map(async x => ({
    // shrub_species: x['tree_repeat/shrub_species'],
    WCSPROGRAMS_TaxaID: await findValue({
      uuid: 'WCSPROGRAMS_TaxaID',
      relation: 'WCSPROGRAMS_Taxa',
      where: { WCSPROGRAMS_TaxaName: x['tree_repeat/shrub_species'] },
    })(state),
    SpecimenNo: x['tree_repeat/Specimen_no'],
    specimenPhoto: x['tree_repeat/specimen_photo'],
    unlisted: x['tree_repeat/unlisted'],
    dbh: x['tree_repeat/dbh'],
    height: x['tree_repeat/height'],
    WCSPROGRAMS_VegetationTreesID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationTreesID',
      relation: 'WCSPROGRAMS_VegetationTrees',
      where: { WCSPROGRAMS_VegetationTreesCode: x['tree_repeat/Specimen_no'] },
    })(state),
    WCSPROGRAMS_VegetationID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationID',
      relation: 'WCSPROGRAMS_Vegetation',
      where: { Answer_ID: state.data.body_id },
    })(state),
    Answer_ID: state.data.body_id,
    Generated_ID: state.data.body_id + x['tree_repeat/Specimen_no'],
    UserID_CR: '0', //TODO: Update User_ID and Address mappings?
    UserID_LM: '0',
  }));
});

//TODO: If no dataArray source dataValue defined, returns SyntaxError: Unexpected token (212:55)
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
    bspecimenPhoto: x['tree_10cm/bspecimen_photo'],
    bunlisted: x['tree_10cm/bunlisted'],
    bdbh: x['tree_10cm/bdbh'],
    bheight: x['tree_10cm/bheight'],
    WCSPROGRAMS_VegetationBigTreesID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationBigTreesID',
      relation: 'WCSPROGRAMS_VegetationBigTrees',
      where: { WCSPROGRAMS_VegetationBigTreesCode: x['tree_10cm/bspecimenNo'] },
    })(state),
    WCSPROGRAMS_VegetationID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationID',
      relation: 'WCSPROGRAMS_Vegetation',
      where: { Answer_ID: state.data.body_id },
    })(state),
    Answer_ID: state.data.body_id,
    Generated_ID: state.data.body_id + x['tree_10cm/bspecimenNo'],
    UserID_CR: '0', //TODO: Update User_ID and Address mappings?
    UserID_LM: '0',
  }));
});

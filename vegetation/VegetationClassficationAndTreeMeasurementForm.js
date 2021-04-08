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

alterState(state => {
  const handleValue = value => {
    if (value) return value.replace(/_/g, ' ');
  };
  return { ...state, handleValue };
});

/* upsert('WCSPROGRAMS__KoboDataset', 'DatasetId', {
  DatasetName: dataValue('$.body.formName'),
  DatasetOwner: dataValue('$.body.formOwner'),
  DatasetUuidId: dataValue('$.body._xform_id_string'),
  LastUpdateTime: new Date().toISOString(),
  KoboManaged: '1',
  //Payload: state.data.body,
  UserID_CR: '0', //TODO: Update User_ID and Address mappings?
  UserID_LM: '0',
}); */

alterState(async state => {
  const mapping = {
    // Sbght: dataValue('$.body.sbght'), // TO VERIFY
    // Sbdbh: dataValue('$.body.sbdbh'), // TO VERIFY
    // Sght: dataValue('$.body.sght'), // TO VERIFY
    // Sdbh: dataValue('$.body.sdbh'), // TO VERIFY
    // comments: dataValue('$.body.comments'), // TO VERIFY
    // OutPlotArea: dataValue('$.body.out_plot_area'), // TO VERIFY
    // OutPlotRadius: dataValue('$.body.out_plot_radius'), // TO VERIFY
    // Tree3Cm: dataValue('$.body.tree_3cm'), // TO VERIFY
    // SbrushPer: dataValue('$.body.sbrush_per'), // TO VERIFY
    // shrubyes: dataValue('$.body.shrubyes'), // TO VERIFY
    // InnerPlotArea: dataValue('$.body.inner_plot_area'), // TO VERIFY
    // InnerPlotRadius: dataValue('$.body.inner_plot_radius'), // TO VERIFY
    // grassyes: dataValue('$.body.grassyes'), // TO VERIFY
    // CenterPlotArea: dataValue('$.body.center_plot_area'), // TO VERIFY
    // CenterPlotRadius: dataValue('$.body.center_plot_radius'), // TO VERIFY
    Radius: dataValue('$.body.radius'),
    // plotClass: dataValue('$.body.plotClass'),
    WCSPROGRAMS_VegetationClassID_Other: await findValue({
      uuid: 'WCSPROGRAMS_VegetationClassID',
      relation: 'WCSPROGRAMS_VegetationClass',
      where: {
        WCSPROGRAMS_VegetationClassName: state.handleValue(
          dataValue('$.body.plotClass')(state)
        ),
      },
    })(state),
    IsVegClassSame: dataValue('$.body.vegClass_same'),
    // Cropstatus: dataValue('$.body.Cropstatus'),
    WCSPROGRAMS_VegetationCropStatusID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationCropStatusID',
      relation: 'WCSPROGRAMS_VegetationCropStatus',
      where: {
        WCSPROGRAMS_VegetationCropStatusName: state.handleValue(
          dataValue('$.body.Cropstatus')(state)
        ),
      },
    })(state),
    YearPlanted: dataValue('$.body.Year'),
    //ddriver: dataValue('$.body.ddriver'), //set as m:m table, see below
    // forest_type: dataValue('$.body.forest_type'),
    WCSPROGRAMS_VegetationForestTypeID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationForestTypeID',
      relation: 'WCSPROGRAMS_VegetationForestType',
      where: {
        WCSPROGRAMS_VegetationForestTypeName: state.handleValue(
          dataValue('$.body.forest_type')(state)
        ),
      },
    })(state),
    // vegclass: dataValue('$.body.vegclass'),
    WCSPROGRAMS_VegetationClassID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationClassID',
      relation: 'WCSPROGRAMS_VegetationClass',
      where: {
        WCSPROGRAMS_VegetationClassName: state.handleValue(
          dataValue('$.body.vegclass')(state)
        ),
      },
    })(state),
    // Ownership: dataValue('$.body.Ownership'),
    WCSPROGRAMS_VegetationOwnershipID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationOwnershipID',
      relation: 'WCSPROGRAMS_VegetationOwnership',
      where: {
        WCSPROGRAMS_VegetationOwnershipName: state.handleValue(
          dataValue('$.body.Ownership')(state)
        ),
      },
    })(state),
    // rzon: dataValue('$.body.rzon'),
    WCSPROGRAMS_VegetationFireReasonID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationFireReasonID',
      relation: 'WCSPROGRAMS_VegetationFireReason',
      where: {
        WCSPROGRAMS_VegetationFireReasonName: state.handleValue(
          dataValue('$.body.rzon')(state)
        ),
      },
    })(state),
    // cause: dataValue('$.body.cause'),
    WCSPROGRAMS_VegetationFireCauseID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationFireCauseID',
      relation: 'WCSPROGRAMS_VegetationFireCause',
      where: {
        WCSPROGRAMS_VegetationFireCauseName: state.handleValue(
          dataValue('$.body.cause')(state)
        ),
      },
    })(state),
    // no.trees: dataValue('$.body.no.trees'),
    // Age: dataValue('$.body.age'), // TO VERIFY
    PlotBurnt: dataValue('$.body.plot_burnt'),
    IsEvidenceOfFire: dataValue('$.body.fire'),
    Bareground: dataValue('$.body.bareground'),
    // seasonality: dataValue('$.body.seasonality'),
    WCSPROGRAMS_VegetationSoilSeasonalityID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationSoilSeasonalityID',
      relation: 'WCSPROGRAMS_VegetationSoilSeasonality',
      where: {
        WCSPROGRAMS_VegetationSoilSeasonalityName: state.handleValue(
          dataValue('$.body.seasonality')(state)
        ),
      },
    })(state),
    // erodability: dataValue('$.body.erodability'),
    WCSPROGRAMS_VegetationSoilErodabilityID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationSoilErodabilityID',
      relation: 'WCSPROGRAMS_VegetationSoilErodability',
      where: {
        WCSPROGRAMS_VegetationSoilErodabilityName: state.handleValue(
          dataValue('$.body.erodability')(state)
        ),
      },
    })(state),
    // moisture: dataValue('$.body.moisture'),
    WCSPROGRAMS_VegetationSoilMoistureID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationSoilMoistureID',
      relation: 'WCSPROGRAMS_VegetationSoilMoisture',
      where: {
        WCSPROGRAMS_VegetationSoilMoistureName: state.handleValue(
          dataValue('$.body.moisture')(state)
        ),
      },
    })(state),
    // colour: dataValue('$.body.colour'),
    WCSPROGRAMS_VegetationSoilColorID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationSoilColorID',
      relation: 'WCSPROGRAMS_VegetationSoilColor',
      where: {
        WCSPROGRAMS_VegetationSoilColorName: state.handleValue(
          dataValue('$.body.colour')(state)
        ),
      },
    })(state),
    // description: dataValue('$.body.description'),
    WCSPROGRAMS_VegetationSoilDescriptionID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationSoilDescriptionID',
      relation: 'WCSPROGRAMS_VegetationSoilDescription',
      where: {
        WCSPROGRAMS_VegetationSoilDescriptionName: state.handleValue(
          dataValue('$.body.description')(state)
        ),
      },
    })(state),
    North: dataValue('$.body.north'),
    East: dataValue('$.body.east'),
    Waypoint: dataValue('$.body.waypoint'),
    // PlotGPS: dataValue('$.body.plot_gps'),
    PlotNumber: dataValue('$.body.plot_number'),
    TransectNo: dataValue('$.body.transect_no'),
    // name: dataValue('$.body.name'),
    // district: dataValue('$.body.district'),
    // drainage: dataValue('$.body.drainage'),
    WCSPROGRAMS_VegetationDrainageID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationDrainageID',
      relation: 'WCSPROGRAMS_VegetationDrainage',
      where: {
        WCSPROGRAMS_VegetationDrainageName: state.handleValue(
          dataValue('$.body.drainage')(state)
        ),
      },
    })(state),
    // physiography: dataValue('$.body.physiography'),
    WCSPROGRAMS_VegetationPhysiographyID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationPhysiographyID',
      relation: 'WCSPROGRAMS_VegetationPhysiography',
      where: {
        WCSPROGRAMS_VegetationPhysiographyName: state.handleValue(
          dataValue('$.body.physiography')(state)
        ),
      },
    })(state),
    // topography: dataValue('$.body.topography'),
    WCSPROGRAMS_VegetationTopographyID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationTopographgyID',
      relation: 'WCSPROGRAMS_VegetationTopographgy',
      where: {
        WCSPROGRAMS_VegetationTopographgyName: state.handleValue(
          dataValue('$.body.topography')(state)
        ),
      },
    })(state),
    //obsevername: dataValue('$.body.obsevername'), //set as m:m table, see below
    StartTime: dataValue('$.body.start_time'),
    Surveydate: dataValue('$.body.general_observations/surveydate'),
    Answer_ID: state.data.body_id,
    UserID_CR: '0', //TODO: Update User_ID and Address mappings?
    UserID_LM: '0',
  };
  console.log(mapping);
  return upsert('WCSPROGRAMS_Vegetation', 'Answer_ID', mapping)(state);
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
        where: {
          WCSPROGRAMS_VegetationObserverName: state.handleValue(x['observername']),
        },
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

upsertMany('WCSPROGRAMS_VegetationVegetationGrass', 'Generated_ID', state => {
  const dataArray = state.data['st_grass_repeat'] || [];
  return dataArray.map(async x => ({
    // grass_species: x['st_grass_repeat/grass_species'],
    WCSPROGRAMS_TaxaID: await findValue({
      uuid: 'WCSPROGRAMS_TaxaID',
      relation: 'WCSPROGRAMS_Taxa',
      where: {
        WCSPROGRAMS_TaxaName: state.handleValue(x['st_grass_repeat/grass_species']),
      },
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
upsertMany('WCSPROGRAMS_VegetationVegetationBrush', 'Generated_ID', state => {
  const dataArray = state.data['brush_repeat'] || [];
  return dataArray.map(async x => ({
    // brus_species: x['brush_repeat/brus_species'],
    WCSPROGRAMS_TaxaID: await findValue({
      uuid: 'WCSPROGRAMS_TaxaID',
      relation: 'WCSPROGRAMS_Taxa',
      where: {
        WCSPROGRAMS_TaxaName: state.handleValue(x['brush_repeat/brus_species']),
      },
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
      where: {
        WCSPROGRAMS_TaxaName: state.handleValue(x['tree_repeat/shrub_species']),
      },
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
upsertMany(
  'WCSPROGRAMS_VegetationVegetationBigTrees',
  'Generated_ID',
  state => {
    const dataArray = state.data['tree_10cm'] || [];
    return dataArray.map(async x => ({
      // btspecies: x['tree_10cm/btspecies'],
      WCSPROGRAMS_TaxaID: await findValue({
        uuid: 'WCSPROGRAMS_TaxaID',
        relation: 'WCSPROGRAMS_Taxa',
        where: { WCSPROGRAMS_TaxaName: state.handleValue(x['tree_10cm/btspecies']) },
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
  }
);

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
  

  const physiography = state.data.body.physiography; 
  const newphysio = physiography==='flat' ? 'Plain (flat)' : physiography==='plain' ? 'Plain (undulating)' : physiography; 
  state.data.body.physiography = newphysio; 
  
  state.data.body.drainage = state.data.body.drainage==='welldrained' ? 'Well drained' : drainage; 
  state.data.body.age = !state.data.body.age ? 'Other' : state.data.body.age; 

  state.data = { ...state.data, ...state.data.body, ...state.data.body.physiography, ...state.data.body.drainage, ...state.data.body.age };
  return state;
});

alterState(state => {
  const handleValue = value => {
    if (value) return value.replace(/_/g, ' ');
  };
  const convertValue = value => {
    return value==='yes' ? 1 : 0;
  };
  return { ...state, handleValue, convertValue };
});

upsert('WCSPROGRAMS_KoboData', 'DatasetUuidId', {
  DatasetName: dataValue('formName'),
  DatasetOwner: dataValue('formOwner'),
  DatasetUuidId: dataValue('$.body._xform_id_string'),
  LastUpdateTime: new Date().toISOString(),
  KoboManaged: '1',
  //Payload: state.data.body,
  UserID_CR: '0', //TODO: Update User_ID and Address mappings?
  UserID_LM: '0',
  LastCheckedTime: new Date().toISOString()
});

alterState(async state => {
  const mapping = {
    WCSPROGRAMS_VegetationName: dataValue('formName'),
    //OutPlotArea: dataValue('out_plot_area'), //TODO: CONFIGURE COLUMN
    //OutPlotRadius: dataValue('out_plot_radius'), //TODO: CONFIGURE COLUMN
    //Tree3cm: dataValue('tree_3cm'), //TODO: CONFIGURE COLUMN
    //SbrushPer: dataValue('sbrush_per'), //TODO: CONFIGURE COLUMN
    //InnerPlotArea: dataValue('inner_plot_area'), //TODO: CONFIGURE COLUMN
    //innerPlotRadius: dataValue('inner_plot_radius'), //TODO: CONFIGURE COLUMN
    IsGrass: state.convertValue(dataValue('grassyes')(state)),
    //CenterPlotArea: dataValue('center_plot_area'), //TODO: CONFIGURE COLUMN
    //CenterPlotRadius: dataValue('center_plot_radius'), //TODO: CONFIGURE COLUMN
    Radius: dataValue('radius'),
    WCSPROGRAMS_VegetationClassID_Other: await findValue({
      uuid: 'WCSPROGRAMS_VegetationClassID',
      relation: 'WCSPROGRAMS_VegetationClass',
      where: { WCSPROGRAMS_VegetationClassName: dataValue('plotClass')(state) },
    })(state),
    IsVegClassSame: state.convertValue(dataValue('vegClass_same')(state)),
    WCSPROGRAMS_VegetationCropStatusID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationCropStatusID',
      relation: 'WCSPROGRAMS_VegetationCropStatus',
      where: {
        WCSPROGRAMS_VegetationCropStatusName: dataValue('Cropstatus')(state),
      },
    })(state),
    YearPlanted: dataValue('Year'),
    YearPlanted: dataValue('$.body.Year'),
    WCSPROGRAMS_VegetationForestTypeID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationForestTypeID',
      relation: 'WCSPROGRAMS_VegetationForestType',
      where: {
        WCSPROGRAMS_VegetationForestTypeName: state.handleValue(
          dataValue('$.body.forest_type')(state)
        ),
      },
    })(state),
    WCSPROGRAMS_VegetationClassID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationClassID',
      relation: 'WCSPROGRAMS_VegetationClass',
      where: {
        WCSPROGRAMS_VegetationClassName: state.handleValue(
          dataValue('$.body.vegclass')(state)
        ),
      },
    })(state),
    WCSPROGRAMS_VegetationOwnershipID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationOwnershipID',
      relation: 'WCSPROGRAMS_VegetationOwnership',
      where: {
        WCSPROGRAMS_VegetationOwnershipName: state.handleValue(
          dataValue('$.body.Ownership')(state)
        ),
      },
    })(state),
    WCSPROGRAMS_VegetationFireReasonID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationFireReasonID',
      relation: 'WCSPROGRAMS_VegetationFireReason',
      where: {
        WCSPROGRAMS_VegetationFireReasonName: state.handleValue(
          dataValue('$.body.rzon')(state)
        ),
      },
    })(state),
    WCSPROGRAMS_VegetationFireCauseID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationFireCauseID',
      relation: 'WCSPROGRAMS_VegetationFireCause',
      where: {
        WCSPROGRAMS_VegetationFireCauseName: state.handleValue(
          dataValue('$.body.cause')(state)
        ),
      },
    })(state),
    NumberOfTreesKilled: dataValue('no.trees'),
    WCSPROGRAMS_VegetationAgeID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationAgeID',
      relation: 'WCSPROGRAMS_VegetationAge',
      where: {
        WCSPROGRAMS_VegetationAgeName: state.handleValue(
          dataValue('$.body.age')(state)),
      },
    })(state),
    PlotBurnt: dataValue('$.body.plot_burnt'),
    IsEvidenceOfFire: state.convertValue(dataValue('$.body.fire')(state)),
    Bareground: dataValue('$.body.bareground'),
    WCSPROGRAMS_VegetationSoilSeasonalityID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationSoilSeasonalityID',
      relation: 'WCSPROGRAMS_VegetationSoilSeasonality',
      where: {
        WCSPROGRAMS_VegetationSoilSeasonalityName: state.handleValue(
          dataValue('$.body.seasonality')(state)
        ),
      },
    })(state),
    WCSPROGRAMS_VegetationSoilErodabilityID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationSoilErodabilityID',
      relation: 'WCSPROGRAMS_VegetationSoilErodability',
      where: {
        WCSPROGRAMS_VegetationSoilErodabilityName: state.handleValue(
          dataValue('$.body.erodability')(state)
        ),
      },
    })(state),
    WCSPROGRAMS_VegetationSoilMoistureID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationSoilMoistureID',
      relation: 'WCSPROGRAMS_VegetationSoilMoisture',
      where: {
        WCSPROGRAMS_VegetationSoilMoistureName: state.handleValue(
          dataValue('$.body.moisture')(state)
        ),
      },
    })(state),
    WCSPROGRAMS_VegetationSoilColorID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationSoilColorID',
      relation: 'WCSPROGRAMS_VegetationSoilColor',
      where: {
        WCSPROGRAMS_VegetationSoilColorName: state.handleValue(
          dataValue('$.body.colour')(state)
        ),
      },
    })(state),
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
    //PlotGPS: dataValue('$.body.plot_gps'), //TODO: CONFIGURE COLUMN
    Latitude: dataValue('_geolocation')[0] ? dataValue('_geolocation')[0] : 0, 
    Longitude: dataValue('_geolocation')[1] ? dataValue('_geolocation')[1] : 0, 
    PlotNumber: dataValue('$.body.plot_number'),
    TransectNo: dataValue('$.body.transect_no'),
    SurveySite: dataValue('$.body.name'),
    WCSPROGRAMS_VegetationDistrictID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationDistrictID',
      relation: 'WCSPROGRAMS_VegetationDistrict',
      where: {
        WCSPROGRAMS_VegetationDistrictName: state.handleValue(
          dataValue('$.body.district')(state)
        ),
      },
    })(state),
    WCSPROGRAMS_VegetationDrainageID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationDrainageID',
      relation: 'WCSPROGRAMS_VegetationDrainage',
      where: {
        WCSPROGRAMS_VegetationDrainageName: state.handleValue(
          dataValue('$.body.drainage')(state)
        ),
      },
    })(state),
    WCSPROGRAMS_VegetationPhysiographyID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationPhysiographyID',
      relation: 'WCSPROGRAMS_VegetationPhysiography',
      where: {
        WCSPROGRAMS_VegetationPhysiographyName: state.handleValue(
          dataValue('$.body.physiography')(state)
        ),
      },
    })(state),
    WCSPROGRAMS_VegetationTopographyID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationTopographgyID',
      relation: 'WCSPROGRAMS_VegetationTopographgy',
      where: {
        WCSPROGRAMS_VegetationTopographgyExtCode: state.handleValue(
          dataValue('$.body.topography')(state)
        ),
      },
    })(state),
    StartTime: dataValue('$.body.start_time'),
    SubmissionDate: dataValue('$.body._submission_time'),
    Surveydate: dataValue('$.body.surveydate'),
    Answer_ID: state.data.body._id,
    UserID_CR: '0', //TODO: Update User_ID and Address mappings?
    UserID_LM: '0',
  };
  console.log(mapping);
  return upsert('WCSPROGRAMS_Vegetation', 'Answer_ID', mapping)(state);
});

upsertMany(
  'WCSPROGRAMS_VegetationVegetationObserver',
  'Generated_ID',
  state => {
    const dataArray = state.data.body.observername || []; //turning select_multiple into an arrray
    return dataArray.map(async x => ({
      WCSPROGRAMS_VegetationObserverID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationObserverID',
        relation: 'WCSPROGRAMS_VegetationObserver',
        where: {
          WCSPROGRAMS_VegetationObserverName: state.handleValue(
            x['observername']
          ),
        },
      })(state), 
      WCSPROGRAMS_VegetationID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationID',
        relation: 'WCSPROGRAMS_Vegetation',
        where: { Answer_ID: state.data.body_id },
      })(state),
      Answer_ID: state.data.body._id,
      Generated_ID: state.data.body_id + x['observername'], //make sure this is setting correctly
      UserID_CR: '0', //TODO: Update User_ID and Address mappings?
      UserID_LM: '0',
    }));
  }
);

upsertMany(
  'WCSPROGRAMS_VegetationVegetationDegradationDriver',
  'Generated_ID',
  state => {
    const dataArray = state.data.body.ddriver || []; //Turning select_multiple Kobo question into array
    return dataArray.map(async x => ({
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
      Answer_ID: state.data.body._id,
      Generated_ID: state.data.body_id + x['ddriver'], //make sure this is setting correctly
      UserID_CR: '0', //TODO: Update User_ID and Address mappings?
      UserID_LM: '0',
    }));
  }
); 

upsertMany('WCSPROGRAMS_VegetationGrass', 'Generated_ID', state => {
  const dataArray = state.data.body.st_grass_repeat || [];
  return dataArray.map(async x => ({
    WCSPROGRAMS_TaxaID: await findValue({
      uuid: 'WCSPROGRAMS_TaxaID',
      relation: 'WCSPROGRAMS_Taxa',
      where: {
        WCSPROGRAMS_TaxaName: state.handleValue(
          x['st_grass_repeat/grass_species']
        ),
      },
    })(state),
    noknown: x['st_grass_repeat/noknown'],
    grassPerc: x['st_grass_repeat/grass_perc'],
    grassHeight: x['st_grass_repeat/grass_height'],
    WCSPROGRAMS_VegetationGrassID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationGrassID',
      relation: 'WCSPROGRAMS_VegetationGrass',
      where: {
        WCSPROGRAMS_VegetationGrassName: x['st_grass_repeat/grass_species'],
      },
    })(state),
    WCSPROGRAMS_VegetationID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationID',
      relation: 'WCSPROGRAMS_Vegetation',
      where: { Answer_ID: state.data.body_id },
    })(state),
    Answer_ID: state.data.body_id,
    Generated_ID: state.data.body._id + x['st_grass_repeat/grass_species'],
    UserID_CR: '0', //TODO: Update User_ID and Address mappings?
    UserID_LM: '0',
  }));
});

upsertMany('WCSPROGRAMS_VegetationBrush', 'Generated_ID', state => {
  const dataArray = state.data.body.brush_repeat || [];
  return dataArray.map(async x => ({
    WCSPROGRAMS_TaxaID: await findValue({
      uuid: 'WCSPROGRAMS_TaxaID',
      relation: 'WCSPROGRAMS_Taxa',
      where: {
        WCSPROGRAMS_TaxaName: state.handleValue(x['brush_repeat/brus_species']),
      },
    })(state),
    brushPerc: x['brush_repeat/brush_perc'],
    WCSPROGRAMS_VegetationBrushID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationBrushID',
      relation: 'WCSPROGRAMS_VegetationBrush',
      where: {
        WCSPROGRAMS_VegetationBrushName: x['brush_repeat/brus_species'],
      },
    })(state),
    WCSPROGRAMS_VegetationID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationID',
      relation: 'WCSPROGRAMS_Vegetation',
      where: { Answer_ID: state.data.body_id },
    })(state),
    Answer_ID: state.data.body._id,
    Generated_ID: state.data.body_id + x['brush_repeat/brus_species'],
    UserID_CR: '0', //TODO: Update User_ID and Address mappings?
    UserID_LM: '0',
  }));
});

upsertMany('WCSPROGRAMS_VegetationTrees', 'Generated_ID', state => {
  const dataArray = state.data.body.tree_repeat || [];
  return dataArray.map(async x => ({
    WCSPROGRAMS_TaxaID: await findValue({
      uuid: 'WCSPROGRAMS_TaxaID',
      relation: 'WCSPROGRAMS_Taxa',
      where: {
        WCSPROGRAMS_TaxaName: state.handleValue(x['tree_repeat/shrub_species']),
      },
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
    Answer_ID: state.data.body._id,
    Generated_ID: state.data.body_id + x['tree_repeat/Specimen_no'],
    UserID_CR: '0', //TODO: Update User_ID and Address mappings?
    UserID_LM: '0',
  }));
});

upsertMany('WCSPROGRAMS_VegetationBigTrees', 'Generated_ID', state => {
  const dataArray = state.data.body.tree_10cm || [];
  return dataArray.map(async x => ({
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
      where: {
        WCSPROGRAMS_VegetationBigTreesCode: state.handleValue(
          x['tree_10cm/bspecimenNo']
        ),
      },
    })(state),
    WCSPROGRAMS_VegetationID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationID',
      relation: 'WCSPROGRAMS_Vegetation',
      where: { Answer_ID: state.data.body_id },
    })(state),
    Answer_ID: state.data.body._id,
    Generated_ID: state.data.body_id + x['tree_10cm/bspecimenNo'],
    UserID_CR: '0', //TODO: Update User_ID and Address mappings?
    UserID_LM: '0',
  }));
});

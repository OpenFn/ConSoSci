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

  const drainage = state.data.body.drainage;
  state.data.body.drainage =
    state.data.body.drainage === 'welldrained' ? 'Well drained' : drainage;
  state.data.body.age = !state.data.body.age ? 'Other' : state.data.body.age;

  state.data = {
    ...state.data,
    ...state.data.body,
    ...state.data.body.drainage,
    ...state.data.body.age,
  };
  return state;
});

alterState(state => {
  const handleValue = value => {
    if (value) return value.replace(/_/g, ' ');
  };
  const convertValue = value => {
    return value === 'yes' ? 1 : 0;
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
  LastCheckedTime: new Date().toISOString(),
});

alterState(async state => {
  const mapping = {
    WCSPROGRAMS_VegetationName: dataValue('formName'),
    OutPlotArea: dataValue('$.body.out_plot_area'),
    OutPlotRadius: dataValue('$.body.out_plot_radius'),
    SbrushPer: dataValue('$.body.sbrush_per'),
    InnerPlotArea: dataValue('$.body.inner_plot_area'),
    innerPlotRadius: dataValue('$.body.inner_plot_radius'),
    IsGrass: state.convertValue(dataValue('$.body.grassyes')(state)),
    CenterPlotArea: dataValue('$.body.center_plot_area'),
    CenterPlotRadius: dataValue('$.body.center_plot_radius'),
    Radius: dataValue('$.body.radius'),
    WCSPROGRAMS_VegetationClassID_Other: await findValue({
      uuid: 'WCSPROGRAMS_VegetationClassID',
      relation: 'WCSPROGRAMS_VegetationClass',
      where: {
        WCSPROGRAMS_VegetationClassName: state.handleValue(
          dataValue('$.body.plotClass')(state)
        ),
      },
    })(state),
    IsVegClassSame: state.convertValue(
      dataValue('$.body.vegClass_same')(state)
    ),
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
          dataValue('$.body.age')(state)
        ),
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
        WCSPROGRAMS_VegetationSoilErodabilityExtCode: state.handleValue(
          dataValue('$.body.erodability')(state) || dataValue('$.body.groundtruthing/erodability')(state)
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
    Latitude: dataValue('$.body.plot_gps')[0]
      ? dataValue('$.body.plot_gps')[0]
      : 0,
    Longitude: dataValue('$.body.plot_gps')[1]
      ? dataValue('$.body.plot_gps')[1]
      : 0,
    // Latitude: dataValue('_geolocation')[0] ? dataValue('_geolocation')[0] : 0, //TODO: Confirm right geolocation mapping
    // Longitude: dataValue('_geolocation')[1] ? dataValue('_geolocation')[1] : 0,
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
        WCSPROGRAMS_VegetationPhysiographyExtCode: state.handleValue(
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

alterState(async state => {
  const dataArray = state.data.body.observername || []; //turning select_multiple into an arrray
  const observers = [];

  for (let data of dataArray) {
    observers.push({
      WCSPROGRAMS_VegetationObserverName: state.handleValue(
        data['observername']
      ),
      WCSPROGRAMS_VegetationObserverCode: data['observername'],
      WCSPROGRAMS_VegetationObserverExtCode: data['observername'],
      //Generated_ID: state.data.body._id + data['observername'], //make sure this is setting correctly
      UserID_CR: '0', //TODO: Update User_ID and Address mappings?
      UserID_LM: '0',
    });
  }
  return upsertMany(
    'WCSPROGRAMS_VegetationObserver',
    'WCSPROGRAMS_VegetationObserverExtCode',
    () => observers
  )(state);
});

alterState(async state => {
  const dataArray = state.data.body.observername || []; //turning select_multiple into an arrray
  const observers = [];

  for (let data of dataArray) {
    observers.push({
      WCSPROGRAMS_VegetationObserverID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationObserverID',
        relation: 'WCSPROGRAMS_VegetationObserver',
        where: {
          WCSPROGRAMS_VegetationObserverExtCode: data['observername'],
        },
      })(state),
      WCSPROGRAMS_VegetationID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationID',
        relation: 'WCSPROGRAMS_Vegetation',
        where: { Answer_ID: state.data.body._id },
      })(state),
      Answer_ID: state.data.body._id,
      Generated_ID: state.data.body._id + data['observername'], //make sure this is setting correctly
      UserID_CR: '0', //TODO: Update User_ID and Address mappings?
      UserID_LM: '0',
    });
  }
  return upsertMany(
    'WCSPROGRAMS_VegatationVegetationObserver',
    'Generated_ID',
    () => observers
  )(state);
});

alterState(async state => {
  const dataArray = state.data.body.ddriver || []; //Turning select_multiple Kobo question into array
  const degradation = [];

  for (let data of dataArray) {
    degradation.push({
      WCSPROGRAMS_VegetationDegradationDriverID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationDegradationDriverID',
        relation: 'WCSPROGRAMS_VegetationDegradationDriver',
        where: {
          WCSPROGRAMS_VegetationDegradationDriverName: state.handleValue(
            data['ddriver']
          ),
        },
      })(state),
      WCSPROGRAMS_VegetationID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationID',
        relation: 'WCSPROGRAMS_Vegetation',
        where: { Answer_ID: state.data.body._id },
      })(state),
      Answer_ID: state.data.body._id,
      Generated_ID: state.data.body._id + data['ddriver'], //make sure this is setting correctly
      UserID_CR: '0', //TODO: Update User_ID and Address mappings?
      UserID_LM: '0',
    });
  }

  return upsertMany(
    'WCSPROGRAMS_VegetationVegetationDegradationDriver',
    'Generated_ID',
    () => degradation
  )(state);
});

alterState(async state => {
  const dataArray = state.data.body.st_grass_repeat || [];
  const dataGrass = [];

  // Setting unique set==============================
  const uniqueGrass = Array.from(
    new Set(dataArray.map(tree => tree['st_grass_repeat/grass_species']))
  ).map(id => {
    return dataArray.find(c => id === c['st_grass_repeat/grass_species']);
  });
  //=================================================

  for (let data of uniqueGrass) {
    dataGrass.push({
      WCSPROGRAMS_TaxaID: await findValue({
        uuid: 'WCSPROGRAMS_TaxaID',
        relation: 'WCSPROGRAMS_Taxa',
        where: {
          ScientificName: state.handleValue(
            data['st_grass_repeat/grass_species']
          ),
        },
      })(state),
      UnknownSpeciesImage: data['st_grass_repeat/noknown'],
      GrassPercent: data['st_grass_repeat/grass_perc'],
      GrassHeight: data['st_grass_repeat/grass_height'],
      WCSPROGRAMS_VegetationGrassName: state.handleValue(
        data['st_grass_repeat/grass_species']
      ),
      WCSPROGRAMS_VegetationGrassCode: data['st_grass_repeat/grass_species'],
      AnswerId: state.data.body._id,
      Generated_ID: state.data.body._id + data['st_grass_repeat/grass_species'],
      UserID_CR: '0', //TODO: Update User_ID and Address mappings?
      UserID_LM: '0',
    });
  }

  return upsertMany(
    'WCSPROGRAMS_VegetationGrass',
    'WCSPROGRAMS_VegetationGrassCode',
    () => dataGrass
  )(state);
});

alterState(async state => {
  const dataArray = state.data.body.st_grass_repeat || [];
  const dataGrass = [];

  // Setting unique set==============================
  const uniqueGrass = Array.from(
    new Set(dataArray.map(tree => tree['st_grass_repeat/grass_species']))
  ).map(id => {
    return dataArray.find(c => id === c['st_grass_repeat/grass_species']);
  });
  //=================================================

  for (let data of uniqueGrass) {
    dataGrass.push({
      WCSPROGRAMS_VegatationID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationID',
        relation: 'WCSPROGRAMS_Vegetation',
        where: { Answer_ID: state.data.body._id },
      })(state),
      WCSPROGRAMS_VegetationGrassID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationGrassID',
        relation: 'WCSPROGRAMS_VegetationGrass',
        where: {
          WCSPROGRAMS_VegetationGrassName: state.handleValue(
            data['st_grass_repeat/grass_species']
          ),
        },
      })(state),
      Answer_ID: state.data.body._id,
      Generated_ID: state.data.body._id + data['st_grass_repeat/grass_species'],
      UserID_CR: '0', //TODO: Update User_ID and Address mappings?
      UserID_LM: '0',
    });
  }

  return upsertMany(
    'WCSPROGRAMS_VegatationVegetationGrass',
    'Generated_ID',
    () => dataGrass
  )(state);
});

alterState(async state => {
  const dataArray = state.data.body.brush_repeat || [];
  const brushRepeat = [];

  // Setting unique set==============================
  const uniqueBrush = Array.from(
    new Set(dataArray.map(tree => tree['brush_repeat/brus_species']))
  ).map(id => {
    return dataArray.find(c => id === c['brush_repeat/brus_species']);
  });
  //=================================================

  for (let data of dataArray) {
    brushRepeat.push({
      WCSPROGRAMS_TaxaID: await findValue({
        uuid: 'WCSPROGRAMS_TaxaID',
        relation: 'WCSPROGRAMS_Taxa',
        where: {
          ScientificName: state.handleValue(data['brush_repeat/brus_species']),
        },
      })(state),
      WCSPROGRAMS_VegetationBrushName: state.handleValue(
        data['brush_repeat/brus_species']
      ),
      WCSPROGRAMS_VegetationBrushCode: data['brush_repeat/brus_species'],
      LianaPercentage: data['brush_repeat/brush_perc'],
      AnswerId: state.data.body._id,
      //Generated_ID: state.data.body._id + data[''],
      UserID_CR: '0', //TODO: Update User_ID and Address mappings?
      UserID_LM: '0',
    });
  }

  return upsertMany(
    'WCSPROGRAMS_VegetationBrush', //QUESTION: We first insert 1 VegetationGrass record to find Taxa ID... and then a VegetationVegetationGrass record to link to Vegetation record?
    'WCSPROGRAMS_VegetationBrushCode',
    () => brushRepeat
  )(state);
});

alterState(async state => {
  const dataArray = state.data.body.brush_repeat || [];
  const brushRepeat = [];

  // Setting unique set==============================
  const uniqueBrush = Array.from(
    new Set(dataArray.map(tree => tree['brush_repeat/brus_species']))
  ).map(id => {
    return dataArray.find(c => id === c['brush_repeat/brus_species']);
  });
  //=================================================

  for (let data of uniqueBrush) {
    brushRepeat.push({
      WCSPROGRAMS_VegetationBrushID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationBrushID',
        relation: 'WCSPROGRAMS_VegetationBrush',
        where: {
          WCSPROGRAMS_VegetationBrushName: state.handleValue(
            data['brush_repeat/brus_species']
          ),
        },
      })(state),
      WCSPROGRAMS_VegatationID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationID',
        relation: 'WCSPROGRAMS_Vegetation',
        where: { Answer_ID: state.data.body._id },
      })(state),
      Answer_ID: state.data.body._id,
      Generated_ID: state.data.body._id + data['brush_repeat/brus_species'],
      UserID_CR: '0', //TODO: Update User_ID and Address mappings?
      UserID_LM: '0',
    });
  }
  return upsertMany(
    'WCSPROGRAMS_VegatationVegetationBrush',
    'Generated_ID',
    () => brushRepeat
  )(state);
});

alterState(async state => {
  const dataArray = state.data.body.tree_repeat || [];
  const treeRepeat = [];

  // Setting unique set==============================
  const uniqueTrees = Array.from(
    new Set(dataArray.map(tree => tree['tree_repeat/shrub_species']))
  ).map(id => {
    return dataArray.find(c => id === c['tree_repeat/shrub_species']);
  });
  //=================================================

  for (let data of uniqueTrees) {
    treeRepeat.push({
      WCSPROGRAMS_TaxaID: await findValue({
        uuid: 'WCSPROGRAMS_TaxaID',
        relation: 'WCSPROGRAMS_Taxa',
        where: {
          ScientificName: state.handleValue(data['tree_repeat/shrub_species']),
        },
      })(state),
      WCSPROGRAMS_VegetationTreesName: state.handleValue(
        data['tree_repeat/shrub_species']
      ),
      WCSPROGRAMS_VegetationTreesCode: data['tree_repeat/shrub_species'],
      AnswerId: state.data.body._id,
      Generated_ID: state.data.body._id + data['tree_repeat/shrub_species'],
      UserID_CR: '0', //TODO: Update User_ID and Address mappings?
      UserID_LM: '0',
      SpecimenNo: data['tree_repeat/Specimen_no'],
      SpecimenPhoto: data['tree_repeat/specimen_photo'],
      Dbh: data['tree_repeat/dbh'],
      Height: data['tree_repeat/height'],
      //unlisted: data['tree_repeat/bunlisted'],
    });
  }

  return upsertMany(
    'WCSPROGRAMS_VegetationTrees',
    'WCSPROGRAMS_VegetationTreesCode',
    () => treeRepeat
  )(state);
});

alterState(async state => {
  const dataArray = state.data.body.tree_repeat || [];
  const treeRepeat = [];

  // Setting unique set==============================
  const uniqueTrees = Array.from(
    new Set(dataArray.map(tree => tree['tree_10cm/btspecies']))
  ).map(id => {
    return dataArray.find(c => id === c['tree_10cm/btspecies']);
  });
  //=================================================

  for (let data of uniqueTrees) {
    treeRepeat.push({
      WCSPROGRAMS_VegetationTreesID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationTreesID',
        relation: 'WCSPROGRAMS_VegetationTrees',
        where: {
          WCSPROGRAMS_VegetationTreesCode: state.handleValue(
            data['tree_repeat/Specimen_no']
          ),
        },
      })(state),
      WCSPROGRAMS_VegetationID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationID',
        relation: 'WCSPROGRAMS_Vegetation',
        where: { Answer_ID: state.data.body._id },
      })(state),
      Answer_ID: state.data.body._id,
      Generated_ID: state.data.body._id + data['tree_repeat/Specimen_no'],
      UserID_CR: '0', //TODO: Update User_ID and Address mappings?
      UserID_LM: '0',
    });
  }
  return upsertMany(
    'WCSPROGRAMS_VegatationVegetationTrees',
    'Generated_ID',
    () => treeRepeat
  )(state);
});

alterState(async state => {
  const dataArray = state.data.body.tree_10cm || [];
  const tree10cm = [];

  // Setting unique set==============================
  const uniqueTrees = Array.from(
    new Set(dataArray.map(tree => tree['tree_10cm/btspecies']))
  ).map(id => {
    return dataArray.find(c => id === c['tree_10cm/btspecies']);
  });
  //=================================================

  for (let data of uniqueTrees) {
    tree10cm.push({
      WCSPROGRAMS_TaxaID: await findValue({
        uuid: 'WCSPROGRAMS_TaxaID',
        relation: 'WCSPROGRAMS_Taxa',
        where: {
          ScientificName: state.handleValue(data['tree_10cm/btspecies']),
        },
      })(state),
      WCSPROGRAMS_VegetationBigTreesName: state.handleValue(
        data['tree_10cm/btspecies']
      ),
      WCSPROGRAMS_VegetationBigTreesCode: data['tree_10cm/btspecies'],
      WCSPROGRAMS_VegetationBigTreesExtCode: data['tree_10cm/bspecimenNo'],
      AnswerId: state.data.body._id,
      //Generated_ID: state.data.body._id + data['tree_10cm/btspecies'],
      UserID_CR: '0', //TODO: Update User_ID and Address mappings?
      UserID_LM: '0',
      SpecimenNo: data['tree_10cm/bspecimenNo'],
      SpecimenPhoto: data['tree_10cm/bspecimen_photo'],
      //bunlisted: data['tree_10cm/bunlisted'],
      Dbh: data['tree_10cm/bdbh'],
      Height: data['tree_10cm/bheight'],
    });
  }

  return upsertMany(
    'WCSPROGRAMS_VegetationBigTrees',
    'WCSPROGRAMS_VegetationBigTreesExtCode',
    () => tree10cm
  )(state);
});

alterState(async state => {
  const dataArray = state.data.body.tree_10cm || [];
  const tree10cm = [];

  // Setting unique set==============================
  const uniqueTrees = Array.from(
    new Set(dataArray.map(tree => tree['tree_10cm/btspecies']))
  ).map(id => {
    return dataArray.find(c => id === c['tree_10cm/btspecies']);
  });
  //=================================================

  for (let data of uniqueTrees) {
    tree10cm.push({
      WCSPROGRAMS_VegetationBigTreesID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationBigTreesID',
        relation: 'WCSPROGRAMS_VegetationBigTrees',
        where: {
          WCSPROGRAMS_VegetationBigTreesCode: data['tree_10cm/btspecies'],
        },
      })(state),
      //WCSPROGRAMS_VegatationID: vegId,
      WCSPROGRAMS_VegatationID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationID',
        relation: 'WCSPROGRAMS_Vegetation',
        where: { Answer_ID: state.data.body._id },
      })(state),
      Answer_ID: state.data.body._id,
      Generated_ID: state.data.body._id + data['tree_10cm/btspecies'],
      UserID_CR: '0', //TODO: Update User_ID and Address mappings?
      UserID_LM: '0',
    });
  }
  return upsertMany(
    'WCSPROGRAMS_VegatationVegetationBigTrees',
    'Generated_ID',
    () => tree10cm
  )(state);
});

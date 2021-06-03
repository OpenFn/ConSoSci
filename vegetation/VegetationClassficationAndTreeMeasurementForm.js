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

  state.data.body.age = !state.data.body.age ? 'Other' : state.data.body.age;

  const physiography =
    dataValue('$.body.physiography')(state) ||
    dataValue('$.body.general_observations/physiography')(state);

  state.data.body.physiography =
    physiography === 'flat' ? 'plain' : physiography;

  state.data = {
    ...state.data,
    ...state.data.body,
    ...state.data.body.age,
    ...state.data.body.physiography,
  };
  return state;
});

alterState(state => {
  const handleValue = value => {
    if (value && value !== undefined && value !== 'undefined' && value !== '')
      return value ? value.toString().replace(/_/g, ' ') : value;
  };
  const convertValue = value => {
    return value === 'yes' ? 1 : 0;
  };

  state.surveydate =
    dataValue('$.body.surveydate')(state) &&
      dataValue('$.body.surveydate')(state) !== undefined
      ? dataValue('$.body.surveydate')(state)
      : dataValue('$.body.general_observations/surveydate')(state)
        ? dataValue('$.body.general_observations/surveydate')(state)
        : dataValue('$.body._submission_time')(state);

  state.starttime =
    dataValue('$.body.start_time')(state) &&
      dataValue('$.body.start_time')(state) !== undefined
      ? dataValue('$.body.start_time')(state)
      : dataValue('$.body.general_observations/start_time')(state) ||
      dataValue('$.body.plot_description/start_time')(state) ||
      dataValue('$.body._submission_time')(state);

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
    IsGrass: state.convertValue(
      dataValue('$.body.grassyes')(state) ||
      dataValue('$.body.plot_forest_area/grassyes')(state)
    ),
    CenterPlotArea: dataValue('$.body.center_plot_area'),
    CenterPlotRadius: dataValue('$.body.center_plot_radius'),
    Radius: dataValue('$.body.radius'),
    //ERROR: TO FIX ==========
    // Executing query: select WCSPROGRAMS_VegetationClassID from WCSPROGRAMS_VegetationClass where WCSPROGRAMS_VegetationClassName = 'undefined'
    // TypeError [Error]: value.replace is not a function
    //==========================
    // WCSPROGRAMS_VegetationClassID_Other: await findValue({
    //   uuid: 'WCSPROGRAMS_VegetationClassID',
    //   relation: 'WCSPROGRAMS_VegetationClass',
    //   where: {
    //     WCSPROGRAMS_VegetationClassName: state.handleValue(
    //       dataValue('$.body.plotClass')(state)
    //     ),
    //   },
    // })(state),
    IsVegClassSame: state.convertValue(
      dataValue('$.body.vegClass_same')(state)
    ),
    // WCSPROGRAMS_VegetationCropStatusID: await findValue({
    //   uuid: 'WCSPROGRAMS_VegetationCropStatusID',
    //   relation: 'WCSPROGRAMS_VegetationCropStatus',
    //   where: {
    //     WCSPROGRAMS_VegetationCropStatusName: state.handleValue(
    //       dataValue('$.body.Cropstatus')(state)
    //     ),
    //   },
    // })(state),
    YearPlanted: dataValue('$.body.Year'),
    WCSPROGRAMS_VegetationForestTypeID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationForestTypeID',
      relation: 'WCSPROGRAMS_VegetationForestType',
      where: {
        WCSPROGRAMS_VegetationForestTypeExtCode: state.handleValue(
          dataValue('$.body.forest_type')(state) ||
          dataValue('$.body.plot_forest_area/forest_type')(state) ||
          ''
        ),
      },
    })(state),
    WCSPROGRAMS_VegetationClassID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationClassID',
      relation: 'WCSPROGRAMS_VegetationClass',
      where: {
        WCSPROGRAMS_VegetationClassName: state.handleValue(
          dataValue('$.body.vegclass')(state) ||
          dataValue('$.body.plot_forest_area/vegclass')(state) ||
          ''
        ),
      },
    })(state),
    WCSPROGRAMS_VegetationOwnershipID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationOwnershipID',
      relation: 'WCSPROGRAMS_VegetationOwnership',
      where: {
        WCSPROGRAMS_VegetationOwnershipName: state.handleValue(
          dataValue('$.body.Ownership')(state) ||
          dataValue('$.body.plot_forest_area/Ownership')(state) ||
          ''
        ),
      },
    })(state),
    WCSPROGRAMS_VegetationFireReasonID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationFireReasonID',
      relation: 'WCSPROGRAMS_VegetationFireReason',
      where: {
        WCSPROGRAMS_VegetationFireReasonName: state.handleValue(
          dataValue('$.body.rzon')(state) ||
          dataValue('$.body.groundtruthing/rzon')(state) ||
          ''
        ),
      },
    })(state),
    WCSPROGRAMS_VegetationFireCauseID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationFireCauseID',
      relation: 'WCSPROGRAMS_VegetationFireCause',
      where: {
        WCSPROGRAMS_VegetationFireCauseName: state.handleValue(
          dataValue('$.body.cause')(state) ||
          dataValue('$.body.groundtruthing/cause')(state) ||
          ''
        ),
      },
    })(state),
    NumberOfTreesKilled: dataValue('no.trees'),
    WCSPROGRAMS_VegetationAgeID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationAgeID',
      relation: 'WCSPROGRAMS_VegetationAge',
      where: {
        WCSPROGRAMS_VegetationAgeName: state.handleValue(
          dataValue('$.body.age')(state) ||
          dataValue('$.body.groundtruthing/age')(state) ||
          ''
        ),
      },
    })(state),
    PlotBurnt: dataValue('$.body.plot_burnt'),
    IsEvidenceOfFire: state.convertValue(
      dataValue('$.body.fire')(state) ||
      dataValue('$.body.groundtruthing/fire')(state) ||
      ''
    ),
    Bareground: state => {
      return (
        dataValue('$.body.bareground')(state) ||
        dataValue('$.body.groundtruthing/bareground')(state)
      );
    },
    WCSPROGRAMS_VegetationSoilSeasonalityID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationSoilSeasonalityID',
      relation: 'WCSPROGRAMS_VegetationSoilSeasonality',
      where: {
        WCSPROGRAMS_VegetationSoilSeasonalityName: state.handleValue(
          dataValue('$.body.seasonality')(state) ||
          dataValue('$.body.groundtruthing/seasonality')(state) ||
          ''
        ),
      },
    })(state),
    WCSPROGRAMS_VegetationSoilErodabilityID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationSoilErodabilityID',
      relation: 'WCSPROGRAMS_VegetationSoilErodability',
      where: {
        WCSPROGRAMS_VegetationSoilErodabilityExtCode: state.handleValue(
          dataValue('$.body.erodability')(state) ||
          dataValue('$.body.groundtruthing/erodability')(state) ||
          ''
        ),
      },
    })(state),
    WCSPROGRAMS_VegetationSoilMoistureID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationSoilMoistureID',
      relation: 'WCSPROGRAMS_VegetationSoilMoisture',
      where: {
        WCSPROGRAMS_VegetationSoilMoistureName: state.handleValue(
          dataValue('$.body.moisture')(state) ||
          dataValue('$.body.groundtruthing/moisture')(state) ||
          ''
        ),
      },
    })(state),
    WCSPROGRAMS_VegetationSoilColorID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationSoilColorID',
      relation: 'WCSPROGRAMS_VegetationSoilColor',
      where: {
        WCSPROGRAMS_VegetationSoilColorName: state.handleValue(
          dataValue('$.body.colour')(state) ||
          dataValue('$.body.groundtruthing/colour')(state) ||
          ''
        ),
      },
    })(state),
    WCSPROGRAMS_VegetationSoilDescriptionID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationSoilDescriptionID',
      relation: 'WCSPROGRAMS_VegetationSoilDescription',
      where: {
        WCSPROGRAMS_VegetationSoilDescriptionName: state.handleValue(
          dataValue('$.body.description')(state) ||
          dataValue('$.body.groundtruthing/description')(state) ||
          ''
        ),
      },
    })(state),
    North: state => {
      return dataValue('$.body.north')(state)
        ? dataValue('$.body.north')(state)
        : dataValue('$.body.plot_description/north')(state);
    },
    East: state => {
      return dataValue('$.body.east')(state)
        ? dataValue('$.body.east')(state)
        : dataValue('$.body.plot_gps')(state)
          ? dataValue('$.body.plot_gps')(state)[0]
          : dataValue('$.body.plot_description/east')(state);
    },
    Waypoint: state => {
      return dataValue('$.body.waypoint')(state)
        ? dataValue('$.body.waypoint')(state)
        : dataValue('$.body.plot_gps')(state)
          ? dataValue('$.body.plot_gps')(state)[1]
          : dataValue('$.body.plot_description/waypoint');
    },
    Latitude: state => {
      return dataValue('$.body.plot_gps')(state)
        ? dataValue('$.body.plot_gps')(state)[0]
        : 0;
    },
    Longitude: state => {
      return dataValue('$.body.plot_gps')(state)
        ? dataValue('$.body.plot_gps')(state)[1]
        : 0;
    },
    PlotNumber: state => {
      return dataValue('$.body.plot_number')(state)
        ? dataValue('$.body.plot_number')(state)
        : dataValue('$.body.plot_description/plot_number');
    },
    TransectNo: state => {
      return dataValue('$.body.transect_no')(state)
        ? dataValue('$.body.transect_no')(state)
        : dataValue('$.body.plot_description/transect_no');
    },
    SurveySite: dataValue('$.body.name'),
    WCSPROGRAMS_VegetationDistrictID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationDistrictID',
      relation: 'WCSPROGRAMS_VegetationDistrict',
      where: {
        WCSPROGRAMS_VegetationDistrictName: state.handleValue(
          dataValue('$.body.district')(state) ||
          dataValue('$.body.plot_description/district')(state) ||
          dataValue('$.body.plot_forest_area/district')(state) ||
          ''
        ),
      },
    })(state),
    WCSPROGRAMS_VegetationDrainageID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationDrainageID',
      relation: 'WCSPROGRAMS_VegetationDrainage',
      where: {
        WCSPROGRAMS_VegetationDrainageExtCode: state.handleValue(
          dataValue('$.body.drainage')(state) ||
          dataValue('$.body.general_observations/drainage')(state) ||
          ''
        ),
      },
    })(state),
    WCSPROGRAMS_VegetationPhysiographyID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationPhysiographyID',
      relation: 'WCSPROGRAMS_VegetationPhysiography',
      where: {
        WCSPROGRAMS_VegetationPhysiographyExtCode: state.handleValue(
          dataValue('$.body.physiography')(state) ||
          dataValue('$.body.general_observations/physiography')(state) ||
          ''
        ),
      },
    })(state),
    WCSPROGRAMS_VegetationTopographyID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationTopographyID',
      relation: 'WCSPROGRAMS_VegetationTopography',
      where: {
        WCSPROGRAMS_VegetationTopographyExtCode: state.handleValue(
          dataValue('$.body.topography')(state) ||
          dataValue('$.body.general_observations/topography')(state) ||
          ''
        ),
      },
    })(state),
    Sdbh: dataValue('$.body.sdbh'),
    Sght: dataValue('$.body.sght'),
    Sbdbh: dataValue('$.body.sbdbh'),
    Sbght: dataValue('$.body.sbght'),
    StartTime: state.starttime,
    SubmissionDate: dataValue('$.body._submission_time'),
    Surveydate: state.surveydate,
    Answer_ID: state.data.body._id,
    UserID_CR: '0', //TODO: Update User_ID and Address mappings?
    UserID_LM: '0',
  };
  //console.log(mapping);
  return upsert('WCSPROGRAMS_Vegetation', 'Answer_ID', mapping)(state);
});

alterState(async state => {
  const dataArray =
    state.data.body.observername ||
    state.data.body.obsevername ||
    state.data.body['general_observations/obsevername'] ||
    []; //turning select_multiple into an arrray
  const observers = [];

  for (let data of dataArray) {
    observers.push({
      WCSPROGRAMS_VegetationObserverName: state.handleValue(
        data['observername']
      ),
      WCSPROGRAMS_VegetationObserverCode: data['observername'],
      WCSPROGRAMS_VegetationObserverExtCode: data['observername'],
      Generated_ID: state.data.body._id + data['observername'], //make sure this is setting correctly
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
  const dataArray =
    state.data.body.observername ||
    state.data.body.obsevername ||
    state.data.body['general_observations/obsevername'] ||
    []; //turning select_multiple into an arrray
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
    'WCSPROGRAMS_VegetationVegetationObserver',
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
  const dataArray =
    state.data.body.st_grass_repeat ||
    state.data.body['plot_forest_area/st_grass_repeat'] ||
    [];
  const dataGrass = [];
  const path = state.data.body.st_grass_repeat
    ? 'st_grass_repeat'
    : 'plot_forest_area/st_grass_repeat';

  // Setting unique set==============================
  const uniqueGrass = Array.from(
    new Set(dataArray.map(tree => tree[`${path}/grass_species`]))
  ).map(id => {
    return dataArray.find(c => id === c[`${path}/grass_species`]);
  });
  //=================================================

  for (let data of uniqueGrass) {
    dataGrass.push({
      WCSPROGRAMS_TaxaID: await findValue({
        uuid: 'WCSPROGRAMS_TaxaID',
        relation: 'WCSPROGRAMS_Taxa',
        where: {
          ScientificName: `%${state.handleValue(
            data['st_grass_repeat/grass_species']
          )}%`,
        },
        operator: { ScientificName: 'like' },
      })(state),
      UnknownSpeciesImage: data[`${path}/noknown`],
      GrassPercent: data[`${path}/grass_perc`],
      GrassHeight: data[`${path}/grass_height`],
      WCSPROGRAMS_VegetationGrassName: state.handleValue(
        data[`${path}/grass_species`]
      ),
      WCSPROGRAMS_VegetationGrassCode: data[`${path}/grass_species`],
      AnswerId: state.data.body._id,
      //Generated_ID: state.data.body._id + data['st_grass_repeat/grass_species'],
      UserID_CR: '0', //TODO: Update User_ID and Address mappings?
      UserID_LM: '0',
    });
  }

  var unGrass = dataGrass.filter(
    c => c[`${path}/grass_species`] && c[`${path}/grass_species`] !== undefined
  );

  return upsertMany(
    'WCSPROGRAMS_VegetationGrass',
    'WCSPROGRAMS_VegetationGrassCode',
    () => unGrass
  )(state);
});

alterState(async state => {
  const dataArray = state.data.body.st_grass_repeat || [];
  const dataGrass = [];

  const path = state.data.body.st_grass_repeat
    ? 'st_grass_repeat'
    : 'plot_forest_area/st_grass_repeat';

  // Setting unique set==============================
  const uniqueGrass = Array.from(
    new Set(dataArray.map(tree => tree[`${path}/grass_species`]))
  ).map(id => {
    return dataArray.find(c => id === c[`${path}/grass_species`]);
  });
  //=================================================

  for (let data of uniqueGrass) {
    dataGrass.push({
      WCSPROGRAMS_VegetationID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationID',
        relation: 'WCSPROGRAMS_Vegetation',
        where: { Answer_ID: state.data.body._id },
      })(state),
      WCSPROGRAMS_VegetationGrassID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationGrassID',
        relation: 'WCSPROGRAMS_VegetationGrass',
        where: {
          WCSPROGRAMS_VegetationGrassName: state.handleValue(
            data[`${path}/grass_species`]
          ),
        },
      })(state),
      Answer_ID: state.data.body._id,
      Generated_ID: state.data.body._id + data[`${path}/grass_species`],
      UserID_CR: '0', //TODO: Update User_ID and Address mappings?
      UserID_LM: '0',
    });
  }

  var unGrass = dataGrass.filter(
    c => c[`${path}/grass_species`] && c[`${path}/grass_species`] !== undefined
  );

  return upsertMany(
    'WCSPROGRAMS_VegetationVegetationGrass',
    'Generated_ID',
    () => unGrass
  )(state);
});

alterState(async state => {
  const dataArray =
    state.data.body.brush_repeat || state.data.body['liana/brush_repeat'] || [];
  const brushRepeat = [];

  const path = state.data.body.brush_repeat
    ? 'brush_repeat'
    : 'liana/brush_repeat';

  // Setting unique set==============================
  const uniqueBrush = Array.from(
    new Set(dataArray.map(tree => tree[`${path}/brus_species`]))
  ).map(id => {
    return dataArray.find(c => id === c[`${path}/brus_species`]);
  });
  //=================================================

  for (let data of dataArray) {
    brushRepeat.push({
      WCSPROGRAMS_TaxaID: await findValue({
        uuid: 'WCSPROGRAMS_TaxaID',
        relation: 'WCSPROGRAMS_Taxa',
        where: {
          ScientificName: `%${state.handleValue(
            data[`${path}/brus_species`]
          )}%`,
        },
        operator: { ScientificName: 'like' },
      })(state),
      WCSPROGRAMS_VegetationBrushName: state.handleValue(
        data[`${path}/brus_species`]
      ),
      WCSPROGRAMS_VegetationBrushCode: data[`${path}/brus_species`],
      LianaPercentage: data[`${path}/brush_perc`],
      AnswerId: state.data.body._id,
      //Generated_ID: state.data.body._id + data[''],
      UserID_CR: '0', //TODO: Update User_ID and Address mappings?
      UserID_LM: '0',
    });
  }

  var unBrush = brushRepeat.filter(
    c => c[`${path}/brus_species`] && c[`${path}/brus_species'=`] !== undefined
  );

  return upsertMany(
    'WCSPROGRAMS_VegetationBrush', //QUESTION: We first insert 1 VegetationGrass record to find Taxa ID... and then a VegetationVegetationGrass record to link to Vegetation record?
    'WCSPROGRAMS_VegetationBrushCode',
    () => unBrush
  )(state);
});

alterState(async state => {
  const dataArray =
    state.data.body.brush_repeat || state.data.body['liana/brush_repeat'] || [];
  const brushRepeat = [];

  const path = state.data.body.brush_repeat
    ? 'brush_repeat'
    : 'liana/brush_repeat';

  // Setting unique set==============================
  const uniqueBrush = Array.from(
    new Set(dataArray.map(tree => tree[`${path}/brus_species`]))
  ).map(id => {
    return dataArray.find(c => id === c[`${path}/brus_species`]);
  });
  //=================================================

  for (let data of uniqueBrush) {
    brushRepeat.push({
      WCSPROGRAMS_VegetationBrushID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationBrushID',
        relation: 'WCSPROGRAMS_VegetationBrush',
        where: {
          WCSPROGRAMS_VegetationBrushName: state.handleValue(
            data[`${path}/brus_species`]
          ),
        },
      })(state),
      WCSPROGRAMS_VegetationID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationID',
        relation: 'WCSPROGRAMS_Vegetation',
        where: { Answer_ID: state.data.body._id },
      })(state),
      Answer_ID: state.data.body._id,
      Generated_ID: state.data.body._id + data[`${path}/brus_species`],
      UserID_CR: '0', //TODO: Update User_ID and Address mappings?
      UserID_LM: '0',
    });
  }

  var unBrush = brushRepeat.filter(
    c => c[`${path}/brus_species`] && c[`${path}/brus_species`] !== undefined
  );

  return upsertMany(
    'WCSPROGRAMS_VegetationVegetationBrush',
    'Generated_ID',
    () => unBrush
  )(state);
});

alterState(async state => {
  const dataArray =
    state.data.body.tree_repeat || state.data.body['liana/tree_repeat'] || [];
  const treeRepeat = [];

  const path = state.data.body.tree_repeat
    ? 'tree_repeat'
    : 'liana/tree_repeat';

  // Setting unique set==============================
  const uniqueTrees = Array.from(
    new Set(dataArray.map(tree => tree[`${path}/shrub_species`]))
  ).map(id => {
    return dataArray.find(c => id === c[`${path}/shrub_species`]);
  });
  //=================================================

  for (let data of uniqueTrees) {
    treeRepeat.push({
      WCSPROGRAMS_TaxaID: await findValue({
        uuid: 'WCSPROGRAMS_TaxaID',
        relation: 'WCSPROGRAMS_Taxa',
        where: {
          ScientificName: `%${state.handleValue(
            data[`${path}/shrub_species`]
          )}%`,
        },
        operator: { ScientificName: 'like' },
      })(state),
      WCSPROGRAMS_VegetationTreesName: state.handleValue(
        data[`${path}/shrub_species`]
      ),
      WCSPROGRAMS_VegetationTreesCode: data[`${path}/shrub_species`],
      AnswerId: state.data.body._id,
      //Generated_ID: state.data.body._id + data['tree_repeat/shrub_species'],
      UserID_CR: '0', //TODO: Update User_ID and Address mappings?
      UserID_LM: '0',
      SpecimenNo: data[`${path}/Specimen_no`],
      SpecimenPhoto: data[`${path}/specimen_photo`],
      Dbh: data[`${path}/dbh`],
      Height: data[`${path}/height`],
      //unlisted: data['tree_repeat/bunlisted'],
    });
  }

  var unTrees = treeRepeat.filter(
    c => c[`${path}/shrub_species`] && c[`${path}/shrub_species`] !== undefined
  );

  return upsertMany(
    'WCSPROGRAMS_VegetationTrees',
    'WCSPROGRAMS_VegetationTreesCode',
    () => unTrees
  )(state);
});

alterState(async state => {
  const dataArray =
    state.data.body.tree_repeat || state.data.body['liana/tree_repeat'] || [];

  const treeRepeat = [];

  const path = state.data.body.tree_repeat
    ? 'tree_repeat'
    : 'liana/tree_repeat';

  // Setting unique set==============================
  const uniqueTrees = Array.from(
    new Set(dataArray.map(tree => tree['tree_10cm/btspecies'])) // Note to @aleksa: Check if correct
  ).map(id => {
    return dataArray.find(c => id === c['tree_10cm/btspecies']); // Note to @aleksa: Check if correct
  });
  //=================================================

  for (let data of uniqueTrees) {
    treeRepeat.push({
      WCSPROGRAMS_VegetationTreesID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationTreesID',
        relation: 'WCSPROGRAMS_VegetationTrees',
        where: {
          WCSPROGRAMS_VegetationTreesCode: state.handleValue(
            data[`${path}/Specimen_no`]
          ),
        },
      })(state),
      WCSPROGRAMS_VegetationID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationID',
        relation: 'WCSPROGRAMS_Vegetation',
        where: { Answer_ID: state.data.body._id },
      })(state),
      Answer_ID: state.data.body._id,
      Generated_ID: state.data.body._id + data[`${path}/Specimen_no`],
      UserID_CR: '0', //TODO: Update User_ID and Address mappings?
      UserID_LM: '0',
    });
  }

  var unTrees = treeRepeat.filter(
    // Note to @aleksa: Check if correct
    c => c['tree_10cm/btspecies'] && c['tree_10cm/btspecies'] !== undefined
  );

  return upsertMany(
    'WCSPROGRAMS_VegetationVegetationTrees',
    'Generated_ID',
    () => unTrees
  )(state);
});

alterState(async state => {
  const dataArray =
    state.data.body.tree_10cm || state.data.body['outering/tree_10cm'] || [];
  const tree10cm = [];

  const path = state.data.body.tree_10cm ? 'tree_10cm' : 'outering/tree_10cm';

  // Setting unique set==============================
  const uniqueTrees = Array.from(
    new Set(dataArray.map(tree => tree[`${path}/btspecies`]))
  ).map(id => {
    return dataArray.filter(c => id === c[`${path}/btspecies`]);
  });
  //=================================================

  for (let data of uniqueTrees) {
    tree10cm.push({
      WCSPROGRAMS_TaxaID: await findValue({
        uuid: 'WCSPROGRAMS_TaxaID',
        relation: 'WCSPROGRAMS_Taxa',
        where: {
          ScientificName: `%${state.handleValue(data[`${path}/btspecies`])}%`,
        },
        operator: { ScientificName: 'like' },
      })(state),
      WCSPROGRAMS_VegetationBigTreesName: state.handleValue(
        data[`${path}/btspecies`]
      ),
      WCSPROGRAMS_VegetationBigTreesCode: data[`${path}/btspecies`],
      WCSPROGRAMS_VegetationBigTreesExtCode: data[`${path}/bspecimenNo`],
      AnswerId: state.data.body._id,
      //Generated_ID: state.data.body._id + data['tree_10cm/btspecies'],
      UserID_CR: '0', //TODO: Update User_ID and Address mappings?
      UserID_LM: '0',
      SpecimenNo: data[`${path}/bspecimenNo`],
      SpecimenPhoto: data[`${path}/bspecimen_photo`],
      //bunlisted: data['tree_10cm/bunlisted'],
      Dbh: data[`${path}/bdbh`],
      Height: data[`${path}/bheight`],
    });
  }

  var unTrees = tree10cm.filter(
    c => c[`${path}/btspecies`] && c[`${path}/btspecies`] !== undefined
  );

  return upsertMany(
    'WCSPROGRAMS_VegetationBigTrees',
    'WCSPROGRAMS_VegetationBigTreesExtCode',
    () => unTrees
  )(state);
});

alterState(async state => {
  const dataArray =
    state.data.body.tree_10cm || state.data.body['outering/tree_10cm'] || [];

  const tree10cm = [];

  const path = state.data.body.tree_10cm ? 'tree_10cm' : 'outering/tree_10cm';

  // Setting unique set==============================
  const uniqueTrees = Array.from(
    new Set(dataArray.map(tree => tree[`${path}/btspecies`]))
  ).map(id => {
    var unTrees = dataArray.find(c => id === c[`${path}/btspecies`]);
    //console.log('unTrees: ', unTrees);
    return unTrees;
  });
  //=================================================

  for (let data of uniqueTrees) {
    tree10cm.push({
      WCSPROGRAMS_VegetationBigTreesID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationBigTreesID',
        relation: 'WCSPROGRAMS_VegetationBigTrees',
        where: {
          WCSPROGRAMS_VegetationBigTreesCode: data[`${path}/btspecies`],
        },
      })(state),
      //WCSPROGRAMS_VegetationID: vegId,
      WCSPROGRAMS_VegetationID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationID',
        relation: 'WCSPROGRAMS_Vegetation',
        where: { Answer_ID: state.data.body._id },
      })(state),
      Answer_ID: state.data.body._id,
      Generated_ID: state.data.body._id + data[`${path}/btspecies`],
      UserID_CR: '0', //TODO: Update User_ID and Address mappings?
      UserID_LM: '0',
    });
  }

  var unTrees = tree10cm.filter(
    c => c[`${path}/btspecies`] && c[`${path}/btspecies`] !== undefined
  );

  return upsertMany(
    'WCSPROGRAMS_VegetationVegetationBigTrees',
    'Generated_ID',
    () => unTrees
  )(state);
});

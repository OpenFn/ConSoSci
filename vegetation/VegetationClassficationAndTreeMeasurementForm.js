alterState(state => {
  const UTMToLatLng = (zone, easting, northing, northernHemisphere) => {
    if (!northernHemisphere) {
      northing = 10000000 - northing;
    }

    var a = 6378137;
    var e = 0.081819191;
    var e1sq = 0.006739497;
    var k0 = 0.9996;

    var arc = northing / k0;
    var mu =
      arc /
      (a *
        (1 -
          Math.pow(e, 2) / 4.0 -
          (3 * Math.pow(e, 4)) / 64.0 -
          (5 * Math.pow(e, 6)) / 256.0));

    var ei =
      (1 - Math.pow(1 - e * e, 1 / 2.0)) / (1 + Math.pow(1 - e * e, 1 / 2.0));

    var ca = (3 * ei) / 2 - (27 * Math.pow(ei, 3)) / 32.0;

    var cb = (21 * Math.pow(ei, 2)) / 16 - (55 * Math.pow(ei, 4)) / 32;
    var cc = (151 * Math.pow(ei, 3)) / 96;
    var cd = (1097 * Math.pow(ei, 4)) / 512;
    var phi1 =
      mu +
      ca * Math.sin(2 * mu) +
      cb * Math.sin(4 * mu) +
      cc * Math.sin(6 * mu) +
      cd * Math.sin(8 * mu);

    var n0 = a / Math.pow(1 - Math.pow(e * Math.sin(phi1), 2), 1 / 2.0);

    var r0 =
      (a * (1 - e * e)) /
      Math.pow(1 - Math.pow(e * Math.sin(phi1), 2), 3 / 2.0);
    var fact1 = (n0 * Math.tan(phi1)) / r0;

    var _a1 = 500000 - easting;
    var dd0 = _a1 / (n0 * k0);
    var fact2 = (dd0 * dd0) / 2;

    var t0 = Math.pow(Math.tan(phi1), 2);
    var Q0 = e1sq * Math.pow(Math.cos(phi1), 2);
    var fact3 =
      ((5 + 3 * t0 + 10 * Q0 - 4 * Q0 * Q0 - 9 * e1sq) * Math.pow(dd0, 4)) / 24;

    var fact4 =
      ((61 + 90 * t0 + 298 * Q0 + 45 * t0 * t0 - 252 * e1sq - 3 * Q0 * Q0) *
        Math.pow(dd0, 6)) /
      720;

    var lof1 = _a1 / (n0 * k0);
    var lof2 = ((1 + 2 * t0 + Q0) * Math.pow(dd0, 3)) / 6.0;
    var lof3 =
      ((5 -
        2 * Q0 +
        28 * t0 -
        3 * Math.pow(Q0, 2) +
        8 * e1sq +
        24 * Math.pow(t0, 2)) *
        Math.pow(dd0, 5)) /
      120;
    var _a2 = (lof1 - lof2 + lof3) / Math.cos(phi1);
    var _a3 = (_a2 * 180) / Math.PI;

    var latitude = (180 * (phi1 - fact1 * (fact2 + fact3 + fact4))) / Math.PI;

    if (!northernHemisphere) {
      latitude = -latitude;
    }

    var longitude = ((zone > 0 && 6 * zone - 183.0) || 3.0) - _a3;

    var obj = {
      latitude: latitude,
      longitude: longitude,
    };
    console.log(obj); 
    return obj;
  };
  return { ...state, UTMToLatLng };
});

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
  DatasetName: 'Vegetation EU 2021',
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
  const North = dataValue('$.body.north')(state)
    ? parseInt(dataValue('$.body.north')(state))
    : parseInt(dataValue('$.body.plot_description/north')(state));

  const East = dataValue('$.body.east')(state)
    ? parseInt(dataValue('$.body.east')(state))
    : parseInt(dataValue('$.body.plot_description/east')(state));

  const latlong = state.UTMToLatLng(36, East, North, true);

  const mapping = {
    WCSPROGRAMS_VegetationName: 'Vegetation EU 2021',
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

    IsVegClassSame: state.convertValue(
      dataValue('$.body.vegClass_same')(state)
    ),

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
            'unknown'
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
            'unknown'
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
        : dataValue('$.body.plot_description/east')(state);
    },
    Waypoint: state => {
      return dataValue('$.body.waypoint')(state)
        ? dataValue('$.body.waypoint')(state)
        : dataValue('$.body.plot_gps')(state)
        ? dataValue('$.body.plot_gps')(state)[1]
        : dataValue('$.body.plot_description/waypoint');
    },
    Latitude: isNaN(latlong.latitude)
      ? latlong.latitude
      : dataValue('$.body.plot_gps')(state).split(' ')[0],
    Longitude: isNaN(latlong.longitude)
      ? latlong.longitude
      : dataValue('$.body.plot_gps')(state).split(' ')[0],
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
  // console.log(mapping);
  return upsert('WCSPROGRAMS_Vegetation', 'Answer_ID', mapping)(state);
});

alterState(async state => {
  const dataArray =
    state.data.body.observername ||
    state.data.body.obsevername ||
    state.data.body['general_observations/obsevername'] ||
    []; //turning select_multiple into an arrray
  const observers = [];

  // for (let data of dataArray) {
  //   observers.push({
  //     WCSPROGRAMS_VegetationObserverName: state.handleValue(
  //       data['observername'] || data['obsevername'] || data['general_observations/obsevername']
  //     ),
  //     WCSPROGRAMS_VegetationObserverCode: data['observername'] || data['obsevername'] || data['general_observations/obsevername'],
  //     WCSPROGRAMS_VegetationObserverExtCode: data['observername'] || data['obsevername'] || data['general_observations/obsevername'],
  //     Generated_ID: state.data.body._id + data['observername'] || data['obsevername'] || data['general_observations/obsevername'],
  //     UserID_CR: '0',
  //     UserID_LM: '0',
  //   });
  // }
  observers.push({
    WCSPROGRAMS_VegetationObserverName: state.handleValue(dataArray),
    WCSPROGRAMS_VegetationObserverCode: dataArray,
    WCSPROGRAMS_VegetationObserverExtCode: dataArray,
    Generated_ID: state.data.body._id + dataArray,
    UserID_CR: '0',
    UserID_LM: '0',
  });

  var unObservers = observers.filter(data => data !== undefined); /* .filter(
      data => data['observername'] && data['observername'] !== undefined
    ).filter(
      data => data['general_observations/obsevername'] && data['general_observations/obsevername'] !== undefined
    ) */

  return upsertMany(
    'WCSPROGRAMS_VegetationObserver',
    'WCSPROGRAMS_VegetationObserverExtCode',
    () => unObservers
  )(state);
});

alterState(async state => {
  const dataArray =
    state.data.body.observername ||
    state.data.body.obsevername ||
    state.data.body['general_observations/obsevername'] ||
    []; //turning select_multiple into an arrray
  const observers = [];

  // for (let data of dataArray) {
  //   observers.push({
  //     WCSPROGRAMS_VegetationObserverID: await findValue({
  //       uuid: 'WCSPROGRAMS_VegetationObserverID',
  //       relation: 'WCSPROGRAMS_VegetationObserver',
  //       where: {
  //         WCSPROGRAMS_VegetationObserverExtCode: data['observername'] || data['obsevername'] || data['general_observations/obsevername'],
  //       },
  //     })(state),
  //     WCSPROGRAMS_VegetationID: await findValue({
  //       uuid: 'WCSPROGRAMS_VegetationID',
  //       relation: 'WCSPROGRAMS_Vegetation',
  //       where: { Answer_ID: state.data.body._id },
  //     })(state),
  //     Answer_ID: state.data.body._id,
  //     Generated_ID: state.data.body._id + data['observername'] || data['obsevername'] || data['general_observations/obsevername'], //make sure this is setting correctly
  //     UserID_CR: '0', //TODO: Update User_ID and Address mappings?
  //     UserID_LM: '0',
  //   });
  // }

  observers.push({
    WCSPROGRAMS_VegetationObserverID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationObserverID',
      relation: 'WCSPROGRAMS_VegetationObserver',
      where: {
        WCSPROGRAMS_VegetationObserverExtCode: dataArray,
      },
    })(state),
    WCSPROGRAMS_VegetationID: await findValue({
      uuid: 'WCSPROGRAMS_VegetationID',
      relation: 'WCSPROGRAMS_Vegetation',
      where: { Answer_ID: state.data.body._id },
    })(state),
    Answer_ID: state.data.body._id,
    Generated_ID: state.data.body._id + dataArray, //make sure this is setting correctly
    UserID_CR: '0', //TODO: Update User_ID and Address mappings?
    UserID_LM: '0',
  });
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
    new Set(
      dataArray.map(
        tree =>
          tree['tree_repeat/btspecies'] || tree['liana/tree_repeat/btspecies']
      )
    )
  ).map(id => {
    return dataArray.find(
      c => id === c['tree_repeat/btspecies'] || c['liana/tree_repeat/btspecies']
    );
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

  var unTrees = treeRepeat
    .filter(
      // Note: checking both path versions for unique trees
      c =>
        c['tree_repeat/btspecies'] && c['tree_repeat/btspecies'] !== undefined
    )
    .filter(
      c =>
        c['liana/tree_repeat/btspecies'] &&
        c['liana/tree_repeat/btspecies'] !== undefined
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

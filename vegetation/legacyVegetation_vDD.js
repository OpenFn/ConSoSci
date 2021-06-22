alterState(state => {
  const handleValue = value => {
    if (value && value !== undefined && value !== 'undefined' && value !== '')
      return value ? value.toString().replace(/_/g, ' ') : value;
  };
  const convertValue = value => {
    return value === 'yes' ? 1 : 0;
  };

  state.survey = state.data.surveys[0];

  return { ...state, handleValue, convertValue };
});

alterState(async state => {
  const dataArray = state.survey['general'];
  const VegMap = [];
  for (let data of dataArray) {
    VegMap.push({
      Answer_ID: data['surveyid'],
      WCSPROGRAMS_VegetationName: 'LegacyData',
      SubmissionDate:'11/06/2021', //Date when job is run
      StartTime: '00:00:00', //We don't know the time so putting 0
      WCSPROGRAMS_VegetationDistrictID: '0', //We don't know the district so putting 0
      UserID_CR: '0', // Don't know so putting 0
      UserID_LM: '0', // Don't know so putting 0
      Surveydate: data['Date of survey'],
      SurveySite: data['Survey site'],
      TransectNo: data['Transect No'],
      PlotNumber: data['Plot No'],
      East: data['Easting'],
      North: data['Northing'],
      Latitude: '0', //TO DO / East should be converted to UTM zone 36N
      Longitude: '0', //TO DO / North should be converted to UTM zone 36N
      WCSPROGRAMS_VegetationAgeID : '4', // We don't know age so putting Other, ID 4 TO CHECK
      WCSPROGRAMS_VegetationClassID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationClassID',
        relation: 'WCSPROGRAMS_VegetationClass',
        where: {
          WCSPROGRAMS_VegetationClassName: state.handleValue(
            data['Vegetation_type']
          ),
        },
      })(state),
      WCSPROGRAMS_VegetationForestTypeID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationForestTypeID',
        relation: 'WCSPROGRAMS_VegetationForestType',
        where: {
          WCSPROGRAMS_VegetationForestTypeCode: state.handleValue(
            data['Vegetation_field']
          ),
        },
      })(state),
      WCSPROGRAMS_VegetationPhysiographyID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationPhysiographyID',
        relation: 'WCSPROGRAMS_VegetationPhysiography',
        where: {
          WCSPROGRAMS_VegetationPhysiographyName: state.handleValue(
            data['Physiography']
          ),
        },
      })(state),
      //SpecimenPhoto: dataValue('Photos'),
      WCSPROGRAMS_VegetationTopographyID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationTopographyID',
        relation: 'WCSPROGRAMS_VegetationTopography',
        where: {
          WCSPROGRAMS_VegetationTopographyName: state.handleValue(
            data['Topography']
          ),
        },
      })(state),
      WCSPROGRAMS_VegetationDrainageID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationDrainageID',
        relation: 'WCSPROGRAMS_VegetationDrainage',
        where: {
          WCSPROGRAMS_VegetationDrainageName: state.handleValue(
            data['Drainage']
          ),
        },
      })(state),
      WCSPROGRAMS_VegetationSoilDescriptionID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationSoilDescriptionID',
        relation: 'WCSPROGRAMS_VegetationSoilDescription',
        where: {
          WCSPROGRAMS_VegetationSoilDescriptionName: state.handleValue(
            data['Soil description']
          ),
        },
      })(state),
      WCSPROGRAMS_VegetationSoilColorID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationSoilColorID',
        relation: 'WCSPROGRAMS_VegetationSoilColor',
        where: {
          WCSPROGRAMS_VegetationSoilColorName: state.handleValue(
            data['Soil_colour']
          ),
        },
      })(state),
      IsEvidenceOfFire: data['Evidence_fire'],
      WCSPROGRAMS_VegetationSoilMoistureID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationSoilMoistureID',
        relation: 'WCSPROGRAMS_VegetationSoilMoisture',
        where: {
          WCSPROGRAMS_VegetationSoilMoistureName: state.handleValue(
            data['Soil_Moisture'] ||
              data['$.body.groundtruthing/moisture'] ||
              ''
          ),
        },
      })(state),
      WCSPROGRAMS_VegetationSoilErodabilityID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationSoilErodabilityID',
        relation: 'WCSPROGRAMS_VegetationSoilErodability',
        where: {
          WCSPROGRAMS_VegetationSoilErodabilityExtCode: state.handleValue(
            data['Soil Erodability']
          ),
        },
      })(state),
      WCSPROGRAMS_VegetationSoilSeasonalityID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationSoilSeasonalityID',
        relation: 'WCSPROGRAMS_VegetationSoilSeasonality',
        where: {
          WCSPROGRAMS_VegetationSoilSeasonalityName: state.handleValue(
            data['Soil Seasonality']
          ),
        },
      })(state),
      Bareground: data['Bare ground %'],
    });
  }
  return upsertMany('WCSPROGRAMS_Vegetation', 'Answer_ID', () => VegMap)(state);
});

//alterState(async state => { // Only 1 item in Liana_old and says the plot have no trees so no need to map it
//  const dataArray = state.survey['liana_old'];
//  const BrushMap = [];
//  for (let data of dataArray) {
//    BrushMap.push({
 //     AnswerID: data['surveyid'],
 //     WCSPROGRAMS_TaxaID: await findValue({
  //      uuid: 'WCSPROGRAMS_TaxaID',
 //       relation: 'WCSPROGRAMS_Taxa',
 //       where: {
 //         ScientificName: `%${state.handleValue(data[`Liana`])}%`,
 //       },
 //       operator: { ScientificName: 'like' },
 //     })(state),
 //     LianaPercentage: data['Liana percentage'],
  //  });
 // }
 // return upsertMany(
 //   'WCSPROGRAMS_VegetationBrush',
 //   'AnswerID',
 //   () => BrushMap
 // )(state);
//});

//each(
//  'survey.ground_species[*]',
//  upsert('WCSPROGRAMS_VegetationGrass', 'AnswerID', {
//    AnswerID: dataValue('surveyid'),
//    StGrassRepeat: dataValue('Ground_Spp_No'),
//    GrassPercent: dataValue('Species_%'),
//    WCSPROGRAMS_TaxaID: await findValue({
//       uuid: 'WCSPROGRAMS_TaxaID',
//        relation: 'WCSPROGRAMS_Taxa',
//        where: {
//         ScientificName: `%${state.handleValue(data[`G_species`])}%`,
//        },
//        operator: { ScientificName: 'like' },
//      })(state),
//  )
//);

//each(
//  'survey.ground_species[*]',
//  upsert('WCSPROGRAMS_VegetationTrees', 'AnswerID', {
//    AnswerID: dataValue('surveyid'),
//    StGrassRepeat: dataValue('Ground_Spp_No'),
 //   WCSPROGRAMS_TaxaID: dataValue('G_species'),
 //   GrassPercent: dataValue('Species_%'),
 // })
//);

//each(
//  'survey.native_tree_shrubs[*]',
//  upsert('WCSPROGRAMS_VegetationTrees', 'AnswerID', {
//    AnswerID: dataValue('surveyid'),
//    WCSPROGRAMS_TaxaID: dataValue('Native_tree_Shrub'),
//    SbrushPer: dataValue('shrub percentage'),
//  })
//);

each(
  'survey.general[*]',
  upsert('WCSPROGRAMS_VegetationVegetationObserver', 'Answer_ID', {
    Answer_ID: dataValue('surveyid'),
    WCSPROGRAMS_VegetationObserverID: dataValue('Observer1'),
    WCSPROGRAMS_VegetationObserverID: dataValue('Observer2'),
    WCSPROGRAMS_VegetationObserverID: dataValue('Observer3'),
  })
);

each(
  'survey.ground_species[*]',
  upsert('WCSPROGRAMS_VegetationTrees', 'AnswerID', {
    AnswerID: dataValue('surveyid'),
    WCSPROGRAMS_TaxaID: dataValue('Species'),
    Dbh: dataValue('DBH'),
    Height: dataValue('Height'),
  })
);

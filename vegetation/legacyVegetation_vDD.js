alterState(state => {
  const handleValue = value => {
    if (value && value !== undefined && value !== 'undefined' && value !== '')
      return value ? value.toString().replace(/_/g, ' ') : value;
  };
  const convertValue = value => {
    return value === 'yes' ? 1 : 0;
  };

  const general = [];
  const ground_species = [];
  const native_tree_shrubs = [];

  state.data.surveys.forEach(survey => {
    if (survey.general) general.push(...survey.general);
    if (survey.ground_species) ground_species.push(...survey.ground_species);
    if (survey.native_tree_shrubs)
      native_tree_shrubs.push(...survey.native_tree_shrubs);
  });

  // Replacing nulls in Ground_species by unknown
  for (let species of ground_species) {
    if (species.G_species === null) species.G_species = 'unknown';
  }

  // Replacing nulls in native_tree_shrubs by unknown
  for (let tree of native_tree_shrubs) {
    if (tree.Native_tree_Shrub === null) tree.Native_tree_Shrub = 'unknown';
  }

  // Replacing nulls in soil description by unknown
  for (let soil of general) {
    if (soil['Soil description'] === null) soil['Soil description'] = 'unknown';
  }

  // Replacing nulls in soil color by unknown
  for (let color of general) {
    if (color.Soil_colour === null) color.Soil_colour = 'unknown';
  }

  // Replacing nulls in soil moisture by unknown
  for (let moisture of general) {
    if (moisture.Soil_Moisture === null) moisture.Soil_Moisture = 'unknown';
  }

  // Replacing nulls in soil erodability by unknown
  for (let erod of general) {
    if (erod['Soil Erodability'] === null) erod['Soil Erodability'] = 'unknown';
  }

  // Replacing nulls in soil seasonibility by unknown
  for (let season of general) {
    if (season['Soil Seasonality'] === null)
      season['Soil Seasonality'] = 'unknown';
  }

  return {
    ...state,
    handleValue,
    convertValue,
    general,
    ground_species,
    native_tree_shrubs,
  };
});

alterState(async state => {
  const dataArray = state.general;
  const VegMap = [];
  for (let data of dataArray) {
    VegMap.push({
      Answer_ID: data['surveyid'],
      WCSPROGRAMS_VegetationName: 'LegacyData',
      SubmissionDate: '11/06/2021', //Date when job is run
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
      WCSPROGRAMS_VegetationAgeID: '4', // We don't know age so putting Other, ID 4 TO CHECK
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

  console.log('VegMap:', VegMap);

  return upsertMany('WCSPROGRAMS_Vegetation', 'Answer_ID', () => VegMap)(state);
});

alterState(async state => {
  const dataArray = state.ground_species;
  const groupSpeciesMap = [];

  for (let data of dataArray) {
    groupSpeciesMap.push({
      AnswerID: `${data.surveyid}${data.Ground_Spp_No}`, // built custom AnswerID. TO BE CONFIRMED
      WCSPROGRAMS_VegetationGrassName: data.G_species,
      UserID_CR: '0', // Don't know so putting 0
      UserID_LM: '0', // Don't know so putting 0
      StGrassRepeat: data.Ground_Spp_No,
      GrassPercent: data['Species_%'],
      WCSPROGRAMS_TaxaID: await findValue({
        uuid: 'WCSPROGRAMS_TaxaID',
        relation: 'WCSPROGRAMS_Taxa',
        where: {
          ScientificName: `%${state.handleValue(data[`G_species`])}%`,
        },
        operator: { ScientificName: 'like' },
      })(state),
    });
  }
  return upsertMany(
    'WCSPROGRAMS_VegetationGrass',
    'AnswerID',
    () => groupSpeciesMap
  )(state);
});

alterState(async state => {
  const dataArray = state.native_tree_shrubs;
  const native_tree_shrubs = [];
  for (let data of dataArray) {
    native_tree_shrubs.push({
      AnswerID: data.surveyid,
      WCSPROGRAMS_VegetationTreesName: data.Native_tree_Shrub,
      UserID_CR: '0', // Don't know so putting 0
      UserID_LM: '0', // Don't know so putting 0
      SbrushPer: data['shrub percentage'], //
      WCSPROGRAMS_TaxaID: await findValue({
        uuid: 'WCSPROGRAMS_TaxaID',
        relation: 'WCSPROGRAMS_Taxa',
        where: {
          ScientificName: `%${state.handleValue(data['Native_tree_Shrub'])}%`,
        },
        operator: { ScientificName: 'like' },
      })(state),
    });
  }
  return upsertMany(
    'WCSPROGRAMS_VegetationTrees',
    'AnswerID',
    () => native_tree_shrubs
  )(state);
});

alterState(async state => {
  const dataArray = state.general;
  const general = [];
  for (let data of dataArray) {
    general.push({
      Answer_ID: data.surveyid,
      WCSPROGRAMS_VegetationID: '0',
      UserID_CR: '0', // Don't know so putting 0
      UserID_LM: '0', // Don't know so putting 0
      WCSPROGRAMS_VegetationObserverID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationObserverID',
        relation: 'WCSPROGRAMS_VegetationObserver',
        where: {
          WCSPROGRAMS_VegetationObserverExtCode: data['Observer1'],
        },
      })(state),
      WCSPROGRAMS_VegetationObserverID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationObserverID',
        relation: 'WCSPROGRAMS_VegetationObserver',
        where: {
          WCSPROGRAMS_VegetationObserverExtCode: data['Observer2'],
        },
      })(state),
      WCSPROGRAMS_VegetationObserverID: await findValue({
        uuid: 'WCSPROGRAMS_VegetationObserverID',
        relation: 'WCSPROGRAMS_VegetationObserver',
        where: {
          WCSPROGRAMS_VegetationObserverExtCode: data['Observer3'],
        },
      })(state),
    });
  }
  return upsertMany(
    'WCSPROGRAMS_VegetationVegetationObserver',
    'Answer_ID',
    () => general,
    { writeSql: true } // <-- options go here!
  )(state);
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

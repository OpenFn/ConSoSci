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

// THIS OPERATION REPLACES THE ONE BELOW IT.
alterSate(async state => {
  const dataArray = state.survey['general'];
  const VegMap = [];
  for (let data of dataArray) {
    VegMap.push({
       Answer_ID: dataValue('surveyid'),
       Surveydate: dataValue('Date of survey'),
       SurveySite: dataValue('Survey site'),
       TransectNo: dataValue('Transect No'),
       PlotNumber: dataValue('Plot No'),
       East: dataValue('Easting'),
       North: dataValue('Northing'),
       PlotGPS: dataValue('Altitude'),
       WCSPROGRAMS_VegetationClassID: await findValue({
         uuid: 'WCSPROGRAMS_VegetationClassID',
         relation: 'WCSPROGRAMS_VegetationClass',
         where: {
           WCSPROGRAMS_VegetationClassName: state.handleValue(
             dataValue('Vegetation_type')(state)
           ),
         },
       }),        
       WCSPROGRAMS_VegetationForestTypeID: await findValue({
         uuid: 'WCSPROGRAMS_VegetationForestTypeID',
         relation: 'WCSPROGRAMS_VegetationForestType',
         where: {
           WCSPROGRAMS_VegetationForestTypeExtCode: state.handleValue(
             dataValue('Vegetation_field')(state)
           ),
         },
      }),
       WCSPROGRAMS_VegetationPhysiographyID: await findValue({
         uuid: 'WCSPROGRAMS_VegetationPhysiographyID',
         relation: 'WCSPROGRAMS_VegetationPhysiography',
         where: {
           WCSPROGRAMS_VegetationPhysiographyExtCode: state.handleValue(
             dataValue('Physiography')(state)
           ),
         },
       }),
       //SpecimenPhoto: dataValue('Photos'),
       WCSPROGRAMS_VegetationTopographyID: await findValue({
         uuid: 'WCSPROGRAMS_VegetationTopographyID',
         relation: 'WCSPROGRAMS_VegetationTopography',
         where: {
           WCSPROGRAMS_VegetationTopographyExtCode: state.handleValue(
             dataValue('Topography')(state)
           ),
         },
       }),
       WCSPROGRAMS_VegetationDrainageID: await findValue({
         uuid: 'WCSPROGRAMS_VegetationDrainageID',
         relation: 'WCSPROGRAMS_VegetationDrainage',
         where: {
           WCSPROGRAMS_VegetationDrainageExtCode: state.handleValue(
             dataValue('Drainage')(state)
         ),
         },
       }),
     WCSPROGRAMS_VegetationSoilDescriptionID: await findValue({
         uuid: 'WCSPROGRAMS_VegetationSoilDescriptionID',
         relation: 'WCSPROGRAMS_VegetationSoilDescription',
         where: {
           WCSPROGRAMS_VegetationSoilDescriptionName: state.handleValue(
             dataValue('Soil description')(state)
           ),
         },
       }),
       WCSPROGRAMS_VegetationSoilColorID: await findValue({
         uuid: 'WCSPROGRAMS_VegetationSoilColorID',
         relation: 'WCSPROGRAMS_VegetationSoilColor',
         where: {
           WCSPROGRAMS_VegetationSoilColorName: state.handleValue(
             dataValue('Soil_colour')(state)
           ),
         },
       }),
       IsEvidenceOfFire: dataValue('Evidence_fire'),
       WCSPROGRAMS_VegetationSoilMoistureID: await findValue({
         uuid: 'WCSPROGRAMS_VegetationSoilMoistureID',
         relation: 'WCSPROGRAMS_VegetationSoilMoisture',
         where: {
           WCSPROGRAMS_VegetationSoilMoistureName: state.handleValue(
             dataValue('Soil_Moisture')(state) ||
               dataValue('$.body.groundtruthing/moisture')(state) ||
               ''
           ),
         },
       }),
       WCSPROGRAMS_VegetationSoilErodabilityID: await findValue({
         uuid: 'WCSPROGRAMS_VegetationSoilErodabilityID',
         relation: 'WCSPROGRAMS_VegetationSoilErodability',
         where: {
          WCSPROGRAMS_VegetationSoilErodabilityExtCode: state.handleValue(
             dataValue('Soil Erodability')(state)
           ),
         },
}),
       WCSPROGRAMS_VegetationSoilSeasonalityID: await findValue({
         uuid: 'WCSPROGRAMS_VegetationSoilSeasonalityID',
         relation: 'WCSPROGRAMS_VegetationSoilSeasonality',
         where: {
           WCSPROGRAMS_VegetationSoilSeasonalityName: state.handleValue(
             dataValue('Soil Seasonality')(state)
           ),
         },
       }),
       Bareground: dataValue('Bare ground %'),
     });
  }
  return upsertMany(
    'WCSPROGRAMS_Vegetation',
    'Answer_ID',
    () => VegMap
  )(state);
});

alterState(async state => {
  const dataArray = state.survey['liana_old'];
  const BrushMap = [];
  for (let data of dataArray) {
    BrushMap.push({
      Answer_ID: data['surveyid'],
      WCSPROGRAMS_TaxaID: await findValue({
        uuid: 'WCSPROGRAMS_TaxaID',
        relation: 'WCSPROGRAMS_Taxa',
        where: {
          ScientificName: `%${state.handleValue(data[`Liana`])}%`,
        },
        operator: { ScientificName: 'like' },
      })(state),
      LianaPercentage: data['Liana percentage'],
      SurveySite: data['survey_area'],
      TransectNo: data['Transect_no'],
      PlotNumber: data['Plot_no'],
    });
  }
  return upsertMany(
    'WCSPROGRAMS_VegetationBrush',
    'Answer_ID',
    () => BrushMap
  )(state);
});

each(
  'survey.ground_species[*]',
  upsert('WCSPROGRAMS_VegetationGrass', 'AnswerId', {
    Answer_ID: dataValue('surveyid'),
    SurveySite: dataValue('survey_area'),
    TransectNo: dataValue('Transect_no'),
    PlotNumber: dataValue('Plot_no'),
    StGrassRepeat: dataValue('Ground_Spp_No'),
    WCSPROGRAMS_TaxaID: dataValue('G_species'),
    GrassPercent: dataValue('Species_%'),
  })
);

each(
  'survey.ground_species[*]',
  upsert('WCSPROGRAMS_VegetationTrees', 'AnswerId', {
    Answer_ID: dataValue('surveyid'),
    SurveySite: dataValue('survey_area'),
    TransectNo: dataValue('Transect_no'),
    PlotNumber: dataValue('Plot_no'),
    StGrassRepeat: dataValue('Ground_Spp_No'),
    WCSPROGRAMS_TaxaID: dataValue('G_species'),
    GrassPercent: dataValue('Species_%'),
  })
);

each(
  'survey.native_tree_shrubs[*]',
  upsert('WCSPROGRAMS_VegetationTrees', 'AnswerId', {
    Answer_ID: dataValue('surveyid'),
    SurveySite: dataValue('survey_area'),
    TransectNo: dataValue('Transect_no'),
    PlotNumber: dataValue('Plot_no'),
    WCSPROGRAMS_TaxaID: dataValue('Native_tree_Shrub'),
    SbrushPer: dataValue('shrub percentage'),
  })
);

each(
  'survey.general[*]',
  upsert('WCSPROGRAMS_VegetationVegetationObservers', 'AnswerId', {
    Answer_ID: dataValue('surveyid'),
    WCSPROGRAMS_VegetationObserverID: dataValue('Observer1'),
    WCSPROGRAMS_VegetationObserverID: dataValue('Observer2'),
    WCSPROGRAMS_VegetationObserverID: dataValue('Observer3'),
  })
);

each(
  'survey.ground_species[*]',
  upsert('WCSPROGRAMS_VegetationTrees', 'AnswerId', {
    Answer_ID: dataValue('surveyid'),
    SurveySite: dataValue('survey_area'),
    TransectNo: dataValue('Transect_no'),
    PlotNumber: dataValue('Plot_no'),
    WCSPROGRAMS_TaxaID: dataValue('Species'),
    Dbh: dataValue('DBH'),
    Height: dataValue('Height'),
  })
);

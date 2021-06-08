alterState(state => {
  state.survey = state.data.surveys[0];
  return state;
});

each(
  'survey.general[*]',
  upsert('WCSPROGRAMS_Vegetation', 'AnswerId', {
    Answer_Id: dataValue('surveyid'),
    Surveydate: dataValue('Date of survey'),
    SurveySite: dataValue('Survey site'),
    TransectNo: dataValue('Transect No'),
    PlotNumber: dataValue('Plot No'),
    East: dataValue('Easting'),
    North: dataValue('Northing'),
    PlotGPS: dataValue('Altitude'),
    WCSPROGRAMS_VegetationClassID: findValue({
      uuid: 'WCSPROGRAMS_VegetationClassID',
      relation: 'WCSPROGRAMS_VegetationClass',
      where: {
        WCSPROGRAMS_VegetationClassName: state.handleValue(
          dataValue('Vegetation_type')(state)
        ),
      },
    WCSPROGRAMS_VegetationForestTypeID: findValue({
      uuid: 'WCSPROGRAMS_VegetationForestTypeID',
      relation: 'WCSPROGRAMS_VegetationForestType',
      where: {
        WCSPROGRAMS_VegetationForestTypeExtCode: state.handleValue(
          dataValue('Vegetation_field')(state) 
        ),
      },
    WCSPROGRAMS_VegetationPhysiographyID: findValue({
      uuid: 'WCSPROGRAMS_VegetationPhysiographyID',
      relation: 'WCSPROGRAMS_VegetationPhysiography',
      where: {
        WCSPROGRAMS_VegetationPhysiographyExtCode: state.handleValue(
          dataValue('Physiography')(state)
        ),
      },
    //SpecimenPhoto: dataValue('Photos'),
    WCSPROGRAMS_VegetationTopographyID: findValue({
      uuid: 'WCSPROGRAMS_VegetationTopographyID',
      relation: 'WCSPROGRAMS_VegetationTopography',
      where: {
        WCSPROGRAMS_VegetationTopographyExtCode: state.handleValue(
          dataValue('Topography')(state) 
        ),
      },
    WCSPROGRAMS_VegetationDrainageID: findValue({
      uuid: 'WCSPROGRAMS_VegetationDrainageID',
      relation: 'WCSPROGRAMS_VegetationDrainage',
      where: {
        WCSPROGRAMS_VegetationDrainageExtCode: state.handleValue(
          dataValue('Drainage')(state) 
        ),
      },
    WCSPROGRAMS_VegetationSoilDescriptionID: findValue({
      uuid: 'WCSPROGRAMS_VegetationSoilDescriptionID',
      relation: 'WCSPROGRAMS_VegetationSoilDescription',
      where: {
        WCSPROGRAMS_VegetationSoilDescriptionName: state.handleValue(
          dataValue('Soil description')(state) 
        ),
      },
    WCSPROGRAMS_VegetationSoilColorID: findValue({
      uuid: 'WCSPROGRAMS_VegetationSoilColorID',
      relation: 'WCSPROGRAMS_VegetationSoilColor',
      where: {
        WCSPROGRAMS_VegetationSoilColorName: state.handleValue(
          dataValue('Soil_colour')(state) 
        ),
      },
    IsEvidenceOfFire: dataValue('Evidence_fire'),
    WCSPROGRAMS_VegetationSoilMoistureID: findValue({
      uuid: 'WCSPROGRAMS_VegetationSoilMoistureID',
      relation: 'WCSPROGRAMS_VegetationSoilMoisture',
      where: {
        WCSPROGRAMS_VegetationSoilMoistureName: state.handleValue(
          dataValue('Soil_Moisture')(state) ||
          dataValue('$.body.groundtruthing/moisture')(state) ||
          ''
        ),
      },
    WCSPROGRAMS_VegetationSoilErodabilityID: findValue({
      uuid: 'WCSPROGRAMS_VegetationSoilErodabilityID',
      relation: 'WCSPROGRAMS_VegetationSoilErodability',
      where: {
        WCSPROGRAMS_VegetationSoilErodabilityExtCode: state.handleValue(
          dataValue('Soil Erodability')(state) 
        ),
      },
    WCSPROGRAMS_VegetationSoilSeasonalityID: findValue({
      uuid: 'WCSPROGRAMS_VegetationSoilSeasonalityID',
      relation: 'WCSPROGRAMS_VegetationSoilSeasonality',
      where: {
        WCSPROGRAMS_VegetationSoilSeasonalityName: state.handleValue(
          dataValue('Soil Seasonality')(state) 
        ),
      },
    Bareground: dataValue('Bare ground %'),
  })
);

each(
  'survey.liana_old[*]',
   upsert('WCSPROGRAMS_VegetationBrush', 'AnswerId', {
    Answer_Id: dataValue('surveyid'),
    WCSPROGRAMS_TaxaID: findValue({
        uuid: 'WCSPROGRAMS_TaxaID',
        relation: 'WCSPROGRAMS_Taxa',
        where: {
          ScientificName: `%${state.handleValue(
            data[`Liana`]
          )}%`,
        },
        operator: { ScientificName: 'like' },
      })(state),
    LianaPercentage: dataValue('Liana percentage'),
    SurveySite: dataValue('survey_area'),
    TransectNo: dataValue('Transect_no'),
    PlotNumber: dataValue('Plot_no')
 })
);

each(
  'survey.ground_species[*]',
  psert('WCSPROGRAMS_VegetationGrass', 'AnswerId', {
    Answer_Id: dataValue('surveyid'),
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
    Answer_Id: dataValue('surveyid'),
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
    AnswerId: dataValue('surveyid'),
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
    Answer_Id: dataValue('surveyid'),
    WCSPROGRAMS_VegetationObserverID: dataValue('Observer1'),
    WCSPROGRAMS_VegetationObserverID: dataValue('Observer2'),
    WCSPROGRAMS_VegetationObserverID: dataValue('Observer3'),
})
);

each(
  'survey.ground_species[*]',
  upsert('WCSPROGRAMS_VegetationTrees', 'AnswerId', {
    Answer_Id: dataValue('surveyid'),
    SurveySite: dataValue('survey_area'),
    TransectNo: dataValue('Transect_no'),
    PlotNumber: dataValue('Plot_no'),
    WCSPROGRAMS_TaxaID: dataValue('Species'),
    Dbh: dataValue('DBH'),
    Height: dataValue('Height')
});
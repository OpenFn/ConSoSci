alterState(state => {
  state.survey = state.data.surveys[0];
  return state;
});

each(
  'survey.general[*]',
  upsert('WCSPROGRAMS_Vegetation', 'Answer_Id', {
    Answer_Id: dataValue('surveyid'), // Should be Answer_Id and not AnswerId
    Surveydate: dataValue('Date of survey'),
    SurveySite: dataValue('Survey site'),
    TransectNo: dataValue('Transect No'),
    PlotNumber: dataValue('Plot No'),
    East: dataValue('Easting'),
    North: dataValue('Northing'),
    // PlotGPS: dataValue('Altitude'),
    WCSPROGRAMS_VegetationClassID: dataValue('Vegetation_type'),
    WCSPROGRAMS_VegetationForestTypeID: dataValue('Vegetation_field'), // Should use findValue ??
    WCSPROGRAMS_VegetationPhysiographyID: dataValue('Physiography'), // Should use findValue ??
    // SpecimenPhoto: dataValue('Photos'),
    WCSPROGRAMS_VegetationTopographyID: dataValue('Topography'), // Should use findValue ??
    WCSPROGRAMS_VegetationDrainageID: dataValue('Drainage'), // Should use findValue ??
    WCSPROGRAMS_VegetationSoilDescriptionID: dataValue('Soil description'), // Should use findValue ??
    WCSPROGRAMS_VegetationSoilColorID: dataValue('Soil_colour'), // Should use findValue ??
    IsEvidenceOfFire: dataValue('Evidence_fire'),
    WCSPROGRAMS_VegetationSoilMoistureID: dataValue('Soil_Moisture'), // Should use findValue ??
    WCSPROGRAMS_VegetationSoilErodabilityID: dataValue('Soil Erodability'), // Should use findValue ??
    WCSPROGRAMS_VegetationSoilSeasonalityID: dataValue('Soil Seasonality'), // Should use findValue ??
    Bareground: dataValue('Bare ground %'),
  })
);

each(
  'survey.liana_old[*]',
  upsert('WCSPROGRAMS_VegetationBrush', 'AnswerId', {
    AnswerId: dataValue('surveyid'),
    WCSPROGRAMS_TaxaID: dataValue('Liana'), // FindValue ?
    LianaPercentage: dataValue('Liana percentage'),
    SurveySite: dataValue('survey_area'),
    TransectNo: dataValue('Transect_no'),
    PlotNumber: dataValue('Plot_no'),
  })
);

each(
  'survey.ground_species[*]',
  upsert('WCSPROGRAMS_VegetationGrass', 'AnswerId', {
    AnswerId: dataValue('surveyid'),
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
    AnswerId: dataValue('surveyid'),
    WCSPROGRAMS_VegetationObserverID: dataValue('Observer1'),
    WCSPROGRAMS_VegetationObserverID: dataValue('Observer2'),
    WCSPROGRAMS_VegetationObserverID: dataValue('Observer3'),
  })
);

each(
  'survey.ground_species[*]',
  upsert('WCSPROGRAMS_VegetationTrees', 'AnswerId', {
    AnswerId: dataValue('surveyid'),
    SurveySite: dataValue('survey_area'),
    TransectNo: dataValue('Transect_no'),
    PlotNumber: dataValue('Plot_no'),
    WCSPROGRAMS_TaxaID: dataValue('Species'),
    Dbh: dataValue('DBH'),
    Height: dataValue('Height'),
  })
);

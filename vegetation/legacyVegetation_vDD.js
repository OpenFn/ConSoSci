upsert('WCSPROGRAMS_Vegetation', 'AnswerId', {
    AnswerId: dataValue('surveyid'),
    Surveydate: dataValue('Date of survey'),
    SurveySite: dataValue('Survey site'),
    TransectNo: dataValue('Transect No'),
    PlotNumber: dataValue('Plot No'),
    East: dataValue('Easting'),
    North: dataValue('Northing'),
    PlotGPS: dataValue('Altitude'),
    WCSPROGRAMS_VegetationClassID: dataValue('Vegetation_type'),
    WCSPROGRAMS_VegetationForestTypeID: dataValue('Vegetation_field'),
    WCSPROGRAMS_VegetationPhysiographyID: dataValue('Physiography'),
    SpecimenPhoto: dataValue('Photos'),
    WCSPROGRAMS_VegetationTopographyID: dataValue('Topography'),
    WCSPROGRAMS_VegetationDrainageID: dataValue('Drainage'),
    WCSPROGRAMS_VegetationSoilDescriptionID: dataValue('Soil description'),
    WCSPROGRAMS_VegetationSoilColorID: dataValue('Soil_colour'),
    IsEvidenceOfFire: dataValue('Evidence_fire'),
    WCSPROGRAMS_VegetationSoilMoistureID: dataValue('Soil_Moisture'),
    WCSPROGRAMS_VegetationSoilErodabilityID: dataValue('Soil Erodability'),
    WCSPROGRAMS_VegetationSoilSeasonalityID: dataValue('Soil Seasonality'),
    Bareground: dataValue('Bare ground %')
});

upsert('WCSPROGRAMS_VegetationBrush', 'AnswerId', {
    AnswerId: dataValue('surveyid'),
    WCSPROGRAMS_TaxaID: dataValue('Liana'),
    LianaPercentage: dataValue('Liana percentage'),
    SurveySite: dataValue('survey_area'),
    TransectNo: dataValue('Transect_no'),
    PlotNumber: dataValue('Plot_no')
});

upsert('WCSPROGRAMS_VegetationGrass', 'AnswerId', {
    AnswerId: dataValue('surveyid'),
    SurveySite: dataValue('survey_area'),
    TransectNo: dataValue('Transect_no'),
    PlotNumber: dataValue('Plot_no'),
    StGrassRepeat: dataValue('Ground_Spp_No'),
    WCSPROGRAMS_TaxaID: dataValue('G_species'),
    GrassPercent: dataValue('Species_%')
});

upsert('WCSPROGRAMS_VegetationTrees', 'AnswerId', {
    AnswerId: dataValue('surveyid'),
    SurveySite: dataValue('survey_area'),
    TransectNo: dataValue('Transect_no'),
    PlotNumber: dataValue('Plot_no'),
    WCSPROGRAMS_TaxaID: dataValue('Native_tree_Shrub'),
    SbrushPer: dataValue('shrub percentage')
});

upsert('WCSPROGRAMS_VegetationVegetationObservers', 'AnswerId', {
    AnswerId: dataValue('surveyid'),
    WCSPROGRAMS_VegetationObserverID: dataValue('Observer1'),
    WCSPROGRAMS_VegetationObserverID: dataValue('Observer2'),
    WCSPROGRAMS_VegetationObserverID: dataValue('Observer3'),
});

upsert('WCSPROGRAMS_VegetationTrees', 'AnswerId', {
    AnswerId: dataValue('surveyid'),
    SurveySite: dataValue('survey_area'),
    TransectNo: dataValue('Transect_no'),
    PlotNumber: dataValue('Plot_no'),
    WCSPROGRAMS_TaxaID: dataValue('Species'),
    Dbh: dataValue('DBH'),
    Height: dataValue('Height')
});
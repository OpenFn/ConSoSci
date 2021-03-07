//Job based on mapping spec: https://docs.google.com/spreadsheets/d/1SjSHpYYzlRUa9rQRW3mN2ruI7k_QWTeF7qX4Rnvy_wk/edit#gid=264797739
alterState(state => {
  const fetchFromRef = references => {
    return references[0];
  };

  const Map = {
    anc_visits: 'ANC Visits',
    early_initiation_of_anc_less_than_3_months:
      'Early initiation of ANC (less than 3 months)',
    completing_recomended_anc_visits: 'Completing recomended ANC visits',
    danger_signs: 'Danger signs',
    skilled_birth: 'Skilled birth',
    immunization: 'Immunization',
    individual_birth_plan: 'Individual Birth Plan',
    emergency_preparedness: 'Emergency preparedness',
    childcare_and_affection: 'Childcare and affection',
    nutrition_counseling: 'Nutrition counseling',
    growth_monitoring: 'Growth monitoring',
    exclusive_breastfeeding: 'Exclusive breastfeeding',
    complementary_feeding: 'Sleeping under LLITN',
    sleeping_under_llitn: 'Knowing HIV status',
    knowing_hiv_status: 'Indoor pollution',
    indoor_pollution: 'Personal Hygiene',
    personal_hygiene: 'Safe drinking water',
    safe_drinking_water: 'Safe disposal of human waste',
    safe_disposal_of_human_waste: 'Complementary feeding',
  };
  const sitesMap = {
    //swm site lookup table to ProjectIDs
    aceh: '1785',
    amazon_estuary: '1786',
    badingilo_boma_gambela: '1787',
    bale_mountains_complex: '1788',
    'bangladesh/myanmar_coast': '1789',
    batang_ai_complex: '1790',
    bolivian_highlands: '1791',
    bolivian_piedmont: '1792',
    'bosque_valdiviano___parques_patagonia___pn_p.moreno': '1793',
    bouba_ndjida_sena_oura: '1794',
    cape_winelands_complex: '1795',
    caura: '1796',
    central_india: '1797',
    central_sahara_complex: '1798',
    chaco_north: '1799',
    changtang: '1801',
    chiquitania___pantanal: '1802',
    chocó___darién: '1803',
    cross_river_complex: '1804',
    dzanga_sangha: '1805',
    endau_rompin_complex: '1806',
    farallones_de_cali: '1807',
    fiji: '1808',
    garamba_chinko_bili_vele: '1809',
    gemsbok: '1810',
    gobi_landscape: '1811',
    gorongosa: '1812',
    greater_kruger: '1813',
    greater_pamirs: '1814',
    gunung_leuser_complex: '1815',
    indio_maíz___tortuguero: '1816',
    itenez: '1817',
    ivindo: '1818',
    kafue_complex: '1819',
    karimunjawa: '1820',
    'karukinka___corazón_de_la_isla___pla._mitre___ide': '1821',
    la_amistad: '1822',
    lefarani_complex: '1823',
    loango: '1824',
    lopé: '1825',
    madidí__tambopata: '1826',
    madid___tambopata: '1826',
    mamabay: '1827',
    manovo_complex: '1828',
    manu_upper_purus: '1829',
    marañón_ucayali: '1830',
    mara_n_ucayali: '1830',
    mato_grosso: '1831',
    mbam_djerem_deng_deng: '1832',
    middle_caqueta: '1833',
    minkebe: '1834',
    mondulkiri: '1835',
    moskitia: '1836',
    ne_asia_tiger_stronghold: '1837',
    negro: '1838',
    niassa: '1839',
    north_and_south_luangwa: '1840',
    northern_annamites: '1841',
    northern_forest_complex: '1842',
    northern_plains: '1843',
    northern_rangelands: '1844',
    northern_sulawesi_north_maluku: '1845',
    nouabalé_ndoki_lac_tele: '1846',
    nouabal__ndoki_lac_tele: '1846',
    nusa_tenggara_barat: '1847',
    odzala: '1848',
    okapi_maiko_kahuzi_biega: '1849',
    okovango_kalahari_complex: '1850',
    pará: '1851',
    payunia___auca_mahuida: '1852',
    png_highlands: '1853',
    purus: '1854',
    putumayo: '1855',
    ruaha_katavi: '1856',
    salonga: '1857',
    san_guillermo: '1858',
    san_lucas: '1859',
    sankuru_lomami: '1860',
    santiago___morona: '1861',
    savannas_of_orinoco: '1862',
    selous: '1863',
    selva_maya: '1864',
    serengeti_complex: '1865',
    sierra_nevada_de_santa_marta: '1866',
    solimões: '1867',
    somuncura: '1868',
    southern: '1869',
    suriname: '1870',
    tennaserim: '1871',
    tsavo_east_and_west: '1872',
    "ts'ehlanyane": '1873',
    upper_putumayo: '1874',
    valdes: '1875',
    valdes___patagonia_azul: '1875', //TODO: Confirm project code, this is OpenFn guess
    virunga: '1876',
    wapok_complex: '1877',
    west_namibia_complex: '1878',
    western_ghats: '1879',
    wongha_wonghé: '1880',
    yasuní: '1881',
    zakouma_complex: '1882',
    chaco_south: '1903',
    sierra_madre_occidental: '1904',
    sand_hills: '1905',
    everglades: '1906',
    appalachia: '1907',
    redwoods: '1908',
    high_divide: '1909',
    arctic_beringia: '1910',
    "ontario's_northern_boreal": '1911',
    torngat_mountains: '1912',
    flint_hills: '1913',
    northern_boreal_mountains: '1914',
    glacier: '1915',
    southern_rockies: '1916',
    sierra_madre_oriental: '1917',
    crown_of_the_continent: '1918',
    blue_patagonia: '1920',
    chaco: '1800',
  };

  const surveyTypeMap = {
    // lookup table for DataSetSurveyTypes
    basic_necessities_survey: '1',
    behavior_change: '2',
    camera_trapping: '3',
    rural_consumption: '4',
    urban_consumption: '5',
    governance: '6',
    line_transect_survey: '7',
    livestock_production: '8',
    market_survey: '9',
    most_significant_change: '10',
    point_transect_survey: '11',
    vca: '12',
    offtake_survey: '13',
    other_passive_sensor: '14',
    law_enforcement_monitoring___p: '15',
    human_wildlife_conflict: '16',
    intelligence: '17',
    tree_phenology: '18',
    tree_density: '19',
    other_botany: '20',
    other: '21',
  };

  const cameraTrapMap = {
    // lookup table for CameraTrapSettings
    still_images_will_be_collected: '1',
    video_images_will_be_collected: '2',
    the_cameras_will_be_cell_wifi_internet_e: '3',
  };

  const estimationMap = {
    //lookup table for TaxaMetricEstimationMethods
    travel_recess: '1',
    guided_recess: '2',
    recording_sign_along_transects_but_without_perpendicular_distances: '3',
    occupancy__various_software_available_: '4',
    capture_recapture___dna: '5',
    capture_recapture__photos_of_i: '6',
    spatially_explicit_capture_recapture___dna: '7',
    spatially_explicit_capture_rec: '8',
    count_of_individually_recognis: '9',
    distance_sampling_on_line_transects: '10',
    distance_sampling_on_point_transects: '11',
    _human_observer: '11',
    distance_sampling_on_point_tra: '12',
    demography__repeated_census_of: '13',
    other: '15',
    occupancy: '15',
    trapping_rates: '16',
    random_encounter_model: '17',
  };

  const metricsMap = {
    //lookup table for TaxaMetrics
    presence_absence: '1',
    species_richness: '2',
    encounter_rate__per_unit_time__or_per_un: '3',
    occupancy: '4',
    density: '5',
    abundance__density_x_area_surveyed: '6',
    number_of_known_individuals: '7',
    census: '8',
    biomass_reef: '9',
    demographic_metrics: '10',
    dung_density: '11',
    other: '12',
    species_distribution: '13',
    species_richness__maximum_likelihood_est: '14',
    animal_wildlife_health_assessment: '15',
  };

  const dataFrequencyMap = {
    //lookup table for DataFrequency types
    near_real_time: '1',
    weekly: '2',
    monthly: '3',
    quarterly: '4',
    not_needed: '5',
    other: '6',
  };

  const dataChallengeMap = {
    //lookup table for DataChallenge types
    data_collector_training: '1',
    data_collection: '2',
    data_management: '3',
    data_analysis: '4',
    result_visualization_and_reporting: '5',
    other: '6',
  };

  const dataAssistanceMap = {
    //lookup table for DataAssistance types
    automated_data_backup: '1',
    ability_to_easily_download_the_data: '2',
    automated_tabular_data_summaries: '3',
    automated_data_visualizations: '4',
    automated_maps_of_the_data: '5',
    data_collection_summary: '6',
    none: '7',
    other: '8',
  };

  const dataToolsMap = {
    //lookup table for DataTools
    acoustic_sensor: '1',
    audio_video_interview: '3',
    camera_trap: '4',
    kobo_form: '8',
    online_dataset: '10',
    paper: '12',
    smart_mobile: '17',
    other: '11',
    excel: '6',
    kobo: '9',
    smart: '16',
    sql_database: '19',
    wildlife_insights: '21',
    other: '11',
    excel: '6',
    arcgis: '2',
    qgis: '13',
    idrisi: '7',
    smart: '16',
    sas: '15',
    spss: '18',
    stata: '20',
    r: '14',
    distance: '5',
    wildlife_insights: '21',
    other: '11',
  };

  const { body } = state.data;
  return {
    ...state,
    fetchFromRef,
    body,
    sitesMap,
    surveyTypeMap,
    cameraTrapMap,
    estimationMap,
    metricsMap,
    dataFrequencyMap,
    dataChallengeMap,
    dataAssistanceMap,
    dataToolsMap,
  };
});

//1. For every Kobo form, upsert 1 ProjectAnnualDataPlan
upsert('WCSPROGRAMS_ProjectAnnualDataPlan', 'DataSetUUIDID', {
  DataSetUUIDID: dataValue('$.body._id')(state), //set custom uuid that can be used as ext Id to relate related tables
  AnswerId: dataValue('$.body._id')(state),
  WCSPROGRAMS_ProjectAnnualDataPlanName: dataValue('$.formName'), //Capture the source survey name?
  UserID_CR: '0', //TODO: Update User_ID and Address mappings?
  UserID_LM: '0',
  CRIPAddress: 'wcs',
  LMIPAddress: 'wcs',
  SubmitterName: dataValue('$.body.participant')(state),
  SubmitterEmail: dataValue('$.body.email_address')(state),
  SubmitterRole: state => {
    const role = dataValue('$.body.respondent_role')(state);
    return role === 'other'
      ? dataValue('$.body.respondent_role_other')(state)
      : dataValue('$.body.respondent_role')(state);
  },
  WCSPROGRAMS_ProjectID: state =>
    state.sitesMap[dataValue('$.body.swm_site')(state)],
  CameraTrapOtherEstimationDetail: dataValue(
    '$.body.group_qp5by62/What_other_estimatio_do_you_intend_to_use'
  )(state),
});

//For every survey planned...
alterState(state => {
  //1.1 Upsert records to create m:m relationship with WCSPROGRAMS_DataSetSurveyType for every Kobo survey_planned
  const { body } = state;
  const { surveys_planned } = body;

  if (surveys_planned && !surveys_planned_001.includes('none')) {
    const surveysPlanned = surveys_planned.split(' ');
    return sql({
      query: `
    SELECT WCSPROGRAMS_ProjectAnnualDataPlanID 
    FROM WCSPROGRAMS_ProjectAnnualDataPlan 
    WHERE DataSetUUIDID = '${body._id}'`,
    })(state).then(state => {
      const datasetuuid = state.fetchFromRef(state.references[0]);

      return upsertMany(
        'WCSPROGRAMS_ProjectAnnualDataPlanDataSetSurveyType',
        'DataSetUUIDID',
        state =>
          surveysPlanned.map(sp => {
            return {
              WCSPROGRAMS_ProjectAnnualDataPlanID: datasetuuid[0].value, //fk
              DataSetUUIDID: body._id + sp,
              AnswerId: body._id,
              WCSPROGRAMS_DataSetSurveyTypeID: state.surveyTypeMap[sp], //fk
              //TODO: Confirm how to map 'other' surveys, this column below does not exist
              /*WCSPROGRAMS_ProjectAnnualDataPlanSurveyOther:
            sp === 'other' ? body.survey_planned_other : '',*/
              UserID_CR: '0', //TODO: Update UserID mappings
              UserID_LM: '0',
            };
          })
      )(state);
    });
  }
  return state;
});

alterState(state => {
  const { body } = state;
  const { surveys_planned_001 } = body;

  if (surveys_planned_001 && !surveys_planned_001.includes('none')) {
    const surveysPlanned001 = surveys_planned_001.split(' ');

    //1.2 Upsert records to create m:m relationship with WCSPROGRAMS_DataSetSurveyType for every Kobo survey_planned_001 for partners
    return sql({
      query: `
    SELECT WCSPROGRAMS_ProjectAnnualDataPlanID 
    FROM WCSPROGRAMS_ProjectAnnualDataPlan 
    WHERE DataSetUUIDID = '${body._id}'`,
    })(state).then(state => {
      const datasetuuid = state.fetchFromRef(state.references[0]);
      // console.log(datasetuuid);

      return upsertMany(
        'WCSPROGRAMS_ProjectAnnualDataPlanDataSetSurveyType',
        'DataSetUUIDID',
        state =>
          surveysPlanned001.map(sp => {
            return {
              WCSPROGRAMS_ProjectAnnualDataPlanID: datasetuuid[0].value, //FK to WCSPROGRAMS_ProjectAnnualDataPlan
              DataSetUUIDID: body._id + sp + '001',
              AnswerId: body._id,
              WCSPROGRAMS_DataSetSurveyTypeID: state.surveyTypeMap[sp], //fk
              /*WCSPROGRAMS_ProjectAnnualDataPlanSurveyOther:  //TODO: Confirm how to map 'other' surveys, this column below does not exist
            sp === 'other' ? body.survey_planned_other : '',*/
              UserID_CR: '0', //TODO: Update UserID mappings
              UserID_LM: '0',
            };
          })
      )(state);
    });
  }
  return state;
});

alterState(state => {
  const { body } = state;

  const collectGroup =
    body['group_qp5by62/Which_of_the_followi_ata_you_will_collect'];

  if (collectGroup) {
    const collectGroups = collectGroup.split(' ');

    return sql({
      query: `
    SELECT WCSPROGRAMS_ProjectAnnualDataPlanID 
    FROM WCSPROGRAMS_ProjectAnnualDataPlan 
    WHERE DataSetUUIDID = '${body._id}'`,
    })(state).then(state => {
      const datasetuuid = state.fetchFromRef(state.references[0]);
      //2.1 Upsert records to create m:m relationships with WCSPROGRAMS_CameraTrapSetting
      return upsertMany(
        'WCSPROGRAMS_ProjectAnnualDataPlanCameraTrapSetting',
        'DataSetUUIDID',
        state =>
          collectGroups.map(cg => {
            return {
              WCSPROGRAMS_ProjectAnnualDataPlanID: datasetuuid[0].value, //FK to WCSPROGRAMS_ProjectAnnualDataPlan
              DataSetUUIDID: body._id + cg,
              AnswerId: body._id,
              WCSPROGRAMS_CameraTrapSettingID: state.cameraTrapMap[cg], //FK to whichever camera trap reference table
              //TODO: Update UserID_CR mappings
              UserID_CR: '0',
              UserID_LM: '0',
            };
          })
      )(state);
    });
  }
  return state;
});

alterState(state => {
  //2.2 Upsert records to create m:m relationships with WCSPROGRAMS_TaxaMetric
  const { body } = state;

  const metricGroup =
    body['group_qp5by62/Which_metrics_questi_ith_camera_trap_data'];

  if (metricGroup) {
    const metricGroups = metricGroup.split(' ');
    return sql({
      query: `
    SELECT WCSPROGRAMS_ProjectAnnualDataPlanID 
    FROM WCSPROGRAMS_ProjectAnnualDataPlan 
    WHERE DataSetUUIDID = '${body._id}'`,
    })(state).then(state => {
      const datasetuuid = state.fetchFromRef(state.references[0]);
      // console.log(datasetuuid);
      return upsertMany(
        'WCSPROGRAMS_ProjectAnnualDataPlanTaxaMetric',
        'DataSetUUIDID',
        state =>
          metricGroups.map(mg => {
            return {
              WCSPROGRAMS_ProjectAnnualDataPlanID: datasetuuid[0].value, //FK to WCSPROGRAMS_ProjectAnnualDataPlan
              DataSetUUIDID: body._id + mg,
              AnswerId: body._id,
              WCSPROGRAMS_TaxaMetricID: state.metricsMap[mg], //FK to whichever camera trap reference table
              //TODO: Update UserID_CR mappings
              UserID_CR: '0',
              UserID_LM: '0',
            };
          })
      )(state);
    });
  }
  return state;
});

// NOTE: Table name not present in mapping sheet
alterState(state => {
  const { body } = state;

  const estimationGroup = body['group_qp5by62/What_estimation_methods_do_you'];

  if (estimationGroup) {
    const estimationGroups = estimationGroup.split(' ');
    return sql({
      query: `
    SELECT WCSPROGRAMS_ProjectAnnualDataPlanID 
    FROM WCSPROGRAMS_ProjectAnnualDataPlan 
    WHERE DataSetUUIDID = '${body._id}'`,
    })(state).then(state => {
      const datasetuuid = state.fetchFromRef(state.references[0]);
      // console.log(datasetuuid);
      //2.3 Upsert records to create m:m relationships with WCSPROGRAMS_TaxaMetricEstimationMethod
      return upsertMany(
        'WCSPROGRAMS_ProjectAnnualDataPlanTaxaMetricEstimationMethod',
        'DataSetUUIDID',
        state =>
          estimationGroups.map(eg => {
            return {
              WCSPROGRAMS_ProjectAnnualDataPlanID: datasetuuid[0].value, //FK to WCSPROGRAMS_ProjectAnnualDataPlan
              DataSetUUIDID: body._id + eg,
              AnswerId: body._id,
              WCSPROGRAMS_TaxaMetricEstimationMethodID: state.estimationMap[eg], //FK to whichever camera trap reference table
              //TODO: Update UserID_CR mappings
              UserID_CR: '0',
              UserID_LM: '0',
            };
          })
      )(state);
    });
  }
  return state;
});

//For every dataset repeat group entry...
each(
  dataPath('$.body.datasets[*]'),
  alterState(state => {
    const dataset = state.data;
    const { body } = state;

    return sql({
      query: `
      SELECT WCSPROGRAMS_ProjectAnnualDataPlanID
      FROM WCSPROGRAMS_ProjectAnnualDataPlan
      WHERE DataSetUUIDID = '${body._id}'`,
    })(state).then(state => {
      const datasetuuid = state.fetchFromRef(state.references[0]);
      //3. Upsert 1 ProjectAnnualDataPlanDataSet for every dataset
      return upsert(
        'WCSPROGRAMS_ProjectAnnualDataPlanDataSet',
        'DataSetUUIDID',
        {
          DataSetUUIDID: body._id + dataset['datasets/survey_type'],
          WCSPROGRAMS_ProjectAnnualDataPlanID: datasetuuid[0].value, //FK to WCSPROGRAMS_ProjectAnnualDataPlanID
          AnswerId: body._id,
          TypeOfDataSet:
            dataset['datasets/survey_type'] === 'other'
              ? dataset['datasets/survey_type']
              : dataset['datasets/survey_type_other'],
          WCSPROGRAMS_ProjectAnnualDataPlanDataSetName:
            dataset['datasets/dataset_name_text'],
          CollectionStartDate: dataset['datasets/data_collection_start'],
          CollectionEndDate: dataset['datasets/data_collection_end'],
          WCSPROGRAMS_DataAccessFrequencyID:
            state.dataFrequencyMap[dataset['datasets/data_review_frequency']],
          OtherFrequency:
            state.dataFrequencyMap[
              dataset['datasets/data_review_frequency_other']
            ],
          AnalysisCompletionDate:
            dataset['datasets/data_analysis_completion_date'],
          DataManagementPlan:
            dataset['datasets/data_management_plan'] === 'yes' ? 1 : 0,
          DataManagementPlanLink: dataset['datasets/link_dmp'],
          KoboForm: dataset['datasets/kobo_forms'],
          OtherCollectionTool: dataset['datasets/data_collection_tool'],
          OtherManagementTool: dataset['datasets/data_management_tool_other'],
          OtherAnalysisTool: dataset['datasets/data_analysis_tool_other'],
          OtherChallenge: dataset['datasets/challenge_other'],
          OtherHelpNeeded: dataset['datasets/data_mgmt_help_other'],
          OtherAssistance: dataset['datasets/other_services'],
          OtherNotes: dataset['datasets/other_info'],
          //TODO: Update UserID_CR mappings
          UserID_CR: '0',
          UserID_LM: '0',
        }
      )(state);
    });
  })
);

each(
  state => state.body.datasets,
  alterState(state => {
    console.log('Upserting');
    const dataset = state.data;
    const { body } = state;

    if (dataset['datasets/data_collection_tool']) {
      const dataCollectionTools = dataset[
        'datasets/data_collection_tool'
      ].split(' ');

      return sql({
        query: `
      SELECT WCSPROGRAMS_ProjectAnnualDataPlanDataSetID 
      FROM WCSPROGRAMS_ProjectAnnualDataPlanDataSet
      WHERE DataSetUUIDID = '${body._id}${dataset['datasets/survey_type']}'`,
      })(state).then(state => {
        const datasetuuid = state.fetchFromRef(state.references[0]);
        //NOTE: 1 data tool in the dataToolsMap (e.g., Excel) might be used collection, management, AND/OR analysis --> potentially all 3 uses
        //3.1. Upsert many ProjectAnnualDataPlanDataSetDataTool records to log each dataset's related data_collection_tools
        return upsertMany(
          'WCSPROGRAMS_ProjectAnnualDataPlanDataSetDataTool',
          'DataSetUUIDID',
          state =>
            dataCollectionTools.map(dct => {
              return {
                DataSetUUIDID: body._id + dct,
                AnswerId: dataValue('body._id'),
                WCSPROGRAMS_ProjectAnnualDataPlanDataSetID:
                  datasetuuid[0].value, //fk
                IsForCollect: 1,
                WCSPROGRAMS_DataToolID: state.dataToolsMap[dct], //fk
                //TODO: Update UserID_CR mappings
                UserID_CR: '0',
                UserID_LM: '0',
              };
            })
        )(state);
      });
    }
    return state;
  })
);

each(
  state => state.body.datasets,
  alterState(state => {
    const dataset = state.data;
    const { body } = state;

    if (dataset['datasets/data_management_tool']) {
      const dataManagementTools = dataset[
        'datasets/data_management_tool'
      ].split(' ');

      return sql({
        query: `
      SELECT WCSPROGRAMS_ProjectAnnualDataPlanDataSetID 
      FROM WCSPROGRAMS_ProjectAnnualDataPlanDataSet
      WHERE DataSetUUIDID = '${body._id}${dataset['datasets/survey_type']}'`,
      })(state).then(state => {
        const datasetuuid = state.fetchFromRef(state.references[0]);
        //1 data tool in the dataToolsMap (e.g., Excel) might be used collection, management, AND/OR analysis --> potentially all 3 uses
        //3.2. Upsert many ProjectAnnualDataPlanDataSetDataTool records to log each dataset's related data_management_tools
        return upsertMany(
          'WCSPROGRAMS_ProjectAnnualDataPlanDataSetDataTool',
          'DataSetUUIDID',
          state =>
            dataManagementTools.map(dmt => {
              return {
                DataSetUUIDID: body.id + dmt,
                AnswerId: body._id,
                WCSPROGRAMS_ProjectAnnualDataPlanDataSetID:
                  datasetuuid[0].value, //fk -> Q: Should we map to ProjectAnnualDataPlanDataSet OR ProjectDataSet?
                IsForManage: 1,
                WCSPROGRAMS_DataToolID: state.dataToolsMap[dmt], //fk
                //TODO: Update UserID_CR mappings
                UserID_CR: '0',
                UserID_LM: '0',
              };
            })
        )(state);
      });
    }
    return state;
  })
);

each(
  state => state.body.datasets,
  alterState(state => {
    const dataset = state.data;
    const { body } = state;

    if (dataset['datasets/data_analysis_tool']) {
      const dataAnalysisTools = dataset['datasets/data_analysis_tool'].split(
        ' '
      );

      return sql({
        query: `
      SELECT WCSPROGRAMS_ProjectAnnualDataPlanDataSetID 
      FROM WCSPROGRAMS_ProjectAnnualDataPlanDataSet
      WHERE DataSetUUIDID = '${body._id}${dataset['datasets/survey_type']}'`,
      })(state).then(state => {
        const datasetuuid = state.fetchFromRef(state.references[0]);
        //NOTE: 1 data tool in the dataToolsMap (e.g., Excel) might be used collection, management, AND/OR analysis --> potentially all 3 uses
        //3.3. Upsert many ProjectAnnualDataPlanDataSetDataTool records to log each dataset's related data_analysis_tools
        return upsertMany(
          'WCSPROGRAMS_ProjectAnnualDataPlanDataSetDataTool',
          'DataSetUUIDID',
          state =>
            dataAnalysisTools.map(dat => {
              return {
                DataSetUUIDID: body._id + dat,
                AnswerId: body._id,
                WCSPROGRAMS_ProjectAnnualDataPlanDataSetID:
                  datasetuuid[0].value, //fk
                IsForAnalyze: 1,
                WCSPROGRAMS_DataToolID: state.dataToolsMap[dat], //fk
                //TODO: Update UserID_CR mappings
                UserID_CR: '0',
                UserID_LM: '0',
              };
            })
        )(state);
      });
    }
    return state;
  })
);

each(
  state => state.body.datasets,
  alterState(state => {
    const dataset = state.data;
    const { body } = state;

    if (dataset['datasets/challenge']) {
      const dataChallenges = dataset['datasets/challenge'].split(' ');

      return sql({
        query: `
      SELECT WCSPROGRAMS_ProjectAnnualDataPlanDataSetID 
      FROM WCSPROGRAMS_ProjectAnnualDataPlanDataSet
      WHERE DataSetUUIDID = '${body._id}${dataset['datasets/survey_type']}'`,
      })(state).then(state => {
        const datasetuuid = state.fetchFromRef(state.references[0]);
        //3.4. Upsert many ProjectAnnualDataPlanDataSetDataChallenge records to log each dataset's related dataChallenge
        return upsertMany(
          'WCSPROGRAMS_ProjectAnnualDataPlanDataSetDataChallenge',
          'DataSetUUIDID',
          state =>
            dataChallenges.map(dc => {
              return {
                DataSetUUIDID: body._id + dc,
                AnswerId: body._id,
                WCSPROGRAMS_ProjectAnnualDataPlanDataSetID:
                  datasetuuid[0].value, //fk
                WCSPROGRAMS_DataChallengeID: state.dataChallengeMap[dc], //fk
                //TODO: Update UserID_CR mappings
                UserID_CR: '0',
                UserID_LM: '0',
              };
            })
        )(state);
      });
    }
    return state;
  })
);

each(
  state => state.body.datasets,
  alterState(state => {
    const dataset = state.data;
    const { body } = state;

    if (dataset['datasets/data_management_help']) {
      const dataManagementHelps = dataset[
        'datasets/data_management_help'
      ].split(' ');

      return sql({
        query: `
      SELECT WCSPROGRAMS_ProjectAnnualDataPlanDataSetID 
      FROM WCSPROGRAMS_ProjectAnnualDataPlanDataSet
      WHERE DataSetUUIDID = '${body._id}${dataset['datasets/survey_type']}'`,
      })(state).then(state => {
        const datasetuuid = state.fetchFromRef(state.references[0]);
        //3.5. Upsert many ProjectAnnualDataPlanDataSetDataAssistance records to log each dataset's related dataAssistance
        return upsertMany(
          'WCSPROGRAMS_ProjectAnnualDataPlanDataSetDataAssistance',
          'DataSetUUIDID',
          state =>
            dataManagementHelps.map(dmh => {
              return {
                DataSetUUIDID: body._id + dmh,
                AnswerId: body._id,
                WCSPROGRAMS_ProjectAnnualDataPlanDataSetID:
                  datasetuuid[0].value, //fk
                WCSPROGRAMS_DataAssistanceID: state.dataAssistanceMap[dmh], //fk
                //TODO: Update UserID_CR mappings
                UserID_CR: '0',
                UserID_LM: '0',
              };
            })
        )(state);
      });
    }
    return state;
  })
);

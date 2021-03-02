// Your job goes here.
alterState(state => {
  const sitesMap = {
    aceh: '1785',
    amazon_estuary: '1786',
    badingilo_boma_gambela: '1787',
    bale_mountains_complex: '1788',
    [`bangladesh/myanmar_coast`]: '1789',
    batang_ai_complex: '1790',
    bolivian_highlands: '1791',
    bolivian_piedmont: '1792',
    [`bosque_valdiviano___parques_patagonia___pn_p.moreno`]: '1793',
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
    [`karukinka___corazón_de_la_isla___pla._mitre___ide`]: '1821',
    la_amistad: '1822',
    lefarani_complex: '1823',
    loango: '1824',
    lopé: '1825',
    madidí__tambopata: '1826',
    mamabay: '1827',
    manovo_complex: '1828',
    manu_upper_purus: '1829',
    marañón_ucayali: '1830',
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
    [`ts'ehlanyane`]: '1873',
    upper_putumayo: '1874',
    valdes: '1875',
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
    [`ontario's_northern_boreal`]: '1911',
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

  const cameraTrapMap = {
    still_images_will_be_collected: '0000',
    video_images_will_be_collected: '1111',
    the_cameras_will_be_cell_wifi_internet_e: '2222',
  };

  const dataFrequencyMap = {
    near_real_time: '1',
    weekly: '2',
    monthly: '3',
    quarterly: '4',
    not_needed: '5',
    other: '6',
  };

  return { ...state, sitesMap, cameraTrapMap, dataFrequencyMap };
});

upsert('WCSPROGRAMS_ProjectAnnualDataPlan', 'ProjectAnnualDataPlanID', {
  formName: dataValue('$.formName'), // Change column name when available
  WCSPROGRAMS_ProjectAnnualDataPlanID: dataValue('$.body._id'),
  start: dataValue('$.body.start'), // Change column name when available
  end: dataValue('$.body.end'), // Change column name when available
  welcome: dataValue('$.body.welcome'), // Change column name when available
  SubmitterName: dataValue('$.body.participant'),
  SubmitterEmail: dataValue('$.body.email_address'),
  SubmitterRole: state => {
    const role = dataValue('$.body.respondent_role')(state);
    return role === 'other'
      ? dataValue('$.body.respondent_role_other')(state)
      : dataValue('$.body.respondent_role')(state);
  },
  WCSPROGRAMS_ProjectID: state.sitesMap[dataValue('$.body.swm_site')],
  CameraTrapOtherEstimationDetail: dataValue(
    '$.body.group_qp5by62/What_other_estimatio_do_you_intend_to_use'
  ),
});

alterState(state => {
  const { surveys_planned, surveys_planned_001 } = state.data.body;
  const collectGroup =
    state.data.body['group_qp5by62/Which_of_the_followi_ata_you_will_collect'];

  const surveysPlanned = surveys_planned.split(' ');
  const surveysPlanned001 = surveys_planned_001.split(' ');
  const collectGroups = collectGroup.split(' ');

  return combine(
    upsertMany(
      'WCSPROGRAMS_ProjectAnnualDataPlanSurvey',
      'WCSPROGRAMS_ProjectAnnualDataPlanSurveyID',
      state =>
        surveysPlanned.map(sp => {
          return {
            WCSPROGRAMS_ProjectAnnualDataPlanID: dataValue('body._id'),
            WCSPROGRAMS_ProjectAnnualDataPlanSurveyID:
              dataValue('body._id') + sp,
            WCSPROGRAMS_DataSetSurveyTypeID: state.data,
            WCSPROGRAMS_ProjectAnnualDataPlanSurveyOther:
              sp === 'other' ? dataValue('body.survey_planned_other') : '',
          };
        })
    ),
    upsertMany(
      'WCSPROGRAMS_ProjectAnnualDataPlanSurvey',
      'WCSPROGRAMS_ProjectAnnualDataPlanSurveyID',
      state =>
        surveysPlanned001.map(sp => {
          return {
            WCSPROGRAMS_ProjectAnnualDataPlanID: dataValue('body._id'),
            WCSPROGRAMS_ProjectAnnualDataPlanSurveyID:
              dataValue('body._id') + sp,
            WCSPROGRAMS_DataSetSurveyTypeID: state.data,
            WCSPROGRAMS_ProjectAnnualDataPlanSurveyOther:
              sp === 'other' ? dataValue('body.survey_planned_other') : '',
          };
        })
    ),
    upsertMany(
      'WCSPROGRAMS_ProjectPlanCameraTrap',
      'WCSPROGRAMS_ProjectPlanCameraTrapID',
      state =>
        collectGroups.map(cg => {
          return {
            WCSPROGRAMS_ProjectAnnualDataPlanID: dataValue('body._id'),
            WCSPROGRAMS_ProjectPlanCameraTrapID: dataValue('body._id') + cg,
            WCSPROGRAMS_ProjectPlanCameraTrap: state.cameraTrapMap[cg],
          };
        })
    )
  )(state);
});

each(
  dataPath('$.body.datasets[*]'),
  upsert(
    'WCSPROGRAMS_ProjectAnnualDataPlanDataSet',
    'WCSPROGRAMS_ProjectAnnualDataPlanDataSetID',
    {
      WCSPROGRAMS_ProjectAnnualDataPlanDataSetID:
        dataValue('body._id') + state.data['datasets/survey_type'],
      WCSPROGRAMS_ProjectAnnualDataPlanID: dataValue('body._id'),
      TypeOfDataSet:
        state.data['datasets/survey_type'] === 'other'
          ? state.data['datasets/survey_type']
          : state.data['datasets/survey_type_other'],
      WCSPROGRAMS_ProjectAnnualDataPlanDataSetName:
        state.data['datasets/dataset_name_text'],
      CollectionStartDate: state.data['datasets/data_collection_start'],
      CollectionEndDate: state.data['datasets/data_collection_end'],
      WCSPROGRAMS_DataAccessFrequencyID:
        state.dataFrequencyMap[state.data['datasets/data_review_frequency']],
      OtherFrequency:
        state.dataFrequencyMap[
          state.data['datasets/data_review_frequency_other']
        ],
      AnalysisCompletionDate:
        state.data['datasets/data_analysis_completion_date'],
      DataManagementPlan:
        state.data['datasets/data_management_plan'] === 'yes' ? 1 : 0,
      DataManagementPlanLink:
        state.data['datasets/link_dmp'],
      KoboForm: state.data['datasets/kobo_forms'],
      OtherCollectionTool: state.data['datasets/data_collection_tool'],
      OtherManagementTool: state.data['datasets/data_management_tool_other'],
      OtherAnalysisTool: state.data['datasets/data_analysis_tool_other'],
      OtherChallenge: state.data['datasets/challenge_other'],
      OtherHelpNeeded: state.data['datasets/data_mgmt_help_other'],
      OtherAssistance: state.data['datasets/other_services'],
      OtherNotes: state.data['datasets/other_info'],
    }
  )
);

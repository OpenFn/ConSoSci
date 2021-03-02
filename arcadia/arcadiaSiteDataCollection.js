// Your job goes here.
alterState(state => {
  const sitesMap = {
    batang_ai_complex: '0000',
    changtang: '0001',
    endau_rompin_complex: '0002',
    gunung_leuser_complex: '0003',
    madid___tambopata: '0004',
    mamabay: '0005',
    manovo_complex: '0006',
    mara_n_ucayali: '0007',
    moskitia: '0008',
    northern_sulawesi_north_maluku: '0009',
    nouabal__ndoki_lac_tele: '0010',
    okapi_maiko_kahuzi_biega: '0011',
    savannas_of_orinoco: '0012',
    selva_maya: '0013',
    tennaserim: '0014',
    valdes___patagonia_azul: '0015',
  };

  const cameraTrapMap = {
    still_images_will_be_collected: '0000',
    video_images_will_be_collected: '1111',
    the_cameras_will_be_cell_wifi_internet_e: '2222',
  };

  return { ...state, sitesMap, cameraTrapMap };
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

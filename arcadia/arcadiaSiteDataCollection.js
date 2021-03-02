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

  return { ...state, sitesMap };
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
  const surveysPlanned = surveys_planned.split(' ');
  const surveysPlanned001 = surveys_planned_001.split(' ');
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
    )
  )(state);
});

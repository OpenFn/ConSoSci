//Job based on mapping spec: https://docs.google.com/spreadsheets/d/1SjSHpYYzlRUa9rQRW3mN2ruI7k_QWTeF7qX4Rnvy_wk/edit#gid=264797739
alterState(state => {
  const fetchFromRef = references => {
    return references[0];
  };

    //lookup table 1:m  WCSPROGRAMS_DataAccessFrequency
    //lookup table m:m WCSPROGRAMS_DataChallenge
    //lookup table m:m WCSPROGRAMS_DataAssistance
    //lookup table m:m WCSPROGRAMS_DataTool
    
//1. For every Kobo form, upsert 1 ProjectAnnualDataPlan
fn(async state => {
  const mappingAnnalDataPlan = { 
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
  WCSPROGRAMS_ProjectID: await findValue({
    uuid: 'wcsprograms_projectid',
    relation: 'WCSPROGRAMS_Project',
    where: { WCSPROGRAMS_ProjectExtCode: dataValue('swm_site') },
   })(state),
};
return upsert('WCSPROGRAMS_ProjectAnnualDataPlan', 'DataSetUUIDID', mappingAnnalDataPlan, {
    setNull: ["''", "'undefined'"], logValues: true
  })(state);
});

  
//For every survey planned...
  //1.1 Upsert records to create m:m relationship with WCSPROGRAMS_DataSetSurveyType for every Kobo survey_planned
  each(
  dataPath('surveys_planned[*]'),
  each(
    dataPath('undefined[*]'),
    fn(async state => {
      const dataArray = state.data['surveys_planned'] || [];

      const mapping = [];

      for (let x of dataArray) {
        mapping.push({
          WCSPROGRAMS_DataSetSurveyTypeID: await findValue({
            uuid: 'wcsprograms_datasetsurveytypeid',
            relation: 'WCSPROGRAMS_DataSetSurveyType',
            where: { WCSPROGRAMS_DataSetSurveyTypeExtCode: x },
          })(state),
          WCSPROGRAMS_DataSetSurveyTypeID: x['__parentUuid'],
          GeneratedUuid: x['__generatedUuid'],
          UndefinedUuid: x['__parentUuid'],
        });
      }
      return upsertMany(
        'WCSPROGRAMS_ProjectAnnualDataPlanDataSetSurveyType',
        'GeneratedUuid',
        () => mapping,
        { setNull: ["''", "'undefined'"] }
      )(state);
    })
   )
 );
 });

  //1.2 Upsert records to create m:m relationship with WCSPROGRAMS_DataSetSurveyType for every Kobo survey_planned_001 for partners
  each(
  dataPath('surveys_planned_001[*]'),
  each(
    dataPath('undefined[*]'),
    fn(async state => {
      const dataArray = state.data['surveys_planned_001'] || [];

      const mapping = [];

      for (let x of dataArray) {
        mapping.push({
          WCSPROGRAMS_DataSetSurveyTypeID: await findValue({
            uuid: 'wcsprograms_datasetsurveytypeid',
            relation: 'WCSPROGRAMS_DataSetSurveyType',
            where: { WCSPROGRAMS_DataSetSurveyTypeExtCode: x },
          })(state),
          WCSPROGRAMS_DataSetSurveyTypeID: x['__parentUuid'],
          GeneratedUuid: x['__generatedUuid'],
          UndefinedUuid: x['__parentUuid'],
        });
      }
      return upsertMany(
        'WCSPROGRAMS_ProjectAnnualDataPlanDataSetSurveyType',
        'GeneratedUuid',
        () => mapping,
        { setNull: ["''", "'undefined'"] }
      )(state);
    })
   )
 );
 });   
  
  alterState(state => {
  const { body } = state;

  const collectGroup =
    body['group_qp5by62/Which_of_the_followi_ata_you_will_collect'];

  if (collectGroup) {
    const collectGroups = collectGroup.split(' ');

   // Camera trap repeat group
    return sql({
      query: `
    SELECT WCSPROGRAMS_ProjectAnnualDataPlanID 
    FROM WCSPROGRAMS_ProjectAnnualDataPlan 
    WHERE DataSetUUIDID = '${body._id}'`,
    })(state).then(state => {
      const datasetuuid = state.fetchFromRef(state.references[0]);
      //2.1 Upsert records to create m:m relationships with WCSPROGRAMS_CameraTrapSetting
  each(
  dataPath('Which_of_the_followi_ata_you_will_collect[*]'),
  each(
    dataPath('undefined[*]'),
    fn(async state => {
      const dataArray = state.data['Which_of_the_followi_ata_you_will_collect'] || [];

      const mapping = [];

      for (let x of dataArray) {
        mapping.push({
          WCSPROGRAMS_DataSetSurveyTypeID: await findValue({
            uuid: 'wcsprograms_cameratrapsettingid',
            relation: 'WCSPROGRAMS_CameraTrapSetting',
            where: { WCSPROGRAMS_CameraTrapSettingExtCode: x },
          })(state),
          WCSPROGRAMS_CameraTrapSettingID: x['__parentUuid'],
          GeneratedUuid: x['__generatedUuid'],
          UndefinedUuid: x['__parentUuid'],
        });
      }
      return upsertMany(
        'WCSPROGRAMS_ProjectAnnualDataPlanCameraTrapSetting',
        'GeneratedUuid',
        () => mapping,
        { setNull: ["''", "'undefined'"] }
      )(state);
    })
   )
 );
 });  

   //2.2 Upsert records to create m:m relationships with WCSPROGRAMS_TaxaMetric
each(
  dataPath('Which_metrics_questi_ith_camera_trap_data[*]'),
  each(
    dataPath('undefined[*]'),
    fn(async state => {
      const dataArray = state.data['Which_metrics_questi_ith_camera_trap_data] || [];

      const mapping = [];

      for (let x of dataArray) {
        mapping.push({
          WCSPROGRAMS_DataSetSurveyTypeID: await findValue({
            uuid: 'wcsprograms_taxametricid',
            relation: 'WCSPROGRAMS_TaxaMetric',
            where: { WCSPROGRAMS_TaxaMetricExtCode: x },
          })(state),
          WCSPROGRAMS_TaxaMetricID: x['__parentUuid'],
          GeneratedUuid: x['__generatedUuid'],
          UndefinedUuid: x['__parentUuid'],
        });
      }
      return upsertMany(
        'WCSPROGRAMS_ProjectAnnualDataPlanTaxaMetric',
        'GeneratedUuid',
        () => mapping,
        { setNull: ["''", "'undefined'"] }
      )(state);
    })
   )
 );
 });  

    //2.3 Upsert records to create m:m relationships with WCSPROGRAMS_TaxaMetricEstimationMethod
  each(
  dataPath('What_estimation_methods_do_you[*]'),
  each(
    dataPath('undefined[*]'),
    fn(async state => {
      const dataArray = state.data['What_estimation_methods_do_you] || [];

      const mapping = [];

      for (let x of dataArray) {
        mapping.push({
          WCSPROGRAMS_DataSetSurveyTypeID: await findValue({
            uuid: 'wcsprograms_taxametricestimationmethodid',
            relation: 'WCSPROGRAMS_TaxaMetricEstimationMethod',
            where: { WCSPROGRAMS_TaxaMetricEstimationMethodExtCode: x },
          })(state),
          WCSPROGRAMS_TaxaMetricEstimationMethodID: x['__parentUuid'],
          GeneratedUuid: x['__generatedUuid'],
          UndefinedUuid: x['__parentUuid'],
        });
      }
      return upsertMany(
        'WCSPROGRAMS_ProjectAnnualDataPlanTaxaMetricEstimationMethod',
        'GeneratedUuid',
        () => mapping,
        { setNull: ["''", "'undefined'"] }
      )(state);
    })
   )
 );
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
          WCSPROGRAMS_DataSetSurveyTypeID: state.surveyTypeMap[dataset['datasets/survey_type']],
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
          //TODO: Update UserID_CR mappings? Or keep default?
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

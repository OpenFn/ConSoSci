//Job based on mapping spec: https://docs.google.com/spreadsheets/d/1SjSHpYYzlRUa9rQRW3mN2ruI7k_QWTeF7qX4Rnvy_wk/edit#gid=264797739
alterState(state => {
  const fetchFromRef = references => {
    return references[0];
  };
    
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
          WCSPROGRAMS_DataSetSurveyTypeName: x['name'],
          WCSPROGRAMS_DataSetSurveyTypeExtCode: x['name'],
          GeneratedUuid: x['__generatedUuid'],
          UndefinedUuid: x['__parentUuid'],
        });
      }
      return upsertMany(
        'WCSPROGRAMS_ProjectAnnualDataPlanDataSetSurveyType',
        'GeneratedUuid',  
        () => mapping,  { 
         setNull: ["''", "'undefined'"] }
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
          WCSPROGRAMS_DataSetSurveyTypeName: x['name'],
          WCSPROGRAMS_DataSetSurveyTypeExtCode: x['name'],
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
          WCSPROGRAMS_CameraTrapSettingName: x['name'],
          WCSPROGRAMS_CameraTrapSettingExtCode: x['name'],
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
      const dataArray = state.data['Which_metrics_questi_ith_camera_trap_data'] || [];

      const mapping = [];

      for (let x of dataArray) {
        mapping.push({
          WCSPROGRAMS_TaxaMetricName: x['name'],
          WCSPROGRAMS_TaxaMetricExtCode: x['name'],
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
      const dataArray = state.data['What_estimation_methods_do_you'] || [];

      const mapping = [];

      for (let x of dataArray) {
        mapping.push({
          WCSPROGRAMS_TaxaMetricEstimationMethodName: x['name'],
          WCSPROGRAMS_TaxaMetricEstimationMethodExtCode: x['name'],
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
          WCSPROGRAMS_DataSetSurveyTypeID: await findValue({
            uuid: 'wcsprograms_datasetsurveytypeid',
            relation: 'WCSPROGRAMS_DataSetSurveyType',
            where: { TT_DataSetSurveyTypExtCode: dataValue('datasets/survey_type') },
           })(state),
          WCSPROGRAMS_ProjectAnnualDataPlanDataSetName:
            dataset['datasets/dataset_name_text'],
          CollectionStartDate: dataset['datasets/data_collection_start'],
          CollectionEndDate: dataset['datasets/data_collection_end'],
          WCSPROGRAMS_DataAccessFrequencyID: await findValue({
            uuid: 'wcsprograms_dataaccessfrequencyid',
            relation: 'WCSPROGRAMS_DataAccessFrequency',
            where: { TT_DataAccessFrequencyExtCode: dataValue('datasets/data_review_frequency') },
           })(state),
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
          DataIsOpenAccess: dataset['datasets/open_access_plan'] === 'yes' ? 1 : 0,
          WCSPROGRAMS_DataSetOpenAccessQuantityID: await findValue({
            uuid: 'wcsprograms_datasetopenaccessquantityid',
            relation: 'WCSPROGRAMS_DataSetOpenAccessQuantity',
            where: { TT_DataSetOpenAccessQuantityExtCode: dataValue('datasets/open_access_dataquantity') },
           })(state),
          WCSPROGRAMS_DataSetOpenAccessTimelineID: await findValue({
            uuid: 'wcsprograms_datasetopenaccesstimelineid',
            relation: 'WCSPROGRAMS_DataSetOpenAccessTimeline',
            where: { TT_DataSetOpenAccessTimelineExtCode: dataValue('datasets/open_access_when') },
           })(state),
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
   each(
    dataPath('undefined[*]'),
    fn(async state => {
      const dataArray = state.data['data_collection_tool'] || [];

      const mapping = [];

      for (let x of dataArray) {
        mapping.push({
          WCSPROGRAMS_DataToolName: x['name'],
          WCSPROGRAMS_DataToolExtCode : x['name'],
          GeneratedUuid: x['__generatedUuid'],
          UndefinedUuid: x['__parentUuid'],
        });
      }
      return upsertMany(
        'WCSPROGRAMS_ProjectAnnualDataPlanDataSetDataTool',
        'GeneratedUuid',
        () => mapping,
        { setNull: ["''", "'undefined'"] }
      )(state);
    })
   )
 );
 }); 

   
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
    each(
    dataPath('undefined[*]'),
    fn(async state => {
      const dataArray = state.data['data_management_tool'] || [];

      const mapping = [];

      for (let x of dataArray) {
        mapping.push({
          WCSPROGRAMS_DataToolName: x['name'],
          WCSPROGRAMS_DataToolExtCode : x['name'],
          GeneratedUuid: x['__generatedUuid'],
          UndefinedUuid: x['__parentUuid'],
        });
      }
      return upsertMany(
        'WCSPROGRAMS_ProjectAnnualDataPlanDataSetDataTool',
        'GeneratedUuid',
        () => mapping,
        { setNull: ["''", "'undefined'"] }
      )(state);
    })
   )
 );
 }); 

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
    each(
    dataPath('undefined[*]'),
    fn(async state => {
      const dataArray = state.data['data_analysis_tool'] || [];

      const mapping = [];

      for (let x of dataArray) {
        mapping.push({
          WCSPROGRAMS_DataToolName: x['name'],
          WCSPROGRAMS_DataToolExtCode : x['name'],
          GeneratedUuid: x['__generatedUuid'],
          UndefinedUuid: x['__parentUuid'],
        });
      }
      return upsertMany(
        'WCSPROGRAMS_ProjectAnnualDataPlanDataSetDataTool',
        'GeneratedUuid',
        () => mapping,
        { setNull: ["''", "'undefined'"] }
      )(state);
    })
   )
 );
 }); 

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
    each(
    dataPath('undefined[*]'),
    fn(async state => {
      const dataArray = state.data['challenge'] || [];

      const mapping = [];

      for (let x of dataArray) {
        mapping.push({
          WCSPROGRAMS_DataChallengeName: x['name'],
          WCSPROGRAMS_DataChallengeExtCode : x['name'],
          GeneratedUuid: x['__generatedUuid'],
          UndefinedUuid: x['__parentUuid'],
        });
      }
      return upsertMany(
        'WCSPROGRAMS_ProjectAnnualDataPlanDataSetDataChallenge',
        'GeneratedUuid',
        () => mapping,
        { setNull: ["''", "'undefined'"] }
      )(state);
    })
   )
 );
 }); 
        
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
    each(
    dataPath('undefined[*]'),
    fn(async state => {
      const dataArray = state.data['data_management_help'] || [];

      const mapping = [];

      for (let x of dataArray) {
        mapping.push({
          WCSPROGRAMS_DataAssistanceName: x['name'],
          WCSPROGRAMS_DataAssistanceExtCode : x['name'],
          GeneratedUuid: x['__generatedUuid'],
          UndefinedUuid: x['__parentUuid'],
        });
      }
      return upsertMany(
        'WCSPROGRAMS_ProjectAnnualDataPlanDataSetDataAssistance',
        'GeneratedUuid',
        () => mapping,
        { setNull: ["''", "'undefined'"] }
      )(state);
    })
   )
 );
 }); 

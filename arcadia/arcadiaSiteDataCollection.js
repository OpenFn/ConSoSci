//Job based on mapping spec: https://docs.google.com/spreadsheets/d/1SjSHpYYzlRUa9rQRW3mN2ruI7k_QWTeF7qX4Rnvy_wk/edit#gid=264797739
fn(state => {
  const fetchFromRef = references => {
    return references[0];
  };
  const { body } = state.data;
  return { ...state, body, fetchFromRef };
});

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
      where: { WCSPROGRAMS_ProjectExtCode: dataValue('$.body.swm_site') },
    })(state),
  };
  return upsert(
    'WCSPROGRAMS_ProjectAnnualDataPlan',
    'DataSetUUIDID',
    mappingAnnalDataPlan,
    {
      setNull: ["''", "'undefined'"],
      logValues: true,
    }
  )(state);
});

//For every survey planned...
//1.1 Upsert records to create m:m relationship with WCSPROGRAMS_DataSetSurveyType for every Kobo survey_planned
fn(async state => {
  const { body } = state;
  if (body.survey_planned) {
    const surveyPlannedArray = body.survey_planned.split(' ');
    const mapping = [];

    for (let survey of surveyPlannedArray) {
      mapping.push({
        WCSPROGRAMS_DataSetSurveyTypeName: survey,
        WCSPROGRAMS_DataSetSurveyTypeExtCode: survey,
      });
    }

    return upsertMany(
      'WCSPROGRAMS_ProjectAnnualDataPlanDataSetSurveyType',
      'DataSetUUIDID',
      () => mapping,
      {
        setNull: ["''", "'undefined'"],
      }
    )(state);
  }
  console.log('No survey_planned. Skipping upsert!');
  return state;
});

//1.2 Upsert records to create m:m relationship with WCSPROGRAMS_DataSetSurveyType for every Kobo survey_planned_001 for partners
fn(async state => {
  const { body } = state;
  if (body.surveys_planned_001) {
    const surveyPlanned001Array = body.surveys_planned_001.split(' ');
    const mapping = [];

    for (let survey of surveyPlanned001Array) {
      mapping.push({
        WCSPROGRAMS_DataSetSurveyTypeName: survey,
        WCSPROGRAMS_DataSetSurveyTypeExtCode: survey,
      });
    }
    console.log('mapping', mapping);
    return upsertMany(
      'WCSPROGRAMS_ProjectAnnualDataPlanDataSetSurveyType',
      'DataSetUUIDID',
      () => mapping,
      {
        setNull: ["''", "'undefined'"],
      }
    )(state);
  }
  console.log('No survey_planned_001. Skipping upsert!');
  return state;
});

// Camera questions =========================================================================
fn(state => {
  const { body } = state;

  const collectGroup =
    body['group_qp5by62/Which_of_the_followi_ata_you_will_collect'];

  if (collectGroup) {
    const collectGroupArray = collectGroup.split(' ');
    return sql({
      query: `
      SELECT WCSPROGRAMS_ProjectAnnualDataPlanID 
      FROM WCSPROGRAMS_ProjectAnnualDataPlan 
      WHERE DataSetUUIDID = '${body._id}'`,
    })(state).then(state => {
      const datasetuuid = state.fetchFromRef(state.references[0]);
      //2.1 Upsert records to create m:m relationships with WCSPROGRAMS_CameraTrapSetting
      const mapping = [];
      for (collection of collectGroupArray) {
        mapping.push({
          WCSPROGRAMS_ProjectAnnualDataPlanID: datasetuuid[0].value,
          DataSetUUIDID: body._id + collection,
          AnswerId: body._id,
          WCSPROGRAMS_CameraTrapSettingID: await findValue({
            relation: 'WCSPROGRAMS_CameraTrapSetting',
            uuid: 'WCSPROGRAMS_CameraTrapSettingID',
            where: { WCSPROGRAMS_CameraTrapSettingExtCode: collection },
          })(state),
          //TODO: Update UserID_CR mappings
          UserID_CR: '0',
          UserID_LM: '0',
        });
      }

      return upsertMany(
        'WCSPROGRAMS_ProjectAnnualDataPlanCameraTrapSetting',
        'DataSetUUIDID',
        () => mapping,
        { setNull: ["''", "'undefined'"], logValues: true }
      )(state);
    });
  }
  console.log(
    'No group_qp5by62/Which_of_the_followi_ata_you_will_collect. Skipping upsert!'
  );
  return state;
});
//2.2 Upsert records to create m:m relationships with WCSPROGRAMS_TaxaMetric
fn(state => {
  const { body } = state;

  const metricGroup =
    body['group_qp5by62/Which_metrics_questi_ith_camera_trap_data'];

  if (metricGroup) {
    const metricGroupArray = metricGroup.split(' ');
    return sql({
      query: `
      SELECT WCSPROGRAMS_ProjectAnnualDataPlanID 
      FROM WCSPROGRAMS_ProjectAnnualDataPlan 
      WHERE DataSetUUIDID = '${body._id}'`,
    })(state).then(state => {
      const datasetuuid = state.fetchFromRef(state.references[0]);
      //2.1 Upsert records to create m:m relationships with WCSPROGRAMS_CameraTrapSetting
      const mapping = [];
      for (metric of metricGroupArray) {
        mapping.push({
          WCSPROGRAMS_ProjectAnnualDataPlanID: datasetuuid[0].value,
          DataSetUUIDID: body._id + metric,
          AnswerId: body._id,
          WCSPROGRAMS_CameraTrapSettingID: await findValue({
            relation: 'WCSPROGRAMS_CameraTrapSetting',
            uuid: 'WCSPROGRAMS_CameraTrapSettingID',
            where: { WCSPROGRAMS_CameraTrapSettingExtCode: metric },
          })(state),
          //TODO: Update UserID_CR mappings
          UserID_CR: '0',
          UserID_LM: '0',
        });
      }

      return upsertMany(
        'WCSPROGRAMS_ProjectAnnualDataPlanTaxaMetric',
        'DataSetUUIDID',
        () => mapping,
        { setNull: ["''", "'undefined'"], logValues: true }
      )(state);
    });
  }
  console.log(
    'No group_qp5by62/Which_metrics_questi_ith_camera_trap_data. Skipping upsert!'
  );
  return state;
});
//2.3 Upsert records to create m:m relationships with WCSPROGRAMS_TaxaMetricEstimationMethod
fn(state => {
  const { body } = state;

  const estimationGroup = body['group_qp5by62/What_estimation_methods_do_you'];

  if (estimationGroup) {
    const estimationGroupArray = estimationGroup.split(' ');
    return sql({
      query: `
      SELECT WCSPROGRAMS_ProjectAnnualDataPlanID 
      FROM WCSPROGRAMS_ProjectAnnualDataPlan 
      WHERE DataSetUUIDID = '${body._id}'`,
    })(state).then(state => {
      const datasetuuid = state.fetchFromRef(state.references[0]);
      //2.1 Upsert records to create m:m relationships with WCSPROGRAMS_CameraTrapSetting
      const mapping = [];
      for (estimation of estimationGroupArray) {
        mapping.push({
          WCSPROGRAMS_ProjectAnnualDataPlanID: datasetuuid[0].value,
          DataSetUUIDID: body._id + estimation,
          AnswerId: body._id,
          WCSPROGRAMS_CameraTrapSettingID: await findValue({
            relation: 'WCSPROGRAMS_CameraTrapSetting',
            uuid: 'WCSPROGRAMS_CameraTrapSettingID',
            where: { WCSPROGRAMS_CameraTrapSettingExtCode: estimation },
          })(state),
          //TODO: Update UserID_CR mappings
          UserID_CR: '0',
          UserID_LM: '0',
        });
      }

      return upsertMany(
        'WCSPROGRAMS_ProjectAnnualDataPlanTaxaMetricEstimationMethod',
        'DataSetUUIDID',
        () => mapping,
        { setNull: ["''", "'undefined'"], logValues: true }
      )(state);
    });
  }
  console.log(
    'No group_qp5by62/What_estimation_methods_do_you. Skipping upsert!'
  );
  return state;
});
//===========================================================================================

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
          WCSPROGRAMS_DataSetSurveyTypeID:
            state.surveyTypeMap[dataset['datasets/survey_type']],
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
          DataIsOpenAccess:
            dataset['datasets/open_access_plan'] === 'yes' ? 1 : 0,
          WCSPROGRAMS_DataSetOpenAccessQuantityID: await findValue({
            uuid: 'wcsprograms_datasetopenaccessquantityid',
            relation: 'WCSPROGRAMS_DataSetOpenAccessQuantity',
            where: {
              TT_DataSetOpenAccessQuantityExtCode:
                dataset['datasets/open_access_dataquantity'],
            },
          })(state),
          WCSPROGRAMS_DataSetOpenAccessTimelineID: await findValue({
            uuid: 'wcsprograms_datasetopenaccesstimelineid',
            relation: 'WCSPROGRAMS_DataSetOpenAccessTimeline',
            where: {
              TT_DataSetOpenAccessTimelineExtCode:
                dataset['datasets/open_access_when'],
            },
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
  (state) => state.body.datasets,
  alterState((state) => {
    console.log("Upserting");
    const dataset = state.data;
    const { body } = state;

    if (dataset["datasets/data_collection_tool"]) {
      const dataCollectionTools =
        dataset["datasets/data_collection_tool"].split(" ");

      return sql({
        query: `
        SELECT WCSPROGRAMS_ProjectAnnualDataPlanDataSetID 
        FROM WCSPROGRAMS_ProjectAnnualDataPlanDataSet
        WHERE DataSetUUIDID = '${body._id}${dataset["datasets/survey_type"]}'`,
      })(state).then((state) => {
        const datasetuuid = state.fetchFromRef(state.references[0]);
        //NOTE: 1 data tool in the dataToolsMap (e.g., Excel) might be used collection, management, AND/OR analysis --> potentially all 3 uses
        //3.1. Upsert many ProjectAnnualDataPlanDataSetDataTool records to log each dataset's related data_collection_tools
        return upsertMany(
          "WCSPROGRAMS_ProjectAnnualDataPlanDataSetDataTool",
          "DataSetUUIDID",
          (state) =>
            dataCollectionTools.map((dct) => {
              return {
                DataSetUUIDID: body._id + dct,
                AnswerId: dataValue("body._id"),
                WCSPROGRAMS_ProjectAnnualDataPlanDataSetID:
                  datasetuuid[0].value, //fk
                IsForCollect: 1,
                WCSPROGRAMS_DataToolID: state.dataToolsMap[dct], //fk
                //TODO: Update UserID_CR mappings
                UserID_CR: "0",
                UserID_LM: "0",
              };
            })
        )(state);
      });
    }
    return state;
  })
);

each(
  (state) => state.body.datasets,
  alterState((state) => {
    const dataset = state.data;
    const { body } = state;

    if (dataset["datasets/data_management_tool"]) {
      const dataManagementTools =
        dataset["datasets/data_management_tool"].split(" ");

      return sql({
        query: `
        SELECT WCSPROGRAMS_ProjectAnnualDataPlanDataSetID 
        FROM WCSPROGRAMS_ProjectAnnualDataPlanDataSet
        WHERE DataSetUUIDID = '${body._id}${dataset["datasets/survey_type"]}'`,
      })(state).then((state) => {
        const datasetuuid = state.fetchFromRef(state.references[0]);
        //1 data tool in the dataToolsMap (e.g., Excel) might be used collection, management, AND/OR analysis --> potentially all 3 uses
        //3.2. Upsert many ProjectAnnualDataPlanDataSetDataTool records to log each dataset's related data_management_tools
        return upsertMany(
          "WCSPROGRAMS_ProjectAnnualDataPlanDataSetDataTool",
          "DataSetUUIDID",
          (state) =>
            dataManagementTools.map((dmt) => {
              return {
                DataSetUUIDID: body.id + dmt,
                AnswerId: body._id,
                WCSPROGRAMS_ProjectAnnualDataPlanDataSetID:
                  datasetuuid[0].value, //fk -> Q: Should we map to ProjectAnnualDataPlanDataSet OR ProjectDataSet?
                IsForManage: 1,
                WCSPROGRAMS_DataToolID: state.dataToolsMap[dmt], //fk
                //TODO: Update UserID_CR mappings
                UserID_CR: "0",
                UserID_LM: "0",
              };
            })
        )(state);
      });
    }
    return state;
  })
);

each(
  (state) => state.body.datasets,
  alterState((state) => {
    const dataset = state.data;
    const { body } = state;

    if (dataset["datasets/data_analysis_tool"]) {
      const dataAnalysisTools =
        dataset["datasets/data_analysis_tool"].split(" ");

      return sql({
        query: `
        SELECT WCSPROGRAMS_ProjectAnnualDataPlanDataSetID 
        FROM WCSPROGRAMS_ProjectAnnualDataPlanDataSet
        WHERE DataSetUUIDID = '${body._id}${dataset["datasets/survey_type"]}'`,
      })(state).then((state) => {
        const datasetuuid = state.fetchFromRef(state.references[0]);
        //NOTE: 1 data tool in the dataToolsMap (e.g., Excel) might be used collection, management, AND/OR analysis --> potentially all 3 uses
        //3.3. Upsert many ProjectAnnualDataPlanDataSetDataTool records to log each dataset's related data_analysis_tools
        return upsertMany(
          "WCSPROGRAMS_ProjectAnnualDataPlanDataSetDataTool",
          "DataSetUUIDID",
          (state) =>
            dataAnalysisTools.map((dat) => {
              return {
                DataSetUUIDID: body._id + dat,
                AnswerId: body._id,
                WCSPROGRAMS_ProjectAnnualDataPlanDataSetID:
                  datasetuuid[0].value, //fk
                IsForAnalyze: 1,
                WCSPROGRAMS_DataToolID: state.dataToolsMap[dat], //fk
                //TODO: Update UserID_CR mappings
                UserID_CR: "0",
                UserID_LM: "0",
              };
            })
        )(state);
      });
    }
    return state;
  })
);

each(
  (state) => state.body.datasets,
  alterState((state) => {
    const dataset = state.data;
    const { body } = state;

    if (dataset["datasets/challenge"]) {
      const dataChallenges = dataset["datasets/challenge"].split(" ");

      return sql({
        query: `
        SELECT WCSPROGRAMS_ProjectAnnualDataPlanDataSetID 
        FROM WCSPROGRAMS_ProjectAnnualDataPlanDataSet
        WHERE DataSetUUIDID = '${body._id}${dataset["datasets/survey_type"]}'`,
      })(state).then((state) => {
        const datasetuuid = state.fetchFromRef(state.references[0]);
        //3.4. Upsert many ProjectAnnualDataPlanDataSetDataChallenge records to log each dataset's related dataChallenge
        return upsertMany(
          "WCSPROGRAMS_ProjectAnnualDataPlanDataSetDataChallenge",
          "DataSetUUIDID",
          (state) =>
            dataChallenges.map((dc) => {
              return {
                DataSetUUIDID: body._id + dc,
                AnswerId: body._id,
                WCSPROGRAMS_ProjectAnnualDataPlanDataSetID:
                  datasetuuid[0].value, //fk
                WCSPROGRAMS_DataChallengeID: state.dataChallengeMap[dc], //fk
                //TODO: Update UserID_CR mappings
                UserID_CR: "0",
                UserID_LM: "0",
              };
            })
        )(state);
      });
    }
    return state;
  })
);

each(
  (state) => state.body.datasets,
  alterState((state) => {
    const dataset = state.data;
    const { body } = state;

    if (dataset["datasets/data_management_help"]) {
      const dataManagementHelps =
        dataset["datasets/data_management_help"].split(" ");

      return sql({
        query: `
        SELECT WCSPROGRAMS_ProjectAnnualDataPlanDataSetID 
        FROM WCSPROGRAMS_ProjectAnnualDataPlanDataSet
        WHERE DataSetUUIDID = '${body._id}${dataset["datasets/survey_type"]}'`,
      })(state).then((state) => {
        const datasetuuid = state.fetchFromRef(state.references[0]);
        //3.5. Upsert many ProjectAnnualDataPlanDataSetDataAssistance records to log each dataset's related dataAssistance
        return upsertMany(
          "WCSPROGRAMS_ProjectAnnualDataPlanDataSetDataAssistance",
          "DataSetUUIDID",
          (state) =>
            dataManagementHelps.map((dmh) => {
              return {
                DataSetUUIDID: body._id + dmh,
                AnswerId: body._id,
                WCSPROGRAMS_ProjectAnnualDataPlanDataSetID:
                  datasetuuid[0].value, //fk
                WCSPROGRAMS_DataAssistanceID: state.dataAssistanceMap[dmh], //fk
                //TODO: Update UserID_CR mappings
                UserID_CR: "0",
                UserID_LM: "0",
              };
            })
        )(state);
      });
    }
    return state;
  })
);
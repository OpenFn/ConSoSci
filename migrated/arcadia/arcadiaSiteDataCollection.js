//Job based on mapping spec: https://docs.google.com/spreadsheets/d/1SjSHpYYzlRUa9rQRW3mN2ruI7k_QWTeF7qX4Rnvy_wk/edit#gid=264797739
fn(state => {
  const { body } = state.data;

  const cleanValue = value => {
    const replacements = {
      paper: 'paper_form',
      other_dat: 'other',
      other_dmt: 'other',
      other_dct: 'other',
      other_dmh: 'other',
      other_challenge: 'other',
      kobo: 'kobo_form',
    };
    
    if (Object.keys(replacements).includes(value)) return replacements[value];
    return value;
  };
    
    const cleanValueDmh = value => {
      const replacements = {
        other: 'other_dmh',
      };

    if (Object.keys(replacements).includes(value)) return replacements[value];
    return value;
  };

  return { ...state, body, cleanValue, cleanValueDmh };
});

//1. For every Kobo form, upsert 1 ProjectAnnualDataPlan
upsert(
  'WCSPROGRAMS_ProjectAnnualDataPlan',
  'DatasetUuidId',
  {
    DatasetUuidId: dataValue('body._id'), //set custom uuid that can be used as ext Id to relate related tables
    AnswerId: dataValue('body._id'),
    WCSPROGRAMS_ProjectAnnualDataPlanName: dataValue('formName'), //Capture the source survey name?
    UserID_CR: '0', //TODO: Update User_ID and Address mappings?
    UserID_LM: '0',
    CRIPAddress: 'wcs',
    LMIPAddress: 'wcs',
    SubmitterName: dataValue('body.participant'),
    SubmitterEmail: dataValue('body.email_address'),
    SubmitterRole:
      dataValue('body.respondent_role') === 'other'
        ? dataValue('body.respondent_role_other')
        : dataValue('body.respondent_role'),
    WCSPROGRAMS_ProjectID: dataValue('body.swm_site')==='other' ? '590' : dataValue('body.swm_site') ,
  },
  {
    setNull: ["''", "'undefined'"],
    logValues: true,
  }
);

//For every survey planned...
//1.1 Upsert records to create m:m relationship with WCSPROGRAMS_DataSetSurveyType for every Kobo survey_planned
fn(async state => {
  const { body } = state;
  if (body.survey_planned) {
    const surveyPlannedArray = body.survey_planned.split(' ');
    const mapping = [];

    for (let survey of surveyPlannedArray) {
      mapping.push({
        DatasetUuidId: body._id + survey, 
        WCSPROGRAMS_DataSetSurveyTypeID: await findValue({
          relation: 'WCSPROGRAMS_DataSetSurveyType',
          uuid: 'WCSPROGRAMS_DataSetSurveyTypeID',
          where: { WCSPROGRAMS_DataSetSurveyTypeExtCode: survey },
        })(state),
        WCSPROGRAMS_ProjectAnnualDataPlanID: await findValue({
          relation: 'WCSPROGRAMS_ProjectAnnualDataPlan',
          uuid: 'WCSPROGRAMS_ProjectAnnualDataPlanID',
          where: { AnswerId: body._id },
        })(state),
      });
    }

    return upsertMany(
      'WCSPROGRAMS_ProjectAnnualDataPlanDataSetSurveyType',
      'DatasetUuidId',
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
        DatasetUuidId: body._id + survey,
        WCSPROGRAMS_DataSetSurveyTypeID: await findValue({
          relation: 'WCSPROGRAMS_DataSetSurveyType',
          uuid: 'WCSPROGRAMS_DataSetSurveyTypeID',
          where: { WCSPROGRAMS_DataSetSurveyTypeExtCode: survey },
        })(state),
        WCSPROGRAMS_ProjectAnnualDataPlanID: await findValue({
          relation: 'WCSPROGRAMS_ProjectAnnualDataPlan',
          uuid: 'WCSPROGRAMS_ProjectAnnualDataPlanID',
          where: { AnswerId: body._id },
        })(state),
      });
    }
    console.log('mapping', mapping);
    return upsertMany(
      'WCSPROGRAMS_ProjectAnnualDataPlanDataSetSurveyType',
      'DatasetUuidId',
      () => mapping,
      {
        setNull: ["''", "'undefined'"],
      }
    )(state);
  }
  console.log('No survey_planned for partners. Skipping upsert!');
  return state;
});

// Camera questions =========================================================================
fn(async state => {
  const { body } = state;

  const collectGroup =
    body['group_qp5by62/Which_of_the_followi_ata_you_will_collect'];

  if (collectGroup) {
    const collectGroupArray = collectGroup.split(' ');
    return sql({
      query: `
      SELECT WCSPROGRAMS_ProjectAnnualDataPlanID 
      FROM WCSPROGRAMS_ProjectAnnualDataPlan 
      WHERE DatasetUuidId = '${body._id}'`,
    })(state).then(async state => {
      const { response } = state;
      //2.1 Upsert records to create m:m relationships with WCSPROGRAMS_CameraTrapSetting
      const mapping = [];
      for (collection of collectGroupArray) {
        mapping.push({
          WCSPROGRAMS_ProjectAnnualDataPlanID:
            response.body['WCSPROGRAMS_ProjectAnnualDataPlanID'],
          DatasetUuidId: body._id + collection,
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
        'DatasetUuidId',
        () => mapping,
        { setNull: ["''", "'undefined'"], logValues: true }
      )(state);
    });
  }
  console.log('No camera trap method question. Skipping upsert!');
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
      WHERE DatasetUuidId = '${body._id}'`,
    })(state).then(async state => {
      //2.1 Upsert records to create m:m relationships with WCSPROGRAMS_CameraTrapSetting
      const { response } = state;

      const mapping = [];
      for (var metric of metricGroupArray) {
        mapping.push({
          WCSPROGRAMS_ProjectAnnualDataPlanID:
            response.body['WCSPROGRAMS_ProjectAnnualDataPlanID'],
          DatasetUuidId: body._id + metric,
          AnswerId: body._id,
          // WCSPROGRAMS_CameraTrapSettingID: await findValue({
          //   relation: 'WCSPROGRAMS_CameraTrapSetting',
          //   uuid: 'WCSPROGRAMS_CameraTrapSettingID',
          //   where: { WCSPROGRAMS_CameraTrapSettingExtCode: metric },
          // })(state),
          //TODO: Update UserID_CR mappings
          UserID_CR: '0',
          UserID_LM: '0',
        });
      }

      return upsertMany(
        'WCSPROGRAMS_ProjectAnnualDataPlanTaxaMetric',
        'DatasetUuidId',
        () => mapping,
        { setNull: ["''", "'undefined'"], logValues: true }
      )(state);
    });
  }
  console.log('No camera trap metric question. Skipping upsert!');
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
      WHERE DatasetUuidId = '${body._id}'`,
    })(state).then(async state => {
      const { response } = state;
      //2.1 Upsert records to create m:m relationships with WCSPROGRAMS_CameraTrapSetting
      const mapping = [];
      for (var estimation of estimationGroupArray) {
        mapping.push({
          WCSPROGRAMS_ProjectAnnualDataPlanID:
            response.body['WCSPROGRAMS_ProjectAnnualDataPlanID'],
          DatasetUuidId: body._id + estimation,
          AnswerId: body._id,
          // WCSPROGRAMS_CameraTrapSettingID: await findValue({
          //   relation: 'WCSPROGRAMS_CameraTrapSetting',
          //   uuid: 'WCSPROGRAMS_CameraTrapSettingID',
          //   where: { WCSPROGRAMS_CameraTrapSettingExtCode: estimation },
          // })(state),
          //TODO: Update UserID_CR mappings
          UserID_CR: '0',
          UserID_LM: '0',
        });
      }

      return upsertMany(
        'WCSPROGRAMS_ProjectAnnualDataPlanTaxaMetricEstimationMethod',
        'DatasetUuidId',
        () => mapping,
        { setNull: ["''", "'undefined'"], logValues: true }
      )(state);
    });
  }
  console.log('No camera trap estimation method question. Skipping upsert!');
  return state;
});
//===========================================================================================

//For every dataset repeat group entry...
each(
  dataPath('$.body.datasets[*]'),
  fn(state => {
    const dataset = state.data;
    const { body } = state;

    return sql({
      query: `
        SELECT WCSPROGRAMS_ProjectAnnualDataPlanID
        FROM WCSPROGRAMS_ProjectAnnualDataPlan
        WHERE DatasetUuidId = '${body._id}'`,
    })(state).then(async state => {
      const { response } = state;
      //3. Upsert 1 ProjectAnnualDataPlanDataSet for every dataset
      console.log('Upserting WCSPROGRAMS_ProjectAnnualDataPlanDataSet... ');
      return upsert(
        'WCSPROGRAMS_ProjectAnnualDataPlanDataSet',
        'DatasetUuidId',
        {
          DatasetUuidId: body._id + dataset['datasets/survey_type'],
          WCSPROGRAMS_ProjectAnnualDataPlanID:
            response.body['WCSPROGRAMS_ProjectAnnualDataPlanID'], //FK to WCSPROGRAMS_ProjectAnnualDataPlanID
          AnswerId: body._id,
          TypeOfDataSet:
            dataset['datasets/survey_type'] === 'other' ? dataset['datasets/survey_type']
              : dataset['datasets/survey_type_other'],
          WCSPROGRAMS_DataSetSurveyTypeID: await findValue({
            uuid: 'WCSPROGRAMS_DataSetSurveyTypeID',
            relation: 'WCSPROGRAMS_DataSetSurveyType',
            where: {
              WCSPROGRAMS_DataSetSurveyTypeExtCode:
                dataset['datasets/survey_type'],
            },
          })(state),
          WCSPROGRAMS_ProjectAnnualDataPlanDataSetName:
            dataset['datasets/dataset_name_text'] ? dataset['datasets/dataset_name_text'].substring(0,98) : dataset['datasets/dataset_name_text'],
          CollectionStartDate: dataset['datasets/data_collection_start'],
          CollectionEndDate: dataset['datasets/data_collection_end'],
          WCSPROGRAMS_DataAccessFrequencyID: await findValue({
            uuid: 'WCSPROGRAMS_DataAccessFrequencyID',
            relation: 'WCSPROGRAMS_DataAccessFrequency',
            where:
              {
                WCSPROGRAMS_DataAccessFrequencyExtCode:
                  dataset['datasets/data_review_frequency'],
              } || 'NA',
          })(state),
          OtherFrequency: dataset['datasets/data_review_frequency_other'],
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
          DetailsOpenAccess:
            dataset['datasets/open_access_plan'] === 'yes' ? 1 : 0,
          WCSPROGRAMS_DataSetOpenAccessQuantityID: await findValue({
            uuid: 'wcsprograms_datasetopenaccessquantityid',
            relation: 'WCSPROGRAMS_DataSetOpenAccessQuantity',
            where: {
              WCSPROGRAMS_DataSetOpenAccessQuantityExtCode:
                dataset['datasets/open_access_dataquantity'],
            },
          })(state),
          WCSPROGRAMS_DataSetOpenAccessTimelineID: await findValue({
            uuid: 'wcsprograms_datasetopenaccesstimelineid',
            relation: 'WCSPROGRAMS_DataSetOpenAccessTimeline',
            where: {
              WCSPROGRAMS_DataSetOpenAccessTimelineExtCode:
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
  state => state.body.datasets,
  fn(state => {
    console.log('Upserting');
    const dataset = state.data;
    const { body } = state;

    if (dataset['datasets/data_collection_tool']) {
      const dataCollectionTools =
        dataset['datasets/data_collection_tool'].split(' ');

      return sql({
        query: `
        SELECT WCSPROGRAMS_ProjectAnnualDataPlanDataSetID 
        FROM WCSPROGRAMS_ProjectAnnualDataPlanDataSet
        WHERE DatasetUuidId = '${body._id}${dataset['datasets/survey_type']}'`,
      })(state).then(async state => {
        const { response, cleanValue } = state;
        //NOTE: 1 data tool in the dataToolsMap (e.g., Excel) might be used collection, management, AND/OR analysis --> potentially all 3 uses
        //3.1. Upsert many ProjectAnnualDataPlanDataSetDataTool records to log each dataset's related data_collection_tools
        console.log(
          'Upserting data collection WCSPROGRAMS_ProjectAnnualDataPlanDataSetDataTool... '
        );
        const mapping = [];
        for (var dct of dataCollectionTools) {
          const d = new Date().toISOString().replace(/-/g, '').replace(/T/g, ' ').replace(/Z/g, '');
          const dataSetId = body._id.toString() + dct;
          const dataToolId = await findValue({
              relation: 'WCSPROGRAMS_DataTool',
              uuid: 'WCSPROGRAMS_DataToolID',
              where: { WCSPROGRAMS_DataToolExtCode: cleanValue(dct) },
            })(state);
            
          console.log("***dct");
          console.log(dct + " / " + cleanValue(dct));
            
          mapping.push({
            DatasetUuidId: dataSetId,
            AnswerId: body._id.toString(),
            WCSPROGRAMS_ProjectAnnualDataPlanDataSetID:
              response.body['WCSPROGRAMS_ProjectAnnualDataPlanDataSetID'], //fk
            IsForCollect: 1,
            WCSPROGRAMS_DataToolID: await findValue({
              relation: 'WCSPROGRAMS_DataTool',
              uuid: 'WCSPROGRAMS_DataToolID',
              where: { WCSPROGRAMS_DataToolExtCode: cleanValue(dct) },
            })(state),
            //TODO: Update UserID_CR mappings
            UserID_CR: '0',
            UserID_LM: '0',
            LMDate: d
          });
        }
        
        console.log("*data_collection_tool");
        console.log(mapping);
          
        return upsertMany(
          'WCSPROGRAMS_ProjectAnnualDataPlanDataSetDataTool',
          'DatasetUuidId',
          () => mapping
        )(state);
      });
    }
    return state;
  })
);

each(
  state => state.body.datasets,
  fn(state => {
    const dataset = state.data;
    const { body } = state;

    if (dataset['datasets/data_management_tool']) {
      const dataManagementTools =
        dataset['datasets/data_management_tool'].split(' ');

      return sql({
        query: `
        SELECT WCSPROGRAMS_ProjectAnnualDataPlanDataSetID 
        FROM WCSPROGRAMS_ProjectAnnualDataPlanDataSet
        WHERE DatasetUuidId = '${body._id}${dataset['datasets/survey_type']}'`,
      })(state).then(async state => {
        const { response, cleanValue } = state;
        //1 data tool in the dataToolsMap (e.g., Excel) might be used collection, management, AND/OR analysis --> potentially all 3 uses
        //3.2. Upsert many ProjectAnnualDataPlanDataSetDataTool records to log each dataset's related data_management_tools
        console.log(
          'Upserting data management WCSPROGRAMS_ProjectAnnualDataPlanDataSetDataTool... '
        );

        const mappedArray = [];

        for (var dmt of dataManagementTools) {

          const d = new Date().toISOString().replace(/-/g, '').replace(/T/g, ' ').replace(/Z/g, '');
          const dataSetId = body._id.toString() + dmt;

          mappedArray.push({
            DatasetUuidId: dataSetId,
            AnswerId: body._id.toString(),
            WCSPROGRAMS_ProjectAnnualDataPlanDataSetID:
              response.body['WCSPROGRAMS_ProjectAnnualDataPlanDataSetID'], //fk -> Q: Should we map to ProjectAnnualDataPlanDataSet OR ProjectDataSet?
            IsForManage: 1,
            WCSPROGRAMS_DataToolID: await findValue({
              relation: 'WCSPROGRAMS_DataTool',
              uuid: 'WCSPROGRAMS_DataToolID',
              where: { WCSPROGRAMS_DataToolExtCode: cleanValue(dmt) },
            })(state),
            //TODO: Update UserID_CR mappings
            UserID_CR: '0',
            UserID_LM: '0',
            LMDate: d
          });
        }

        console.log("*data_management_tool");
        console.log(mappedArray);

        return upsertMany(
          'WCSPROGRAMS_ProjectAnnualDataPlanDataSetDataTool',
          'DatasetUuidId',
          () => mappedArray
        )(state);
      });
    }
    return state;
  })
);

each(
  state => state.body.datasets,
  fn(state => {
    const dataset = state.data;
    const { body } = state;

    if (dataset['datasets/data_analysis_tool']) {
      const dataAnalysisTools =
        dataset['datasets/data_analysis_tool'].split(' ');

      return sql({
        query: `
        SELECT WCSPROGRAMS_ProjectAnnualDataPlanDataSetID 
        FROM WCSPROGRAMS_ProjectAnnualDataPlanDataSet
        WHERE DatasetUuidId = '${body._id}${dataset['datasets/survey_type']}'`,
      })(state).then(async state => {
        const { response, cleanValue } = state;
        //NOTE: 1 data tool in the dataToolsMap (e.g., Excel) might be used collection, management, AND/OR analysis --> potentially all 3 uses
        //3.3. Upsert many ProjectAnnualDataPlanDataSetDataTool records to log each dataset's related data_analysis_tools
        console.log(
          'Upserting data analysis WCSPROGRAMS_ProjectAnnualDataPlanDataSetDataTool... '
        );

        const mappedArray = [];

        for (var dat of dataAnalysisTools) {
          const d = new Date().toISOString().replace(/-/g, '').replace(/T/g, ' ').replace(/Z/g, '');
          const dataSetId = body._id.toString() + dat;
          
          mappedArray.push({
            DatasetUuidId: dataSetId,
            AnswerId: body._id,
            WCSPROGRAMS_ProjectAnnualDataPlanDataSetID:
              response.body['WCSPROGRAMS_ProjectAnnualDataPlanDataSetID'], //fk
            IsForAnalyze: 1,
            WCSPROGRAMS_DataToolID: await findValue({
              relation: 'WCSPROGRAMS_DataTool',
              uuid: 'WCSPROGRAMS_DataToolID',
              where: { WCSPROGRAMS_DataToolExtCode: cleanValue(dat) },
            })(state),
            //TODO: Update UserID_CR mappings
            UserID_CR: '0',
            UserID_LM: '0',
            LMDate: d
          });
        }
        
        console.log("*data_analysis_tool");
        console.log(mappedArray);

        return upsertMany(
          'WCSPROGRAMS_ProjectAnnualDataPlanDataSetDataTool',
          'DatasetUuidId',
          () => mappedArray
        )(state);
      });
    }
    return state;
  })
);

each(
  state => state.body.datasets,
  fn(state => {
    const dataset = state.data;
    const { body } = state;

    if (dataset['datasets/challenge']) {
      const dataChallenges = dataset['datasets/challenge'].split(' ');

      return sql({
        query: `
        SELECT WCSPROGRAMS_ProjectAnnualDataPlanDataSetID 
        FROM WCSPROGRAMS_ProjectAnnualDataPlanDataSet
        WHERE DatasetUuidId = '${body._id}${dataset['datasets/survey_type']}'`,
      })(state).then(async state => {
        const { response, cleanValue } = state;
        //3.4. Upsert many ProjectAnnualDataPlanDataSetDataChallenge records to log each dataset's related dataChallenge
        console.log(
          'Upserting data management WCSPROGRAMS_ProjectAnnualDataPlanDataSetDataChallenge... '
        );

        const mappedArray = [];

        for (dc of dataChallenges) {
          mappedArray.push({
            DatasetUuidId: body._id + dc,
            AnswerId: body._id,
            WCSPROGRAMS_ProjectAnnualDataPlanDataSetID:
              response.body['WCSPROGRAMS_ProjectAnnualDataPlanDataSetID'], //fk
            WCSPROGRAMS_DataChallengeID: await findValue({
              relation: 'WCSPROGRAMS_DataChallenge',
              uuid: 'WCSPROGRAMS_DataChallengeID',
              where: { WCSPROGRAMS_DataChallengeExtCode: cleanValue(dc) },
            })(state),
            //TODO: Update UserID_CR mappings
            UserID_CR: '0',
            UserID_LM: '0',
          });
        }

        return upsertMany(
          'WCSPROGRAMS_ProjectAnnualDataPlanDataSetDataChallenge',
          'DatasetUuidId',
          () => mappedArray
        )(state);
      });
    }
    return state;
  })
);

each(
  state => state.body.datasets,
  fn(state => {
    const dataset = state.data;
    const { body } = state;

    if (dataset['datasets/data_management_help']) {
      const dataManagementHelps =
        dataset['datasets/data_management_help'].split(' ');

      return sql({
        query: `
        SELECT WCSPROGRAMS_ProjectAnnualDataPlanDataSetID 
        FROM WCSPROGRAMS_ProjectAnnualDataPlanDataSet
        WHERE DatasetUuidId = '${body._id}${dataset['datasets/survey_type']}'`,
      })(state).then(async state => {
        const { response, cleanValueDmh } = state;
        //3.5. Upsert many ProjectAnnualDataPlanDataSetDataAssistance records to log each dataset's related dataAssistance
        const mappedArray = [];

        for (dmh of dataManagementHelps) {
          mappedArray.push({
            DatasetUuidId: body._id + dmh,
            AnswerId: body._id,
            WCSPROGRAMS_ProjectAnnualDataPlanDataSetID:
              response.body['WCSPROGRAMS_ProjectAnnualDataPlanDataSetID'], //fk
            WCSPROGRAMS_DataAssistanceID: await findValue({
              relation: 'WCSPROGRAMS_DataAssistance',
              uuid: 'WCSPROGRAMS_DataAssistanceID',
              where: { WCSPROGRAMS_DataAssistanceExtCode: cleanValueDmh(dmh) },
            })(state),
            //TODO: Update UserID_CR mappings
            UserID_CR: '0',
            UserID_LM: '0',
          });
        }

        return upsertMany(
          'WCSPROGRAMS_ProjectAnnualDataPlanDataSetDataAssistance',
          'DatasetUuidId',
          () => mappedArray
        )(state);
      });
    }
    return state;
  })
);

///------ New mapping added by Diane on Janyart 5th for the select_multiple question on open_access_challenges
each(
  state => state.body.datasets,
  fn(state => {
    const dataset = state.data;
    const { body } = state;

    if (dataset['datasets/open_access_challenges']) {
      const OpenAccessChallenges =
        dataset['datasets/open_access_challenges'].split(' ');

      return sql({
        query: `
        SELECT WCSPROGRAMS_ProjectAnnualDataPlanDataSetID 
        FROM WCSPROGRAMS_ProjectAnnualDataPlanDataSet
        WHERE DatasetUuidId = '${body._id}${dataset['datasets/survey_type']}'`,
      })(state).then(async state => {
        const { response, cleanValue } = state;
        //3.6. Upsert many WCSPROGRAMS_ProjectAnnualDataPlanDataSetDatasetOpenAccessChallenge records to log each dataset's related OpenAccessChallenge
        const mappedArray = [];

        for (oac of OpenAccessChallenges) {
          mappedArray.push({
            DataSetUUIDId: body._id + oac,
            AnswerID: body._id,
            WCSPROGRAMS_ProjectAnnualDataPlanDataSetID:
              response.body['WCSPROGRAMS_ProjectAnnualDataPlanDataSetID'], //fk
            WCSPROGRAMS_DataSetOpenAccessChallengeID: await findValue({
              relation: 'WCSPROGRAMS_DataSetOpenAccessChallenge',
              uuid: 'WCSPROGRAMS_DataSetOpenAccessChallengeID',
              where: { WCSPROGRAMS_DataSetOpenAccessChallengeExtCode: cleanValue(oac) },
            })(state),
            //TODO: Update UserID_CR mappings
            UserID_CR: '0',
            UserID_LM: '0',
          });
        }

        return upsertMany(
          'WCSPROGRAMS_ProjectAnnualDataPlanDataSetDatasetOpenAccessChallenge',
          'DataSetUUIDId',
          () => mappedArray
        )(state);
      });
    }
    return state;
  })
);

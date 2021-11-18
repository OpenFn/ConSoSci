//Job based on mapping spec: https://docs.google.com/spreadsheets/d/1SjSHpYYzlRUa9rQRW3mN2ruI7k_QWTeF7qX4Rnvy_wk/edit#gid=264797739
alterState(state => {
  const fetchFromRef = references => {
    return references[0];
  };

    // lookup table m:m WCSPROGRAMS_DataSetSurveyType
  
    // lookup table  m:m WCSPROGRAMS_CameraTrapSetting

    //lookup table  m:m WCSPROGRAMS_TaxaMetricEstimationMethod

    //lookup table m:m WCSPROGRAMS_TaxaMetric
  

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
  WCSPROGRAMS_ProjectID: state =>{
    var siteId = state.sitesMap[dataValue('$.body.swm_site')(state)]; 
    return siteId ? siteId : dataValue('$.body.swm_site')(state); 
    },
  CameraTrapOtherEstimationDetail: dataValue(
    '$.body.group_qp5by62/What_other_estimatio_do_you_intend_to_use'
  )(state),
});

//For every survey planned...
alterState(state => {
  //1.1 Upsert records to create m:m relationship with WCSPROGRAMS_DataSetSurveyType for every Kobo survey_planned
  const { body } = state;
  const { surveys_planned } = body;

  if (surveys_planned && !surveys_planned.includes('none')) {
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

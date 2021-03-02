upsert('ProjectAnnualDataPlan', 'ProjectAnnualDataPlanID', { //for every Kobo form
  ProjectAnnualDataPlanID: dataValue('_id'),
  //column: dataValue('koboQuestion')
});

combine(
  upsertMany(
    'ProjectAnnualDataPlanDataSet',
    'ProjectAnnualDataPlanDataSetID', //for every survey or data set
    state =>
      state.data.body.dataset.map(ds => ({
        //for every 1 dataset reported, create 1 DataTool record...
        ProjectAnnualDataPlanDataSetID: dataValue('_id') + dataValue('survey_type'),
        ProjectAnnualDataPlanID: dataValue('_id'), //FK to Plan
        //column: dataValue('koboQuestion')
      }))
  ),

  //For every data_collection_tool reported, create 1 CollectTool record
  //TODO: `convert data_collection_tool: 'Excel, Paper, Kobo form'` into array to map for each
  each(
    'data_collection_tool[*]',
    upsert('CollectTool', 'CollectToolId', {
      CollectToolId: dataValue('_id') + dataValue('data_collection_tool[*]'), //PK
      ProjectAnnualDataPlanID: dataValue('_id'), //FK to Plan
      ProjectAnnualDataPlanDataSetID: dataValue('_id') + dataValue('survey_type'), //FK to dataset
      CollectManageAnalyzeSources: dataValue('_id'), //FK to Sources
      //column: dataValue('koboQuestion')
    })
  ),

  //For every data_management_tool reported, create 1 ManagementTool record
  //TODO: `convert data_management_tool
  each(
    'data_management_tool[*]',
    upsert('ManagementTool', 'ManagementToolId', {
      ManagementToolId: dataValue('_id') + dataValue('data_management_tool[*]'), //PK
      ProjectAnnualDataPlanID: dataValue('_id'), //FK to Plan
      ProjectAnnualDataPlanDataSetID: dataValue('_id') + dataValue('survey_type'), //FK to dataset
      CollectManageAnalyzeSources: dataValue('_id'), //FK to Sources
      //column: dataValue('koboQuestion')
    })
  )
);

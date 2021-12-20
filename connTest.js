//sql({
//   query: `
// SELECT NAME
//   FROM sys.objects where type='u' and name like 'WCSPROGRAMS_KoboBnsAnswer%'
// `,
// });

sql({
query:
`Select C.*, (Select definition From sys.default_constraints Where object_id = C.object_id) As dk_definition,
(Select definition From sys.check_constraints Where object_id = C.object_id) As ck_definition,
(Select name From sys.objects Where object_id = D.referenced_object_id) As fk_table,
(Select name From sys.columns Where column_id = D.parent_column_id And object_id = D.parent_object_id) As fk_col
From sys.objects As C
Left Join (Select * From sys.foreign_key_columns) As D On D.constraint_object_id = C.object_id 
Where C.parent_object_id = (Select object_id From sys.objects Where type = 'U'
And name = 'WCSPROGRAMS_ProjectAnnualDataPlanDataSetSurveyType');`
});

// sql({
//   query: `INSERT INTO WCSPROGRAMS_DataSetSurveyType (WCSPROGRAMS_DataSetSurveyTypeName, WCSPROGRAMS_DataSetSurveyTypeExtCode, 
//   UserID_CR, UserID_LM)
// VALUES ('Line transect survey', 'line_transect_survey', '0', '0');
// `,
// });



//alterState(state=>{
//console.log(JSON.stringify(state.references, null, 2));
//return state;
//})

// sql({
//   query: `
//     SELECT *
//     FROM INFORMATION_SCHEMA.COLUMNS
//     WHERE TABLE_NAME = 'WCSPROGRAMS_KoboNgrtNgrtanswer'`,
// });

// sql({
//   query: `
//     SELECT WCSPROGRAMS_ProjectAnnualDataPlanID 
//     FROM WCSPROGRAMS_ProjectAnnualDataPlan 
//     WHERE DataSetUUIDID = '86587778'`,
// });

// sql({
//   query: `
//     SELECT @@VERSION;
//   `,
// });

alterState(state => {
  console.log(JSON.stringify(state.references, null, 2));
  return state;
});

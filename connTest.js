//sql({
//   query: `
// SELECT NAME
//   FROM sys.objects where type='u' and name like 'WCSPROGRAMS_KoboBnsAnswer%'
// `,
// });

sql({
  query: `SELECT WCSPROGRAMS_DataSetSurveyTypeExtCode
   FROM WCSPROGRAMS_DataSetSurveyType`,
});



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

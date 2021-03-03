//sql({
// query: `
// SELECT NAME
//    FROM sys.objects where type='u' and name like 'WCSPROGRAMS_KoboBnsAnswer%'
// `,
//  });

//alterState(state=>{
//console.log(JSON.stringify(state.references, null, 2));
//return state;
//})

/*sql({
  query: `
    SELECT *
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = 'WCSPROGRAMS_KoboNgrtNgrtanswer'`,
});*/

alterState(state => {
  return sql({
    query: `
    SELECT WCSPROGRAMS_ProjectAnnualDataPlanID 
    FROM WCSPROGRAMS_ProjectAnnualDataPlan 
    WHERE DataSetUUIDID = '86587778'`,
  })(state).then(state => {
    state.configuration = {};
    //console.log(state);
     console.log(state.references);
    return state;
  });

  //return state;
});

// sql({
//   query: `
//     SELECT @@VERSION;
//   `,
// });

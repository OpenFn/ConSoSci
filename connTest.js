 sql({
  query: `
    SELECT NAME
    FROM sys.objects where type='u' and name like 'WCSPROGRAMS_KoboBnsAnswer%'
   `,
  });
  
  alterState(state=>{
    console.log(state.references);
    return state;
  }) 
  

sql({
  query: `
    SELECT *
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = 'WCSPROGRAMS_KoboNgrtNgrtanswer'`,
});

// sql({
//   query: `
//     SELECT @@VERSION;
//   `,
// });

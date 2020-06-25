 sql({
  query: `
    SELECT NAME
    FROM sys.objects where type='u' and name like 'WCSPROGRAMS_KoboNgrt%'
   `,
  });
  
  alterState(state=>{
    const tableSets = state.data;
    
    const tables = async tbls => {
    return post(state.configuration.inboxUrl, {
      body: { tables: tbls },
    })(state);
  };

  async function makePosts() {
    return Promise.all([
      ...tableSets.map(item => tables(item)),
    ]);
  }

  return makePosts();
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

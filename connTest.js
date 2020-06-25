 sql({
  query: `
    SELECT NAME
    FROM sys.objects where type='u' and name like 'WCSPROGRAMS_KoboNgrt%'
   `,
  });
  

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

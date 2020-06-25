 sql({
  query: `
    SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES
     WHERE TABLE_TYPE = 'BASE TABLE'
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

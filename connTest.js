// sql({
//   query: `
//     SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES
//     WHERE TABLE_TYPE = 'BASE TABLE'
//   `,
// });

// sql({
//   query: `
//     SELECT @@VERSION;
//   `,
// });

upsert('WCSTestDB.dbo.Supplier', 'SupplierNumber', {
  SupplierNumber: 7,
  Name: dataValue('name'),
  Address: 'New Guy!',
});

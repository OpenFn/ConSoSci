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

sql({
  query: `
    MERGE WCSPROGRAMS_KoboBnsAnswer
    USING (
      VALUES ('1')
    )
    AS new (DatasetUuidId) 
    ON WCSPROGRAMS_KoboBnsAnswer.DatasetUuidId = new.DatasetUuidId 
    WHEN MATCHED THEN
      UPDATE SET DatasetUuidId = new.DatasetUuidId
    WHEN NOT MATCHED THEN
      INSERT (DatasetUuidId)
      VALUES (new.DatasetUuidId);
  `,
});
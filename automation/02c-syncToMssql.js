each('$.forms[*]', state => {
  return each(
    '$.data[*]',
    alterState(state => {
      const { name, defaultColumns } = state.data;

      function convertToMssqlTypes(col) {
        col.type === 'select_one' || col.type === 'select_multiple'
          ? (col.type = 'text')
          : col.type === 'int4' || col.type === 'float4'
          ? (col.type = col.type.substring(0, col.type.length - 1))
          : col.type === 'jsonb'
          ? (col.type = 'nvarchar(max)')
          : col.type === 'timestamp'
          ? ((col.type = 'datetime'), (col.default = 'GETDATE()'))
          : col.type;
      }

      if (name !== `${state.prefix1}_${state.prefix2}_Untitled`) {
        // Note: Specify options here (e.g {writeSql: false, execute: true})
        return describeTable(name.toLowerCase(), {
          writeSql: true, // Keep to true to log query.
          execute: true, // This always needs to be true so we know if we need to insert or update
        })(state).then(mssqlColumn => {
          const { rows } = mssqlColumn.response.body;
          let mergedColumns = state.data.columns;
          if (state.data.defaultColumns)
            mergedColumns = [
              ...state.data.columns,
              ...state.data.defaultColumns,
            ];
          if (mssqlColumn.response.body.rowCount === 0) {
            console.log('No matching table found in mssql --- Inserting.');

            const columns = mergedColumns.filter(x => x.name !== undefined);

            columns.forEach(col => convertToMssqlTypes(col));
            // Note: Specify options here (e.g {writeSql: false, execute: true})
            return insertTable(name, state => columns, {
              writeSql: true, // Keep to true to log query (otherwise make it false).
              execute: true, // keep to false to not alter DB
            })(state).then(state => {
              if (defaultColumns)
                // Creating foreign keys constraints to standard WCS DB and fields
                return sql({
                  query: state =>
                    `ALTER TABLE ${name} WITH CHECK ADD CONSTRAINT FK_${name}_OrganizationID_Owner FOREIGN KEY (${name}_OrganizationID_Owner)
                    REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
                    ALTER TABLE ${name} CHECK CONSTRAINT FK_${name}_OrganizationID_Owner;
                    ALTER TABLE ${name} WITH CHECK ADD CONSTRAINT FK_${name}_SecuritySettingID_Row FOREIGN KEY (${name}_SecuritySettingID_Row)
                    REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
                    ALTER TABLE ${name} CHECK CONSTRAINT FK_${name}_SecuritySettingID_Row;
                  `,
                })(state);
              return state;
            });
          } else {
            const columnNames = rows.map(x => x.column_name.toLowerCase());

            console.log('----------------------');
            const newColumns = mergedColumns.filter(
              x =>
                x.name !== undefined &&
                !columnNames.includes(x.name.toLowerCase())
            );
            newColumns.forEach(col => convertToMssqlTypes(col));
            console.log(newColumns);
            if (newColumns && newColumns.length > 0) {
              console.log('Existing table found in mssql --- Updating.');
              // Note: Specify options here (e.g {writeSql: false, execute: true})
              return modifyTable(name, state => newColumns, {
                writeSql: true, // Keep to true to log query (otherwise make it false).
                execute: true, // keep to false to not alter DB
              })(state);
            } else {
              console.log('No new columns to add.');
              return state;
            }
          }
        });
      }
      return state;
    })
  )(state);
});

alterState(state => {
  console.log('----------------------');
  console.log('Logging queries.');
  for (query of state.queries) console.log(query);
  console.log('----------------------');

  return state;
});

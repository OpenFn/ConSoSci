each(
  '$.tables[*]',
  fn(state => {
    const { name, defaultColumns } = state.data;

    function convertToMssqlTypes(col) {
      col.type = col.referent
        ? 'int'
        : col.type === 'select_one' ||
          col.type === 'select_multiple' ||
          col.type === 'text' ||
          col.type === 'jsonb'
        ? 'nvarchar(max)'
        : col.type.includes('varchar')
        ? col.type.replace('varchar', 'nvarchar')
        : col.type === 'int4' || col.type === 'float4'
        ? col.type.substring(0, col.type.length - 1)
        : col.type === 'timestamp'
        ? 'datetime'
        : col.type;

      if (col.type === 'datetime') col.default = 'GETDATE()';
    }

    function insert(name, columns, execute, writeSql, state) {
      columns.forEach(col => convertToMssqlTypes(col));
      return insertTable(name, state => columns, {
        writeSql,
        execute,
      })(state).then(state => {
        if (defaultColumns) {
          let foreignKeyQueries = [];
          if (state.data.foreignTables) {
            const { foreignTables } = state.data;
            for (let ft of foreignTables) {
              const { table, id, reference } = ft;
              foreignKeyQueries.push(`ALTER TABLE ${name} WITH CHECK ADD CONSTRAINT FK_${name}_${
                reference ? reference : id
              } FOREIGN KEY (${reference ? reference : id})
              REFERENCES ${table} (${id});
              ALTER TABLE ${name} CHECK CONSTRAINT FK_${name}_${
                reference ? reference : id
              };`);
            }
          }
          // Creating foreign keys constraints to standard WCS DB and fields
          return sql({
            query: state =>
              `ALTER TABLE ${name} WITH CHECK ADD CONSTRAINT FK_${name}_OrganizationID_Owner FOREIGN KEY (${
                state.prefixes
              }_OrganizationID_Owner)
            REFERENCES WCSPROGRAMS_Organization (WCSPROGRAMS_OrganizationID);
            ALTER TABLE ${name} CHECK CONSTRAINT FK_${name}_OrganizationID_Owner;
            ALTER TABLE ${name} WITH CHECK ADD CONSTRAINT FK_${name}_SecuritySettingID_Row FOREIGN KEY (${
                state.prefixes
              }_SecuritySettingID_Row)
            REFERENCES WCSPROGRAMS_SecuritySetting (WCSPROGRAMS_SecuritySettingID);
            ALTER TABLE ${name} CHECK CONSTRAINT FK_${name}_SecuritySettingID_Row;
            ${foreignKeyQueries.join('\n')}
          `,
            options: {
              writeSql: true, // Keep to true to log query (otherwise make it false).
              execute: false, // keep to false to not alter DB
            },
          })(state);
        }
        return state;
      });
    }

    function modify(name, newColumns, execute, writeSql, state) {
      if (newColumns && newColumns.length > 0) {
        console.log('Existing table found in mssql --- Updating.');
        // Note: Specify options here (e.g {writeSql: false, execute: true})
        return modifyTable(name, state => newColumns, {
          writeSql, // Keep to true to log query (otherwise make it false).
          execute, // keep to false to not alter DB
        })(state);
      } else {
        console.log('No new columns to add.');
        return state;
      }
    }

    if (name !== `${state.prefixes}_Untitled`) {
      let mergedColumns = state.data.columns;
      if (state.data.defaultColumns)
        mergedColumns = [...state.data.columns, ...state.data.defaultColumns];

      // Note: Specify options here
      const execute = false;
      const writeSql = true;

      return describeTable(name.toLowerCase(), {
        writeSql: true, // Keep to true to log query.
        execute, // Keep to true to execute query.
      })(state)
        .then(mssqlColumn => {
          const { rows } = mssqlColumn.response.body;
          if (mssqlColumn.response.body.rowCount === 0) {
            console.log('No matching table found in mssql --- Inserting.');

            const columns = mergedColumns.filter(x => x.name !== undefined);
            return insert(name, columns, execute, writeSql, state);
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
            return modify(name, newColumns, execute, writeSql, state);
          }
        })
        .catch(() => {
          const columns = mergedColumns.filter(x => x.name !== undefined);
          return insert(name, columns, execute, writeSql, state);
        });
    }
    return state;
  })
);

each('$.lookupTables[*]', state => {
  const { choiceDictionary } = state;
  const name = state.data.name.split('_')[1];
  const mapping = [];
  for (choice in choiceDictionary) {
    if (choice === name.toLowerCase()) {
      for (value of choiceDictionary[choice]) {
        let obj = {};
        obj[`${state.data.name}ExtCode`] = value;
        obj[`${state.data.name}Name`] = value;
        mapping.push(obj);
      }

      return upsertMany(state.data.name, `${state.data.name}ExtCode`, mapping, {
        writeSql: true,
        logValues: true,
      })(state);
    }
  }
  return state;
});

fn(state => {
  console.log('----------------------');
  console.log('Logging queries.');
  for (query of state.queries) console.log(query);
  console.log('----------------------');

  return state;
});

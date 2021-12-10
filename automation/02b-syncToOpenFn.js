// {
//   ...state,
//   tableId, // this is unique per form and used to identify the main "submissions table" for the form
//   tables, // this is a list of tables (main table, lookup tables, junction tables, etc.) to create in the db
//   seeds, // this is a list of records (grouped by table) to insert at build time, not form submission time (runtime)
//   prefix1, // this is a constant used in various places
//   prefix2, // this is a constant used in various places
//   prefixes, // this is `{prefix1}_{prefix2}`
//   uuidColumnName, // this is a constant used identify unique ID columns in the db
//   multiSelectIds, // this is an array of the 'list_name' of every select_multiple question
//   data: {}, // we clear data
//   response: {}, // we clear response
// };

// Pluck projectId out of state for convenience, filter out tables that were populated at build time.
fn(state => {
  const { projectId } = state.configuration;

  return {
    ...state,
    projectId,
    tables: state.tables
      .filter(t => !t.ReferenceUuid) // filter out tables that were seeded
      .filter(t => t.columns.length > 0) // filter out tables with no columns
      .filter(t => t.name !== `${state.prefixes}_Untitled`), // filter out bad test data
  };
});

fn(state => {
  // Create the first operation in our expression.
  var expression = `fn(state => {
  const multiSelectIds = ["${state.multiSelectIds.join('", "')}"];

  function convertMultiSelectsIntoArrays(body, multiSelectIds) {
    for (const property in body) {
      if (Array.isArray(body[property])) {
        convertMultiSelectsIntoArrays(body[property], multiSelectIds);
      } else {
        for (const thing in body[property]) {
          if (Array.isArray(body[property][thing])) {
            convertMultiSelectsIntoArrays(
              body[property][thing],
              multiSelectIds
            );
          } else if (thing.includes(multiSelectIds)) {
            const multiVals = body[property][thing].split(' ');
            body[property][thing] = multiVals.map(val => ({ name: val }));
          }
        }
      }
    }
  }

  function generateUuid(body, uuid) {
    for (const property in body) {
      if (Array.isArray(body[property]) && body !== null) {
        body['__generatedUuid'] = uuid;
        body[property].forEach((thing, i, arr) => {
          if (thing !== null) {
            thing['__parentUuid'] = uuid;
            let newUuid = uuid + '-' + (i + 1);
            thing['__generatedUuid'] = newUuid;
            for (const property in thing) {
              if (Array.isArray(thing[property])) {
                generateUuid(thing, newUuid);
              }
            }
          }
        });
      }
    }
  }

  multiSelectIds.forEach(msIds => {
    convertMultiSelectsIntoArrays(state.data.body, msIds);
  });

  generateUuid(
    state.data.body,
    state.data.body._id+'-'+state.data.body._xform_id_string
  );

  state.data = { ...state.data, ...state.data.body };
  return state;
}); \n`;

  function toCamelCase(str) {
    const words = str.split('_'); // we split using '_'. With regex we would use: "match(/[a-z]+/gi)"
    if (!words) return '';
    return words
      .map(word => {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
      })
      .join('');
  }

  // Iterate through every table and create an operation to upsert (or upsertMany) records for that table.
  for (const table of state.tables) {
    const { columns, name, depth, select_multiple, lookupTable } = table;
    var paths = [];

    for (const column of columns) {
      // Handling master parent table
      if (name === `${state.prefix1}_KoboDataset`) {
        const values = {
          FormName: "dataValue('formName')",
          DatasetId: "dataValue('_xform_id_string')",
          LastUpdated: 'new Date().toISOString()',
        };
        for (x in values) paths.push(values[x]);
        break;
      }
      // end of master parent table

      const currentPath = column.path;

      paths.push(
        (currentPath && currentPath.length > 0
          ? currentPath.join('/') + '/'
          : '') + column.$autoname
      );
    }

    var mapKoboToPostgres = {}; // This is the jsonBody that should be given to our upsert

    // We generate findValue function (fn) for those that needs it.
    function generateFindValue(question, relation, searchAttr, searchVal) {
      const inferredUUid =
        // if not junction, but yes select_one or many...
        !question.referent && question.findValue
          ? toCamelCase(
              question.select_from_list_name.replace(`${state.tableId}_`, '')
            )
          : question.name;

      const suffixedUUid = !inferredUUid.endsWith('ID')
        ? `${inferredUUid}ID`
        : `${inferredUUid}`;

      const finalUUid = !suffixedUUid.startsWith(state.prefixes)
        ? `${state.prefixes}${suffixedUUid}ID`
        : suffixedUUid;

      searchAttr = searchAttr.replace('ID', '');

      if (question.referent) {
        // if it's in a junction
        if (question.refersToLookup) {
          // and it refers to lookup
          searchAttr = `${question.referent}ExtCode`;
          searchVal = `x`;
        }
        // if it doesn't we don't touch it!
      } else {
        searchAttr = !searchAttr.includes(state.prefixes)
          ? `${state.prefixes}${searchAttr}ExtCode`
          : `${searchAttr}ExtCode`;

        searchVal =
          question.depth > 0
            ? `x['${searchVal}']`
            : `dataValue('${searchVal}')`;
      }

      return `await findValue({uuid: '${finalUUid.toLowerCase()}', relation: '${relation.replace(
        'ID',
        ''
      )}', where: { ${searchAttr}: ${searchVal} }})(state)`;
    }

    // FROM HERE WE ARE BUILDING MAPPINGS
    columns.forEach((col, i) => {
      if (col.rule !== 'DO_NOT_MAP') {
        if (col.findValue) {
          mapKoboToPostgres[col.name] = generateFindValue(
            col,
            `${state.prefixes}${toCamelCase(col.select_from_list_name)}`,
            `${toCamelCase(col.select_from_list_name)}`,
            paths[i]
          );
        } else if (col.name === 'Latitude') {
          mapKoboToPostgres[col.name] = `state => state.data.gps.split(' ')[0]`;
        } else if (col.name === 'Longitude') {
          mapKoboToPostgres[col.name] = `state => state.data.gps.split(' ')[1]`;
        } else if (col.name === 'Payload') {
          // Here we use an expression, rather than a function, to take the ======
          // original, unaltered body of the Kobo submission as JSON.
          mapKoboToPostgres.Payload = `state.data.body`;
        } else if (col.referent) {
          // If we see a referent, this is a column in a junction table.
          if (col.refersToLookup) {
            // If refersToLookup is true, then this column refers to the lookup table
            mapKoboToPostgres[col.name] = generateFindValue(
              col,
              col.referent,
              `${col.select_from_list_name}`,
              'x'
            );
            // if If refersToLookup is false, this column refers to the main submission table
            // TODO: Mamadou, please confirm the line below. Should it change to "findValue"?
          } else {
            mapKoboToPostgres[col.name] = generateFindValue(
              col,
              col.referent,
              'AnswerId',
              "dataValue('_id')"
            );
          }
        } else if (col.depth > 0) {
          mapKoboToPostgres[col.name] = `x['${paths[i]}']`;
        } else {
          mapKoboToPostgres[col.name] =
            name !== `${state.prefix1}_KoboDataset`
              ? col.parentColumn
                ? `dataValue('${col.path.join('/')}')`
                : `dataValue('${paths[i]}')`
              : `${paths[i]}`;
        }

        if (col.name === 'AnswerId') {
          mapKoboToPostgres[col.name] = `dataValue('_id')`;
        }
      }
    });

    // =====================================================================

    // We generate a mapping variable that we are going=======
    // to use inside our operation============================
    const mapObject = `const mapping = ${JSON.stringify(
      mapKoboToPostgres,
      null,
      2
    ).replace(/"/g, '')}`;
    // =======================================================

    // We build a set of statements for when depth > 0========
    const path = columns[0].path.join('/');

    let statements = null;
    // console.log('select', select_multiple);
    // console.log('name', depth);
    // if table is a table referencing a select multiple table.
    if (select_multiple || lookupTable) {
      statements = `if (state.data['${path}']) { \n
                const array = state.data['${path}'].split(' '); \n
                const mapping = []; \n 
                for ( let x of array ) { \n
                  mapping.push(${JSON.stringify(
                    mapKoboToPostgres,
                    null,
                    2
                  ).replace(/"/g, '')}); \n
                } \n
            `;
    } else {
      //   statements = `if (state.data['${path}']) { \n
      //     const array = state.data['${path}'].split(' '); \n
      //     const mapping = []; \n
      //     for ( let x of array ) { \n
      //       mapping.push(${JSON.stringify(mapKoboToPostgres, null, 2).replace(
      //         /"/g,
      //         ''
      //       )}); \n
      //     } \n
      // }`;
      statements = `const dataArray = state.data['${path}'] || [] \n
        const mapping = []; \n
        for (let x of dataArray) { \n
          mapping.push(${JSON.stringify(mapKoboToPostgres, null, 2).replace(
            /"/g,
            ''
          )}) \n
          }`;
    }
    // =======================================================

    const opFirstLineNoDepth = `fn(async state => {\n ${mapObject} \n`;
    const opFirstLineDepth = `fn(async state => {\n ${statements} \n`;
    // const alterSOpeningSelect = `fn(async state => {\n ${selectStatement} \n`;
    const opLastLine = `})`;

    function wrapper(column, mapping) {
      let prefix = '';
      const depth = column.depth;
      /*  if (select_multiple || lookupTable) {
          prefix += mapping + `)(state); \n${alterSClosing} \n`;
          return prefix;
        } else */ if (depth > 1) {
        // console.log('Im here');
        let closingPar = 0; // hold how many brackets we need to close
        for (var i = 0; i < depth - 1; i++) {
          if (column.path[i]) {
            prefix += `each(dataPath('${column.path[i]}[*]'), `;
            closingPar++;
          }
        }
        // prefix += mapping;
        prefix +=
          mapping +
          (select_multiple || lookupTable
            ? `)(state); } \n return state; \n${opLastLine} \n`
            : `)(state); \n${opLastLine} \n`);
        for (var i = 0; i < closingPar; i++) {
          prefix += ')';
        }

        return prefix;
      }
      return mapping;
    }

    const operation = `return ${depth > 0 ? 'upsertMany' : 'upsert'}`;

    var uuid =
      name === `${state.prefix1}_KoboDataset`
        ? '"DatasetId"'
        : table.select_multiple
        ? `["${columns[0].name}", "${columns[1].name}"]`
        : `'${toCamelCase(state.uuidColumnName)}'`;

    let mapping =
      depth > 0 || select_multiple
        ? `${opFirstLineDepth} ${operation}('${name}', ${uuid}, `
        : `${opFirstLineNoDepth} ${operation}('${name}', ${uuid}, `;

    if (columns[0].depth > 0 || select_multiple) {
      mapping += `() => mapping, {setNull: ["''", "'undefined'"]}`;
    } else {
      mapping += `mapping, {setNull: ["''", "'undefined'"]}`;
    }
    // END OF BUILDING MAPPINGS (state)

    expression +=
      wrapper(columns[0], mapping) +
      (columns[0].depth > 1
        ? '\n'
        : select_multiple || lookupTable
        ? `)(state); } \n return state; \n${opLastLine} \n`
        : `)(state); \n${opLastLine} \n`);
  }

  state.triggerCriteria = {
    tableId: `${state.prefixes}${state.tableId}`,
  };

  return { ...state, expression };
});

// Get existing triggers for this project.
fn(state => {
  console.log(state.expression);
  return state;
  return request(
    {
      method: 'get',
      path: 'triggers',
      params: {
        project_id: state.projectId,
      },
    },
    next => ({ ...next, triggers: next.data })
  )(state);
});

// Get existing jobs for this project.
// fn(state => {
//   return request(
//     {
//       method: 'get',
//       path: 'jobs',
//       params: {
//         project_id: state.projectId,
//       },
//     },
//     next => ({ ...next, jobs: next.data.filter(job => !job.archived) })
//   )(state);
// });

// // Create or update the trigger to detect submissions from this form.
// fn(state => {
//   const { triggers, prefixes, tableId, triggerCriteria, projectId } = state;
//   const triggerNames = triggers.map(t => t.name);

//   const name = `auto/${prefixes}${tableId}`;
//   const criteria = triggerCriteria;
//   const triggerIndex = triggerNames.indexOf(name);

//   const trigger = {
//     project_id: projectId,
//     name,
//     type: 'message',
//     criteria,
//   };

//   if (triggerIndex === -1) {
//     console.log('Inserting trigger.');
//     return request(
//       {
//         method: 'post',
//         path: 'triggers',
//         data: { trigger },
//       },
//       next => ({ ...next, triggers: [...next.triggers, next.data] })
//     )(state);
//   }

//   console.log('Trigger already existing.');
//   return state;
// });

// // Create or update the job for handling submissions from this form.
// fn(state => {
//   const { expression, prefixes, tableId, jobs, triggers, projectId } = state;

//   console.log('Inserting/updating job: ', `auto/${prefixes}${tableId}`);

//   const jobNames = jobs.map(j => j.name);
//   const triggersName = triggers.map(t => t.name);
//   const name = `auto/${prefixes}${tableId}`;
//   const jobIndex = jobNames.indexOf(name); // We check if there is a job with that name.
//   const triggerIndex = triggersName.indexOf(name);
//   const triggerId = triggers[triggerIndex].id;

//   const method = jobIndex !== -1 ? 'put' : 'post';
//   const path = method === 'put' ? `jobs/${jobs[jobIndex].id}` : 'jobs/';

//   const job = {
//     adaptor: 'mssql',
//     adaptor_version: 'v2.6.9',
//     expression,
//     name,
//     project_id: projectId,
//     trigger_id: triggerId, // we (1) create a trigger first; (2) get the id ; (3) assign it here!
//   };

//   return request({ method, path, data: { job } })(state);
// });

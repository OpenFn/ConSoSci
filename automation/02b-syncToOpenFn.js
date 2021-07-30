alterState(state => {
  return { ...state, projectId: 'p5x4g4' };
});

each(
  '$.forms[*]',
  alterState(state => {
    var expression = `alterState(state => {
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
    for (var i = 0; i < state.data.length; i++) {
      const { columns, name, depth, ReferenceUuid } = state.data[i];

      if (
        columns.length > 0 &&
        name !== `${state.prefix1}_${state.prefix2}_Untitled`
      ) {
        var paths = [];
        for (var j = 0; j < columns.length; j++) {
          // Handling master parent table
          if (name === `${state.prefix1}__KoboDataset`) {
            const values = {
              FormName: "dataValue('formName')",
              DatasetId: "dataValue('_xform_id_string')",
              LastUpdated: 'new Date().toISOString()',
            };
            for (x in values) paths.push(values[x]);
            break;
          }
          // end of master parent table
          const currentPath = columns[j].path;
          paths.push(
            (currentPath && currentPath.length > 0
              ? currentPath.join('/') + '/'
              : '') + columns[j].$autoname
          );
        }

        var mapKoboToPostgres = {}; // This is the jsonBody that should be given to our upsert

        function wrapper(column, mapping) {
          let prefix = '';
          const depth = column.depth;
          if (depth > 1) {
            for (var i = 0; i < depth - 1; i++) {
              prefix += `each(dataPath('${column.path[i]}[*]'), `;
            }
            // prefix += mapping;
            prefix += mapping + `)(state); \n${alterSClosing} \n`;
            for (var i = 0; i < depth - 1; i++) {
              prefix += ')';
            }

            return prefix;
          }
          return mapping;
        }

        // We generate findValue function (fn) for those that needs it.
        function generateFindValue(uuid, relation, leftOperand, rightOperand) {
          var fn = `await findValue({uuid: '${uuid.toLowerCase()}', relation: '${relation}', where: { ${leftOperand}: dataValue('${rightOperand}') }})(state)`;
          return fn;
        }

        let logical = undefined;
        // FROM HERE WE ARE BUILDING MAPPINGS
        for (var k = 0; k < columns.length; k++) {
          if (columns[k].depth > 0)
            mapKoboToPostgres[columns[k].name] = `x['${paths[k]}']`;
          else if (columns[k].rule !== 'DO_NOT_MAP') {
            mapKoboToPostgres[columns[k].name] =
              name !== `${state.prefix1}__KoboDataset`
                ? columns[k].type === 'select_one' ||
                  columns[k].type === 'select_multiple'
                  ? generateFindValue(
                      `${columns[k].name}ID`,
                      `${state.prefix1}_${state.prefix2}_${columns[k].name}`,
                      `${columns[k].name}Name`,
                      paths[k]
                    )
                  : columns[k].parentColumn
                  ? `dataValue('${columns[k].path.join('/')}')`
                  : `dataValue('${paths[k]}')`
                : `${paths[k]}`;
            //generating logical
            if (columns[k].parentColumn)
              logical = `dataValue('${columns[k].path.join('/')}')`;
          }

          if (columns[k].name === 'AnswerId') {
            mapKoboToPostgres[columns[k].name] = `dataValue('_id')`;
          }

          if (columns[k].name === 'latitude') {
            mapKoboToPostgres[
              columns[k].name
            ] = `state => state.data.gps.split(' ')[0]`;
          }
          if (columns[k].name === 'longitude') {
            mapKoboToPostgres[
              columns[k].name
            ] = `state => state.data.gps.split(' ')[1]`;
          }
        }

        // Here we use an expression, rather than a function, to take the ======
        // original, unaltered body of the Kobo submission as JSON.
        mapKoboToPostgres.Payload = `state.data.body`;
        // =====================================================================

        if (name !== `${state.prefix1}__KoboDataset`) {
          // We check if that table has a defined ReferenceUuid that we should use ====
          // instead of the default generated_uuid.
          if (!ReferenceUuid)
            mapKoboToPostgres[toCamelCase(state.uuid)] =
              columns[0].depth > 0
                ? `x['__generatedUuid']`
                : `dataValue('__generatedUuid')`;

          if (columns[0].depth > 1) {
            mapKoboToPostgres[
              toCamelCase(`${columns[0].path.slice(-2, -1).pop()}_uuid`)
            ] = `x['__parentUuid']`;
          } else if (columns[0].depth > 0) {
            mapKoboToPostgres[
              toCamelCase(`${state.tableId}_uuid`)
            ] = `x['__parentUuid']`;
          }
        }

        // We generate a mapping variable that we are going=======
        // to use inside our operation============================
        const mapObject = `const mapping = ${JSON.stringify(
          mapKoboToPostgres,
          null,
          2
        ).replace(/"/g, '')}`;
        // =======================================================

        // We build a set of statements for when depth > 0=============
        const path = columns[0].path.join('/');

        const statements = `const dataArray = state.data['${path}'] || [] \n
        const mapping = []; \n 
        for (let x of dataArray) { \n
          mapping.push(${JSON.stringify(mapKoboToPostgres, null, 2).replace(
            /"/g,
            ''
          )}) \n
          }`;
        // =======================================================

        const alterSOpeningNoDepth = `alterState(async state => {\n ${mapObject} \n`;
        const alterSOpeningDepth = `alterState(async state => {\n ${statements} \n`;
        const alterSClosing = `})`;

        const operation =
          depth > 0
            ? `return upsertMany`
            : ReferenceUuid
            ? `return upsertIf`
            : `return upsert`;

        var uuid =
          name === `${state.prefix1}__KoboDataset`
            ? 'DatasetId'
            : ReferenceUuid || toCamelCase(state.uuid);

        // 1. If the current table have a ReferenceUuid, then it's a lookup table
        // We use our alterState opening and close later and the 'logical'.
        // 2. If it's not a lookup table, and have depth it's repeat group (upertMany)
        // Otherwise it's a flat table and we still use the opening.
        let mapping = ReferenceUuid
          ? `${alterSOpeningNoDepth} ${operation}(${logical},'${name}', '${uuid}', `
          : depth > 0
          ? `${alterSOpeningDepth} ${operation}('${name}', '${uuid}', `
          : `${alterSOpeningNoDepth} ${operation}('${name}', '${uuid}', `;

        if (columns[0].depth > 0) {
          // const path = columns[0].path.join('/');

          // mapping += `state => { const dataArray = state.data['${path}'] || [];
          // return dataArray.map(x => (${JSON.stringify(
          //   mapKoboToPostgres,
          //   null,
          //   2
          // ).replace(/"/g, '')}))}`;
          mapping += `() => mapping`;
        } else {
          // mapping += JSON.stringify(mapKoboToPostgres, null, 2).replace(
          //   /"/g,
          //   ''
          // );
          // 'mapping' here is a variable name as we remove ========
          // the whole object from the operation====================
          mapping += `mapping`;
        }
        // END OF BUILDING MAPPINGS (state)
        expression +=
          wrapper(columns[0], mapping) +
          (columns[0].depth > 1 ? '\n' : `)(state); \n${alterSClosing} \n`);
      }
    }
    state.data.expression = expression;
    state.data.triggerCriteria = {
      tableId: `${state.prefix1}_${state.prefix2}_${state.tableId}`,
    };
    return state;
  })
);

alterState(state => {
  return request(
    {
      method: 'get',
      path: 'triggers',
      params: {
        project_id: state.projectId,
      },
    },
    state => ({ ...state, triggers: state.data })
  )(state);
});

alterState(state => {
  return request(
    {
      method: 'get',
      path: 'jobs',
      params: {
        project_id: state.projectId,
      },
    },
    state => ({ ...state, jobs: state.data.filter(job => !job.archived) })
  )(state);
});

each(
  '$.forms[*]',
  alterState(state => {
    const triggerNames = state.triggers.map(t => t.name);

    const name = `auto/${state.prefix1}_${state.prefix2}_${state.tableId}`;
    const criteria = state.data.triggerCriteria;
    const triggerIndex = triggerNames.indexOf(name);

    const trigger = {
      project_id: state.projectId,
      name,
      type: 'message',
      criteria,
    };
    if (triggerIndex === -1) {
      console.log('Inserting triggers.');
      return request(
        {
          method: 'post',
          path: 'triggers',
          data: {
            trigger,
          },
        },
        state => {
          return { ...state, triggers: [...state.triggers, state.data] };
        }
      )(state);
    } else {
      console.log('Trigger already existing.');
    }
    return state;
  })
);

each(
  '$.forms[*]',
  alterState(state => {
    const expression = state.data.expression;
    console.log(
      'Inserting / Updating job: ',
      `auto/${state.prefix1}_${state.prefix2}_${state.tableId}`
    );
    const jobNames = state.jobs.map(j => j.name);
    const triggersName = state.triggers.map(t => t.name);
    const name = `auto/${state.prefix1}_${state.prefix2}_${state.tableId}`;
    const jobIndex = jobNames.indexOf(name); // We check if there is a job with that name.
    const triggerIndex = triggersName.indexOf(name);
    const triggerId = state.triggers[triggerIndex].id;
    const job = {
      adaptor: 'postgresql',
      expression,
      name,
      project_id: state.projectId,
      trigger_id: triggerId, // we (1) create a trigger first; (2) get the id ; (3) assign it here!
    };
    const method = jobIndex !== -1 ? 'put' : 'post';
    const path = method === 'put' ? `jobs/${state.jobs[jobIndex].id}` : 'jobs/';
    return request({ method, path, data: { job } }, state => {
      return state;
    })(state);
  })
);

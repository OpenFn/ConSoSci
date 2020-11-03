const formName = 'homeVisit';
const tables = [];

const questions = [
  { p: 0, type: 'surveyDate' },
  { p: 1, type: 'begin_repeat', name: 'enfants', exp: 1 },
  { p: 2, type: 'age' },
  { p: 3, type: 'gender' },
  { p: 4, type: 'begin_repeat', name: 'medicaments', exp: 2 },
  { p: 5, type: 'generic_name' },
  { p: 6, type: 'dose' },
  { p: 7, type: 'begin_repeat', name: 'bad_reactions', exp: 3 },
  { p: 8, type: 'kind_of_reaction' },
  { p: 9, type: 'end_repeat', name: 'bad_reactions' },
  { p: 10, type: 'lastTaken' },
  { p: 11, type: 'end_repeat', name: 'medicaments' },
  { p: 12, type: 'end_repeat', name: 'enfants' },
  { p: 13, type: 'begin_repeat', name: 'animaux' },
  { p: 14, type: 'isCat' },
  { p: 15, type: 'end_repeat', name: 'animaux'},
];

let depth = 0;

for (let index = 0; index < questions.length; index++) {
  const q = questions[index];
  switch (q.type) {
    case 'begin_repeat':
      depth++;
      questions[index] = {
        ...q,
        depth,
        path: index === 0 ? [] : [...questions[index - 1].path, q.name],
      };
      break;

    case 'end_repeat':
      depth--;
      console.log('slice', questions[index - 1].path.slice(0, -1));
      questions[index] = {
        ...q,
        depth,
        path: index === 0 ? [] : [...questions[index - 1].path.slice(0, -1)],
      };
      break;

    default:
      questions[index] = {
        ...q,
        depth,
        path: index === 0 ? [] : [...questions[index - 1].path],
      };
      break;
  }
}

console.log(questions);

function tablesFromQuestions(questions, formName, tables) {
  const backwardsFirstBegin = questions
    .reverse()
    .findIndex(item => item.type === 'begin_repeat');

  const lastBegin =
    backwardsFirstBegin !== -1
      ? questions.length - backwardsFirstBegin - 1
      : false;

  if (lastBegin) {
    const firstEndAfterLastBegin =
      questions
        .reverse()
        .slice(lastBegin)
        .findIndex(item => item.type === 'end_repeat') + lastBegin;

    // console.log('lastBegin =', lastBegin, questions[lastBegin].name);
    // console.log(
    //   'firstEndAfterLastBegin',
    //   firstEndAfterLastBegin,
    //   questions[firstEndAfterLastBegin].name
    // );

    // Remove the deepest repeat group from the 'questions' array, parse it
    // and push it to the 'tables' array, and call tablesFromQuestions with
    // the remaining questions.
    const group = questions.splice(
      lastBegin,
      firstEndAfterLastBegin - lastBegin + 1
    );
    // console.log(group);
    // console.log('group length', group.length);
    // console.log('remaining questions', questions.length);

    tables.push({
      name: (formName + '_' + group[0].name)
        .split(/\s|-|'/)
        .join('_')
        .toLowerCase(),
      columns: group.length,
      formDef: group,
      group: 'repeat_group',
    });
    return tablesFromQuestions(questions, formName, tables);
  }

  tables.push({
    name: formName
      .split(/\s|-|'/)
      .join('_')
      .toLowerCase(),
    columns: questions.length,
    formDef: questions,
    group: 'parent',
  });

  return tables;
}

// tablesFromQuestions(questions, formName, tables);
// console.log(JSON.stringify(tables, null, 2));
// console.log('tables:', tables);

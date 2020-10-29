const formName = 'homeVisit';
const tables = [];

const questions = [
  { p: 0, type: 'surveyDate' },
  { p: 1, type: 'begin_repeat', name: 'animaux' },
  { p: 2, type: 'isCat' },
  { p: 3, type: 'end_repeat' },
  { p: 4, type: 'begin_repeat', name: 'enfants' },
  { p: 5, type: 'age' },
  { p: 6, type: 'gender' },
  { p: 7, type: 'begin_repeat', name: 'medicaments', deep: true },
  { p: 8, type: 'dose' },
  { p: 9, type: 'lastTaken' },
  { p: 10, type: 'end_repeat', deep: true },
  { p: 11, type: 'end_repeat' },
];

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

    console.log('lastBegin =', lastBegin, questions[lastBegin].name);
    console.log(
      'firstEndAfterLastBegin',
      firstEndAfterLastBegin,
      questions[firstEndAfterLastBegin].name
    );

    // Remove the deepest repeat group from the 'questions' array, parse it
    // and push it to the 'tables' array, and call tablesFromQuestions with
    // the remaining questions.
    console.log(questions);
    const group = questions.splice(
      lastBegin,
      firstEndAfterLastBegin - lastBegin + 1
    );
    console.log(group);
    console.log('group length', group.length);
    console.log('remaining questions', questions.length);

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

tablesFromQuestions(questions, formName, tables);
console.log(JSON.stringify(tables, null, 2));

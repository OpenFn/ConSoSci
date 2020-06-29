// Note: This data cleaning operation returns state,
// modified in whatever way necessary.
alterState(state => {
  const original = state.data.body;
  let cleanedSubmission = {};

  for (const key in original) {
    switch (original[key]) {
      case 'yes':
        cleanedSubmission[key] = 1;
        break;

      case 'no':
        cleanedSubmission[key] = 0;
        break;

      default:
        break;
    }
  }

  state.data = cleanedSubmission;
  return state;
});

upsert('WCSPROGRAMS_KoboNrgtNrgtanswer', 'DatasetUuidId', {
  DatasetUuidId: dataValue('_uuid'),
  AmswerId: dataValue('_id'),
  Landscape: dataValue('landscape'),
  Surveyor: dataValue('surveyor'),
  GovGroup: dataValue('gov_group'),
  // more: dataValue('moreFields'),
});

upsert('WCSPROGRAMS_KoboNrgtNrgtanswergs', 'DatasetUuidId', {
  DatasetUuidId: dataValue('_uuid'),
  AnswerId: dataValue('_id'),
  Gender: dataValue('gender'),
  Member: dataValue('member'),
  Objective: dataValue('objective'),
  Legitimacy: dataValue('legitimacy'),
  Accountability: dataValue('accountability'),
  Transparency: dataValue('transparency'),
  Participation: dataValue('participation'),
  Fairness: dataValue('fairness'),
  Diversity: dataValue('diversity'),
  KnowledgeSkills: dataValue('knowledge_skills'),
  Resources: dataValue('resources'),
  InstutionalFramework: dataValue('framework'),
  Motivation: dataValue('motivation'),
  // more: dataValue('moreFields'),
});

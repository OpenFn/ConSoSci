// Note: This data cleaning operation returns state,
// modified in whatever way necessary.
alterState(state => {
  const submission = state.data.body;

  for (const key in submission) {
    switch (submission[key]) {
      case 'yes':
        submission[key] = 1;

      case 'no':
        submission[key] = 1;
        break;

      default:
        break;
    }
  }

  state.data = submission;
  return state;
});

upsert('WCSPROGRAMS_KoboNrgtNrgtanswer', 'DatasetUuidId', {
  DatasetUuidId: dataValue('_uuid'),
  AnswerId: dataValue('_id'),
  Landscape: dataValue('landscape'),
  GovGroup: dataValue('gov_group'),
  Jurisdiction: dataValue('jurisdiction'),
  Objective: dataValue('objective'),
  Members: dataValue('members'),
  Women: dataValue('women'),
  LastUpdate: dataValue('_submission_time'),
  // more: dataValue('moreFields'),
});

upsert('WCSPROGRAMS_KoboNrgtNrgtanswergs', 'AnswerId', {
  //DatasetUuidId: dataValue('_uuid'),
  AnswerId: dataValue('_id'),
  SurveyDate: dataValue('_submission_time'),
  Code: dataValue('code'),
  Gender: dataValue('gender'),
  Member: dataValue('member'),
  Legitimacy: dataValue('legitimacy'),
  Accountability: dataValue('accountability'),
  Transparency: dataValue('transparency'),
  Participation: dataValue('participation'),
  Fairness: dataValue('fairness'),
  KnowledgeSkills: dataValue('knowledge_skills'),
  Resources: dataValue('resources'),
  InstutionalFramework: dataValue('institutional_framework'),
  Motivation: dataValue('motivation'),
  EnactDecision: dataValue('enact_decision'),
  HeldAccountable: dataValue('held_accountable'),
  Diversity: dataValue('diversity'),
  //LastUpdate: dataValue('_submission_time')
  // more: dataValue('moreFields'),
});

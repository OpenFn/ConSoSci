// NOTE: This data cleaning operation returns state, modified as needed.
alterState(state => {
  const { form, body } = state.data;
  const { _submission_time, _id } = body;
  let cleanedSubmission = {};

  for (const key in body) {
    switch (body[key]) {
      case 'yes':
        cleanedSubmission[key] = 1;
        break;

      case 'no':
        cleanedSubmission[key] = 0;
        break;

      default:
        cleanedSubmission[key] = body[key];
        break;
    }
  }

  cleanedSubmission.durableUUID = `${_submission_time}-${form}-${_id}`;
  state.data = cleanedSubmission;
  return state;
});

upsert('WCSPROGRAMS_KoboNrgtNrgtanswer', 'DatasetUuidId', {
  DatasetUuidId: dataValue('durableUUID'),
  AnswerId: dataValue('_id'),
  Landscape: dataValue('landscape'),
  Surveyor: dataValue('surveyor'),
  GovGroup: dataValue('gov_group'),
  LastUpdate: dataValue('_submission_time'), // update to runtime now()
});
upsert('WCSPROGRAMS_KoboNrgtNrgtanswergs', 'AnswerId', {
  // upsert('WCSPROGRAMS_KoboNrgtNrgtanswergs', 'DatasetUuidId', {
  // DatasetUuidId: dataValue('durableUUID'), //Q: Need to add column to table
  Id: dataValue('_id'),
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
  LastUpdate: dataValue('_submission_time'), // update to runtime now()
});

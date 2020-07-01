// NOTE: This data cleaning operation returns state, modified as needed.
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
        cleanedSubmission[key] = original[key];
        break;
    }
  }

  state.data = cleanedSubmission;
  return state;
});

upsert('WCSPROGRAMS_KoboNrgtNrgtanswer', 'DatasetUuidId', {
  DatasetUuidId: dataValue('_uuid'),
  AnswerId: dataValue('_id'),
  Landscape: dataValue('landscape'),
  Surveyor: dataValue('surveyor'),
  GovGroup: dataValue('gov_group'),
  LastUpdate: dataValue('_submission_time'),
});
upsert('WCSPROGRAMS_KoboNrgtNrgtanswergs', 'AnswerId', {
//upsert('WCSPROGRAMS_KoboNrgtNrgtanswergs', 'DatasetUuidId', {
  //DatasetUuidId: dataValue('_uuid'), //ERROR: Need to add uuid to table
  AnswerId: dataValue('_id'),
  Gender: dataValue('gender'),
  Member: dataValue('member'),
  //Objective: dataValue('objective'), //ERROR: Invalid column name
  Legitimacy: dataValue('legitimacy'),
  Accountability: dataValue('accountability'),
  Transparency: dataValue('transparency'),
  Participation: dataValue('participation'),
  Fairness: dataValue('fairness'),
  Diversity: dataValue('diversity'),
  //KnowledgeSkills: 0.5,//dataValue('knowledge_skills'), //ERROR: Conversion failed when converting the varchar value '0.5' to data type int.
  Resources: dataValue('resources'),
  InstutionalFramework: dataValue('framework'),
  Motivation: dataValue('motivation'),
});

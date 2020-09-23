// NOTE: This data cleaning operation returns state, modified as needed.
alterState(state => {
  try {
    const { body } = state.data;
    const { _submission_time, _id, _xform_id_string } = body;
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

    cleanedSubmission.durableUUID = `${_submission_time}-${_xform_id_string}-${_id}`;
    state.data = cleanedSubmission;
    return state;
  } catch (error) {
    state.connection.close();
    throw error;
  }
});

upsert('WCSPROGRAMS_KoboNrgtNrgtanswer', 'DatasetUuidId', {
  DatasetUuidId: dataValue('durableUUID'),
  AnswerId: dataValue('_id'),
  Landscape: dataValue('landscape'),
  GovGroup: dataValue('gov_group'),
  Jurisdiction: dataValue('jurisdiction'),
  Objective: dataValue('objective'),
  Members: dataValue('members'),
  Women: dataValue('women'),
  LastUpdate: dataValue('_submission_time'), // update to runtime now()
});

upsert('WCSPROGRAMS_KoboNrgtNrgtanswergs', 'AnswerId', {
  DatasetUuidId: dataValue('durableUUID'), // Q: add column to table
  Id: dataValue('_id'),
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
  LastUpdate: dataValue('_submission_time'), //update to runtime now()
});

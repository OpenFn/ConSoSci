// NOTE: This data cleaning operation returns state, modified as needed.
alterState(state => {
  try {
    const { body, formName } = state.data;
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
    cleanedSubmission.datasetId = `${formName}-${_xform_id_string}`;
    state.data = cleanedSubmission;
    return state;
  } catch (error) {
    state.connection.close();
    throw error;
  }
});

upsert('WCSPROGRAMS_KoboNrgtNrgtanswer', 'AnswerId', {
  DatasetUuidId: dataValue('datasetId'),
  AnswerId: dataValue('_id'),
  Landscape: dataValue('landscape'),
  GovGroup: dataValue('gov_group'),
  Jurisdiction: dataValue('jurisdiction'),
  Objective: dataValue('objective'),
  Members: dataValue('members'),
  Women: dataValue('women'),
  LastUpdate: new Date().toISOString(), 
});

upsert('WCSPROGRAMS_KoboNrgtNrgtanswergs', 'AnswerId', {
  DatasetUuidId: dataValue('datasetId'), 
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
  LastUpdate: new Date().toISOString(), 
});

upsert('WCSPROGRAMS_KoboData', 'DatasetUuidId', {
  //AnswerId: dataValue('_id'),
  DatasetName: dataValue('formName'),
  DatasetOwner: dataValue('formOwner'),
  DatasetUuid: dataValue('datasetId'),
  DatasetYear: new Date().getFullYear(),
  LastSubmissionTime: dataValue('_submission_time'),
  LastCheckedTime: dataValue('_submission_time'),
  LastUpdateTime: new Date().toISOString(),
  KoboManaged: true,
  Tags: dataValue('_tags'),
});

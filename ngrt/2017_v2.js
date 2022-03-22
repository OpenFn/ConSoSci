fn(state => {
  try {
    const { body, formName, instance } = state.data;
    const { _submission_time, _id, _xform_id_string, group_scores } = body;
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

    state.landscapeMap = {
      tns: 'ndoki',
      mamabay: 'makira',
      mtkb: 'kahuzi',
      lactele: 'lac_tele',
    };

    cleanedSubmission.durableUUID = `${_submission_time}-${_xform_id_string}-${_id}`;
    cleanedSubmission.datasetId = `${formName}-${_xform_id_string}`;
    cleanedSubmission.instance = instance;
    cleanedSubmission.group_scores = group_scores;
    
    state.data = cleanedSubmission;

    return state;
  } catch (error) {
    state.connection.close();
    throw error;
  }
});

console.log("log group_scores11");


// test
upsertMany(
  'WCSPROGRAMS_KoboNrgtNrgtanswergs', 
  'AnswerId', 
  state => state.data.group_scores.map(x => ({
      AnswerId: state.data._id,
      Id: state.data._id,
      DatasetUuidId: `${state.data.formName}-${state.data.body._xform_id_string}`,
      Accountability: x["group_scores/accountability"],
      Code: x["group_scores/code"],
      Diversity: x["group_scores/diversity"],
      EnactDecision: x["group_scores/enact_decision"],
      Fairness: x["group_scores/fairness"],
      Gender: x["group_scores/gender"],
      HeldAccountable: x["group_scores/held_accountable"],
      InstutionalFramework: x["group_scores/institutional_framework"],
      KnowledgeSkills: x["group_scores/knowledge_skills"],
      Legitimacy: x["group_scores/legitimacy"],
      Member: x["group_scores/member"],
      Motivation: x["group_scores/motivation"],
      Participation: x["group_scores/participation"],
      Resources: x["group_scores/resources"],
      SurveyDate: x["group_scores/survey_date"],
      Transparency: x["group_scores/transparency"],
      LastUpdate: new Date().toISOString()
    }))
);


/*
upsert('WCSPROGRAMS_KoboNrgtNrgtanswer', 'AnswerId', {
  DatasetUuidId: dataValue('datasetId'),
  AnswerId: dataValue('_id'),
  Landscape: state => {
    var landscape = dataValue('landscape')(state);
    return state.landscapeMap[landscape] || landscape;
  },
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
  SurveyDate: dataValue('today'),
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
  DatasetName: state.data.formName,
  DatasetOwner: state.data.formOwner,
  DatasetUuidId: dataValue('datasetId'),
  Citation: dataValue('instance'),
  DatasetYear: new Date().getFullYear(),
  LastSubmissionTime: dataValue('_submission_time'),
  LastCheckedTime: dataValue('_submission_time'),
  LastUpdateTime: new Date().toISOString(),
  KoboManaged: true,
  Tags: dataValue('_tags'),
});
*/


/*
 upsert('WCSPROGRAMS_KoboNrgtNrgtanswergs', 'AnswerId', {
    AnswerId: state.data._id,
    SurveyDate: dataValue('group_scores/survey_date'),
    Code: dataValue('group_scores/code'),
    Gender: dataValue('group_scores/gender'),
    Member: dataValue('group_scores/member'),
    Legitimacy: dataValue('group_scores/legitimacy'),
    Accountability: dataValue('group_scores/accountability'),
    Transparency: dataValue('group_scores/transparency'),
    Participation: dataValue('group_scores/participation'),
    Fairness: dataValue('group_scores/fairness'),
    KnowledgeSkills: dataValue('group_scores/knowledge_skills'),
    Resources: dataValue('group_scores/resources'),
    InstutionalFramework: dataValue('group_scores/institutional_framework'),
    Motivation: dataValue('group_scores/motivation'),
    EnactDecision: dataValue('group_scores/enact_decision'),
    HeldAccountable: dataValue('group_scores/held_accountable'),
    Diversity: dataValue('group_scores/diversity'),
    LastUpdate: new Date().toISOString(),
  })
*/
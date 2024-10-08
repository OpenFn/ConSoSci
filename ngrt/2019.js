// NOTE: This data cleaning operation returns state, modified as needed.
alterState(state => {
  try {
    const { body, formName, instance } = state.data;
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

    state.landscapeMap = {
      tns: 'ndoki',
      mamabay: 'makira',
      mtkb: 'kahuzi',
    };

    cleanedSubmission.durableUUID = `${_submission_time}-${_xform_id_string}-${_id}`;
    cleanedSubmission.datasetId = `${formName}-${_xform_id_string}`;
    cleanedSubmission.instance = instance;
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
  Landscape: state => {
    var landscape = dataValue('landscape')(state);
    return state.landscapeMap[landscape] || landscape;
  },
  Surveyor: dataValue('surveyor'),
  GovGroup: dataValue('gov_group'),
  SurveyDate: state => {
    const date = state.data.today || state.data._submission_time
    if (Number(date.split('-')[0]) >= 2014 ) {
      return date
    } 
    return 2019 
    // If the time/date is not properly set on the device used to collect the data, the year of "today" will be 2000. 
    // With the code above we are replacing any 2000 by 2019:
  },
  LastUpdate: new Date().toISOString(),
});
upsert('WCSPROGRAMS_KoboNrgtNrgtanswergs', 'AnswerId', {
  // upsert('WCSPROGRAMS_KoboNrgtNrgtanswergs', 'DatasetUuidId', {
  DatasetUuidId: dataValue('datasetId'),
  Id: dataValue('_id'),
  AnswerId: dataValue('_id'),
  SurveyDate: state => {
    const date = state.data.today || state.data._submission_time
    if (Number(date.split('-')[0]) >= 2014 ) {
      return date
    } 
    return 2019
    // If the time/date is not properly set on the device used to collect the data, the year of "today" will be 2000. 
    // With the code above we are replacing any 2000 by 2019:
  },
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
  Power: dataValue('power'),
  LastUpdate: new Date().toISOString(),
});

upsert('WCSPROGRAMS_KoboData', 'DatasetUuidId', {
  //AnswerId: dataValue('_id'),
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

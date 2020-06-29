upsert('WCSPROGRAMS_KoboNrgtNrgtanswer', 'DatasetUuidId', {
  DatasetUuidId: dataValue('_uuid'),
  AnswerId: dataValue('body._id'),
  Landscape: dataValue('body.landscape'),
  GovGroup: dataValue('body.gov_group'),
  Jurisdiction: dataValue('body.jurisdiction'),
  Objective: dataValue('body.objective'),
  Members: dataValue('body.members'),
  Women: dataValue('body.women'),
  LastUpdate: dataValue('body._submission_time')
  // more: dataValue('moreFields'),
});

upsert('WCSPROGRAMS_KoboNrgtNrgtanswergs', 'DatasetUuidId', {
  DatasetUuidId: dataValue('_uuid'),
  AnswerId:  dataValue('body._id'),
  SurveyDate:  dataValue('body._submission_time'),
  Code:  dataValue('body.code'),
  Gender:  dataValue('body.gender'),
  Member:  dataValue('body.member'),
  Legitimacy:  dataValue('body.legitimacy'),
  Accountability:  dataValue('body.accountability'),
  Transparency:  dataValue('body.transparency'),
  Participation:  dataValue('body.participation'),
  Fairness:  dataValue('body.fairness'),
  KnowledgeSkills:  dataValue('body.knowledge_skills'),
  Resources:  dataValue('body.resources'),
  InstutionalFramework:  dataValue('body.institutional_framework'),
  Motivation:  dataValue('body.motivation'),
  EnactDecision:  dataValue('body.enact_decision'),
  HeldAccountable:  dataValue('body.held_accountable'),
  Diversity:  dataValue('body.diversity'),
  //LastUpdate: dataValue('body._submission_time')
  // more: dataValue('moreFields'),
});

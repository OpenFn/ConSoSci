upsert('WCSPROGRAMS_KoboNrgtNrgtanswer', 'DatasetUuidId', {
  DatasetUuidId: dataValue('_uuid'),
  AmswerId: dataValue('body._id'),
  Landscape: dataValue('body.landscape'),
  Surveyor: dataValue('body.surveyor'),
  GovGroup: dataValue('body.gov_group'),
  // more: dataValue('moreFields'),
});

upsert('WCSPROGRAMS_KoboNrgtNrgtanswergs', 'DatasetUuidId', {
  DatasetUuidId: dataValue('_uuid'),
  AnswerId: dataValue('body._id'),
  Gender: dataValue('body.gender'),
  Member: dataValue('body.member'),
  Objective: dataValue('body.objective'),
  Legitimacy: dataValue('body.legitimacy'),
  Accountability: dataValue('body.accountability'),
  Transparency: dataValue('body.transparency'),
  Participation: dataValue('body.participation'),
  Fairness: dataValue('body.fairness'),
  Diversity: dataValue('body.diversity'),
  KnowledgeSkills: dataValue('body.knowledge_skills'),
  Resources: dataValue('body.resources'),
  InstutionalFramework: dataValue('body.framework'),
  Motivation: dataValue('body.motivation'),
  // more: dataValue('moreFields'),
});

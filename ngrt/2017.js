upsert('WCSPROGRAMS_KoboNrgtNrgtanswer', 'DatasetUuidId', {
  DatasetUuidId: dataValue('_uuid'),
  AnswerId: dataValue('body._id'),
  Landscape: dataValue('body.landscape'),
  GovGroup: dataValue('body.gov_group'),
  Jurisdiction: dataValue('body.jurisdiction'),
  Objective: dataValue('body.objective'),
  Members: dataValue('body.members'),
  Women: dataValue('body.women'),
  // more: dataValue('moreFields'),
});

// Refactor this for scale so it doesn't perform a no-op delete 9/10 times.
// Maybe check result of previous op, then only delete if it was an update.
sql({
  query: `DELETE FROM WCSPROGRAMS_KoboNgrtNgrtanswergs where AnswerId = ${state.data.AnswerId}`,
});

insertMany('WCSPROGRAMS_KoboNgrtNgrtanswergs', state => {
  state.data.ngrtAns.map(member => {
    return {
      AnswerId: state.data._id,
      SurveyDate: state.data.body.survey_date,
      Code: member.code,
      Gender: member.gender,
      Member: member.member,
      Legitimacy: member.legitimacy,
      Accountability: member.accountability,
      Transparency: member.transparency,
      Participation: member.participation,
      Fairness: member.fairness,
      KnowledgeSkills: member.knowledge_skills,
      Resources: member.resources,
      InstutionalFramework: member.institutional_framework,
      Motivation: member.motivation,
      EnactDecision: member.enact_decision,
      HeldAccountable: member.held_accountable,
      Diversity: member.diversity,
    };
  });
});

upsert('WCSPROGRAMS_KoboNgrtNgrtanswer', 'DatasetUuidId', {
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
    };
  });
});

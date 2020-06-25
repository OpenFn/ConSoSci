// Built for Microsoft SQL Azure (RTM) - 12.0.2000.8
upsert('WCSPROGRAMS_KoboBnsAnswer', 'DatasetUuidId', {
  DatasetUuidId: dataValue('body._uuid'),
  AnswerId: dataValue('body._id'),
  SurveyDate: dataValue('body.today'),
  Landscape: dataValue('body.landscape'),
  Surveyor: dataValue('body.surveyor'),
  Participant: dataValue('body.participant'),
  Arrival: dataValue('body.arrival'),
  District: dataValue('body.district'),
  Village: dataValue('body.village'),
  HhId: dataValue('body.hh_id'),
  BenefProject: dataValue('body.benef_project'),
  HhTypeControl: dataValue('body.hh_type'),
  HhTypeOrgBenef: dataValue('body.hh_type'),
  HhTypeOtherBenef: dataValue('body.hh_type'),
  ExplainProject: dataValue('body.explain_project'),
  KnowPa: dataValue('body.know_PA'),
  BenefPa: dataValue('body.benef_PA'),
  ExplainBenefPa: dataValue('body.explain_benef_PA'),
  Livelihood1: dataValue('body.livelihoods/l1'),
  Livelihood2: dataValue('body.livelihoods/l2'),
  Livelihood3: dataValue('body.livelihoods/l3'),
  Livelihood4: dataValue('body.livelihoods/l4'),
  BnsPlus: dataValue('body.bns_plus'),
  // more: dataValue('moreFields'),
});

// Refactor this for scale so it doesn't perform a no-op delete 9/10 times.
// Maybe check result of previous op, then only delete if it was an update.
sql({
  query: `DELETE FROM WCSPROGRAMS_KoboBnsAnswerhhmembers where AnswerId = ${state.data.AnswerId}`,
});

insertMany('WCSPROGRAMS_KoboBnsAnswerhhmembers', state => {
  state.data.hhMembers.map(member => {
    return {
      AnswerId: state.data.body._id,
      Name: member.name,
      Head: gender_head ? 'yes' : 'no',
      Gender: gender_head,
      Ethnicity: ethnicity_head,
      Birth: birth_head
    };
  });
});

upsert('WCSPROGRAMS_KoboBnsAnswernr', 'DatasetUuidId', {
  DatasetUuidId: dataValue('_uuid'),
  // other: dataValue('otherStuff'),
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
      AnswerId: state.data._uuid,
      Name: member.name,
    };
  });
});

upsert('WCSPROGRAMS_KoboBnsAnswergps', 'DatasetUuidId', {
  DatasetUuidId: dataValue('_uuid'),
  // other: dataValue('otherStuff'),
  // more: dataValue('moreFields'),
});

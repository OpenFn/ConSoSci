// Built for Microsoft SQL Azure (RTM) - 12.0.2000.8
upsert('WCSPROGRAMS_KoboBnsAnswer', 'DatasetUuidId', {
  DatasetUuidId: dataValue('_uuid'),
  // other: dataValue('otherStuff'),
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
      AnswerId: state.data._uuid,
      Name: member.name,
    };
  });
});

upsert('WCSPROGRAMS_KoboBnsAnswernr', 'DatasetUuidId', {
  DatasetUuidId: dataValue('_uuid'),
  // other: dataValue('otherStuff'),
  // more: dataValue('moreFields'),
  SurveyDate: dataValue('today'),
  Landscape: dataValue('landscape'),
  Surveyor: dataValue('surveyor'),
  Participant: dataValue('participant'),
  Arrival: dataValue('arrival'),
  District: dataValue('district'),
  Village: dataValue('village'),
  HhId: dataValue('hh_id'),
  BenefProject: dataValue('benef_project'),
  HhTypeControl: dataValue('hh_type'),
  HhTypeOrgBenef: dataValue('hh_type'),
  HhTypeOtherBenef: dataValue('hh_type'),
  ExplainProject: dataValue('explain_project'),
  KnowPa: dataValue('know_PA'),
  BenefPa: dataValue('benef_PA'),
  ExplainBenefPa: dataValue('explain_benef_PA'),
  Livelihood1: dataValue('l1'),
  Livelihood2: dataValue('l2'),
  Livelihood3: dataValue('l3'),
  Livelihood4: dataValue('l4'),
  BnsPlus: dataValue('bns_plus'),
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

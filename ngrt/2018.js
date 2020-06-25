upsert('WCSPROGRAMS_KoboNgrtNgrtanswer', 'DatasetUuidId', {
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
  state.data.hhMembers.map(member => {
    return {
      AnswerId: state.data._uuid,
      Name: member.name,
    };
  });
});

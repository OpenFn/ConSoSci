// Built for Microsoft SQL Azure (RTM) - 12.0.2000.8
upsert('WCSPROGRAMS_KoboBnsAnswer', 'DatasetUuidId', {
  DatasetUuidId: dataValue('_uuid'),
});

// Refactor this for scale so it doesn't perform a no-op delete 9/10 times.
// Maybe check result of previous op, then only delete if it was an update.
sql({
  query: `DELETE FROM WCSPROGRAMS_KoboBnsAnswerhhmembers where AnswerId = ${state.data.AnswerId}`
});

insertMany('WCSPROGRAMS_KoboBnsAnswerhhmembers', state => {
  state.data.hhMembers.map(member => {
    return {
      AnswerId: state.data._uuid,
      Name: member.name,
    };
  });
});
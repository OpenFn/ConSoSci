getValues(
  '1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY', //googlesheet id
  'wcs-bns-test!A:N' //range of columns in sheet
);

fn(state => {
  const { activeForms, archivedForms, data } = state;
  const [headers, ...sheetsData] = data.values;
  const sheetsUids = sheetsData.map(row => row[0]);
  console.log('Ignoring headers', headers);

  state.formsToCreate = activeForms.filter(
    form => !sheetsUids.includes(form.uid)
  );

  state.formsToUpdate = archivedForms
    .filter(form => sheetsUids.includes(form.uid))
    .map(form => {
      const rowIndex = sheetsData.findIndex(row => {
        return row[0] === form.uid;
      });
      if (rowIndex !== -1) {
        return { ...form, rowIndex };
      }
      console.log(form.uid, 'Could not be found in google sheet');
    });

  return state;
});

fn(state => {
  const { data, references, response, ...remainingState } = state;

  return remainingState;
});

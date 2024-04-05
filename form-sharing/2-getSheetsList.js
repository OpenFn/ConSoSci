getValues(
  '1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY',
  'sheetsList of kobo forms!A:K'
);
fn(state => {
  const koboFormsData = state.references[1];
  const googleSheetsData = state.data.values.map(row => row[0]);

  state.data = koboFormsData.filter(
    form => !googleSheetsData.includes(form.uid)
  );

  return state;
});

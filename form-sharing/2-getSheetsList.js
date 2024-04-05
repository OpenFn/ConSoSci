getValues(
  '1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY',
  'sheetsList of kobo forms!A:K'
);
fn(state => {
  const koboFormsData = state.koboForms;
  const googleSheetsData = state.data.values.map(row => row[0]);

  state.filteredKoboFormsData = koboFormsData.filter(
    form => !googleSheetsData.includes(form.uid)
  );

  return state;
});

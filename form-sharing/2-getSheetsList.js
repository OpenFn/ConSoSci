getValues(
  "1s7K3kxzm5AlpwiALattyc7D9_aIyqWmo2ubcQIUlqlY", //googlesheet id
  "sheetsList of kobo forms!A:L" //range of columns in sheet
);

fn((state) => {
  const { koboForms, data } = state;
  const [headers, ...sheetsData] = data.values;
  const sheetsUids = sheetsData.map((row) => row[0]);
  console.log("Ignoring headers", headers);

  state.filteredKoboFormsData = koboForms.filter(
    (form) => !sheetsUids.includes(form.uid)
  );

  return state;
});

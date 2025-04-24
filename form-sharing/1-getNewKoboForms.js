//Check Kobo account for forms with these matching keywords
getForms({}, state => {
  //ALL KEYWORDS:
  //const keywords = ['price', 'prix', 'bns', 'nrgt', 'grm', 'feedback'];

  //BNS KEYWORDS ONLY
  const keywords = ['price', 'prix', 'bns', 'nrgt'];

  const checkForKeyWords = name => {
    return keywords.some(keyword => name.toLowerCase().includes(keyword));
  };

  state.activeForms = state.data.results
    .filter(form => checkForKeyWords(form.name))
    .filter(form => form.deployment__active);

  state.archivedForms = state.data.results
    .filter(form => checkForKeyWords(form.name))
    .filter(form => !form.deployment__active);
    
  console.log('# of activeForms ::', state.activeForms ? state.activeForms.length : null );
  console.log('# of archivedForms ::', state.archivedForms ? state.archivedForms.length : null );

  state.data = {};
  state.references = [];
  return state;
});

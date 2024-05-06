//Check Kobo account for forms with these matching keywords
getForms({}, state => {
  //ALL KEYWORDS: 
  //const keywords = ['price', 'prix', 'bns', 'nrgt', 'grm', 'feedback'];
  
  //BNS KEYWORDS ONLY
  const keywords = ['price', 'prix', 'bns', 'nrgt'];

  const checkForKeyWords = name => {
    return keywords.some(keyword => name.toLowerCase().includes(keyword));
  };

  state.koboForms = state.data.results.filter(form => checkForKeyWords(form.name));
  // console.log('data::', state.data); 
  // console.log('results::', state.data.results); 
  return state;
});
fn(state => {   //Mapping table to map Kobo field CHOICES to Asana custom_fields_choices gids
  const formatMapping = {
  'Grade_Grade 0': '1204127412235066',
  'Grade_Grade 1': '1204127412235067',
  'Grade_Grade 2': '1204127412235068',
  'Grade_Grade 3': '1204127412235069',
  'Grade_Grade 4': '1204127412235070',
  'Grade_Grade 5': '1204127412235071',
  GrievanceOrSuggestion_Grievance: '1203711963400189',
  GrievanceOrSuggestion_Suggestion: '1203711963400190',
  GrievanceOrSuggestion_Doubts: '1203977213874277',
  GrievanceOrSuggestion_OtherType: '1203977213874278',
  ReportFormat_InPerson: '1202330347493011',
  ReportFormat_VoiceCall: '1202330347494027',
  ReportFormat_TextMessage: '1202330347498273',
  ReportFormat_Email: '1202330347502485',
  ReportFormat_PostalLetter: '1202330347503544',
  ReportFormat_Other: '1203830536105154',
  ReportFormat_SuggestionBox: '1202330347499327',
  ReportFormat_Hotline: '1202330347501419',
  GrievanceAgainst_Wcs: '1202330466059593',
  GrievanceAgainst_GovernmentPartner: '1202330466059594',
  GrievanceAgainst_PrivateSectorPartner: '1202330466059595',
  GrievanceAgainst_CivilSocietyPartner: '1202330466059596',
  GrievanceAgainst_NotWcsAndNotAWcsPartner: '1202330466059597',
  ConfidentialitySensitivity_Yes: '1202330821410493',
  ConfidentialitySensitivity_No: '1202330821410494'
};

  return { ...state, formatMapping };
});


// console.log("projectid:");
// console.log(dataValue('projectid')(state));
fn(state =>
upsertTask(
    dataValue('projectid'), //to dynamically map project id, assuming it's defined in the Get job. This projectID must be originally added to the Job that fetches data from Kobo.
  //'1202329899911590', //hardcoded project id
  
  {
    externalId: "name", // Asana external Id field name (e.g., 'gid')
    data: {
      name: state =>
        //`Grievance ID: ${dataValue('body.GrievanceID')(state)} (KoboID:${dataValue('body._id')(state)})`,
        `${dataValue('body.start')(state)}`,
      projects: state => [`${dataValue('projectid')(state)}`], //to dynamically map project id, assuming it's defined in the Get job
      //projects: ['1201382240883590'], //hardcoded Asana project id for Template Project
      notes: dataValue('body.DescriptionGrievance'),
      custom_fields: {
       // Fields  belonging to open-ended questions (qxns that accept free text input)
'1204127413705636': dataValue('body.start'),
'1204127467188879': dataValue('body.Country'),
'1204127467188881': dataValue('body.Region'),
'1204127467188883': dataValue('body.District'),
'1204127413724358': dataValue('body.Village'),
'1204127413705632': dataValue('body.StaffName'),
'1204127413705640': dataValue('body.StaffEmail'),
'1204127413705644': dataValue('body.DateGrievanceEntered'),
'1204127413705650': dataValue('body.ReporterFullName'),
'1204127413715692': dataValue('body.ReporterContactInformation'),
'1204127413715699': dataValue('body.AuthorityGrievanceReporter'),
'1204127413715704': dataValue('body.WhereGrievance'),
'1204127413715709': dataValue('body.WhenGrievance'),
'1204127413715713': dataValue('body.PartiesInvolvedGrievance'),
'1204127413715717': dataValue('body.LocalAuthoritiesContacted'),
'1204127413724346': dataValue('body.HarmSuffered'),
'1204127413724350': dataValue('body.ReliefRequested'),
'1204127413724354': dataValue('body.OnlineFolder'),

// Fields  belonging to questions with dropdown or multiple choice
'1204127412235065': state => state.formatMapping["Grade_" + dataValue('body.Grade')(state)],
'1203711963400188': state => state.formatMapping["GrievanceOrSuggestion_" + dataValue('body.GrievanceOrSuggestion')(state)],
'1202330347491974': state => state.formatMapping["ReportFormat_" + dataValue('body.ReportFormat')(state)],
'1202330466059592': state => state.formatMapping["GrievanceAgainst_" + dataValue('body.GrievanceAgainst')(state)],
'1202330821410492': state => state.formatMapping["ConfidentialitySensitivity_" + dataValue('body.ConfidentialitySensitivity')(state)],
    },
  },
  },
  state => {
    console.log(JSON.stringify(state.data, null, 2)); //log data
    return state;
  }
)(state)
.catch(e => {
  console.log('Asana says', JSON.stringify(e.response.data, null, 2));
  throw e;
})
)


fn(state => {   //Mapping table to map Kobo field CHOICES to Asana custom_fields_choices gids
  const formatMapping = {
  SubmissionType_Grievance: '1202329899911646',
  SubmissionType_Suggestion: '1202329899911647',
  SubmissionType_Request: '1202329899911648',
  SubmissionType_Feedback: '1202329899911649',
  ReportFormat_InPerson: '1202330347493011',
  ReportFormat_VoiceCall: '1202330347494027',
  ReportFormat_TextMessage: '1202330347498273',
  ReportFormat_Email: '1202330347502485',
  ReportFormat_PostalLetter: '1202330347503544',
  ReportFormat_Other: '1203830536105154',
  ReportFormat_SuggestionBox: '1202330347499327',
  ReportFormat_Hotline: '1202330347501419',
  SubmissionContext_individual: '1202330732062943',
  SubmissionContext_group: '1202330732067344',
  SubmissionContext_passive_observation: '1202330732068565',
  Gender_male: '1202330737362427',
  Gender_female: '1202330737362428',
  Gender_mixed_gender: '1202330737362429',
  Gender_unknown_gender: '1202330737362430',
  IndigenousPeople_Yes_ips: '1202330755980982',
  IndigenousPeople_No_ips: '1202330755984093',
  IndigenousPeople_unknown_ips: '1202330755985164',
  'Age_<18': '1202330714895607',
  'Age_19-35': '1202330714895608',
  'Age_36-50': '1202330714895609',
  'Age_>50': '1202330714895610',
  Age_mixed_age: '1202330714895611',
  Age_unknown_age: '1202330714895612',
  GrievanceAgainst_Wcs: '1202330466059593',
  GrievanceAgainst_GovernmentPartner: '1202330466059594',
  GrievanceAgainst_PrivateSectorPartner: '1202330466059595',
  GrievanceAgainst_CivilSocietyPartner: '1202330466059596',
  GrievanceAgainst_NotWcsAndNotAWcsPartner: '1202330466059597',
  DatePrecision_Yes: '1202330815421248',
  DatePrecision_No: '1202330815421249',
  ConfidentialitySensitivity_Yes: '1202330821410493',
  ConfidentialitySensitivity_No: '1202330821410494',
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
        `${dataValue('body.CaseID')(state)}`,
      projects: state => [`${dataValue('projectid')(state)}`], //to dynamically map project id, assuming it's defined in the Get job
      //projects: ['1201382240883590'], //hardcoded Asana project id for Template Project
      notes: dataValue('body.Description'),
      custom_fields: {
        // Fields  belonging to open-ended questions (qxns that accept free text input)
       '1203711959959076': dataValue('body.StaffName'),
'1202329899911595': dataValue('body.CaseID'),
'1203712049265363': dataValue('body.StaffEmail'),
'1204909111988165': dataValue('body.DepositDate'),
'1202329899911605': dataValue('body.ReporterName'),
'1203712060006636': dataValue('body.ReporterContactInformation'),
'1203712112458773': dataValue('body.AuthorityGrievanceReporter'),
'1203712118889498': dataValue('body.WhereGrievance'),
'1202329899911623': dataValue('body.GrievanceDate'),
'1203712125372990': dataValue('body.PartiesInvolvedGrievance'),
'1203712150593482': dataValue('body.HarmSuffered'),
'1203712149463009': dataValue('body.ReliefRequested'),
'1202329899911635': dataValue('body.OnlineFolder'),
'1204909114362354': dataValue('body.SuggestionBoxId'),
'1204909114362363': dataValue('body.SuggestionBoxGps'),
'1204909114362367': dataValue('body.BoxCollectionDate'),
'1202329899911599': dataValue('body.SubmissionDate'),
'1204909114384912': dataValue('body.Location'),
'1203712145400954': dataValue('body.LocalAuthoritiesContacted'),
// Fields  belonging to questions with dropdown or multiple choice
'1202593715272940': state => state.formatMapping["Grade_" + dataValue('body.Grade')(state)],
'1202329899911645': state => state.formatMapping["SubmissionType_" + dataValue('body.SubmissionType')(state)],
'1202330347491974': state => state.formatMapping["ReportFormat_" + dataValue('body.ReportFormat')(state)],
'1202330732061901': state => state.formatMapping["SubmissionContext_" + dataValue('body.SubmissionContext')(state)],
'1202330737362426': state => state.formatMapping["Gender_" + dataValue('body.Gender')(state)],
'1202330755979944': state => state.formatMapping["IndigenousPeople_" + dataValue('body.IndigenousPeople')(state)],
'1202330714895606': state => state.formatMapping["Age_" + dataValue('body.Age')(state)],
'1202330466059592': state => state.formatMapping["GrievanceAgainst_" + dataValue('body.GrievanceAgainst')(state)],
'1202330815421247': state => state.formatMapping["DatePrecision_" + dataValue('body.DatePrecision')(state)],
'1202330821410492': state => state.formatMapping["ConfidentialitySensitivity_" + dataValue('body.ConfidentialitySensitivity')(state)],
'1204269608862901': state => state.formatMapping["Classification_" + dataValue('body.Classification')(state)],
      }
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


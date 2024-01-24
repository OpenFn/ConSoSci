fn(state => {   //Mapping table to map Kobo field CHOICES to Asana custom_fields_choices gids
  const formatMapping = {
  GrievanceOrSuggestion_Grievance: '1203711963400189',
  GrievanceOrSuggestion_Suggestion: '1203711963400190',
  GrievanceOrSuggestion_Doubts: '1203977213874277',
  GrievanceOrSuggestion_OtherType: '1203977213874278',
  'CategoryGRM_Category 1': '1204346774994409',
  'CategoryGRM_Category 2': '1204346774994410',
  'CategoryGRM_Category 3': '1204346774994411',
  'CategoryGRM_Category 4': '1204346774994412',
  'CategoryGRM_Category 5': '1204346774994413',
  ReportFormat_InPerson: '1202330347493011',
  ReportFormat_VoiceCall: '1202330347494027',
  ReportFormat_TextMessage: '1202330347498273',
  ReportFormat_Email: '1202330347502485',
  ReportFormat_PostalLetter: '1202330347503544',
  ReportFormat_Other: '1203830536105154',
  ReportFormat_SuggestionBox: '1202330347499327',
  ReportFormat_Hotline: '1202330347501419',
  'GrievanceStatus _BeingReviewed': '1192850232576003',
  'GrievanceStatus _NotAssigned': '1187328718760775',
  'GrievanceStatus _Dismissed': '1187674280676653',
  'GrievanceStatus _OnHold': '1187328718760778',
  'GrievanceStatus _BeingInvestigated': '1187328718760776',
  'GrievanceStatus _Resolved': '1187328718760777',
  'GrievanceStatus _RemediationBeingMonitored': '1192772373678248',
  RegionalProgram_Global: '1203712073216294',
  RegionalProgram_EastAfricaAndMadagascar: '1203712073216295',
  Country_AllCountryPrograms: '1203712064585506',
  Country_Mozambique: '1203712075492389',
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
      notes: dataValue('body.Description'),
      custom_fields: {
       // Fields  belonging to open-ended questions (qxns that accept free text input)
'1203711959959076': dataValue('body.StaffName'),
'1201884379104074': dataValue('body.GrievanceId'),
'1203712049265363': dataValue('body.StaffEmail'),
'1203711932409666': dataValue('body.DateGrievanceEntered'),
'1206195626473140': dataValue('body.ReportLocation'),
'1206195626473142': dataValue('body.ReporterLocation'),
'1203712064304976': dataValue('body.ReporterFullName'),
'1203712060006636': dataValue('body.ReporterContactInformation'),
'1203712112458773': dataValue('body.AuthorityGrievanceReporter'),
'1203712118889498': dataValue('body.WhereGrievance'),
'1204346774966584': dataValue('body.WhenGrievance'),
'1203712125372990': dataValue('body.PartiesInvolvedGrievance'),
'1203712145400954': dataValue('body.LocalAuthoritiesContacted'),
'1203712150593482': dataValue('body.HarmSuffered'),
'1203712149463009': dataValue('body.ReliefRequested'),
'1203712121887316': dataValue('body.ActionsTaken'),
'1203711923560809': dataValue('body.OneDriveFolder'),

// Fields  belonging to questions with dropdown or multiple choice
'1203711963400188': state => state.formatMapping["GrievanceOrSuggestion_" + dataValue('body.GrievanceOrSuggestion')(state)],
'1204346774986645': state => state.formatMapping["CategoryGRM_" + dataValue('body.CategoryGRM')(state)],
'1202330347491974': state => state.formatMapping["ReportFormat_" + dataValue('body.ReportFormat')(state)],
'1204346774986620': state => state.formatMapping["ReportLocation_" + dataValue('body.ReportLocation')(state)],
'1187328718760774': state => state.formatMapping["GrievanceStatus _" + dataValue('body.GrievanceStatus ')(state)],
'1204346774986628': state => state.formatMapping["ReporterLocation_" + dataValue('body.ReporterLocation')(state)],
'1203712073216293': state => state.formatMapping["RegionalProgram_" + dataValue('body.RegionalProgram')(state)],
'1203712064585505': state => state.formatMapping["Country_" + dataValue('body.Country')(state)],
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


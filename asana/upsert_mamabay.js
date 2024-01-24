fn(state => {   //Mapping table to map Kobo field CHOICES to Asana custom_fields_choices gids
  const formatMapping = {
  'CategoryGRM_Category 1': '1204346774994409',
  'CategoryGRM_Category 2': '1204346774994410',
  'CategoryGRM_Category 3': '1204346774994411',
  'CategoryGRM_Category 4': '1204346774994412',
  'CategoryGRM_Category 5': '1204346774994413',
  'CategoryGRM_Category 0': '1205581613551149',
  'Classification_Safeguards & Human Rights': '1204269608862902',
  'Classification_Project Implementation & Natural Resources': '1204269608862903',
  'Classification_Human-Wildlife Conflict': '1204269608862904',
  'Classification_Management ': '1204269617420857',
  'Classification_Illegal Activity': '1204269617420858',
  'Classification_Positive Feedback, Suggestion': '1204269617420859',
  'Classification_Request or Question': '1204269617420968',
  Classification_Other: '1204269617420860',
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
  ReportLocation_Sector1: '1205812185361966',
  ReportLocation_Sector2: '1205812185361967',
  ReportLocation_Sector3: '1205812185361968',
  ReportLocation_Sector4: '1205812185361969',
  ReportLocation_Sector5: '1205812185361970',
  ReportLocation_Sector6: '1205812185361971',
  ReportLocation_Sector7: '1205812185361972',
  ReportLocation_Sector8: '1205812185361973',
  ReportLocation_Sector9: '1205812185361974',
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

upsertTask(
  dataValue('projectid'), //to dynamically map project id, assuming it's defined in the Get job. This projectID must be originally added to the Job that fetches data from Kobo.
  //'1201382240883590', //hardcoded project id

  {
    externalId: "name", // Asana external Id field name (e.g., 'gid')
    data: {
      name: state =>
        //`Grievance ID: ${dataValue('body.GrievanceID')(state)} (KoboID:${dataValue('body._id')(state)})`,
          `${dataValue('body.GrievanceId')(state)} (KoboID:${dataValue('body._id')(state)})`,
      projects: state => [`${dataValue('projectid')(state)}`], //to dynamically map project id, assuming it's defined in the Get job
      //projects: ['1201382240883590'], //hardcoded Asana project id for Template Project
      notes: dataValue('DescriptionGrievance'),
      custom_fields: {
          //This tells Asana what fields to update and how to locate them.
          
          //The statements below apply to Asana Fields that are for OPEN ENDED
          //i.e. They accept FREE TEXT INPUT from the Kobo Form
'1203711959959076': dataValue('body.StaffName'),
'1201884379104074': dataValue('body.GrievanceId'),
'1203712049265363': dataValue('body.StaffEmail'),
'1203711932409666': dataValue('body.DateGrievanceEntered'),
'1205812185585254': dataValue('body.ReporterLocation'),
'1202329899911605': dataValue('body.ReporterName'),
'1203712060006636': dataValue('body.ReporterContactInformation'),
'1203712112458773': dataValue('body.AuthorityGrievanceReporter'),
'1203712118889498': dataValue('body.WhereGrievance'),
'1202329899911623': dataValue('body.GrievanceDate'),
'1203712125372990': dataValue('body.PartiesInvolvedGrievance'),
'1203712145400954': dataValue('body.LocalAuthoritiesContacted'),
'1203712150593482': dataValue('body.HarmSuffered'),
'1203712149463009': dataValue('body.ReliefRequested'),
'1203712121887316': dataValue('body.ActionsTaken'),
'1202329899911635': dataValue('body.OnlineFolder'),
'1202329899911599': dataValue('body.SubmissionDate'),
          
          //The statements below apply to Asana Fields that have multiplechoice / DropDown options
          //i.e. They require that the user selects specific options from the Kobo Form dropdown list.
          // These are the questions that require the MAPPING TABLES at the top of this page.
          //The mapping key-value pairs are obtained using a console.log tht runs in the Fetch GID Job
         /* '0000000000000000': dataValue('body.WhereGrievance'), */ //Grievance Date field missing in Asana
'1204346774986645': state => state.formatMapping["CategoryGRM_" + dataValue('body.CategoryGRM')(state)],
'1204269608862901': state => state.formatMapping["Classification_" + dataValue('body.Classification')(state)],
'1203711963400188': state => state.formatMapping["GrievanceOrSuggestion_" + dataValue('body.GrievanceOrSuggestion')(state)],
'1202330347491974': state => state.formatMapping["ReportFormat_" + dataValue('body.ReportFormat')(state)],
'1205812185361965': state => state.formatMapping["ReportLocation_" + dataValue('body.ReportLocation')(state)],
'1202330466059592': state => state.formatMapping["GrievanceAgainst_" + dataValue('body.GrievanceAgainst')(state)],
'1202330821410492': state => state.formatMapping["ConfidentialitySensitivity_" + dataValue('body.ConfidentialitySensitivity')(state)],
      },
    },
  },
  state => {
    console.log(JSON.stringify(state.data, null, 2)); //log data
    return state;
  }
);

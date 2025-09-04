fn(state => {   //Mapping table to map Kobo field CHOICES to Asana custom_fields_choices gids
  const formatMapping = {

    SubmissionType_Grievance: '1208823831241793',
    SubmissionType_Suggestion: '1208823831314328',
    'SubmissionType_Test case': '1208823831314329',
    SubmissionType_Question: '1208823831314330',
    Classification_Boundary: '1207934444664901',
    Classification_Comment: '1207064126306000',
    'Classification_Human Resources': '1206208252500541',
    'Classification_HWC (Human-Wildlife Conflict)': '1204269608862904',
    'Classification_Illegal Activity': '1204269617420858',
    'Classification_Management ': '1204269617420857',
    'Classification_PI & NR (Project Implementation & Natural Resource Management)': '1204269608862903',
    'Classification_Positive Feedback': '1204269617420859',
    Classification_Question: '1207064126305999',
    'Classification_Request for assistance': '1204269617420968',
    'Classification_Safeguards & Human Rights': '1204269608862902',
    Classification_Suggestion: '1207064073157821',
    Classification_Other: '1204269617420860',
    'Classification_Not eligible': '1207724727681221',
    Country_Bolivia: '1208823831314340',
    Country_Brazil: '1208823831314341',
    Country_Colombia: '1208823831314342',
    Country_Ecuador: '1208823831314343',
    Country_Peru: '1208823831314344',
    Country_Indeterminado: '1208823831314345',
    Donor_AFD: '1207470695842883',
    Donor_BAF: '1207470914898964',
    Donor_BEF: '1207470928895774',
    Donor_EU: '1207470928895775',
    Donor_GEF: '1207470928895776',
    Donor_Hempel: '1207942941061344',
    Donor_INL: '1207470928895777',
    Donor_KFW: '1207942941061345',
    Donor_LLF: '1207470928895778',
    Donor_NOAA: '1207470928895779',
    Donor_MACP: '1207470928895780',
    'Donor_REDD+': '1207470928895781',
    Donor_USAID: '1207470928895782',
    'Donor_World Bank': '1207551210258645',
    WcsStaff_Yes: '1208823831341595',
    WcsStaff_No: '1208823831341596',
    ReportFormat_InPerson: '1202330347493011',
    ReportFormat_FocalPoint: '1207724960884497',
    ReportFormat_VoiceCall: '1202330347494027',
    ReportFormat_Hotline: '1202330347501419',
    ReportFormat_TextMessage: '1202330347498273',
    ReportFormat_SuggestionBox: '1202330347499327',
    ReportFormat_Email: '1202330347502485',
    ReportFormat_Letter: '1202330347503544',
    ReportFormat_OnlineForm: '1207934414764297',
    ReportFormat_Other: '1203830536105154',
    ReportFormat_Prospecting: '1208419056473280',
    Anonymous_Yes: '1203977086782816',
    Anonymous_No: '1208270620741491',
    Gender_male: '1202330737362427',
    Gender_female: '1202330737362428',
    'Gender_mixed_gender': '1202330737362429',
    'Gender_unknown_gender': '1202330737362430',
    IndigenousPeople_Yes_ips: '1202330755980982',
    IndigenousPeople_No_ips: '1202330755984093',
    IndigenousPeople_unknown_ips: '1202330755985164',
    IndigenousPeople_mixed_group: '1207724962870243',
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
    ConfidentialitySensitivity_Yes: '1202330821410493',
    ConfidentialitySensitivity_No: '1202330821410494'
  };
  state.inputData = state.data;
  return { ...state, formatMapping };
});

// ✅ SEARCH TASKS IN ASANA:
// Update the custom_field GID (1201884379104074) to match the GrievanceID/CaseID field in your Asana workspace.
// Also update `GrievanceID` key if your input uses a different name like CaseID or GrievanceId.
request(`/workspaces/${state.configuration.workspaceGid}/tasks/search`, {
  query: {
    'custom_fields.1201884379104074.value': $.inputData?.body?.GrievanceID,
    resource_subtype: 'default_task'
  }
});

fn(state => {
  state.skipCreate = false;
  const tasks = state.data || [];
  // ✅ Ensure this matches the field name you used above. e.g., GrievanceID, CaseID
  const grievanceId = state.inputData?.body?.GrievanceID;

  if (tasks.length > 0) {
    console.log(`${tasks.length} task(s) found for GrievanceID ${grievanceId}. Skipping create.`);
    state.skipCreate = true;
  }
  return state;
});

fnIf(!$.skipCreate, state =>
  createTask({
    name: $.inputData.body.GrievanceID,
    projects: [$.inputData.projectid], //to dynamically map project id, assuming it's defined in the Get job
    notes: $.inputData.body.DescriptioGrievance,
    custom_fields: {
      // Fields  belonging to open-ended questions (qxns that accept free text input)
      '1203711959959076': $.inputData.body.StaffName,
      '1203712049265363': $.inputData.body.StaffEmail,
      '1208823831241787': $.inputData.body["Submission Date"],
      '1203712064304976': $.inputData.body.ReporterFullName,
      '1203712060006636': $.inputData.body.ReporterContactInformation,
      '1201884379104074': $.inputData.body.GrievanceId,
      '1203712112458773': $.inputData.body.AuthorityGrievanceReporter,
      '1202329899911619': $.inputData.body.WhereGrievance,
      '1208823831341587': $.inputData.body.WhenGrievance,
      '1203712125372990': $.inputData.body.PartiesInvolvedGrievance,
      '1203712145400954': $.inputData.body.LocalAuthoritiesContacted,
      '1208823831341575': $.inputData.body.DescriptioGrievance,
      '1203712150593482': $.inputData.body.HarmSuffered,
      '1203712149463009': $.inputData.body.ReliefRequested,
      '1208823831241782': $.inputData.body["OneDrive Folder"],
      '1203830309880883': $.inputData.body.WhatProject,
      '1208823831341580': $.inputData.body.Suggestion,

      // Fields  belonging to questions with dropdown or multiple choice
      '1187328718760774': state => state.formatMapping["GrievanceStatus _" + $.inputData.body.GrievanceStatus],
      '1208823831241792': state => state.formatMapping["SubmissionType_" + $.inputData.body.SubmissionType],
      '1202593715272940': state => state.formatMapping["Grade_" + $.inputData.body.Grade],
      '1204269608862901': state => state.formatMapping["Classification_" + $.inputData.body.Classification],
      '1208823831314339': state => state.formatMapping["Country_" + $.inputData.body.Country],
      '1207470695842882': state => state.formatMapping["Donor_" + $.inputData.body.Donor],
      '1208823831341594': state => state.formatMapping["WcsStaff_" + $.inputData.body.WcsStaff],
      '1202330347491974': state => state.formatMapping["ReportFormat_" + $.inputData.body.ReportFormat],
      '1203977086782815': state => state.formatMapping["Anonymous_" + $.inputData.body.Anonymous],
      '1202330737362426': state => state.formatMapping["Gender_" + $.inputData.body.Gender],
      '1202330755979944': state => state.formatMapping["IndigenousPeople_" + $.inputData.body.IndigenousPeople],
      '1202330714895606': state => state.formatMapping["Age_" + $.inputData.body.Age],
      '1202330466059592': state => state.formatMapping["GrievanceAgainst_" + $.inputData.body.GrievanceAgainst],
      '1202330821410492': state => state.formatMapping["ConfidentialitySensitivity_" + $.inputData.body.ConfidentialitySensitivity],
    }
  },
    state => {
      console.log(JSON.stringify(state.data, null, 2)); //log data
      return state;
    }
  )
)

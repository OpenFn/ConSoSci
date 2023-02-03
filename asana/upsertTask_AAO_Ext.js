fn(state => {   //Mapping table to map Kobo field CHOICES to Asana custom_fields_choices gids
  const formatMapping = {
     GrievanceOrSuggestion_Grievance: '1203150662724248',
     GrievanceOrSuggestion_Suggestion: '1203150662724249',
     Country_Bolivia: '1203150662724252',
     Country_Brazil: '1203150662724253',
     Country_Colombia: '1203150662724254',
     Country_Ecuador: '1203150662724255',
     Country_Peru: '1203150662724256',
     Country_Indeterminado: '1203150662724257',
     GrievanceAgainst_Wcs: '1202330466059593',
     GrievanceAgainst_GovernmentPartner: '1202330466059594',
     GrievanceAgainst_PrivateSectorPartner: '1202330466059595',
     GrievanceAgainst_CivilSocietyPartner: '1202330466059596',
     GrievanceAgainst_NotWcsAndNotAWcsPartner: '1202330466059597',
     ConfidentialitySensitivity_Yes: '1202330821410493',
     ConfidentialitySensitivity_No: '1202330821410494',
     'GrievanceStatus _BeingReviewed': '1192850232576003',
     'GrievanceStatus _NotAssigned': '1187328718760775',
     'GrievanceStatus _Dismissed': '1187674280676653',
     'GrievanceStatus _OnHold': '1187328718760778',
     'GrievanceStatus _BeingInvestigated': '1187328718760776',
     'GrievanceStatus _Resolved': '1187328718760777',
     'GrievanceStatus _RemediationBeingMonitored': '1192772373678248',
     GrievanceType_RelatedProjects: '1187634487549316',
     GrievanceType_LandTerritory: '1187634487549317',
     GrievanceType_WildlifeConflict: '1187634487549318',
     GrievanceType_OtherIssues: '1201884389902967',
     GrievanceType_Suggestion: '1201884389905045',
     GrievanceReportFormat_InPerson: '1192836094355011',
     GrievanceReportFormat_VoiceCall: '1192836094355012',
     GrievanceReportFormat_TextMessage: '1192847692374160',
     GrievanceReportFormat_Email: '1192847692376214',
     GrievanceReportFormat_PostalLetter: '1192847692376223',
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
'1203712064304976': dataValue('body.ReporterFullName'),
'1203712060006636': dataValue('body.ReporterContactInformation'),
'1203712112458773': dataValue('body.AuthorityGrievanceReporter'),
'1203830309880883': dataValue('body.WhatProject'),
'1203712118889498': dataValue('body.WhereGrievance'),
'1203712217077778': dataValue('body.WhenGrievance'),
'1203712125372990': dataValue('body.PartiesInvolvedGrievance'),
'1203712145400954': dataValue('body.LocalAuthoritiesContacted'),
'1203829521790026': dataValue('body.DescriptioGrievance'),
'1203712150593482': dataValue('body.HarmSuffered'),
'1203712149463009': dataValue('body.ReliefRequested'),
'1203829521790031': dataValue('body.Suggestion'),
'1201884379104074': dataValue('body.GrievanceId'),
'1203150636879068': dataValue('body.Submission Date'),
'1203150636874723': dataValue('body.Grievance OneDrive Folder'),
'1203150636882358': dataValue('body.Grievance date'),

// Fields  belonging to questions with dropdown or multiple choice
'1203150662724247': state => state.formatMapping["GrievanceOrSuggestion_" + dataValue('body.GrievanceOrSuggestion')(state)],
'1203150662724251': state => state.formatMapping["Country_" + dataValue('body.Country')(state)],
'1202330466059592': state => state.formatMapping["GrievanceAgainst_" + dataValue('body.GrievanceAgainst')(state)],
'1202330821410492': state => state.formatMapping["ConfidentialitySensitivity_" + dataValue('body.ConfidentialitySensitivity')(state)],
'1187328718760774': state => state.formatMapping["GrievanceStatus _" + dataValue('body.GrievanceStatus ')(state)],
'1187634487549315': state => state.formatMapping["GrievanceType_" + dataValue('body.GrievanceType')(state)],
'1192836094355010': state => state.formatMapping["GrievanceReportFormat_" + dataValue('body.GrievanceReportFormat')(state)],
'1203150636888015': state => state.formatMapping["Confidentiality or Sensitivity_" + dataValue('body.Confidentiality or Sensitivity')(state)],
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


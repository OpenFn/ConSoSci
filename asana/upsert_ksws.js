fn(state => {   //Mapping table to map Kobo field CHOICES to Asana custom_fields_choices gids
  const formatMapping = {
 GrievanceReport_CallProjectStaff: '1205638979644643',
  GrievanceReport_Email: '1205638979644644',
  GrievanceReport_HotlineCall: '1205638979644645',
  GrievanceReport_InPerson: '1205638979644646',
  GrievanceReport_PostalLetter: '1205638979644647',
  GrievanceReport_TelegramMessage: '1205638979644648',
  GrievanceType_Comment: '1205638979644651',
  GrievanceType_GeneralGrievance: '1205638979644652',
  GrievanceType_ProjectGrievance: '1205638979644653',
  CaseType_Boundary: '1205638979644656',
  CaseType_CashForCommunities: '1205638979644657',
  CaseType_CommunityPatrols: '1205638979644658',
  CaseType_Governance: '1205638979644659',
  CaseType_HumanWildlifeConflict: '1205638979644660',
  CaseType_IllegalLogging: '1205638982100772',
  CaseType_LandClearance: '1205638982100773',
  CaseType_LandGrabbing: '1205638982100774',
  CaseType_LawEnforcement: '1205638982100775',
  CaseType_LeMemberThreat: '1205638982100776',
  CaseType_LogsTransportation: '1205638982100777',
  CaseType_NestProtection: '1205638982100778',
  CaseType_PermissionLetterLogging: '1205638982100779',
  CaseType_Poaching: '1205638982100780',
  CaseType_ProjectImplementation: '1205638982100781',
  CaseType_SignBoard: '1205638982100782',
  CaseType_Threats: '1205638982100783',
  CaseType_VillageFocalPerson: '1205638982100784',
  CaseType_WcsStaffFraud: '1205638982100785',
  ReponseNeeded_Yes: '1205638982100788',
  ReponseNeeded_No: '1205638982100789',
  ReponseNeeded_NotSure: '1205638982100790',
  'GrievanceStatus _BeingReviewed': '1192850232576003',
  'GrievanceStatus _NotAssigned': '1187328718760775',
  'GrievanceStatus _Dismissed': '1187674280676653',
  'GrievanceStatus _OnHold': '1187328718760778',
  'GrievanceStatus _BeingInvestigated': '1187328718760776',
  'GrievanceStatus _Resolved': '1187328718760777',
  'GrievanceStatus _RemediationBeingMonitored': '1192772373678248' 
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
      notes: state =>
`Complaint in Khmer: ${dataValue('body.ComplaintKhmer')(state)}.
Complaint English: ${dataValue('body.ComplaintEnglish')(state)}.`,
      custom_fields: {
          //This tells Asana what fields to update and how to locate them.
          
          //The statements below apply to Asana Fields that are for OPEN ENDED
          //i.e. They accept FREE TEXT INPUT from the Kobo Form
'1201884379104074': dataValue('body.GrievanceId'),
'1205638664513483': dataValue('body.GrievanceDate'),
'1205638669631280': dataValue('body.GrievanceTime'),
'1205639010623290': dataValue('body.Village'),
'1205638664513479': dataValue('body.NamePhone'),
'1205638664513487': dataValue('body.Position'),
'1205638664544001': dataValue('body.DateTimeLocationIncident'),
'1205638664544009': dataValue('body.ActionTaken'),
'1205638664555699': dataValue('body.ResponseGiven'),
'1205638664544013': dataValue('body.ResultAction'),
'1205638664544017': dataValue('body.Evidence'),
'1205639008044145': dataValue('body.StatusExplanation'),
'1205638664555695': dataValue('body.DateResolved'),
'1205638664555691': dataValue('body.LTM reviewed'),
          
          //The statements below apply to Asana Fields that have multiplechoice / DropDown options
          //i.e. They require that the user selects specific options from the Kobo Form dropdown list.
          // These are the questions that require the MAPPING TABLES at the top of this page.
          //The mapping key-value pairs are obtained using a console.log tht runs in the Fetch GID Job
         /* '0000000000000000': dataValue('body.WhereGrievance'), */ //Grievance Date field missing in Asana
'1205638979644642': state => state.formatMapping["GrievanceReport_" + dataValue('body.GrievanceReport')(state)],
'1205638979644650': state => state.formatMapping["GrievanceType_" + dataValue('body.GrievanceType')(state)],
'1205638979644655': state => state.formatMapping["CaseType_" + dataValue('body.CaseType')(state)],
'1205638982100787': state => state.formatMapping["ReponseNeeded_" + dataValue('body.ReponseNeeded')(state)],
'1187328718760774': state => state.formatMapping["GrievanceStatus _" + dataValue('body.GrievanceStatus ')(state)],
      },
    },
  },
  state => {
    console.log(JSON.stringify(state.data, null, 2)); //log data
    return state;
  }
);

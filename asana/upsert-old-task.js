fn(state => {   //Mapping table to map Kobo field choices to Asana custom_fields gids
  const formatMapping = {
    //ReportFormat - gid 1192836094355010
    BeingReviewed: '1192850232576003',
  NotAssigned: '1187328718760775',
  Dismissed: '1187674280676653',
  OnHold: '1187328718760778',
  BeingInvestigated: '1187328718760776',
  Resolved: '1187328718760777',
  RemediationBeingMonitored: '1192772373678248',
  RelatedProjects: '1187634487549316',
  LandTerritory: '1187634487549317',
  WildlifeConflict: '1187634487549318',
  OtherIssues: '1201884389902967',
  Suggestion: '1201884389905045',
  InPerson: '1192836094355011',
  VoiceCall: '1192836094355012',
  TextMessage: '1192847692374160',
  Email: '1192847692376214',
  PostalLetter: '1192847692376223',
  Yes: '1201743216292435',
  No: '1201743216292436',
    
  };

  return { ...state, formatMapping };
});

upsertTask(
  dataValue('projectid'), //to dynamically map project id, assuming it's defined in the Get job
  //'1201382240883590', //hardcoded project id
 
  {
    externalId: "name", // Asana external Id field name (e.g., 'gid')
    data: {
      name: state =>
        `Grievance ID: ${dataValue('body.GrievanceID')(state)} (KoboID:${dataValue('body._id')(state)})`,
      projects: state => [`${dataValue('projectid')(state)}`], //to dynamically map project id, assuming it's defined in the Get job
      //projects: ['1201382240883590'], //hardcoded Asana project id for Template Project
      notes: state =>
        `DETAILS:
        WCS Staff name: ${dataValue('body.StaffName')(state)}.
        WCS Staff email address: ${dataValue('body.StaffEmail')(state)}.
        Grievance reporter full name: ${dataValue('body.ReporterFullName')(state)}.
        Grievance reporter contact information: ${dataValue('body.ReporterContactInformation')(state)}.
        Authority of the Grievance reporter: ${dataValue('body.AuthorityGrievanceReporter')(state)}.
        Where did this grievance take place: ${dataValue('body.WhereGrievance')(state)}.
        When did this grievance take place: ${dataValue('body.WhenGrievance')(state)}.
        Parties involved in the grievance: ${dataValue('body.PartiesInvolvedGrievance')(state)}.
        Regional Program: ${dataValue('body.RegionalProgram')(state)}.
        Local authorities contacted: ${dataValue('body.LocalAuthoritiesContacted')(state)}.
        Include a description of the grievance here: ${dataValue('body.DescriptioGrievance')(state)}.
        Harm suffered: ${dataValue('body.HarmSuffered')(state)}.
        Relief requested: ${dataValue('body.ReliefRequested')(state)}.

        Kobo FormID: ${dataValue('body._id')(state)}.
        Grievance ID: ${dataValue('body.GrievanceID')(state)}.`,
      custom_fields: {
          '1201382335160247': dataValue('body.OneDriveFolder'),
          '1201382335160251': dataValue('body.DateGrievanceEntered'),
          '1201382335160256': dataValue('body.WhenGrievance'),
        /* '0000000000000000': dataValue('body.WhereGrievance'), */ //Grievance Date field missing in Asana
          
          1187328718760774: state =>  state.formatMapping[dataValue('body.GrievanceStatus ')(state)],
          1187634487549315: state =>  state.formatMapping[dataValue('body.GrievanceType')(state)],
          1192836094355010: state =>  state.formatMapping[dataValue('body.ReportFormat')(state)],
          1201743216292434: state =>  state.formatMapping[dataValue('body.ConfidentialitySensitivity')(state)],
          
          
      },
    },
  },
  state => {
    console.log(JSON.stringify(state.data, null, 2)); //log data
    return state;
  }
);


fn(state => {   //Mapping table to map Kobo field CHOICES to Asana custom_fields_choices gids
  const formatMapping = {
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
  Yes: '1201884189073507',
  No: '1201884189073508',
  BeingReviewed: '1192850232576003',
  NotAssigned: '1187328718760775',
  Dismissed: '1187674280676653',
  OnHold: '1187328718760778',
  BeingInvestigated: '1187328718760776',
  Resolved: '1187328718760777',
  RemediationBeingMonitored: '1192772373678248',    
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
          `${dataValue('body.NameComplainant')(state)} (KoboID:${dataValue('body._id')(state)})`,
      projects: state => [`${dataValue('projectid')(state)}`], //to dynamically map project id, assuming it's defined in the Get job
      //projects: ['1201382240883590'], //hardcoded Asana project id for Template Project
      notes: state =>
           ``,
      //   `DETAILS:
      //   Grievance Serial number: ${dataValue('body.GrievanceId')(state)}.
      //   WCS Staff name: ${dataValue('body.StaffName')(state)}.
      //   WCS Staff email address: ${dataValue('body.StaffEmail')(state)}.
      //   Grievance reporter full name: ${dataValue('body.ReporterFullName')(state)}.
      //   Grievance reporter contact information: ${dataValue('body.ReporterContactInformation')(state)}.
      //   Authority of the Grievance reporter: ${dataValue('body.AuthorityGrievanceReporter')(state)}.
      //   Where did this grievance take place: ${dataValue('body.WhereGrievance')(state)}.
      //   When did this grievance take place: ${dataValue('body.WhenGrievance')(state)}.
      //   Parties involved in the grievance: ${dataValue('body.PartiesInvolvedGrievance')(state)}.
      //   Local authorities contacted: ${dataValue('body.LocalAuthoritiesContacted')(state)}.
      //   Include a description of the grievance here: ${dataValue('body.DescriptioGrievance')(state)}.
      //   Harm suffered: ${dataValue('body.HarmSuffered')(state)}.
      //   Relief requested: ${dataValue('body.ReliefRequested')(state)}.

      //   Kobo FormID: ${dataValue('body._id')(state)}.
      //   Grievance ID: ${dataValue('body.GrievanceID')(state)}.`,
      
    
      
        
      
      custom_fields: {
          //This tells Asana what fields to update and how to locate them.
          
          //The statements below apply to Asana Fields that are for OPEN ENDED
          //i.e. They accept FREE TEXT INPUT from the Kobo Form
         
          '1201884379104074': dataValue('body.GrievanceId'),  //Mapped to Grievance ID in Asana
          '1201872034756835': dataValue('body.GrievanceDate'),  //Mapped to Grievance Date in Asana
          '1201884384018740': dataValue('body.GrievanceLocation'),  //Mapped to Grievance Location in Asana
          '1201872034752530': dataValue('body.NameComplainant'),  //Mapped to Name of Complainant in Asana
          '1201884189073488': dataValue('body.AddressComplainant'),  //Mapped to Address of Complainant in Asana
          '1201884189073490': dataValue('body.TelephoneComplainant'),  //Mapped to TelephoneComplainant in Asana
          '1201884189073492': dataValue('body.NoFormPreviousComplaint'),  //Mapped to No Form Previous Complaint in Asana
          
          '1201884189073494': dataValue('body.ProjectName'),  //Mapped to ProjectName in Asana
          '1201884189073496': dataValue('body.OtherDonor'),  //Mapped to Other Donor in Asana
          '1201884189073518': dataValue('body.Topic'),  //Mapped to Topic in Asana
          '1201884189073500': dataValue('body.StakeholdersResponsible'),  //Mapped to Stakeholders Responsible in Asana
          '1201884189073502': dataValue('body.GrievanceEvidence'),  //Mapped to Grievance Evidence in Asana
          '1201884189073504': dataValue('body.GrievanceDescription'),  //Mapped to Grievance Description in Asana
          '1201884189073510': dataValue('body.FollowUpOtherStakeholders'),  //Mapped to Follow Up Other Stakeholders in Asana
          
          '1201884189073512': dataValue('body.FollowUpDate'),  //Mapped to Follow Up Date in Asana
          '1201884189073516': dataValue('body.GrievanceResolution'),  //Mapped to Grievance Resolution in Asana
          '1201884189073514': dataValue('body.DateGrievanceResolution'),  //Mapped to Date Grievance Resolution in Asana (**Check Asana)
          
          
          //The statements below apply to Asana Fields that have multiplechoice / DropDown options
          //i.e. They require that the user selects specific options from the Kobo Form dropdown list.
          // These are the questions that require the MAPPING TABLES at the top of this page.
          //The mapping key-value pairs are obtained using a console.log tht runs in the Fetch GID Job
         /* '0000000000000000': dataValue('body.WhereGrievance'), */ //Grievance Date field missing in Asana
          1187634487549315: state =>
          state.formatMapping[dataValue('body.GrievanceType')(state)],
          1192836094355010: state =>
          state.formatMapping[dataValue('body.GrievanceReportFormat')(state)], //Mapped to Grievance Report Format in Asana (**Check Asana)
          1201884189073506: state =>
          state.formatMapping[dataValue('body.NeedFollowUp')(state)],
          1187328718760774: state =>
          state.formatMapping[dataValue('body.GrievanceStatus')(state)],

      },
    },
  },
  state => {
    console.log(JSON.stringify(state.data, null, 2)); //log data
    return state;
  }
);

fn(state => {   //Mapping table to map Kobo field CHOICES to Asana custom_fields_choices gids
  const formatMapping = {
    Grievance: '1202329899911646',
    Suggestion: '1202329899911647',
    Request: '1202329899911648',
    Feedback: '1202329899911649',
    InPerson: '1202330347493011',
    VoiceCall: '1202330347494027',
    TextMessage: '1202330347498273',
    SuggestionBox: '1202330347499327',
    Hotline: '1202330347501419',
    Email: '1202330347502485',
    PostalLetter: '1202330347503544',
    individual: '1202330732062943',
    group: '1202330732067344',
    passive_observation: '1202330732068565',
    male: '1202330737362427',
    female: '1202330737362428',
    mixed: '1202330714895611',
    unknown: '1202330714895612',
    Yes: '1202330821410493',
    No: '1202330821410494',
    '<18': '1202330714895607',
    '19-35': '1202330714895608',
    '36-50': '1202330714895609',
    '>50': '1202330714895610',
    Wcs: '1202330466059593',
    GovernmentPartner: '1202330466059594',
    PrivateSectorPartner: '1202330466059595',
    CivilSocietyPartner: '1202330466059596',
    NotWcsAndNotAWcsPartner: '1202330466059597'
  };

  return { ...state, formatMapping };
});

console.log("projectid:");
console.log(dataValue('projectid')(state));

upsertTask(
  dataValue('projectid'), //to dynamically map project id, assuming it's defined in the Get job. This projectID must be originally added to the Job that fetches data from Kobo.
  //'1201871867457230', //hardcoded project id
  
  {
    externalId: "name", // Asana external Id field name (e.g., 'gid')
    data: {
      
      name: state =>
        //`Grievance ID: ${dataValue('body.GrievanceID')(state)} (KoboID:${dataValue('body._id')(state)})`,
        `test ${dataValue('body.ReporterName')(state)} (KoboID:${dataValue('body._id')(state)})`,
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
         
        '1202329899911593': dataValue('body.StaffName'),
        '1202329899911595': dataValue('body.CaseID'),
        '1202329899911597': dataValue('body.StaffEmail'),
        '1202329899911599': dataValue('body.SubmissionDate'),
        '1202329899911605': dataValue('body.ReporterName'),
        '1202329899911607': dataValue('body.ReporterContactInformation'),
        '1202329899911615': dataValue('body.AuthorityGrievanceReporter'),
        '1202329899911619': dataValue('body.WhereGrievance'),
        '1202329899911623': dataValue('body.GrievanceDate'),
        '1202329899911625': dataValue('body.PartiesInvolvedGrievance'),
        '1202329899911627': dataValue('body.LocalAuthoritiesContacted'),
        '1202329899911631': dataValue('body.HarmSuffered'),
        '1202329899911633': dataValue('body.ReliefRequested'),
        '1202329899911635': dataValue('body.OnlineFolder'),
        '1202329899911637': dataValue('body.Location'),
          
          //The statements below apply to Asana Fields that have multiplechoice / DropDown options
          //i.e. They require that the user selects specific options from the Kobo Form dropdown list.
          // These are the questions that require the MAPPING TABLES at the top of this page.
          //The mapping key-value pairs are obtained using a console.log tht runs in the Fetch GID Job
         /* '0000000000000000': dataValue('body.WhereGrievance'), */ //Grievance Date field missing in Asana
          '1202329899911645': state =>  state.formatMapping[dataValue('body.SubmissionType')(state)],
          '1202330347491974': state =>  state.formatMapping[dataValue('body.ReportFormat')(state)],
          '1202330732061901': state =>  state.formatMapping[dataValue('body.SubmissionContext')(state)],
          '1202330737362426': state =>  state.formatMapping[dataValue('body.Gender')(state)],
          '1202330755979944': state =>  state.formatMapping[dataValue('body.IndigenousPeople')(state)],
          '1202330714895606': state =>  state.formatMapping[dataValue('body.Age')(state)],
          '1202330466059592': state =>  state.formatMapping[dataValue('body.GrievanceAgainst')(state)],
          '1202330815421247': state =>  state.formatMapping[dataValue('body.DatePrecision')(state)],
          '1202330821410492': state =>  state.formatMapping[dataValue('body.ConfidentialitySensitivity')(state)]
      },
    },
  },
  state => {
    console.log(JSON.stringify(state.data, null, 2)); //log data
    return state;
  }
);






fn(state => {   //Mapping table to map Kobo field choices to Asana custom_fields gids
  const formatMapping = {
    //ReportFormat - gid 1192836094355010
    InPerson: '1192836094355011',
    VoiceCall: '1192836094355012',
    TextMessage: '1192847692374160',
    Email: '1192847692376214',
    PostalLetter: '1192847692376223',
    //GrievanceOrSuggestion - gid 1200603908440348
    Grievance: '1200603908441383',
    Suggestion: '1200603908441454',
    //Region: '1187328718760755',
    Global: '1200158315275974',
    'Andes,Amazon,Orinoco': '1187328718760756',            
    ArcticBeringia: '1187328718760757',
    Boreal: '1187328718760758',
    CentralAfricaAndGulfOfGuinea: '1187328718760759',
    EastAfricaAndMadagascar: '1187328718760760',
    GreaterMekong: '1187328718760761',
    InnerAsia: '1187850790401225',
    Melanesia: '1187850790401226',
    MesoamericaAndWesternCaribbean: '1187850790401227',
    Patagonia: '1187850790401228',
    RockyMountainsWest: '1187850790401229',
    SouthAsiaAndBayOfBengal: '1187850790401230',
    SoutheastAsiaArchipelago: '1187850790401231',
    'Sudano-Sahel': '1187850790401232',               
    
    //Country: '1187466717116801',
    AllCountryPrograms: '1200158353214078',
    Afghanistan: '1187466717116802',
    Argentina: '1187466717116803',
    Bangladesh: '1187466717116804',
    Belize: '1187466717116805',
    Bolivia: '1187466717116806',
    Brazil: '1187842971453051',
    Burundi: '1187842971453052',
    Cambodia: '1187842971453053',
    Cameroon: '1187842971453054',
    Canada: '1187842971453055',
    CentralAfricanRepublic: '1187842971453056',
    Chad: '1187842971453086',
    Chile: '1187842971453057',
    China: '1187842971453058',
    Colombia: '1187842971453059',
    CongoRepublic: '1187842971453060',
    CongoDemocraticRepublic: '1187842971453061',
    Cuba: '1187842971453062',
    Ecuador: '1187842971453063',
    EquatorialGuinea: '1187842971453064',
    Ethiopia: '1187842971453065',
    Fiji: '1187842971453066',
    Gabon: '1187842971453067',
    Guatemala: '1187842971453069',
    India: '1187842971453070',
    Indonesia: '1187842971453071',
    'IslasMalvinas/FalklandIslands': '1187842971453072',       
    Kenya: '1187842971453073',
    LaoPdr: '1187842971453074',
    Madagascar: '1187842971453075',
    Malaysia: '1187842971453076',
    Mexico: '1187842971453077',
    Mozambique: '1187842971453078',
    Myanmar: '1187842971453079',
    Nicaragua: '1187842971453080',
    Nigeria: '1187842971453081',
    Pakistan: '1187842971453082',
    PapuaNewGuinea: '1187842971453083',
    Paraguay: '1187842971453084',
    Peru: '1187842971453087',
    Russia: '1187842971453088',
    Rwanda: '1187842971453089',
    SolomonsIslands: '1187842971453090',
    SouthSudan: '1187842971453091',
    Tajikistan: '1187842971453092',
    Tanzania: '1187842971453093',
    Thailand: '1187842971453094',
    Uganda: '1187842971453095',
    UnitedStatesOfAmerica: '1187842971453096',
    Zanzibar: '1196351192285314',
    Singapore: '1201527559680033',
    
    //GrievanceAgainst: '1187634487549328',
    Wcs: '1187634487549329',
    GovernmentPartner: '1187634487549330',
    PrivateSectorPartner: '1187634487549331',
    CivilSocietyPartner: '1187634487549332',
    NotWcsAndNotAWcsPartner: '1187634487549333',
    
  };

  return { ...state, formatMapping };
});

upsertTask(
  '1201382240883590',
  {
    externalId: 'gid', // Asana external Id field name (e.g., 'gid')
    data: {
      gid: dataValue('body._id'),
      name: state =>
        `${dataValue('formName')(state)} changed string ${dataValue(
          'body.GrievanceID'
        )(state)}`,
      projects: ['1201382240883590'], //WCS project gid
      notes: state =>
        `${dataValue('formName')(state)} submitted via ${dataValue('body.ReportFormat')(state)} by ${dataValue('body.ReporterFullName')(state)}`,
      custom_fields: {
          '1201382335160247': dataValue('body.OneDriveFolder'),  //Mapped to Grievance OneDrive Folder in Asana
          '1201382335160251': dataValue('body.DateGrievanceEntered'),  //Mapped to Submission Date in Asana
          '1201382335160256': dataValue('body.WhenGrievance'),  //Mapped to Grievance Date in Asana
         /* '0000000000000000': dataValue('body.WhereGrievance'), */ //Grievance Date field missing in Asana
          1200603908440348: state =>
          state.formatMapping[dataValue('body.GrievanceOrSuggestion')(state)],
          1192836094355010: state =>
          state.formatMapping[dataValue('body.ReportFormat')(state)],
          1187328718760755: state =>
          state.formatMapping[dataValue('body.RegionalProgram')(state)],
          1187634487549328: state =>
          state.formatMapping[dataValue('body.GrievanceAgainst')(state)],
          
          1187466717116801: state =>
          state.formatMapping[dataValue('body.Country')(state)],    // 'Country' wrongly labelled as 'Singapore' in Asana
      },
    },
  },
  state => {
    console.log(JSON.stringify(state.data, null, 2)); //log data
    return state;
  }
);

/*
updateTask('1201687476823315', {   //my task_gid
  name: 'Joseph test task2',
  custom_fields: {
      '1200603908440348': dataValue('body.GrievanceOrSuggestion'),   //GrievanceOrSuggestion
      '1192836094355010': dataValue('body.FormatReport')           //Grievance Report Format
  },
  
  
},
state => {
    console.log(JSON.stringify(state.data, null, 2 )); //log data
    return state;
  }


);*/

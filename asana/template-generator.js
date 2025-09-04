// Run this after creating a sample task in the target project.
// Paste that task's gid below.
const SAMPLE_TASK_GID = "1210973692586457";

// 1) Standard fields (present across projects)
const STANDARD_FIELDS = {
  SubmissionType: "1202329899911645",
  ReportFormat: "1202330347491974",
  CaseID: "1202329899911595",
  GrievanceID: "1201884379104074",
  Gender: "1202330737362426",
  IndigenousPeoples: "1202330755979944",
  Age: "1202330714895606"
};

// 2) Standard option GIDs (enum choices)
const STANDARD_OPTION_MAPPING = {
  "SubmissionType_Grievance": "1202329899911646",
  "SubmissionType_Suggestion": "1202329899911647",
  "SubmissionType_Request": "1202329899911648",
  "SubmissionType_Feedback": "1202329899911649",

  "ReportFormat_InPerson": "1202330347493011",
  "ReportFormat_FocalPoint": "1207724960884497",
  "ReportFormat_VoiceCall": "1202330347494027",
  "ReportFormat_Hotline": "1202330347501419",
  "ReportFormat_TextMessage": "1202330347498273",
  "ReportFormat_SuggestionBox": "1202330347499327",
  "ReportFormat_Email": "1202330347502485",
  "ReportFormat_Letter": "1202330347503544",
  "ReportFormat_OnlineForm": "1207934414764297",
  "ReportFormat_Other": "1203830536105154",
  "ReportFormat_Prospecting": "1208419056473280",

  "Gender_Male": "1202330737362427",
  "Gender_Female": "1202330737362428",
  "Gender_Mixed gender": "1202330737362429",
  "Gender_Unknown gender": "1202330737362430",
  "Gender_Other gender": "1207852335266397",
  "Gender_Prefer not to report": "1207852335266398",

  "IndigenousPeoples_Yes": "1202330755980982",
  "IndigenousPeoples_No": "1202330755984093",
  "IndigenousPeoples_Unknown": "1202330755985164",
  "IndigenousPeoples_Mixed group": "1207724962870243",

  "Age_<18": "1202330714895607",
  "Age_19–35": "1202330714895608",
  "Age_36–50": "1202330714895609",
  "Age_>50": "1202330714895610",
  "Age_Mixed age": "1202330714895611",
  "Age_Unknown age": "1202330714895612"
};

// Fetch the sample task so we can inspect this project's custom fields
getTask(SAMPLE_TASK_GID, {}, state => {
  const { data } = state.body;

  // Build a set of standard field GIDs so we can skip duplicates later
  const standardGids = new Set(Object.values(STANDARD_FIELDS));
  const presentGids = new Set(data.custom_fields.map(f => f.gid));

  // 3) Build the combined mapping table: start with standard options, then add project-specific options
  const formatMapping = { ...STANDARD_OPTION_MAPPING };

  data.custom_fields.forEach(field => {
    // Skip if this field is one of the known standard fields
    if (standardGids.has(field.gid)) return;

    if (field.enum_options) {
      field.enum_options.forEach(option => {
        formatMapping[`${field.name}_${option.name}`] = option.gid;
      });
    }
  });

  // Print a copy-paste friendly mapping table
  console.log("//======= Mapping Table (Standard + Project specific) =========");
  console.log("-----BEGIN PASTE 1-----");
  console.log("const formatMapping = " + JSON.stringify(formatMapping, null, 2) + ";");
  console.log("state.formatMapping = formatMapping;");
  console.log("-----END PASTE 1-----");
  console.log("//===================== End Mapping Table =====================");
  console.log("");


  // 4) Print statements for custom_fields payload
  // helpers
  const cleanName = s => (s || '').trim();
  const isIdent = s => /^[A-Za-z_$][\w$]*$/.test(s);
  const bodyRef = name => {
    const clean = cleanName(name);
    return isIdent(clean) ? `$.inputData.body.${clean}` : `$.inputData.body[${JSON.stringify(clean)}]`;
  };
  const enumExpr = name => {
    const clean = cleanName(name);
    // lookup key is "<FieldName>_" + raw payload value
    return `state => state.formatMapping[${JSON.stringify(clean + "_")} + ${bodyRef(clean)}]`;
  };

  let paste2 = "custom_fields: {\n";

  // Standard open-ended
  if (presentGids.has(STANDARD_FIELDS.CaseID)) {
    paste2 += `  '${STANDARD_FIELDS.CaseID}': ${bodyRef('CaseID')},\n`;
  }
  if (presentGids.has(STANDARD_FIELDS.GrievanceID)) {
    paste2 += `  '${STANDARD_FIELDS.GrievanceID}': ${bodyRef('GrievanceID')},\n`;
  }

  // Standard enums
  ['SubmissionType', 'ReportFormat', 'Gender', 'IndigenousPeoples', 'Age'].forEach(name => {
    const gid = STANDARD_FIELDS[name];
    if (presentGids.has(gid)) {
      paste2 += `  '${gid}': ${enumExpr(name)},\n`;
    }
  });

  // Project specific
  data.custom_fields.forEach(f => {
    if (standardGids.has(f.gid)) return;
    if (f.name && !f.enum_options) {
      paste2 += `  '${f.gid}': ${bodyRef(f.name)},\n`;
    } else if (f.name && f.enum_options) {
      paste2 += `  '${f.gid}': ${enumExpr(f.name)},\n`;
    }
  });

  paste2 += "}";

  console.log("-----BEGIN PASTE 2-----\n" + paste2 + "\n-----END PASTE 2-----");
  console.log("//=========== End of Statements =======================");

  // Return state with the combined mapping in case you want to consume it programmatically
  return { ...state, formatMapping };
});

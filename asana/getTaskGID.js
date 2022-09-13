//Typically run at the very beginning, or when we add new fields in Asana.
// Retrieve the Project gid and task gid from the Asana project URL i.e. https://app.asana.com/0/<Project_gid/task_id
// get("/tasks/1201871867457231", {
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${state.configuration.token}`      
//       },
  
//   },
  
    //Returns a json of all fields and their associated gids. There are gids for project, task, field and field options/choices.
    //this can be viewed in the Activity History
    
    //Note: Customizing a field name in Asana does not change its gid.  
  
  
  
   // =========== FETCHING GIDS FROM ASANA TO CREATE SOME HELPFSUL UPSERT STATEMENTS =============  
//FOR THIS JOB WE NEED A task_gid and NOT project_id. 
// So you first create a sample task in your project, and retrieve its task_id and then insert it in 'getTask' below
// Retrieve the task_gid from the Asana project URL i.e. https://app.asana.com/0/<Project_gid/task_id

  getTask("1202329899911640",   //Again, this is a task_gid, and NOT a project_id
 
 {},
  
  state => {
    return state;

  },
 );
 
 
 
 // =========== MAPPLE TABLES & STATEMENTS FOR UPSERT JOB =============
 

// *********** 1. MAPPING TABLES **************
//This fn below creates a mapping table / code snippet for Asana custom fields choices (enum_option)
//This should be at the very top of the script, before the upsert function.
fn(state => {
  const { data } = state.data;
  const formatMapping = {};
  
  data.custom_fields.forEach(field => {
    if (field.enum_options){
      field.enum_options.forEach(option => {
        formatMapping[option.name] = option.gid;
      });
    }
  
  });
   
  console.log("//=======Mapping Table Statements ============");
  console.log("(Must be placed in fn block where you define const formatMapping, and return ...state, formatMapping)");
  console.log(formatMapping);
  console.log('//=====================End of Mapping Table statements=============');
  console.log('');
  console.log('');
  return state;
});
 //These output Statements should be placed into this fn Block:
 
// fn(state => {   
//   const formatMapping = {
//   Statement 1
//   Statement 2
//   Statement n
//   };
//   return { ...state, formatMapping };
// });
// ********************** END OF MAPPLE TABLES ****************************************************



// ***************** 2. STATEMENTS FOR OPEN-ENDED QUESTIONS *************************************
//This tells Asana what fields to update and how to locate them.
          
          //The statements below apply to Asana Fields that are for OPEN ENDED
          //i.e. They accept FREE TEXT INPUT from the Kobo Form
          // You must insert them into custom_fields{}
fn(state => {
  const { data } = state.data;
  var formatMapping = {};
  
  console.log("//========Statements to insert into custom_fieds{} for Open-Ended Kobo Questions=======");
    data.custom_fields.forEach(s => {
  //    Check for fields  belonging to questionswith dropdown or multiple choice so we can ignore them i.e. (do nothing)
       if (s.enum_options) {   
  //   Check for fields  belonging to open-ended questions (qxns that accept free text input) so we can map them     
      } else if (s.name){    
          formatMapping = "'"+ s.gid + "'" + ": dataValue('body." + s.name+"'),";
          console.log(formatMapping);
        }
      });

   console.log('//===========End of Statements========================');
   console.log('');
   console.log('');
   return state;
 });
 
// ***************** END OF STATEMENTS FOR OPEN-ENDED QUESTIONS ************************************* 




// ***************** 3. STATEMENTS FOR MULTIPLE CHOICE QUESTIONS *************************************
 
 //The statements below apply to Asana Fields that have multiplechoice / DropDown options
          //i.e. They require that the user selects specific options from the Kobo Form dropdown list.
          // These are the questions that require the MAPPING TABLES at the top of this page.
          //The mapping key-value pairs are obtained using a console.log tht runs in the Fetch GID Job
         /* '0000000000000000': dataValue('body.WhereGrievance'), */ //Grievance Date field missing in Asana
 fn(state => {
  const { data } = state.data;
  var formatMapping = {};
  
  console.log("//========Statements to insert into custom_fieds{} for Multiple-Choice Kobo Questions=======");
    data.custom_fields.forEach(s => {
  //    Check for fields  belonging to questions with dropdown or multiple choice only.
       if (s.enum_options) {   
  
          formatMapping = s.gid + ": state =>" + "  state.formatMapping[" + "dataValue('body." + s.name+"')(state)],";
          console.log(formatMapping);
        }
      });

   console.log('//====================End of Statements==========================');
   return state;
 })        
         
         
         
        
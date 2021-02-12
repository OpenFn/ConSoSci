upsert('kobodata', 'formid',
    {
        //columnName: dataValue('koboQuestion'),
        formId: dataValue('formId'), //columnName: dataValue
        formName: dataValue('formName'),
        formType: dataValue('formType'),
        submission_date: dataValue('body._submission_time'),
        //here can we show then how to do data cleaning and use alterState(...)
        latitude: dataValue('_geolocation'), // parse "_geolocation": [ 11.178402, 31.8446]" //ADD DATA CLEANING 
        longitude: dataValue('_geolocation'), // parse "_geolocation": [ 11.178402, 31.8446]"
    }
);

upsert('sharksraysform', 'answerid',
    {
        formId: dataValue('formId'), //relate to parent koboData record
        answerId: dataValue('body._id'),
        country: dataValue('body.country'),
        surveyType: dataValue('body.survey'),
    }
);

//show how to implement each() for each _attachments[...] element in this repeat group
upsertMany('sharksRays_Attachments', 'attachmentId', //these repeat group elements have a uid, so we can upsertMany
    {
        answerId: dataValue('body._id'),  //child to parent sharksRaysForm table
        attachmentId: dataValue('body._attachments[*].id'), //update when implementing for each()
        url: dataValue('body._attachments[*].download_url'), //update when implementing for each()
        fileName: dataValue('body._attachments[*].filename'), //update when implementing for each()
    }
);

upsert('sharksRays_Boat', 'boatId',
    {
        //boatId: returm customId: boat/boat_type + "-" + _id (sample output; "dhow-85252496") //SHOW HOW TO MAKE CUSTOM ID
        answerId: dataValue('body._id'), //child to parent sharksRaysForm table
        boatType: dataValue('body.boat/boat_type'),
        targetCatch: dataValue('body.boat/target_catch'),
    }
);

//Below the catch_details repeat group elements do NOT have a uid, so we can must overwrite
//we do this by (1) deleting existing records, and (2) inserting many repeat group elements
sql({
    query: state =>
        `DELETE FROM sharksRays_BoatCatchDetails where AnswerId = '${state.data.body._id}'`,
});
insertMany('sharksRays_BoatCatchDetails', //for each "boat/catch_details": [...]
    {
        //boatId: returm customId: boat/boat_type + "-" + _id (sample output; "dhow-85252496") //SHOW HOW TO MAKE CUSTOM ID; map to boat
        answerId: dataValue('body._id'), //child to parent sharksRaysForm table
        type: dataValue('body.boat/catch_details/type'),
        weight: dataValue('body.boat/catch_details/weight'),
    }
);

upsert('kobodata', 'form_id', {
  // columnName: dataValue('koboQuestion'),
  form_id: dataValue('formId'), // TODO: warm up time! set the PK
  form_name: dataValue('formName'),
  form_type: dataValue('formType'),
  submission_date: dataValue('body._submission_time'),
  // TODO: how do we manipulate data in the submission?
  // latitude: dataValue('body.gps'), // parse "gps": "11.178402, 31.8446" // split text?
  // longitude: dataValue('body._geolocation'), // parse "_geolocation": [ 11.178402, 31.8446] // pick from array?
});

upsert('sharksrays_form', 'answer_id', {
  form_id: dataValue('formId'), //FK
  answer_id: dataValue('body._id'), //PK
  country: dataValue('body.country'),
  survey_type: dataValue('body.survey'),
});

// TODO: show how to implement upsertMany (or each?)
upsertMany(
  'sharksrays_attachments',
  'attachment_id', // these repeat group elements have a uid, so we can upsertMany
  {
    answerId: dataValue('body._id'), //FK
    attachmentId: dataValue('body._attachments[*].id'), // TODO: update mapping for each element
    url: dataValue('body._attachments[*].download_url'), // TODO: update mapping for each element
    fileName: dataValue('body._attachments[*].filename'), // TODO: update mapping for each element
  }
);

upsert('sharksrays_boat', 'boat_id', {
  // TODO: Show how to make a custom id
  boat_id: state => state.data.body['boat/boat_type'] + '-' + state.data.body['_id'],
  answer_id: dataValue('body._id'), // child to parent sharksRaysForm table
  boat_type: dataValue('body.boat/boat_type'),
  target_catch: dataValue('body.boat/target_catch'),
});

// TODO: Demo how we handle repeat groups like `catch_details` where no uid is available
// for each element ==> we therefore overwrite this data in the DB by...
// (1) deleting existing records, and (2) inserting many repeat group elements
// sql(state => `DELETE FROM sharksrays_boatcatchdetails where answer_id = '${state.data.body._id}'`);

// Note the use of each(...)
// insertMany(
//   'sharksRays_boatcatchdetails',
//   state => [1, 2, 3] // some function that maps "boat/catch_details" -> boat_id, answer_id, type, weight
// );

function onEdit(e) {
  const range = e.range;
  const editedRow = range.getRow();
  const editedColumn = range.getColumn();
  const newValue = e.value;
  const oldValue = e.oldValue;
  const user = e.user;

  // Fetch values for the specified row
  const sheet = e.range.getSheet();
  const editRowRange = sheet.getRange(editedRow, 1, 1, sheet.getLastColumn());
  const editedRowValues = editRowRange.getValues()[0];
  const headerRow = 1;
  const sheetRows = sheet.getRange(headerRow, 1, 1, sheet.getLastColumn());
  const headers = sheetRows.getValues()[0];

  Logger.log('Edited Row Values: ' + editedRowValues);

  const task_id = editedRowValues[0];
  const columnName = headers[editedColumn - 1];

  Logger.log(
    'Change detected in row ' + editedRow + ', column ' + editedColumn + ':'
  );
  Logger.log('New value:' + newValue);
  Logger.log('Old value:' + oldValue);

  // Get the stored changes or initialize an empty object
  let storedChanges =
    PropertiesService.getScriptProperties().getProperty('changes');
  storedChanges = storedChanges ? JSON.parse(storedChanges) : {};

  // Store the change in the storedChanges object
  storedChanges['headers'] = headers;
  storedChanges[task_id] = [
    {
      values: editedRowValues,
      activity: {
        row: editedRow,
        column: editedColumn,
        columnName,
        user,
        oldValue,
        newValue,
      },
    },
  ];

  Logger.log('Updates' + JSON.stringify(storedChanges));

  // Save the updated changes back to the PropertiesService
  PropertiesService.getScriptProperties().setProperty(
    'changes',
    JSON.stringify(storedChanges)
  );
}
// Function to create a custom menu
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('OpenFn ⚡️')
    .addItem('Sync Changes 🔄', 'syncChangesToOpenFn')
    .addToUi();
}

function syncChangesToOpenFn() {
  // Access changes object from PropertiesService
  let storedChanges =
    PropertiesService.getScriptProperties().getProperty('changes');
  storedChanges = storedChanges ? JSON.parse(storedChanges) : {};
  Logger.log('storedChanges ' + JSON.stringify(storedChanges));

  // Make a POST request to the REST API URL
  const apiUrl = 'OPENFN_WEBHOOK_URL'; // Replace with your API endpoint URL
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(storedChanges),
  };

  try {
    const response = UrlFetchApp.fetch(apiUrl, options);
    Logger.log('Data synced successfully:', response.getContentText());
    //Clear stored changes after syncing
    PropertiesService.getScriptProperties().deleteProperty('changes');
  } catch (error) {
    Logger.log('Error syncing data:', error);
  }
}

function createDailyTrigger() {
  // Delete existing triggers to prevent duplicates
  var existingTriggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < existingTriggers.length; i++) {
    if (existingTriggers[i].getHandlerFunction() == 'syncChangesToOpenFn') {
      ScriptApp.deleteTrigger(existingTriggers[i]);
    }
  }

  // Set the time for triggering the syncToApi function
  var triggerDay = new Date();
  triggerDay.setHours(23); // Set the hour to 23 (11 PM) - adjust as needed
  triggerDay.setMinutes(55); // Set the minutes to 55 (55 minutes) - adjust as needed

  // Create the trigger to run syncToApi daily close to end of day
  ScriptApp.newTrigger('syncChangesToOpenFn')
    .timeBased()
    .everyMinutes(1) // Change to .at(triggerDay) for daily execution
    //  .at(triggerDay)
    .create();
}

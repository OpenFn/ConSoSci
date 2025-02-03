//App script used in template GRM Google Sheet
function onEdit(e) {
  const { range, value: newValue, oldValue, user } = e;
  const sheet = range.getSheet();
  const editedRow = range.getRow();
  const editedColumn = range.getColumn();
  const endRow = range.getLastRow();
  const startColumn = range.getColumn();
  const endColumn = range.getLastColumn();

  const editedRowValues = sheet
    .getRange(editedRow, 1, 1, sheet.getLastColumn())
    .getValues()[0];
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const uniqueId = editedRowValues[0];
  const columnName = headers[editedColumn - 1];

  Logger.log(`Edited Row Values: ${editedRowValues}`);
  Logger.log(`Change detected in row ${editedRow}, column ${editedColumn}`);
  Logger.log(`New value: ${newValue}, Old value: ${oldValue}`);

  // Get stored changes or initialize empty object
  let storedChanges =
    PropertiesService.getScriptProperties().getProperty("changes");
  storedChanges = storedChanges
    ? JSON.parse(storedChanges)
    : { activities: [] };


  storedChanges[uniqueId] = {
    values: editedRowValues,
    updatedAt: new Date(),
  };


  const comment = `${user.nickname} updated ${columnName} for ${uniqueId} from ${oldValue} to ${newValue}`;
  storedChanges["headers"] = headers
  // Handle multi-row edit
  if (editedRow !== endRow) {
    Logger.log(`Multiple rows edited: ${editedRow} to ${endRow}`);
    for (let row = editedRow; row <= endRow; row++) {
      for (let col = startColumn; col <= endColumn; col++) {
        const rowValues = sheet
          .getRange(row, 1, 1, sheet.getLastColumn())
          .getValues()[0];
        const id = sheet.getRange(row, 1).getValue();
        storedChanges[id] = { values: rowValues, updatedAt: new Date() };

        storedChanges.activities.push({
          row,
          column: col,
          columnName: headers[col - 1],
          user,
          oldValue,
          newValue: sheet.getRange(row, col).getValue(),
          comment: `Edit made to row ${row}, column ${col}`,
          uniqueId: id,
        });
      }
    }
  } else {
    Logger.log(`Single row edited at: ${editedRow}`);
    storedChanges.activities.push({
      row: editedRow,
      column: editedColumn,
      columnName,
      user,
      oldValue,
      newValue,
      comment,
      uniqueId,
    });
  }

  // Save changes
  PropertiesService.getScriptProperties().setProperty(
    "changes",
    JSON.stringify(storedChanges)
  );
}

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("Asana Sync ⚡️")
    .addItem("Sync Changes 🔄", "syncChangesToOpenFn")
    .addToUi();
}

function syncChangesToOpenFn() {
  let storedChanges =
    PropertiesService.getScriptProperties().getProperty("changes");
  storedChanges = storedChanges ? JSON.parse(storedChanges) : {};

  if (Object.keys(storedChanges).length) {
    const options = {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({
        notificationType: "gsheet-changes",
        ...storedChanges,
      }),
    };

    try {
      const response = UrlFetchApp.fetch(
        "https://v1.openfn.org/inbox/{url-id},
        options
      );
      Logger.log("Data synced successfully:", response.getContentText());
      PropertiesService.getScriptProperties().deleteProperty("changes");
    } catch (error) {
      Logger.log("Error syncing data:", error);
    }
  } else {
    Logger.log("No changes found");
  }
}

function createDailyTrigger() {
  ScriptApp.getProjectTriggers().forEach((trigger) => {
    if (trigger.getHandlerFunction() === "syncChangesToOpenFn") {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  ScriptApp.newTrigger("syncChangesToOpenFn")
    .timeBased()
    .everyDays(1)
    .atHour(23)
    .nearMinute(55)
    .create();
}

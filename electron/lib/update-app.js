const { ipcMain  } = require('electron/main');
const { exec } = require('child_process');
const { getIsRaspberryPi } = require('../utils');
const path = require('path');

let isUpdatingApp = false;

function updateApp(win) {
  if (getIsRaspberryPi()) {
    if (!isUpdatingApp) {
      console.log("Updating App")
      isUpdatingApp = true;
      win.webContents.send('show-info-notification', { title: "Nach Update suchen...", description: "Neustart wenn gefunden" });
      exec('sh ' + path.join(__dirname, '../../update_app.sh'), (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            isUpdatingApp = false;
            return;
        }
        if (stderr) {
            console.log(`Script stderr: ${stderr}`);
        }
        const output = stdout.trim();

        console.log(`Script output:\n${output}`);
        if (output === "changes_found") {
          win.webContents.send('show-success-notification', { title: "Update: Neustart" });
        } else if (output === "changes_not_found")  {
          win.webContents.send('show-success-notification', { title: "Keine neue Version" });
        }
        isUpdatingApp = false;
      });
    } else {
      console.log("Already updating app, ignoring");
    }
  } else {
    console.log("Skipped running updating app shell script cause not on raspberrypi");
  }
}

function setupUpdateAppHandlers(win) {
  ipcMain.handle('update-app', () => updateApp(win));
}

module.exports = { setupUpdateAppHandlers }

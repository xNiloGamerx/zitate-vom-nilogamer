const { ipcMain  } = require('electron/main');
const { exec } = require('child_process');
const { getIsRaspberryPi } = require('../utils');
const path = require('path');

let isUpdatingApp = false;

function updateApp() {
  if (getIsRaspberryPi()) {
    if (!isUpdatingApp) {
      console.log("Updating App")
      isUpdatingApp = true;
      win.webContents.send('show-info-notification', { title: "Nach Update suchen..."});
      exec('sh ' + path.join(__dirname, '../../update_app.sh'), (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            isUpdatingApp = false;
            return;
        }
        if (stderr) {
            console.log(`Script stderr: ${stderr}`);
        }
        console.log(`Script output:\n${stdout}`);
        win.webContents.send('show-success-notification', { title: "Update: Neustart"});
        isUpdatingApp = false;
      });
    } else {
      console.log("Already updating app, ignoring");
    }
  } else {
    console.log("Skipped running updating app shell script cause not on raspberrypi");
  }
}

function setupUpdateAppHandlers() {
  ipcMain.handle('update-app', () => updateApp());
}

module.exports = { setupUpdateAppHandlers }

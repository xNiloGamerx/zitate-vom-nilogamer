const { ipcMain  } = require('electron/main');
const schedule = require('node-schedule');
const path = require('path');
const { exec } = require('child_process');
const { getIsOnline, getIsRaspberryPi } = require('../utils');

function pullQuotes(win) {
  if (getIsRaspberryPi()) {
    if (getIsOnline()) {
      win.webContents.send('show-info-notification', { title: "Lade im Hintergrund" });
      exec('sh ' + path.join(__dirname, '../../update_quotes.sh'), (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Script stderr: ${stderr}`);
            return;
        }
        console.log(`Script output:\n${stdout}`);
        
        if (win && !win.isDestroyed()) {
          win.webContents.send('update-quotes');
          win.webContents.send('show-success-notification', { title: "Zitate geladen" });
          console.log("Finished Quotes Daily successfully");
        } else {
          console.log("Updating quotes not possible. win is undefined or destroyed");
        }
      });
    } else {
      win.webContents.send('show-warning-notification', { title: "Kein Internet" });
    }
  } else {
    console.log("Skipped running updating quotes shell script cause not on raspberrypi");
  }
}

function startPullQuotesDaily(win) {
  if (getIsRaspberryPi()) {
    console.log("Started Update Quotes Daily");
    schedule.scheduleJob('0 0 0 * * *', () => {
      pullQuotes(win);
    });
  } else {
    console.log("Skipped starting Update Quotes Daily job cause not on Raspberrypi");
  }
}

function setupUpdateQuotesHandlers(win) {
  ipcMain.handle('pull-quotes', () => pullQuotes(win));
}

module.exports = { startPullQuotesDaily, setupUpdateQuotesHandlers };

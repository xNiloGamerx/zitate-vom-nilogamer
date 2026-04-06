const { ipcMain  } = require('electron/main');
const schedule = require('node-schedule');
const path = require('path');
const { exec } = require('child_process');
const { getIsRaspberryPi } = require('../utils');

function pullQuotes(win) {
  if (getIsRaspberryPi()) {
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
        console.log("Finished Quotes Daily successfully");
      } else {
        console.log("Updating quotes not possible. win is undefined or destroyed");
      }
    });
  } else {
    console.log("Skipped running updating quotes shell script cause not on raspberrypi");
  }
}

function startPullQuotesDaily(win) {
  if (getIsRaspberryPi()) {
    console.log("Started Update Quotes Daily");
    schedule.scheduleJob('* 0 0 * * *', () => {
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

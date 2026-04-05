const cron = require('node-cron');
const path = require('path');
const { exec } = require('child_process');
const { getIsRaspberryPi } = require('../utils');

function startUpdateQuotesDaily(win) {
  if (getIsRaspberryPi()) {
    console.log("Started Update Quotes Daily");
    cron.schedule('0 0 * * *', () => {
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
          win.webContents.send('update-quotes'); // <- Hier ist anscheinend: Cannot read properties of undefined (reading 'send'): Foto auf Handy
        } else {
          console.log("Updating quotes not possible. win is undefined or destroyed");
        }
      });
    });
  } else {
    console.log("Skipped Update Quotes Daily cause not on Raspberrypi");
  }
}

module.exports = { startUpdateQuotesDaily };

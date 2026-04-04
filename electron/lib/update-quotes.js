const cron = require('node-cron');
const { exec } = require('child_process');
const { getIsRaspberryPi } = require('../utils');

function startUpdateQuotesDaily() {
  if (getIsRaspberryPi()) {
    console.log("Started Update Quotes Daily");
    cron.schedule('0 0 * * *', () => {
      exec('sh ../../update_quotes.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Script stderr: ${stderr}`);
            return;
        }
        console.log(`Script output:\n${stdout}`);
      });
    });
  } else {
    console.log("Skipped Update Quotes Daily cause not on Raspberrypi");
  }
}

module.exports = { startUpdateQuotesDaily };

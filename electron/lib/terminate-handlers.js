const { ipcMain  } = require('electron/main');
const { getIsRaspberryPi } = require('../utils');
const isRaspi = getIsRaspberryPi();

let pm2;
if (isRaspi) {
  pm2 = require('pm2');
}
const PROCESS_NAME = 'zvm';


function setupTerminateAppHandlers(app) {
  ipcMain.handle('terminate-app', () => {
    if (!isRaspi) {
      app.quit();
      return;
    }

    pm2.connect((err) => {
      if (err) {
        console.error('Error connecting with PM2:', err);
      }

      // Ruft alle von PM2 verwalteten Prozesse ab
      pm2.list((err, list) => {
        if (err) {
          console.error('Error getting list of processes:', err);
          pm2.disconnect();
          return;
        }

        const processExists = list.some(proc => proc.name === PROCESS_NAME);

        if (processExists) {
          console.log(`Found process "${PROCESS_NAME}" terminating it.`);
          pm2.stop(PROCESS_NAME, (err) => {
            if (err) {
              console.log(`Error terminating process "${PROCESS_NAME}"`);
            } else {
              console.log(`Terminated process "${PROCESS_NAME}"`)
            }

            pm2.disconnect();
          });
        } else {
          console.log(`Process "${PROCESS_NAME}" stop trying to terminate it.`);
          pm2.disconnect();
        }
      });
    });
  });
}

module.exports = { setupTerminateAppHandlers };

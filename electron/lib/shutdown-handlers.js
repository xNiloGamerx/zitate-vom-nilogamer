const { ipcMain } = require("electron/main");
const { getIsRaspberryPi } = require("../utils");
const isRaspi = getIsRaspberryPi();

function setupShutdownPiHandlers(app) {
  ipcMain.handle("shutdown-pi", () => {
    if (!isRaspi) {
      app.quit();
      return;
    }

    exec(
      "shutdown now", // kiosk-zvm hat benötigte Berechtigungen
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing script: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Script stderr: ${stderr}`);
          return;
        }
        console.log(`Script output:\n${stdout}`);
      },
    )
  });
}

module.exports = { setupShutdownPiHandlers };

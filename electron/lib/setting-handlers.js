const { ipcMain  } = require('electron/main');
const { setSetting, getSetting } = require('../setting');

function setupSettingHandlers() {
  ipcMain.handle('set-setting', (event, key, value) => { setSetting(key, value); });
  ipcMain.handle('get-setting', async (event, key) => { return getSetting(key); });
}

module.exports = { setupSettingHandlers };

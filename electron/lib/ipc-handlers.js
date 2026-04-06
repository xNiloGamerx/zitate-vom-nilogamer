const { ipcMain  } = require('electron/main');
const { setupSettingHandlers } = require('./setting-handlers');
const { setupQuoteHandlers } = require('./quote-handlers');
const { setupQuoteJobHandlers } = require('./quote-job-handlers');

function setupIpcHandlers(app, win) {
  setupSettingHandlers();
  setupQuoteHandlers();
  setupQuoteJobHandlers(win);

  // Terminate App Handler
  ipcMain.handle('terminate-app', () => app.quit());

  // Open Dev Window Handler
  ipcMain.handle('openDevTools', () => win.webContents.openDevTools());
}

module.exports = { setupIpcHandlers };

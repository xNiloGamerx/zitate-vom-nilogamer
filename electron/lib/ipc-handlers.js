const { ipcMain  } = require('electron/main');
const { setupSettingHandlers } = require('./setting-handlers');
const { setupQuoteHandlers } = require('./quote-handlers');
const { setupQuoteJobHandlers } = require('./quote-job-handlers');
const { setupUpdateQuotesHandlers } = require('./update-quotes');
const { setupUpdateAppHandlers } = require('./update-app');

function setupIpcHandlers(app, win) {
  setupSettingHandlers();
  setupQuoteHandlers();
  setupQuoteJobHandlers(win);
  setupUpdateQuotesHandlers(win);
  setupUpdateAppHandlers();

  // Terminate App Handler
  ipcMain.handle('terminate-app', () => app.quit());

  // Open Dev Window Handler
  ipcMain.handle('openDevTools', () => win.webContents.openDevTools());
}

module.exports = { setupIpcHandlers };

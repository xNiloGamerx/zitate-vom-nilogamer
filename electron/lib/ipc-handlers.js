const { ipcMain  } = require('electron/main');
const { setupQuoteHandlers } = require('./quote-handlers');
const { setupDailyQuoteIpcHandlers } = require('./daily-quote-ipc-handlers');

function setupIpcHandlers(app, win) {
  setupQuoteHandlers();
  setupDailyQuoteIpcHandlers();

  // Terminate App Handler
  ipcMain.handle('terminate-app', () => app.quit());

  // Open Dev Window Handler
  ipcMain.handle('openDevTools', () => win.webContents.openDevTools());
}

module.exports = { setupIpcHandlers };

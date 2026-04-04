const { ipcMain  } = require('electron/main');
const cron = require('node-cron');

let dailyQuoteTask;

function setupDailyQuoteIpcHandlers(win) {
  // Daily Quote Task
  dailyQuoteTask = cron.schedule('0 0 * * *', () => {
    win.webContents.send('render-random-quote', {})
  });

  // Daily Quote Handlers
  ipcMain.handle('trigger-quote-daily', () => { console.log("Started Quote Daily!"); dailyQuoteTask.start(); });
  ipcMain.handle('stop-quote-daily', () => { console.log("Stopped Quote Daily!"); dailyQuoteTask.stop(); });
}

module.exports = { setupDailyQuoteIpcHandlers };

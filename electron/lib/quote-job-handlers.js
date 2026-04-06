const { ipcMain  } = require('electron/main');
const schedule = require('node-schedule');

let quoteInterval = "0 0 * * *";
let quoteJob;

function startQuoteJob(win) {
  console.log("Creating new Quote Job")
  if (quoteJob) quoteJob.cancel();

  if (quoteInterval) {
    quoteJob = schedule.scheduleJob(quoteInterval, () => {
      win.webContents.send('render-random-quote', {})
    });
  } else {
    console.log("Cant create Quote Job, quote Interval is not set");
  }
}

function stopQuoteJob() {
  if (quoteJob) {
    quoteJob.cancel();
  }
}

function restartQuoteJob(win) {
  startQuoteJob(win);
}

function setupQuoteJobHandlers(win) {
  ipcMain.handle('set-quote-interval', (event, newQuoteInterval) => {
    quoteInterval = newQuoteInterval;
    console.log("Set Quote Interval to:", newQuoteInterval);
  });
  ipcMain.handle('get-quote-interval', async () => {
    return quoteInterval;
  });

  ipcMain.handle('start-quote-job', () => {
    startQuoteJob(win);
  });
  ipcMain.handle('stop-quote-job', () => {
    stopQuoteJob();
  });
  ipcMain.handle('restart-quote-job', () => {
    restartQuoteJob(win);
  });
}

module.exports = { setupQuoteJobHandlers };

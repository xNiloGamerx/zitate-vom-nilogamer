//
// TODO: Abspeichern der Daten die persistent sein müssen: Welches Intervall wurde als letztes gewählt, bestimmt noch mehr...
//

require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/../node_modules/electron`)
});

const { app, BrowserWindow, ipcMain  } = require('electron/main');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

let win;
let dailyQuoteTask;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 480,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  })

  win.loadFile(path.join(__dirname, '../src/index.html'))
  win.openDevTools();
}

app.whenReady().then(() => {
  console.log("Ready");
  dailyQuoteTask = cron.schedule('0 0 * * *', () => {
    win.webContents.send('render-random-quote', {})
  })

  ipcMain.handle('openDevTools', () => win.webContents.openDevTools());

  ipcMain.handle('get-quotes', async () => {
    const filePath = path.join(__dirname, '../assets/quotes.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  });

  ipcMain.handle('trigger-quote-daily', () => { console.log("Started Quote Daily!"); dailyQuoteTask.start(); });
  ipcMain.handle('stop-quote-daily', () => { console.log("Stopped Quote Daily!"); dailyQuoteTask.stop(); });

  ipcMain.handle('terminate-app', () => app.quit());

    // setInterval(
    //   () => win.webContents.send('render-random-quote', {}),
    //   500
    // );  

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  });
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/../node_modules/electron`)
});

const { app, BrowserWindow, ipcMain  } = require('electron/main');
const fs = require('fs');
const path = require('path');

let win;

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
}

app.whenReady().then(() => {
  ipcMain.handle('openDevTools', () => win.webContents.openDevTools());

  ipcMain.handle('get-quotes', async () => {
    console.log("Get Quotes")
    const filePath = path.join(__dirname, '../assets/quotes.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  });

  setInterval(
    () => win.webContents.send('render-random-quote', {}),
    500
  );  

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

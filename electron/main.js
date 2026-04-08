//
// TODO: Find fix so user doesnt see desktop when pm2 restarts app, Helligkeit kontrollieren
//

const { app, BrowserWindow, ipcMain  } = require('electron/main');
const path = require('path');
const { setupIpcHandlers } = require('./lib/ipc-handlers');
const { getIsRaspberryPi } = require('./utils');
const { setSetting, getSetting } = require('./setting');
const { startPullQuotesDaily } = require('./lib/update-quotes');

let win;
const isRaspberryPi = getIsRaspberryPi();

if (isRaspberryPi) {
  // app.disableHardwareAcceleration();
  app.commandLine.appendSwitch('enable-gpu-rasterization');
  app.commandLine.appendSwitch('display-compositor-pixel-dump');

    app.commandLine.appendSwitch('remote-debugging-address', '0.0.0.0');
  app.commandLine.appendSwitch('remote-debugging-port', '9222');
}

function createWindow() {
  let browserWindowPayload;
  if (isRaspberryPi) {
    browserWindowPayload = {
      width: 1024,
      height: 600,
      frame: false,
      fullscreen: false,
      alwaysOnTop: false,
      kiosk: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload/preload.js'),
        contextIsolation: true
      }
    }
  } else {
    browserWindowPayload = {
      width: 1024,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload/preload.js'),
        contextIsolation: true
      }
    }
  }
  
  win = new BrowserWindow(browserWindowPayload);

  win.loadFile(path.join(__dirname, '../src/index.html'))
  
  if (isRaspberryPi) {
    win.maximize();
  } else {
    win.openDevTools();
  }
}

app.whenReady().then(() => {
  console.log("Ready");

  createWindow();

  startPullQuotesDaily(win);

  setupIpcHandlers(app, win);

  win.webContents.openDevTools()

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

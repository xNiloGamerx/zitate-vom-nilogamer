const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  ping: () => 'pong',

  setSetting: (key, value) => ipcRenderer.invoke('set-setting', key, value ),
  getSetting: (key) => ipcRenderer.invoke('get-setting', key ),

  openDevTools: () =>  ipcRenderer.invoke('openDevTools'),

  getQuotes: () => ipcRenderer.invoke('get-quotes'),
  onRenderRandomQuote: (callback) => ipcRenderer.on('render-random-quote', (event, data) => callback(data)),

  triggerQuoteDaily: () => ipcRenderer.invoke('trigger-quote-daily'),
  stopQuoteDaily: () => ipcRenderer.invoke('stop-quote-daily'),

  terminateApp: () => ipcRenderer.invoke('terminate-app'),
});

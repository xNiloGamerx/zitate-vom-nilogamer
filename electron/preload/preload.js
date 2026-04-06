const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  ping: () => 'pong',

  setSetting: (key, value) => ipcRenderer.invoke('set-setting', key, value ),
  getSetting: (key) => ipcRenderer.invoke('get-setting', key ),

  openDevTools: () =>  ipcRenderer.invoke('openDevTools'),

  getQuotes: () => ipcRenderer.invoke('get-quotes'),
  pullQuotes: () => ipcRenderer.invoke('pull-quotes'),
  onUpdateQuotes: (callback) => ipcRenderer.on('update-quotes', (event, data) => callback(data)),
  onRenderRandomQuote: (callback) => ipcRenderer.on('render-random-quote', (event, data) => callback(data)),

  setQuoteInterval: (newQuoteInterval) => ipcRenderer.invoke('set-quote-interval', newQuoteInterval),
  getQuoteInterval: () => ipcRenderer.invoke('get-quote-interval'),

  startQuoteJob: () => ipcRenderer.invoke('start-quote-job'),
  stopQuoteJob: () => ipcRenderer.invoke('stop-quote-job'),
  restartQuoteJob: () => ipcRenderer.invoke('restart-quote-job'),

  updateApp: () => ipcRenderer.invoke('update-app'),

  terminateApp: () => ipcRenderer.invoke('terminate-app'),
});

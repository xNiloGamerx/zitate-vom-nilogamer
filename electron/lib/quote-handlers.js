const { ipcMain  } = require('electron/main');
const fs = require('fs');
const path = require('path');

function setupQuoteHandlers() {
  ipcMain.handle('get-quotes', async () => {
    const filePath = path.join(__dirname, '../../assets/quotes.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  });
}

module.exports = { setupQuoteHandlers };

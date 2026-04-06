function updateApp() {
  exec('sh ' + path.join(__dirname, '../../update_app.sh'), (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing script: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Script stderr: ${stderr}`);
        return;
    }
    console.log(`Script output:\n${stdout}`);
  });
}

function setupUpdateAppHandlers() {
  ipcMain.handle('update-app', () => updateApp());
}

module.exports = { setupUpdateAppHandlers() }

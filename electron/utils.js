const { net } = require('electron')
const fs = require('fs');

function getIsOnline() {
    return net.isOnline();
}

function getIsRaspberryPi() {
    try {
        const model = fs.readFileSync('/proc/device-tree/model', 'utf8');
        return model.includes('Raspberry Pi');
    } catch (e) {
        return false;
    }
}

module.exports = {
    getIsOnline,
    getIsRaspberryPi
}
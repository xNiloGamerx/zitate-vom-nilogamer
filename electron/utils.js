const fs = require('fs');

function getIsRaspberryPi() {
    try {
        const model = fs.readFileSync('/proc/device-tree/model', 'utf8');
        return model.includes('Raspberry Pi');
    } catch (e) {
        return false;
    }
}

module.exports = {
    getIsRaspberryPi
}
const Store = require('electron-store');
const store = new (Store.default || Store)();

function setSetting(key, value) {
    store.set(key, value);
}

function getSetting(key) {
    return store.get(key);
}

module.exports = {
    setSetting,
    getSetting
}

const settingsModal = document.getElementById('settings-modal');
const birthdayModeToggle = document.getElementById('birthday-mode-input');
const whoSaidItToggle = document.getElementById('who-said-it-input');
let isSettingsModalOpen = false;

function toggleSettingsModal() {
  if (settingsModal.classList.contains('display-none')) {
    showSettingsModal();
  } else {
    hideSettingsModal();
  }
}

function showSettingsModal() {
  settingsModal.classList.remove('display-none');
  isSettingsModalOpen = true;
}

function hideSettingsModal() {
  settingsModal.classList.add('display-none');
  isSettingsModalOpen = false;
}

async function loadSavedSetting() {
  // Birthday Mode
  birthdayMode = await window.api.getSetting('settings.birthday-mode');
  if (birthdayMode === undefined) {
    birthdayMode = true;
  }
  birthdayModeToggle.checked = birthdayMode;

  // Who Said It
  whoSaidIt = await window.api.getSetting('settings.who-said-it');
  if (whoSaidIt === undefined) {
    whoSaidIt = false;
  }
  whoSaidItToggle.checked = whoSaidIt;
  
}

// Show/Hide Settings Modal
document.getElementById('settings-btn').addEventListener('click', () => {
  toggleSettingsModal();
});

document.getElementById('settings-close-btn').addEventListener('click', () => {
  hideSettingsModal();
});


// Birthday Mode Setting
birthdayModeToggle.addEventListener("change", () => {
  if (birthdayModeToggle.checked) {
    birthdayMode = true;
    window.api.setSetting('settings.birthday-mode', birthdayMode);
  } else {
    birthdayMode = false;
    window.api.setSetting('settings.birthday-mode', birthdayMode);
  }
});

// Who Said It Setting
whoSaidItToggle.addEventListener("change", () => {
  if (whoSaidItToggle.checked) {
    whoSaidIt = true;
    window.api.setSetting('settings.who-said-it', whoSaidIt);
  } else {
    whoSaidIt = false;
    window.api.setSetting('settings.who-said-it', whoSaidIt);
  }
});

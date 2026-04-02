const settingsModal = document.getElementById('settings-modal');

function toggleSettingsModal() {
  if (settingsModal.classList.contains('display-none')) {
    showSettingsModal();
  } else {
    hideSettingsModal();
  }
}

function showSettingsModal() {
  settingsModal.classList.remove('display-none');
}

function hideSettingsModal() {
  settingsModal.classList.add('display-none');
}

// Show/Hide Settings Modal
document.getElementById('settings-btn').addEventListener('click', () => {
  toggleSettingsModal();
});

document.getElementById('settings-close-btn').addEventListener('click', () => {
  hideSettingsModal();
});


// Birthday Mode Setting
const birthdayModeToggle = document.getElementById('birthday-mode-input');
birthdayModeToggle.addEventListener("change", () => {
  if (birthdayModeToggle.checked) {
    birthdayMode = true;
  } else {
    birthdayMode = false;
  }
});

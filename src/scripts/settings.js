// Show/Hide Settings Modal
document.getElementById('settings-btn').addEventListener('click', () => {
  document.getElementById('settings-modal').classList.toggle('display-none');
})

document.getElementById('settings-close-btn').addEventListener('click', () => {
  document.getElementById('settings-modal').classList.add('display-none');
})


// Birthday Mode Setting
const birthdayModeToggle = document.getElementById('birthday-mode-input');
birthdayModeToggle.addEventListener("change", () => {
  if (birthdayModeToggle.checked) {
    birthdayMode = true;
  } else {
    birthdayMode = false;
  }
});

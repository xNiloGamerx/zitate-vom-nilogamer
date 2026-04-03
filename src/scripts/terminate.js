const terminateModal = document.getElementById('terminate-modal');
const pwdInput = document.getElementById('terminate-pwd-inp')
const inputShowEye = document.getElementById('terminate-input-show-eye');
const inputHideEye = document.getElementById('terminate-input-hide-eye');

const pwd = "1234";

function toggleTerminateModal() {
  if (terminateModal.classList.contains('display-none')) {
    showTerminateModal();
  } else {
    hideTerminateModal();
  }
}

function showTerminateModal() {
  terminateModal.classList.remove('display-none');
}

function hideTerminateModal() {
  terminateModal.classList.add('display-none');
}

// Show/Hide Terminate Modal
document.getElementById('settings-terminate-btn').addEventListener('click', () => {
  hideSettingsModal();
  showTerminateModal();
});

// Confirm Terminate
document.getElementById('terminate-confirm-btn').addEventListener('click', () => {
  if (pwdInput.value === pwd) {
    pwdInput.value = '';
    hideTerminateModal();
    console.log(window.api.terminateApp());
  }
})

// Cancel Terminate
document.getElementById('terminate-cancel-btn').addEventListener('click', () => {
  pwdInput.value = '';
  hideTerminateModal();
  showSettingsModal();
})

// Show/Hide Password
inputShowEye.addEventListener('click', () => {
  inputHideEye.style.removeProperty('display');
  inputShowEye.style.display = 'none';
  pwdInput.type = 'password';
});

inputHideEye.addEventListener('click', () => {
  inputHideEye.style.display = 'none';
  inputShowEye.style.display = "inline-block";
  pwdInput.type = 'text';
});

// Number field
document.querySelectorAll('.termiante-number-field-key').forEach((key) => key.addEventListener('click', (event) => {
  pwdInput.value += event.target.innerText;
}));

document.getElementById('terminate-number-field-key-delete').addEventListener('click', () => {
  pwdInput.value = pwdInput.value.slice(0, -1);
});

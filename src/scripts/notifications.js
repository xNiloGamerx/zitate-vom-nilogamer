const validLevels = ["info", "success", "warning", "error"];
const notificationsElement = document.getElementById('notifications');
let notifications = [];

window.api.onShowInfoNotification((data) => {
    createNotification('info', data.title, data.description);
});

window.api.onShowSuccessNotification((data) => {
    createNotification('success', data.title, data.description);
});

window.api.onShowWarningNotification((data) => {
    createNotification('warning', data.title, data.description);
});

window.api.onShowErrorNotification((data) => {
    createNotification('error', data.title, data.description);
});


function createNotification(level, title, description = "") {
  if (!validLevels.includes(level)) return;

  const notificationId = crypto.randomUUID();

  const notification = document.createElement('div');
  notification.id = notificationId;
  notification.classList.add('notification');
  notification.classList.add('notification-' + level);
  notification.innerHTML = `
    <div class="notification-icon-wrapper">
      <svg class="notification-icon notification-icon-info" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM224 256C224 238.3 238.3 224 256 224L320 224C337.7 224 352 238.3 352 256L352 512L384 512C401.7 512 416 526.3 416 544C416 561.7 401.7 576 384 576L256 576C238.3 576 224 561.7 224 544C224 526.3 238.3 512 256 512L288 512L288 288L256 288C238.3 288 224 273.7 224 256z"/></svg>
      <svg class="notification-icon notification-icon-success" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/></svg>
      <svg class="notification-icon notification-icon-warning" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M320 64C334.7 64 348.2 72.1 355.2 85L571.2 485C577.9 497.4 577.6 512.4 570.4 524.5C563.2 536.6 550.1 544 536 544L104 544C89.9 544 76.8 536.6 69.6 524.5C62.4 512.4 62.1 497.4 68.8 485L284.8 85C291.8 72.1 305.3 64 320 64zM320 416C302.3 416 288 430.3 288 448C288 465.7 302.3 480 320 480C337.7 480 352 465.7 352 448C352 430.3 337.7 416 320 416zM320 224C301.8 224 287.3 239.5 288.6 257.7L296 361.7C296.9 374.2 307.4 384 319.9 384C332.5 384 342.9 374.3 343.8 361.7L351.2 257.7C352.5 239.5 338.1 224 319.8 224z"/></svg>
      <svg class="notification-icon notification-icon-error" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M320 496C342.1 496 360 513.9 360 536C360 558.1 342.1 576 320 576C297.9 576 280 558.1 280 536C280 513.9 297.9 496 320 496zM320 64C346.5 64 368 85.5 368 112C368 112.6 368 113.1 368 113.7L352 417.7C351.1 434.7 337 448 320 448C303 448 289 434.7 288 417.7L272 113.7C272 113.1 272 112.6 272 112C272 85.5 293.5 64 320 64z"/></svg>
    </div>
    <div class="notification-content">
      <p class="notification-title">${title}</p>
      <p class="notification-description">${description}</p>
    </div>
  `;

  setInterval(() => {
    const toRemoveId = notificationId;
    if (notifications.includes(toRemoveId)) {
      notifications = notifications.filter(id => id !== toRemoveId);
      notificationsElement.removeChild(document.getElementById(toRemoveId));
    }
  }, 3000)

  notifications.push(notificationId);
  notificationsElement.appendChild(notification);

  if (notifications.length > 3) {
    const toRemoveId = notifications.shift();
    notificationsElement.removeChild(document.getElementById(toRemoveId));
  }
}

document.getElementById('settings-terminate-btn').addEventListener('click', () => {
  runPinInputModal(() => console.log(window.api.terminateApp()));
});

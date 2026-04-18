document.getElementById('settings-shutdown-btn').addEventListener('click', () => {
  runPinInputModal(() => console.log(window.api.shutdownPi()));
});

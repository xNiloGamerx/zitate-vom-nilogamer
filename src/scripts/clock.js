function updateClock() {
  const now = new Date();
  
  const timeString = now.toLocaleTimeString('de-DE', {
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false
  });

  document.getElementById('time-display').textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();

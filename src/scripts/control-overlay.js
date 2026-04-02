// Show/Hide Control Overlay
const controlOverlay = document.getElementById('control-overlay');
let controlTimeout;

function resetControlTimeout() {
  clearTimeout(controlTimeout);
  controlOverlay.style.display = "flex";

  controlTimeout = setTimeout(() => {
    controlOverlay.style.display = 'none';
  }, 3000);
}

document.addEventListener("mousemove", resetControlTimeout);
document.addEventListener("click", resetControlTimeout);
document.addEventListener("keydown", resetControlTimeout);


// Control Elements
// Control Shuffle
document.getElementById('control-shuffle').addEventListener('click', () => {
  renderRandomQuote();
});

// Control Interval
const controlIntervalElement = document.getElementById('control-interval');
const controlIntervals = {
  'Täglich': () => quoteDailyInterval(),
  'Stündlich': () => updateQuoteInterval(createIntervalHours(60)),
  'Minütlich': () => updateQuoteInterval(createIntervalMinutes(1)),
  'Alle 30s': () => updateQuoteInterval(createIntervalSeconds(30)),
  'Sekündlich': () => updateQuoteInterval(createIntervalSeconds(1)),
};
let currentControlIntervalIndex = 0;
controlIntervalElement.addEventListener('click', () => {
  const controlLabels = Object.keys(controlIntervals);
  
  if (currentControlIntervalIndex + 1 >= controlLabels.length) {
    currentControlIntervalIndex = 0;
  } else {
    currentControlIntervalIndex++;
  }

  // Setzen des neuen Control Interval Lables
  const newControlLabel = controlLabels[currentControlIntervalIndex]
  controlIntervalElement.innerText = newControlLabel;

  // Setzen des neuen Quote Intervals
  controlIntervals[newControlLabel]();
});

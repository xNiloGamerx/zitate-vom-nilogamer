// Show/Hide Control Overlay
const controlOverlay = document.getElementById('control-overlay');
let controlTimeout;

function resetControlTimeout() {
  clearTimeout(controlTimeout);
  controlOverlay.style.display = "flex";

  controlTimeout = setTimeout(() => {
    if (!isSettingsModalOpen && !isTerminateModalOpen) {
      controlOverlay.style.display = 'none';
    }
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
const quoteIntervalElement = document.getElementById('control-interval');
const quoteIntervals = {
  'Täglich': '0 0 0 * * *',
  'Stündlich': '0 0 * * * *',
  'Minütlich': '0 * * * * *',
  'Alle 30s': '0,30 * * * * *',
  'Sekündlich': '* * * * * *',
};
let currentQuoteIntervalIndex = 0;
quoteIntervalElement.addEventListener('click', () => {
  const controlLabels = Object.keys(quoteIntervals);
  
  if (currentQuoteIntervalIndex + 1 >= controlLabels.length) {
    currentQuoteIntervalIndex = 0;
  } else {
    currentQuoteIntervalIndex++;
  }

  const quoteIntervalLabel = controlLabels[currentQuoteIntervalIndex]

  // Setzen des neuen Control Interval Lables
  quoteIntervalElement.innerText = quoteIntervalLabel;

  updateQuoteInterval(quoteIntervalLabel, quoteIntervals[quoteIntervalLabel]);
});

async function setSavedQuoteIntervalOrDefault() {
  const savedQuoteIntervalLabel = await window.api.getSetting('quote.interval.label');
  const savedQuoteInterval = await window.api.getSetting('quote.interval.value');

  if (savedQuoteIntervalLabel && savedQuoteInterval) {
    currentQuoteIntervalIndex = Object.keys(quoteIntervals).indexOf(savedQuoteIntervalLabel);
    quoteIntervalElement.innerText = savedQuoteIntervalLabel;

    updateQuoteInterval(savedQuoteIntervalLabel, savedQuoteInterval);
  } else {
    const firstIntervalLabel = Object.keys(quoteIntervals)[0]
    currentQuoteIntervalIndex = Object.keys(quoteIntervals).indexOf(firstIntervalLabel);
    
    updateQuoteInterval(firstIntervalLabel, quoteIntervals[firstIntervalLabel]);
  }
}

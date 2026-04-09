const brightnessSlider = document.getElementById('brightness-inp');
const brightnessSliderLabel = document.getElementById('brightness-inp-label');

function setBrightness(brightness) {
  document.body.style.filter = `brightness(${brightness}%)`;
  window.api.setSetting('settings.brightness', brightness);
}

function updateSlider(min, max, value) {
  // Berechnet den Prozentsatz für den Verlauf
  const percentage = ((value - min) / (max - min)) * 100;
  
  brightnessSlider.style.backgroundSize = percentage + '% 100%';
  brightnessSliderLabel.innerText = value;
}

brightnessSlider.addEventListener('input', (event) => {
  updateSlider(event.target.min, event.target.max, event.target.value);
  setBrightness(event.target.value);
});

updateSlider(brightnessSlider.min, brightnessSlider.max, brightnessSlider.value);

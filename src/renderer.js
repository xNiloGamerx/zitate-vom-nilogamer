let birthdayMode = true;

let quotes = [];

// Control Overlay //
const controlOverlay = document.getElementById('control-overlay');
let controlTimeout;

function resetControlTimeout() {
  controlOverlay.style.display = "flex";
  clearTimeout(controlTimeout);

  controlTimeout = setTimeout(() => {
    controlOverlay.style.display = 'none';
  }, 3000);
}

document.addEventListener("mousemove", resetControlTimeout);
document.addEventListener("click", resetControlTimeout);
document.addEventListener("keydown", resetControlTimeout);

resetControlTimeout();
// Control Overlay //


// Control Shuffle //
document.getElementById('control-shuffle').addEventListener('click', () => {
  render(getRandomQuote());
})
// Control Shuffle //


// Settings Modal //
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
// Settings Modal //


// Render Random Quote triggered by Main //
window.api.onRenderRandomQuote((data) => {
  render(getRandomQuote());
});
// Render Random Quote triggered by Main //

async function loadQuotes() {
  // const response = await fetch("../assets/quotes.json");
  // const data = await response.json();
  // quotes = data['quotes'];

  const response = await window.api.getQuotes();
  quotes = response['quotes'];

  console.log("Geladen:", quotes);
}

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function render(quote) {
  const creatorProfilePicture = document.getElementById('creator-profile-picture');
  const creatorName = document.getElementById('creator-name');
  const quoteText = document.getElementById('quote');
  const authorProfilePicture = document.getElementById('author-profile-picture');
  const authorName = document.getElementById('author-name');
  const quoteDate = document.getElementById('quote-date');
  const quoteTime = document.getElementById('quote-time');

  creatorProfilePicture.src = quote['creator']['profile_picture'];
  creatorName.style.color = quote['creator']['color'];
  creatorName.innerText = quote['creator']['name'];

  quoteText.innerText = quote['quote']['value'];

  authorProfilePicture.src = quote['author']['profile_picture'];
  authorName.style.color = quote['author']['color'];
  authorName.innerText = quote['author']['name'];

  const time = new Date(quote['timestamp'] * 1000);
  quoteDate.innerText = time.toLocaleDateString('de-DE', {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
  quoteTime.innerText = time.toLocaleTimeString('de-DE', {
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function init() {
  await loadQuotes();

  render(getRandomQuote()); 
}

init();

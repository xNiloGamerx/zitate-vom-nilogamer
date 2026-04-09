const quoteAnimationWrapper = document.getElementById('quote-animation-wrapper');
const quoteStatsTime = document.getElementById('quote-stats-time');
const quoteStatsNumberCurrent = document.getElementById('quote-stats-number-current');
const quoteStatsNumberTotal = document.getElementById('quote-stats-number-total');
const creatorProfilePicture = document.getElementById('creator-profile-picture');
const creatorName = document.getElementById('creator-name');
const quoteText = document.getElementById('quote');
const authorProfilePicture = document.getElementById('author-profile-picture');
const authorName = document.getElementById('author-name');
const quoteDate = document.getElementById('quote-date');
const quoteTime = document.getElementById('quote-time');

let lastQuoteIds = new Set();

// Render Random Quote triggered by Main //
window.api.onRenderRandomQuote((data) => {
    renderRandomQuote();
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
  return quotes[(Math.random() * quotes.length) | 0]; // Das Bitwise-ODER (| 0) ist technisch gesehen schneller als Math.floor(), macht aber genau dasselbe (es schneidet die Nachkommastellen ab)
}

async function renderRandomQuote() {
  let randomQuote;
  let attempts = 0;

  do {
    randomQuote = getRandomQuote();
    attempts++;
  } while (lastQuoteIds.has(randomQuote.id) && attempts < 50);

  await render(randomQuote);

  lastQuoteIds.add(randomQuote['id']);

  if (lastQuoteIds.size > Math.floor(quotes.length / 1.5)) {
    const firstEntry = lastQuoteIds.values().next().value;
    lastQuoteIds.delete(firstEntry);
  }
  console.log(lastQuoteIds);
}

async function render(quote) {
  quoteAnimationWrapper.classList.add('fadeOutLeft');
  
  await sleep(500);

  const now = new Date();
  quoteStatsTime.innerText = String(now.getHours()).padStart(2, '0') + ":" + String(now.getMinutes()).padStart(2, '0');

  quoteStatsNumberCurrent.innerText = quotes.indexOf(quote) + 1;
  quoteStatsNumberTotal.innerText = quotes.length;

  creatorProfilePicture.src = "../assets/user/icons/" + quote['creator']['profile_picture'];
  creatorName.style.color = quote['creator']['color'];
  creatorName.innerText = quote['creator']['name'];

  quoteText.innerText = quote['quote']['value'];

  authorProfilePicture.src = "../assets/user/icons/" + quote['author']['profile_picture'];
  if (whoSaidIt) {
    authorProfilePicture.parentElement.classList.add('anonym')
  } else {
    authorProfilePicture.parentElement.classList.remove('anonym')
  }

  authorName.style.color = quote['author']['color'];
  authorName.innerText = quote['author']['name'];
  if (whoSaidIt) {
    authorName.classList.add('anonym')
  } else {
    authorName.classList.remove('anonym')
  }

  if (whoSaidIt) {
    document.getElementById('who-said-it-show-wrapper').classList.remove('display-none');
  } else {
    document.getElementById('who-said-it-show-wrapper').classList.add('display-none');
  }

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

  lastQuote = quote;

  quoteAnimationWrapper.classList.remove('fadeOutLeft');
  quoteAnimationWrapper.classList.add('fadeInRight');
}

window.api.onUpdateQuotes((data) => {
  loadQuotes();
});

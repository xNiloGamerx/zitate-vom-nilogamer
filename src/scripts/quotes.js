let lastQuoteIds = [];

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

function renderRandomQuote() {
  const randomQuote = getRandomQuote();
  if (lastQuoteIds.includes(randomQuote['id'])) {
    renderRandomQuote();
  } else {
    render(randomQuote);
    lastQuoteIds.push(randomQuote['id']);

    if (lastQuoteIds.length > Math.floor(quotes.length / 2)) {
      lastQuoteIds.shift();
    }
  }
  console.log(lastQuoteIds);
}

function render(quote) {
  const creatorProfilePicture = document.getElementById('creator-profile-picture');
  const creatorName = document.getElementById('creator-name');
  const quoteText = document.getElementById('quote');
  const authorProfilePicture = document.getElementById('author-profile-picture');
  const authorName = document.getElementById('author-name');
  const quoteDate = document.getElementById('quote-date');
  const quoteTime = document.getElementById('quote-time');

  creatorProfilePicture.src = "../assets/user/icons/" + quote['creator']['profile_picture'];
  creatorName.style.color = quote['creator']['color'];
  creatorName.innerText = quote['creator']['name'];

  quoteText.innerText = quote['quote']['value'];

  authorProfilePicture.src = "../assets/user/icons/" + quote['author']['profile_picture'];
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

  lastQuote = quote;
}

window.api.onUpdateQuotes((data) => {
  loadQuotes();
});

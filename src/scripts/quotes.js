let lastQuote = null;

async function loadQuotes() {
  // const response = await fetch("../assets/quotes.json");
  // const data = await response.json();
  // quotes = data['quotes'];

  const response = await window.api.getQuotes();
  return response['quotes'];

  console.log("Geladen:", quotes);
}

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function renderRandomQuote() {
  const randomQuote = getRandomQuote();
  console.log(lastQuote, randomQuote);
  if (lastQuote && lastQuote === randomQuote) {
    renderRandomQuote();
  }else {
    console.log("Rendering")
    render(randomQuote);
  }
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

  lastQuote = quote;
}

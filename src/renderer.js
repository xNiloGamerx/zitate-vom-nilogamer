let birthdayMode = true;
let quotes = [];

// Render Random Quote triggered by Main //
  // window.api.onRenderRandomQuote((data) => {
  //   renderRandomQuote();
  // });
// Render Random Quote triggered by Main //

async function init() {
  await loadQuotes();

  renderRandomQuote();

  // Load saved Settings
  loadSavedSetting();

  // Set Quote Interval from last app run
  setSavedQuoteIntervalOrDefault();
}

init();

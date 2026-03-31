let birthdayMode = true;
let quotes = [];

// Control Overlay //

// Control Overlay //


// Control Shuffle //

// Control Shuffle //


// Settings Modal //

// Settings Modal //


// Render Random Quote triggered by Main //
  // window.api.onRenderRandomQuote((data) => {
  //   renderRandomQuote();
  // });
// Render Random Quote triggered by Main //

async function init() {
  quotes = await loadQuotes();

  renderRandomQuote();
}

init();

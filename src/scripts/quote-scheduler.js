let quoteInterval;
let quoteIntervalTime = 1000 * 60 * 60;
let quoteDaily = false;

// Render Random Quote triggered by Main //
window.api.onRenderRandomQuote((data) => {
    updateQuote();
});
// Render Random Quote triggered by Main //

function updateQuoteInterval(newQuoteIntervalTime) {
    console.log("Starting Quote Schedular: ", newQuoteIntervalTime, "ms");
    if (quoteDaily) {
        window.api.stopQuoteDaily();
        quoteDaily = false;
    }

    clearInterval(quoteInterval);
    quoteInterval = setInterval(updateQuote, newQuoteIntervalTime);
}

function quoteDailyInterval() {
    console.log("Starting Daily Quote Interval");
    quoteDaily = true;
    clearInterval(quoteInterval);
    window.api.triggerQuoteDaily();
}

function createIntervalHours(hours) {
    return 1000 * 60 * 60 * hours;
}

function createIntervalMinutes(minutes) {
    return 1000 * 60 * minutes;
}

function createIntervalSeconds(seconds) {
    return 1000 * seconds;
}


function updateQuote() {
    renderRandomQuote();
}

quoteDailyInterval();

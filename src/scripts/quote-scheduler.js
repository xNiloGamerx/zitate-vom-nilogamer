let quoteInterval;
let quoteIntervalTime = 1000 * 60 * 60;


function updateQuoteInterval(newQuoteIntervalTime) {
    console.log("Starting Quote Schedular: ", newQuoteIntervalTime, "ms");
    clearInterval(quoteInterval);
    quoteInterval = setInterval(updateQuote, newQuoteIntervalTime);
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

updateQuoteInterval(createIntervalHours(24));

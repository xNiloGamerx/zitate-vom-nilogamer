function setQuoteIntervalSetting(quoteIntervalLabel, quoteInterval) {
  window.api.setSetting('quote.interval.label', quoteIntervalLabel);
  window.api.setSetting('quote.interval.value', quoteInterval);
}

function updateQuoteInterval(newQuoteIntervalLabel, newQuoteInterval) {
  console.log("Set Quote Interval:", newQuoteInterval)
  window.api.setQuoteInterval(newQuoteInterval);

  console.log("Trigger Restart Quote Job")
  window.api.restartQuoteJob();

  setQuoteIntervalSetting(newQuoteIntervalLabel, newQuoteInterval);
}

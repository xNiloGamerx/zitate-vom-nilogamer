const updateAppBtn = document.getElementById('update-app-btn');
const updateQuotesBtn = document.getElementById('update-quotes-btn');

updateAppBtn.addEventListener('click', () => {
    console.log("Triggered Update App by User");
    window.api.updateApp();
})

updateQuotesBtn.addEventListener('click', () => {
    console.log("Triggered Update Quotes by User");
    window.api.pullQuotes();
})

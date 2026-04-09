document.getElementById('who-said-it-show-button').addEventListener('click', (event) => {
  authorProfilePicture.parentElement.classList.remove('anonym');
  authorName.classList.remove('anonym');

  document.getElementById('who-said-it-show-wrapper').classList.add('display-none');
});

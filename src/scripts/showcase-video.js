const startShowcaseVideoBtn = document.getElementById('start-showcase-video-btn');
const showcaseVideo = document.getElementById('showcase-video');
const app = document.getElementById('app');

function showShowcaseVideo() {
  showcaseVideo.target.classList.add('display-none');
  app.classList.add('display-none');
}

function hideShowcaseVideo() {
  showcaseVideo.parentElement.classList.add('display-none');
  app.classList.remove('display-none');
}

function handleStartShowcaseVideoBtn() {
  showShowcaseVideo();
  showcaseVideo.play();
}

function handleShowcaseVideoEnded() {
  hideShowcaseVideo();
  startShowcaseVideoBtn.removeEventListener('click', handleStartShowcaseVideoBtn);
  showcaseVideo.removeEventListener('ended', handleShowcaseVideoEnded);
}

if (birthdayMode) {
  startShowcaseVideoBtn.addEventListener('click', handleStartShowcaseVideoBtn)
  showcaseVideo.addEventListener('ended', handleShowcaseVideoEnded);
} else {
  showcaseVideo.parentElement.classList.add('display-none');
  app.classList.remove('display-none');
}

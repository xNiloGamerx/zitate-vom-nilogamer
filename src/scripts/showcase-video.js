const startShowcaseVideoBtn = document.getElementById('start-showcase-video-btn');
const showcaseVideo = document.getElementById('showcase-video');

if (birthdayMode) {
  showcaseVideo.parentElement.classList.remove('display-none');

  startShowcaseVideoBtn.addEventListener('click', (event) => {
    event.target.classList.add('display-none');
    showcaseVideo.play();
  })
  showcaseVideo.addEventListener('ended', (event) => {
    showcaseVideo.parentElement.classList.add('display-none');
  });
}
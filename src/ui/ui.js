function scrollToTop() {
  window.scrollTo(0, 0);
}

function renderButton() {
  const container = document.querySelector('#container');
  const scrollToTopButton = document.createElement('button');
  scrollToTopButton.id = 'scrollToTop';
  scrollToTopButton.textContent = '▲';
  scrollToTopButton.onclick = scrollToTop;
  container.prepend(scrollToTopButton);
}

function repositionForm(newPosition) {
  const form = document.querySelector('#GIPHY-form');
  form.style.position = newPosition;
}

export function checkScroll(amountScrolled, windowHeight) {
  const scrollToTopButton = document.querySelector('#scrollToTop');
  if (amountScrolled < windowHeight && scrollToTopButton) {
    repositionForm('');
    scrollToTopButton.remove();
  } else if (amountScrolled >= windowHeight && !scrollToTopButton) {
    repositionForm('fixed');
    renderButton();
  }
}

export function updateHelper(newMessage) {
  const helper = document.querySelector('#helper p');
  if (newMessage) {
    helper.classList.add('invalid');
    helper.textContent = newMessage;
  } else {
    helper.classList.remove('invalid');
    helper.textContent = newMessage;
  }
}

export function addNewGif(gifsUrls) {
  const gifsContainer = document.querySelector('#gifs-container');
  const imgElem = document.createElement('img');
  const randomIndex = Math.floor(Math.random() * gifsUrls.length);
  imgElem.src = gifsUrls[randomIndex];
  imgElem.classList.add('gif');
  imgElem.loading = 'lazy';
  gifsContainer.append(imgElem);
}

export function removeAllGifs(event) {
  event.preventDefault();
  const gifsContainer = document.querySelector('#gifs-container');
  gifsContainer.innerHTML = null;
}

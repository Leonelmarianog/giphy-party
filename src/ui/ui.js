function scrollToTop() {
  window.scrollTo(0, 0);
}

export function deleteButton() {
  const renderedButton = document.querySelector('#scrollToTop');
  if (!renderedButton) return false;
  renderedButton.remove();
}

export function renderButton() {
  const renderedButton = document.querySelector('#scrollToTop');
  if (renderedButton) return false;
  const container = document.querySelector('#container');
  const scrollToTopButton = document.createElement('button');
  scrollToTopButton.id = 'scrollToTop';
  scrollToTopButton.textContent = '▲';
  scrollToTopButton.onclick = scrollToTop;
  container.prepend(scrollToTopButton);
}

export function repositionForm(newPosition) {
  const form = document.querySelector('#GIPHY-form');
  form.style.position = newPosition;
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

export function addNewGif(gifUrl) {
  const gifsContainer = document.querySelector('#gifs-container');
  const imgElem = document.createElement('img');
  imgElem.src = gifUrl;
  imgElem.classList.add('gif');
  imgElem.loading = 'lazy';
  gifsContainer.append(imgElem);
}

export function removeAllGifs(event) {
  event.preventDefault();
  const gifsContainer = document.querySelector('#gifs-container');
  gifsContainer.innerHTML = null;
}

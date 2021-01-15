export function displayGif(gifUrl) {
  if (!gifUrl) {
    throw new Error('A gif is needed in order to display it.');
  }

  const gifsContainer = document.querySelector('#gifs-container');
  const imgElem = document.createElement('img');
  imgElem.src = gifUrl;
  imgElem.classList.add('gif');
  imgElem.loading = 'lazy';
  gifsContainer.append(imgElem);
}

export function removeAllGifs() {
  const gifsContainer = document.querySelector('#gifs-container');
  gifsContainer.innerHTML = null;
}

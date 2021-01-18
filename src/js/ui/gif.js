export function displayGif(gifUrl) {
  if (!gifUrl) {
    throw new Error('A gif is needed in order to display it.');
  }

  const $gifsContainer = document.querySelector('#gifs-container');
  const $gif = document.createElement('img');
  $gif.src = gifUrl;
  $gif.classList.add('gif');
  $gif.loading = 'lazy';
  $gifsContainer.append($gif);
}

export function removeAllGifs() {
  const $gifsContainer = document.querySelector('#gifs-container');
  $gifsContainer.innerHTML = null;
}

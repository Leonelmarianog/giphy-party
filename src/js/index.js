import getGifService from './services/services.js';
import {
  setGifAddListener,
  setGifRemoveListener,
  displayGif,
  removeAllGifs,
  setScrollListener,
  showHelper,
} from './ui/index.js';

async function loadGif(searchTerm) {
  showHelper('');
  try {
    if (!searchTerm) {
      throw new Error('A search term is needed in order to load a gif.');
    }

    const gifUrl = await getGifService(searchTerm);
    displayGif(gifUrl);
  } catch (error) {
    showHelper(error.message);
  }
}

export default function init() {
  setGifAddListener(loadGif);
  setGifRemoveListener(removeAllGifs);
  setScrollListener();
}

init();

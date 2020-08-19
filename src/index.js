import { findGif, checkScroll } from './services/services.js';
import {
  deleteButton,
  renderButton,
  repositionForm,
  removeAllGifs,
  addNewGif,
  updateHelper,
} from './ui/ui.js';
import getGifsUrls from './api/api.js';

window.onload = () => {
  const submitButton = document.querySelector('#submit-btn');
  const removeButton = document.querySelector('#remove-btn');

  document.addEventListener('scroll', () => {
    checkScroll(
      window.pageYOffset,
      document.documentElement.clientHeight,
      repositionForm,
      renderButton,
      deleteButton
    );
  });

  submitButton.addEventListener('click', (event) => {
    findGif(event, getGifsUrls, addNewGif, updateHelper);
  });

  removeButton.addEventListener('click', removeAllGifs);
};

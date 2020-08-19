import findGif from './services/services.js';
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
    const amountScrolled = window.pageYOffset;
    const windowHeight = document.documentElement.clientHeight;
    if (amountScrolled < windowHeight) {
      repositionForm('');
      deleteButton();
    } else if (amountScrolled >= windowHeight) {
      repositionForm('fixed');
      renderButton();
    }
  });

  submitButton.addEventListener('click', (event) => {
    findGif(event, getGifsUrls, addNewGif, updateHelper);
  });

  removeButton.addEventListener('click', removeAllGifs);
};

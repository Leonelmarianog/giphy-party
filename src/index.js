import findGif from './services/services.js';
import {
  deleteButton,
  renderButton,
  repositionForm,
  removeAllGifs,
  addNewGif,
  updateHelper,
} from './ui/ui.js';
import fetchData from './api/api.js';

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

  submitButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const gifsData = await findGif(fetchData, updateHelper);
    const gifsUrls = gifsData.data.map((obj) => obj.images.original.url);
    const randomIndex = Math.floor(Math.random() * gifsUrls.length);
    const gifUrl = gifsUrls[randomIndex];
    addNewGif(gifUrl);
    updateHelper('');
  });

  removeButton.addEventListener('click', removeAllGifs);
};

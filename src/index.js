import findGif from './services/services.js';
import { checkScroll, removeAllGifs } from './ui/ui.js';

window.onload = () => {
  const submitButton = document.querySelector('#submit-btn');
  const removeButton = document.querySelector('#remove-btn');

  document.addEventListener('scroll', () => {
    checkScroll(window.pageYOffset, document.documentElement.clientHeight);
  });
  submitButton.addEventListener('click', findGif);
  removeButton.addEventListener('click', removeAllGifs);
};

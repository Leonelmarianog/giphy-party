import getGifsUrls from '../api/api.js';
import { addNewGif, updateHelper } from '../ui/ui.js';

export default async function findGif(event) {
  event.preventDefault();
  const searchQuery = document.querySelector('#search-query').value;
  try {
    const gifsUrls = await getGifsUrls(searchQuery);
    updateHelper('');
    addNewGif(gifsUrls);
  } catch (err) {
    updateHelper(err.message);
  }
}

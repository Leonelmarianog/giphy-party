import getGifFromAPI from '../api/api.js';

export default async function getGif(searchTerm) {
  if (!searchTerm) {
    throw new Error('A search term is needed in order to get a gif.');
  }

  let gifUrl = null;

  try {
    const gifsData = await getGifFromAPI(searchTerm);

    if (gifsData.data.length === 0) {
      throw new Error('No results.');
    }

    const gifsUrls = gifsData.data.map((obj) => obj.images.original.url);
    const randomIndex = Math.floor(Math.random() * gifsUrls.length);
    gifUrl = gifsUrls[randomIndex];
  } catch (error) {
    throw error;
  }

  return gifUrl;
}

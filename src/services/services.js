import getGifsFromAPI from '../api/api.js';
import {
  getGifs as getGifsFromStorage,
  saveGifs as saveGifsInStorage,
} from '../storage/storage.js';
import { fromAPIToEntity, fromStorageToEntity } from '../mappers/mappers.js';

export default async function getGif(searchTerm) {
  if (!searchTerm) {
    throw new Error('A search term is needed in order to get a gif.');
  }

  let gifCollection;

  try {
    const gifCollectionData = getGifsFromStorage(searchTerm);
    gifCollection = fromStorageToEntity(gifCollectionData);
  } catch (error) {
    const results = await getGifsFromAPI(searchTerm);

    if (results.data.length === 0) {
      throw new Error('No results.');
    }

    gifCollection = fromAPIToEntity(searchTerm, results);

    saveGifsInStorage(gifCollection);
  }

  const randomIndex = Math.floor(Math.random() * gifCollection.gifs.length);
  const gif = gifCollection.gifs[randomIndex];
  return gif;
}

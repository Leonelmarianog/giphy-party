import GifCollection from '../entities/GifCollection.js';

export function fromAPIToEntity(searchTerm, results) {
  const gifs = results.data.map((obj) => obj.images.original.url);
  return new GifCollection(searchTerm, gifs);
}

export function fromStorageToEntity({ name, gifs }) {
  return new GifCollection(name, gifs);
}

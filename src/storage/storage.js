export function saveGifs(gifCollection) {
  if (!gifCollection) {
    throw new Error('Gifs are needed in order to save them.');
  }

  try {
    localStorage.setItem(String(gifCollection.name), JSON.stringify(gifCollection));
  } catch (error) {
    localStorage.clear();
    localStorage.setItem(String(gifCollection.name), JSON.stringify(gifCollection));
  }
}

export function getGifs(collectionName) {
  if (!collectionName) {
    throw new Error('An identifier is needed in order to get a gif from storage');
  }

  const gifCollection = JSON.parse(localStorage.getItem(collectionName));

  if (!gifCollection) {
    throw new Error('No collection found.');
  }

  return gifCollection;
}

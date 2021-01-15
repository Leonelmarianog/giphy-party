export default async function getGif(searchTerm) {
  if (!searchTerm) {
    throw new Error('A search term is needed in order to get a gif.');
  }

  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=dyhxkzTTwEEMUNuC5zjFX5Hzt6bsClFU&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en`
  );

  if (!response.ok) {
    throw new Error('Something happened, please try again in a few minutes!.');
  }

  const responseJSON = await response.json();

  return responseJSON;
}

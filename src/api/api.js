export default async function getGifsUrls(searchQuery) {
  // yes, I know storing the api key here is a terrible idea, but hey, we are just requesting GIFS to a public API,
  // not some super important and private information from a database
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=dyhxkzTTwEEMUNuC5zjFX5Hzt6bsClFU&q=${searchQuery}&limit=25&offset=0&rating=g&lang=en`
  );

  if (!response.ok) {
    throw new Error('Something happened, please try again in a few minutes!.');
  }

  const responseJSON = await response.json();

  if (responseJSON.data.length === 0) {
    throw new Error("Can't find any gifs that matches the search term.");
  }

  return responseJSON.data.map((obj) => obj.images.original.url);
}

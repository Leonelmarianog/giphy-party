export default async function findGif(
  getGifsUrlsCallback,
  updateHelperCallback
) {
  const searchQuery = document.querySelector('#search-query').value;
  try {
    return await getGifsUrlsCallback(searchQuery);
  } catch (err) {
    updateHelperCallback(err.message);
  }
}

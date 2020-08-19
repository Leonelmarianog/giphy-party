export default async function getGifsData(
  fetchDataCallback,
  updateHelperCallback
) {
  const searchQuery = document.querySelector('#search-query').value;
  try {
    return await fetchDataCallback(searchQuery);
  } catch (err) {
    updateHelperCallback(err.message);
  }
}

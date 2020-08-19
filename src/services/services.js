export async function findGif(
  event,
  getGifsUrlsCallback,
  addNewGifCallback,
  updateHelperCallback
) {
  event.preventDefault();
  const searchQuery = document.querySelector('#search-query').value;
  try {
    const gifsUrls = await getGifsUrlsCallback(searchQuery);
    updateHelperCallback('');
    addNewGifCallback(gifsUrls);
  } catch (err) {
    updateHelperCallback(err.message);
  }
}

export function checkScroll(
  amountScrolled,
  windowHeight,
  repositionFormCallback,
  renderButtonCallback,
  deleteButtonCallback
) {
  if (amountScrolled < windowHeight) {
    repositionFormCallback('');
    deleteButtonCallback();
  } else if (amountScrolled >= windowHeight) {
    repositionFormCallback('fixed');
    renderButtonCallback();
  }
}

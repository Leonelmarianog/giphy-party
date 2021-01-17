export function setGifAddListener(callback) {
  document.querySelector('#search-btn').addEventListener('click', async (event) => {
    event.preventDefault();
    const searchTerm = document.querySelector('#search-input').value.trim().toLowerCase();
    await callback(searchTerm);
  });
}

export function setGifRemoveListener(callback) {
  document.querySelector('#remove-all-btn').addEventListener('click', (event) => {
    event.preventDefault();
    callback();
  });
}

export function setGifAddListener(callback) {
  document.querySelector('#submit-btn').addEventListener('click', async (event) => {
    event.preventDefault();
    const searchTerm = document.querySelector('#search-query').value.trim().toLowerCase();
    await callback(searchTerm);
  });
}

export function setGifRemoveListener(callback) {
  document.querySelector('#remove-btn').addEventListener('click', (event) => {
    event.preventDefault();
    callback();
  });
}

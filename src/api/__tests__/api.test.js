import fetchData from '../api.js';
import dogGifsFixture from './fixtures/dogGifsFixture.json';

describe('fetchData', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('Returns an array with data when the request is OK', async () => {
    global.fetch.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolve({
            ok: true,
            json: () => dogGifsFixture,
          });
        })
    );
    const searchQuery = 'dog';

    await expect(fetchData(searchQuery)).resolves.toBeInstanceOf(Object);
    expect(global.fetch).toBeCalledTimes(1);
    expect(global.fetch).toBeCalledWith(
      `https://api.giphy.com/v1/gifs/search?api_key=dyhxkzTTwEEMUNuC5zjFX5Hzt6bsClFU&q=${searchQuery}&limit=25&offset=0&rating=g&lang=en`
    );
  });

  it('Throws an error when the request fails', async () => {
    global.fetch.mockImplementationOnce(
      () =>
        new Promise((reject) => {
          reject({ ok: false });
        })
    );
    const searchQuery = 'dog';

    await expect(fetchData(searchQuery)).rejects.toThrow(
      'Something happened, please try again in a few minutes!.'
    );
    expect(global.fetch).toBeCalledTimes(1);
    expect(global.fetch).toBeCalledWith(
      `https://api.giphy.com/v1/gifs/search?api_key=dyhxkzTTwEEMUNuC5zjFX5Hzt6bsClFU&q=${searchQuery}&limit=25&offset=0&rating=g&lang=en`
    );
  });
});

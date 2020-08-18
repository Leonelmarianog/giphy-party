import getGifs from '../api.js';
import dogGifsFixture from './fixtures/dogGifsFixture.json';

describe('getGifs', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('Returns an array with data when the request is OK', () => {
    global.fetch.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolve({
            ok: true,
            json: () => dogGifsFixture,
          });
        })
    );
    const searchTerm = 'dog';
    return expect(getGifs(searchTerm)).resolves.toBeInstanceOf(Array);
  });

  it('Throws an error when the request fails', () => {
    global.fetch.mockImplementationOnce(
      () =>
        new Promise((reject) => {
          reject({ ok: false });
        })
    );
    const searchTerm = 'dog';
    return expect(getGifs(searchTerm)).rejects.toThrow(
      'Something happened, please try again in a few minutes!.'
    );
  });

  it('Throw an error when there is no data that matches the search term', () => {
    global.fetch.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolve({
            ok: true,
            json: () => {
              return {
                data: [],
              };
            },
          });
        })
    );
    const searchTerm = 'zxcvbnmasdfghjklñ';
    return expect(getGifs(searchTerm)).rejects.toThrow(
      "Can't find any gifs that matches the search term."
    );
  });
});

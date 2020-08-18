import findGifs from '../services.js';
import fs from 'fs';

describe('findGifs', async () => {
  it('calls getGifsUrls, updateHelper and addNewGif when request is OK', async () => {
    const event = { preventDefault: () => {} };
    const mockGetGifsUrls = jest.fn(
      () =>
        new Promise((resolve) => {
          resolve([]);
        })
    );
    const mockUpdateHelper = jest.fn();
    const mockAddNewGif = jest.fn();
    const searchQuery = 'dog';

    document.body.innerHTML = fs.readFileSync(
      'src/services/__tests__/fixtures/index.fixture.html'
    );

    document.querySelector('#search-query').value = searchQuery;

    await findGifs(event, mockGetGifsUrls, mockAddNewGif, mockUpdateHelper);

    expect(mockGetGifsUrls).toBeCalledWith(searchQuery);
    expect(mockGetGifsUrls.mock.calls.length).toBe(1);
    expect(mockUpdateHelper).toBeCalledWith('');
    expect(mockUpdateHelper.mock.calls.length).toBe(1);
    expect(mockAddNewGif.mock.calls[0][0]).toBeInstanceOf(Array);
    expect(mockAddNewGif.mock.calls.length).toBe(1);
  });

  it('Only calls updateHelper when request is not OK', async () => {
    const event = { preventDefault: () => {} };
    const error = 'The Error';
    const mockGetGifsUrls = jest.fn(
      () =>
        new Promise(() => {
          throw new Error(error);
        })
    );
    const mockUpdateHelper = jest.fn();
    const mockAddNewGif = jest.fn();
    const searchQuery = 'asdfghjklñ';

    document.body.innerHTML = fs.readFileSync(
      'src/services/__tests__/fixtures/index.fixture.html'
    );

    document.querySelector('#search-query').value = searchQuery;

    await findGifs(event, mockGetGifsUrls, mockAddNewGif, mockUpdateHelper);

    expect(mockGetGifsUrls).toBeCalledWith(searchQuery);
    expect(mockGetGifsUrls.mock.calls.length).toBe(1);
    expect(mockAddNewGif.mock.calls.length).toBe(0);
    expect(mockUpdateHelper.mock.calls[0][0]).toBe(error);
    expect(mockUpdateHelper.mock.calls.length).toBe(1);
  });
});

import getGifsData from '../services.js';
import fs from 'fs';

describe('getGifsData', async () => {
  it('calls fetchData and returns an object', async () => {
    const mockFetchData = jest.fn(
      () =>
        new Promise((resolve) => {
          resolve({});
        })
    );
    const mockUpdateHelper = jest.fn();
    const searchQuery = 'dog';

    document.body.innerHTML = fs.readFileSync(
      'src/services/__tests__/fixtures/index.fixture.html'
    );

    document.querySelector('#search-query').value = searchQuery;

    await expect(
      getGifsData(mockFetchData, mockUpdateHelper)
    ).resolves.toBeInstanceOf(Object);
    expect(mockFetchData).toBeCalledWith(searchQuery);
    expect(mockFetchData).toBeCalledTimes(1);
    expect(mockUpdateHelper).toBeCalledTimes(0);
  });

  it('Only calls updateHelper when request is not OK', async () => {
    const mockFetchData = jest.fn(
      () =>
        new Promise(() => {
          throw new Error(error);
        })
    );
    const mockUpdateHelper = jest.fn();
    const searchQuery = 'asdfghjklñ';
    const error = 'The Error';

    document.body.innerHTML = fs.readFileSync(
      'src/services/__tests__/fixtures/index.fixture.html'
    );

    document.querySelector('#search-query').value = searchQuery;

    await expect(getGifsData(mockFetchData, mockUpdateHelper)).resolves.toBe(
      undefined
    );
    expect(mockFetchData).toBeCalledWith(searchQuery);
    expect(mockFetchData).toBeCalledTimes(1);
    expect(mockUpdateHelper).toBeCalledWith(error);
    expect(mockUpdateHelper).toBeCalledTimes(1);
  });
});

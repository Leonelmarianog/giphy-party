import getGif from '../services.js';
import dogGifsFixture from './fixtures/dogGifsFixture.json';
import getGifsFromAPI from '../../api/api.js';
import {
  getGifs as getGifsFromStorage,
  saveGifs as saveGifsInStorage,
} from '../../storage/storage.js';
import GifCollection from '../../entities/GifCollection.js';

jest.mock('../../api/api.js');
jest.mock('../../storage/storage.js');

beforeAll(() => {
  global.fetch = jest.fn();
});

afterEach(() => jest.clearAllMocks());

describe('getGif', () => {
  it('Returns a random gif from local storage', async () => {
    const gifCollectionDataMock = {
      name: 'dogs',
      gifs: ['dog1.gif', 'dog2.gif', 'dog3.gif'],
    };

    getGifsFromStorage.mockImplementationOnce(() => gifCollectionDataMock);

    const gif = await getGif('dogs');

    expect(gif).toEqual(expect.any(String));
    expect(getGifsFromStorage).toHaveBeenCalledTimes(1);
    expect(getGifsFromStorage).toHaveBeenCalledWith('dogs');
    expect(getGifsFromAPI).toHaveBeenCalledTimes(0);
  });

  it('Returns a random gif from the API', async () => {
    getGifsFromStorage.mockImplementationOnce(() => {
      throw new Error('No gifs in storage.');
    });
    getGifsFromAPI.mockImplementationOnce(() => dogGifsFixture);

    const gif = await getGif('dogs');

    expect(gif).toEqual(expect.any(String));
    expect(getGifsFromAPI).toHaveBeenCalledTimes(1);
    expect(getGifsFromAPI).toHaveBeenCalledWith('dogs');
    expect(saveGifsInStorage).toHaveBeenCalledTimes(1);
    expect(saveGifsInStorage).toHaveBeenCalledWith(expect.any(GifCollection));
  });

  it('Throws an error if there is no search term', async () => {
    try {
      await getGif();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual(expect.any(String));
    }
  });

  it('Throws an error if there are no results', async () => {
    const resultsMock = {
      data: [],
    };

    getGifsFromStorage.mockImplementationOnce(() => {
      throw new Error('No gifs in storage.');
    });
    getGifsFromAPI.mockImplementationOnce(() => resultsMock);

    try {
      await getGif('dogs');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual(expect.any(String));
    }
  });
});

import { getGifs, saveGifs } from '../storage.js';

beforeAll(() => global.localStorage.clear());

describe('getGifs', () => {
  afterEach(() => global.localStorage.clear());

  it('Returns a stored collection', () => {
    const gifCollectionMock = {
      name: 'dogs',
      gifs: ['dog1.gif', 'dog2.gif', 'dog3.gif'],
    };

    global.localStorage.setItem(gifCollectionMock.name, JSON.stringify(gifCollectionMock));

    const gifCollectionData = getGifs('dogs');

    expect(gifCollectionData).toBeInstanceOf(Object);
    expect(gifCollectionData.name).toBe('dogs');
    expect(gifCollectionData.gifs).toBeInstanceOf(Array);
    expect(gifCollectionData.gifs.length).toBe(3);
  });

  it('Throws an error if a collection is not found', () => {
    try {
      getGifs('dogs');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual(expect.any(String));
    }
  });

  it('Throws an error if there is no identifier', () => {
    try {
      getGifs();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual(expect.any(String));
    }
  });
});

describe('saveGifs', () => {
  beforeAll(() => jest.restoreAllMocks());

  afterEach(() => jest.restoreAllMocks());

  it('Saves a collection in local storage', () => {
    const gifCollectionMock = {
      name: 'dogs',
      gifs: ['dog1.gif', 'dog2.gif', 'dog3.gif'],
    };

    saveGifs(gifCollectionMock);

    const gifCollectionData = getGifs('dogs');

    expect(gifCollectionData).toEqual(gifCollectionMock);
  });

  it('Clears local storage if there is no space left to save gifs', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    const clearSpy = jest.spyOn(Storage.prototype, 'clear');

    setItemSpy.mockImplementationOnce(() => {
      throw new Error('No space left.');
    });

    const gifCollectionMock = {
      name: 'dogs',
      gifs: ['dog1.gif', 'dog2.gif', 'dog3.gif'],
    };

    saveGifs(gifCollectionMock);

    expect(setItemSpy).toHaveBeenCalledTimes(2);
    expect(setItemSpy).toHaveBeenCalledWith(
      gifCollectionMock.name,
      JSON.stringify(gifCollectionMock)
    );
    expect(clearSpy).toHaveBeenCalledTimes(1);
  });

  it('Throw an error if there is no data to save', () => {
    try {
      saveGifs();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual(expect.any(String));
    }
  });
});

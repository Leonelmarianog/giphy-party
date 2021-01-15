import getGif from '../api.js';
import dogGifsFixture from './fixtures/dogGifsFixture.json';

beforeAll(() => {
  global.fetch = jest.fn();
});

afterEach(() => jest.clearAllMocks());

describe('getGif', () => {
  it('Returns data when request is OK', async () => {
    const responseMock = {
      ok: true,
      json: jest.fn().mockImplementationOnce(() => dogGifsFixture),
    };

    global.fetch.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolve(responseMock);
        })
    );

    const data = await getGif('dog');

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toBeCalledWith(expect.any(String));
    expect(responseMock.json).toHaveBeenCalledTimes(1);
    expect(data).toBeInstanceOf(Object);
  });

  it('Throws an error when the request fails', async () => {
    const responseMock = { ok: false };
    global.fetch.mockImplementationOnce(
      () =>
        new Promise((reject) => {
          reject(responseMock);
        })
    );

    try {
      getGif('dog');
    } catch (error) {
      expect(global.fetch).toBeCalledTimes(1);
      expect(global.fetch).toBeCalledWith(expect.any(String));
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBeDefined();
    }
  });

  it('Throws an error if no search term is passed', async () => {
    try {
      getGif();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBeDefined();
    }
  });
});

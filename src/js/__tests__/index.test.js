import init from '../index';
import getGifService from '../services/services.js';
import { setGifAddListener, setGifRemoveListener } from '../ui/form';
import setScrollListener from '../ui/scroll';

jest.mock('../ui/form');
jest.mock('../ui/scroll');

beforeAll(() => jest.clearAllMocks());

describe('init', () => {
  it('Initializes the app', () => {
    init();

    expect(setGifAddListener).toHaveBeenCalledTimes(1);
    expect(setGifAddListener).toHaveBeenCalledWith(expect.any(Function));
    expect(setGifRemoveListener).toHaveBeenCalledTimes(1);
    expect(setGifRemoveListener).toHaveBeenCalledWith(expect.any(Function));
    expect(setScrollListener).toHaveBeenCalledTimes(1);
  });
});

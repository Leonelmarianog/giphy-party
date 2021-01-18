import { setGifAddListener, setGifRemoveListener } from '../form';
import body from './fixtures/body';

beforeAll(() => {
  document.body.innerHTML = body;
  document.querySelector('#search-input').value = 'dogs';
});

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe('setGifAddListener', () => {
  it('Sets a listener for the search button', () => {
    const $searchBtn = document.querySelector('#search-btn');
    const searchBtnListenerSpy = jest.spyOn($searchBtn, 'addEventListener');
    const eventMock = {
      preventDefault: jest.fn(),
    };

    searchBtnListenerSpy.mockImplementationOnce((event, callback) => {
      callback(eventMock);
    });

    const callbackMock = jest.fn();

    setGifAddListener(callbackMock);

    expect(eventMock.preventDefault).toHaveBeenCalledTimes(1);
    expect(callbackMock).toHaveBeenCalledWith('dogs');
  });
});

describe('setGifRemoveListener', () => {
  it('Sets a listener for the remove all button', () => {
    const $removeAllBtn = document.querySelector('#remove-all-btn');
    const removeAllBtnListenerSpy = jest.spyOn($removeAllBtn, 'addEventListener');
    const eventMock = {
      preventDefault: jest.fn(),
    };

    removeAllBtnListenerSpy.mockImplementationOnce((event, callback) => {
      callback(eventMock);
    });

    const callbackMock = jest.fn();

    setGifRemoveListener(callbackMock);

    expect(eventMock.preventDefault).toHaveBeenCalledTimes(1);
    expect(callbackMock).toHaveBeenCalledTimes(1);
  });
});

import { displayGif, removeAllGifs } from '../gif';
import body from './fixtures/body';

beforeEach(() => {
  document.body.innerHTML = body;
});

describe('displayGif', () => {
  it('Appends an img element into a container', () => {
    const $gifsContainer = document.querySelector('#gifs-container');

    expect($gifsContainer.children.length).toBe(0);

    displayGif('someUrl');

    expect($gifsContainer.children.length).toBe(1);
    expect($gifsContainer.children[0].tagName).toBe('IMG');
    expect($gifsContainer.children[0].src).toMatch(/someUrl/);
    expect($gifsContainer.children[0].classList).toContain('gif');
  });

  it('Throws an error if an url is not used as param', () => {
    try {
      displayGif();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual(expect.any(String));
    }
  });
});

describe('removeAllGifs', () => {
  it('Removes all elements from a container', () => {
    const $gifsContainer = document.querySelector('#gifs-container');

    displayGif('someUrl');
    displayGif('someUrl');
    displayGif('someUrl');

    expect($gifsContainer.children.length).toBe(3);

    removeAllGifs();

    expect($gifsContainer.children.length).toBe(0);
  });
});

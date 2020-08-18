import { checkScroll, updateHelper, addNewGif, removeAllGifs } from '../ui.js';
import fs from 'fs';

// '<div id="container"><button id="scrollToTop">▲</button><form action="#" id="GIPHY-form" style="position: fixed;"></form></div>'

describe('checkScroll', () => {
  it("Updates form position and renders button when amount scrolled is bigger than window's height", () => {
    document.body.innerHTML = fs.readFileSync(
      'src/ui/__tests__/fixtures/index1.fixture.html'
    );
    const amountScrolled = 700;
    const windowHeight = 600;

    checkScroll(amountScrolled, windowHeight);
    expect(document.querySelector('#scrollToTop')).toBeTruthy();
    expect(document.querySelector('#GIPHY-form').getAttribute('style')).toBe(
      'position: fixed;'
    );
  });

  it("Updates form position and removes button when amount scrolled is less than window's height", () => {
    document.body.innerHTML = fs.readFileSync(
      'src/ui/__tests__/fixtures/index2.fixture.html'
    );
    const amountScrolled = 500;
    const windowHeight = 600;

    checkScroll(amountScrolled, windowHeight);
    expect(document.querySelector('#scrollToTop')).toBeFalsy();
    expect(document.querySelector('#GIPHY-form').getAttribute('style')).toBe(
      ''
    );
  });
});

describe('updateHelper', () => {
  it('Alerts the user when a request is not ok or a gif is not found', () => {
    document.body.innerHTML = fs.readFileSync(
      'src/ui/__tests__/fixtures/index1.fixture.html'
    );
    document.querySelector('#helper p').textContent =
      'Please enter a search term.';
    const newMessage = "Can't find any gifs with that term.";

    updateHelper(newMessage);
    expect(document.querySelector('#helper p').textContent).toBe(newMessage);
    expect(document.querySelector('#helper p').className).toBe('invalid');
  });

  it('Cleans helper when request is ok', () => {
    document.body.innerHTML = fs.readFileSync(
      'src/ui/__tests__/fixtures/index1.fixture.html'
    );
    document.querySelector('#helper p').classList.add('invalid');
    document.querySelector('#helper p').textContent =
      "Can't find any gifs with that term.";
    const newMessage = '';

    updateHelper(newMessage);
    expect(document.querySelector('#helper p').textContent).toBe(newMessage);
    expect(document.querySelector('#helper p').className).toBe('');
  });
});

describe('addNewGif', () => {
  it('Appends an img element to a container', () => {
    document.body.innerHTML = fs.readFileSync(
      'src/ui/__tests__/fixtures/index1.fixture.html'
    );
    const gifsUrls = [
      'https://media1.giphy.com/media/f4HpCDvF84oh2/giphy.gif?cid=a8315aa0qvbuehyufztymun9chvwx9qxm1yxpsyk0cglfwr2&amp;rid=giphy.gif',
    ];

    addNewGif(gifsUrls);
    expect(document.querySelector('#gifs-container img').src).toBe(
      'https://media1.giphy.com/media/f4HpCDvF84oh2/giphy.gif?cid=a8315aa0qvbuehyufztymun9chvwx9qxm1yxpsyk0cglfwr2&amp;rid=giphy.gif'
    );
    expect(document.querySelector('#gifs-container img').loading).toBe('lazy');
    expect(document.querySelector('#gifs-container img').className).toBe('gif');
  });
});

describe('removeAllGifs', () => {
  it('Removes all img elements from container', () => {
    document.body.innerHTML = fs.readFileSync(
      'src/ui/__tests__/fixtures/index1.fixture.html'
    );
    document.querySelector('#gifs-container').innerHTML = '<img><img><img>';
    const event = { preventDefault: () => {} };

    removeAllGifs(event);
    expect(document.querySelector('#gifs-container').innerHTML).toBe('');
  });
});

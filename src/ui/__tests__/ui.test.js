import { checkScroll, updateHelper, addNewGif, removeAllGifs } from '../ui.js';

// '<div id="container"><button id="scrollToTop">▲</button><form action="#" id="GIPHY-form" style="position: fixed;"></form></div>'

describe('checkScroll', () => {
  it("Changes form position and renders a button when the webpage is scrolled down an amount bigger than the window's height", () => {
    document.body.innerHTML =
      '<div id="container"><form action="#" id="GIPHY-form"></form></div>';

    const amountScrolled = 700;
    const windowHeight = 654;

    checkScroll(amountScrolled, windowHeight);

    expect(document.querySelector('#scrollToTop')).toBeTruthy();
    expect(document.querySelector('#GIPHY-form').getAttribute('style')).toBe(
      'position: fixed;'
    );
  });

  it("Changes form position and removes button when the webpage is scrolled up a certain amount less than the window's height", () => {
    document.body.innerHTML =
      '<div id="container"><button id="scrollToTop">▲</button><form action="#" id="GIPHY-form" style="position: fixed;"></form></div>';

    const amountScrolled = 600;
    const windowHeight = 654;

    checkScroll(amountScrolled, windowHeight);

    expect(document.querySelector('#scrollToTop')).toBeFalsy();
    expect(document.querySelector('#GIPHY-form').getAttribute('style')).toBe(
      ''
    );
  });
});

describe('updateHelper', () => {
  it('Alerts the user when a request is not ok or a gif is not found', () => {
    document.body.innerHTML =
      '<div id="helper"><p>Please enter a search term.</p></div>';

    const newMessage = "Can't find any gifs with that term.";

    updateHelper(newMessage);

    expect(document.querySelector('#helper p').textContent).toBe(newMessage);
    expect(document.querySelector('#helper p').className).toBe('invalid');
  });

  it('Cleans helper when request is ok', () => {
    document.body.innerHTML =
      '<div id="helper"><p class="invalid">Can\'t find any gifs with that term.</p></div>';

    const newMessage = '';

    updateHelper(newMessage);

    expect(document.querySelector('#helper p').textContent).toBe(newMessage);
    expect(document.querySelector('#helper p').className).toBe('');
  });
});

describe('addNewGif', () => {
  it('Appends an img element to a container', () => {
    document.body.innerHTML = '<main id="gifs-container"></main>';
    const gifsUrls = [
      'https://media1.giphy.com/media/f4HpCDvF84oh2/giphy.gif?cid=a8315aa0qvbuehyufztymun9chvwx9qxm1yxpsyk0cglfwr2&amp;rid=giphy.gif',
    ];
    addNewGif(gifsUrls);
    expect(document.querySelector('#gifs-container').innerHTML).toBe(
      '<img src="https://media1.giphy.com/media/f4HpCDvF84oh2/giphy.gif?cid=a8315aa0qvbuehyufztymun9chvwx9qxm1yxpsyk0cglfwr2&amp;amp;rid=giphy.gif" class="gif">'
    );
  });
});

describe('removeAllGifs', () => {
  it('Removes all img elements from container', () => {
    document.body.innerHTML =
      '<main id="gifs-container"><img><img><img></main>';
    const event = { preventDefault: () => {} };
    removeAllGifs(event);
    expect(document.querySelector('#gifs-container').innerHTML).toBe('');
  });
});

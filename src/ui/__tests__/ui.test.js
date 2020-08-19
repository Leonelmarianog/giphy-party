import {
  deleteButton,
  renderButton,
  repositionForm,
  updateHelper,
  addNewGif,
  removeAllGifs,
} from '../ui.js';
import fs from 'fs';

describe('deleteButton', () => {
  it('Deletes a button element if it exists', () => {
    document.body.innerHTML = fs.readFileSync(
      'src/ui/__tests__/fixtures/index2.fixture.html'
    );

    deleteButton();
    expect(document.querySelector('#scrollToTop')).toBeFalsy();
  });

  it('Returns if there is no button to delete', () => {
    document.body.innerHTML = fs.readFileSync(
      'src/ui/__tests__/fixtures/index1.fixture.html'
    );

    expect(deleteButton()).toBeFalsy();
  });
});

describe('renderButton', () => {
  it("Creates a new button element if one doesn't exist yet and prepends it to the container element", () => {
    document.body.innerHTML = fs.readFileSync(
      'src/ui/__tests__/fixtures/index1.fixture.html'
    );
    global.scrollTo = jest.fn();

    renderButton();
    expect(document.querySelector('#scrollToTop')).toBeTruthy();
    expect(document.querySelector('#scrollToTop').textContent).toBe('▲');
    expect(
      document
        .querySelector('#container')
        .contains(document.querySelector('#scrollToTop'))
    ).toBeTruthy();

    document.querySelector('#scrollToTop').click();
    expect(global.scrollTo).toBeCalledTimes(1);
  });

  it('Returns if there is a button already on the page', () => {
    document.body.innerHTML = fs.readFileSync(
      'src/ui/__tests__/fixtures/index2.fixture.html'
    );

    expect(renderButton()).toBeFalsy();
  });
});

describe('repositionForm', () => {
  it('Changes form position', () => {
    document.body.innerHTML = fs.readFileSync(
      'src/ui/__tests__/fixtures/index1.fixture.html'
    );

    repositionForm('fixed');
    expect(document.querySelector('#GIPHY-form').getAttribute('style')).toBe(
      'position: fixed;'
    );
  });
});

describe('updateHelper', () => {
  it('Alerts the user when something happens', () => {
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

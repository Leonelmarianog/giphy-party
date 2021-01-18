import setScrollListener from '../scroll';
import body from './fixtures/body';

beforeAll(() => {
  document.body.innerHTML = body;

  // Document.addEventListener mock
  jest.spyOn(document, 'addEventListener').mockImplementation((event, callback) => {
    callback();
  });
});

afterAll(() => jest.restoreAllMocks());

describe('scroll', () => {
  it("Displays a button and sets the form position to fixed when the amount scrolled is bigger than the window's height", () => {
    // Mocking DOM properties
    // https://github.com/jsdom/jsdom/issues/2342
    // https://github.com/testing-library/react-testing-library/issues/353
    Object.defineProperty(window.HTMLHtmlElement.prototype, 'clientHeight', { value: 1200 });
    Object.defineProperty(window, 'pageYOffset', { value: 1500 });

    setScrollListener();

    const $scrollToTopBtn = document.querySelector('#scroll-to-top');
    const $form = document.querySelector('#form');

    expect($scrollToTopBtn).not.toBe(null);
    expect($scrollToTopBtn.id).toBe('scroll-to-top');
    expect($scrollToTopBtn.classList).toContain('scroll-btn');
    expect($scrollToTopBtn.textContent).toEqual(expect.any(String));
    expect($scrollToTopBtn.onclick).toBeInstanceOf(Object);
    expect($form.classList).toContain('form-fixed');
  });

  it("Removes the button and sets the form to position static when the amount scrolled is less than the window's height", () => {
    // We call setScrollListener once to display the button and set form's position
    Object.defineProperty(window.HTMLHtmlElement.prototype, 'clientHeight', { value: 1200 });
    Object.defineProperty(window, 'pageYOffset', { value: 1500 });

    setScrollListener();

    let $scrollToTopBtn = document.querySelector('#scroll-to-top');
    let $form = document.querySelector('#form');

    expect($scrollToTopBtn).not.toBe(null);
    expect($form.classList).toContain('form-fixed');

    // We call setScrollListener again to test that it removes the changes
    Object.defineProperty(window, 'pageYOffset', { value: 1000 });

    setScrollListener();

    $scrollToTopBtn = document.querySelector('#scroll-to-top');
    $form = document.querySelector('#form');

    expect($scrollToTopBtn).toBe(null);
    expect($form.classList).not.toContain('form-fixed');
  });

  it("Doesn't create the scrollToTopButton again if it is already rendered", () => {
    Object.defineProperty(window.HTMLHtmlElement.prototype, 'clientHeight', { value: 1200 });
    Object.defineProperty(window, 'pageYOffset', { value: 1500 });

    setScrollListener();

    const $scrollToTopBtn = document.querySelector('#scroll-to-top');
    const $form = document.querySelector('#form');

    expect($scrollToTopBtn).not.toBe(null);
    expect($form.classList).toContain('form-fixed');

    Object.defineProperty(window, 'pageYOffset', { value: 1600 });

    setScrollListener();

    expect($scrollToTopBtn).not.toBe(null);
    expect($form.classList).toContain('form-fixed');
  });

  it("Doesn't remove the scrollToTopButton again if it is already removed", () => {
    Object.defineProperty(window.HTMLHtmlElement.prototype, 'clientHeight', { value: 1200 });
    Object.defineProperty(window, 'pageYOffset', { value: 1000 });

    setScrollListener();

    const $scrollToTopBtn = document.querySelector('#scroll-to-top');
    const $form = document.querySelector('#form');

    expect($scrollToTopBtn).toBe(null);
    expect($form.classList).not.toContain('form-fixed');

    Object.defineProperty(window, 'pageYOffset', { value: 900 });

    setScrollListener();

    expect($scrollToTopBtn).toBe(null);
    expect($form.classList).not.toContain('form-fixed');
  });
});

describe('scrollToTop button', () => {
  it('Works', () => {
    window.scrollTo = jest.fn();

    Object.defineProperty(window.HTMLHtmlElement.prototype, 'clientHeight', { value: 1200 });
    Object.defineProperty(window, 'pageYOffset', { value: 1500 });

    setScrollListener();

    const $scrollToTopBtn = document.querySelector('#scroll-to-top');

    $scrollToTopBtn.onclick();
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});

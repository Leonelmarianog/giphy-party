import showHelper from '../textHelper';
import body from './fixtures/body';

beforeEach(() => {
  document.body.innerHTML = body;
});

describe('showHelper', () => {
  it('Adds a custom class to a message', () => {
    const errorMessage = 'Something probably bad happened';
    const customClass = 'error';

    showHelper(errorMessage);

    const $message = document.querySelector('#helper > p');

    expect($message.textContent).toBe(errorMessage);
    expect($message.classList).toContain(customClass);
  });

  it('Removes a custom class from a message', () => {
    const errorMessage = '';
    const customClass = 'error';

    showHelper(errorMessage);

    const $message = document.querySelector('#helper > p');

    expect($message.textContent).toBe(errorMessage);
    expect($message.classList).not.toContain(customClass);
  });
});

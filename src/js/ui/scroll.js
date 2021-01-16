function scrollToTop() {
  window.scrollTo(0, 0);
}

function renderButton() {
  const $button = document.querySelector('#scrollToTop');

  if ($button) {
    return false;
  }

  const $container = document.querySelector('#container');
  const $scrollToTopButton = document.createElement('button');
  $scrollToTopButton.id = 'scrollToTop';
  $scrollToTopButton.textContent = '▲';
  $scrollToTopButton.onclick = scrollToTop;
  $container.prepend($scrollToTopButton);
}

function removeButton() {
  const $button = document.querySelector('#scrollToTop');

  if (!$button) {
    return false;
  }

  $button.remove();
}

function formPosition(position) {
  const $form = document.querySelector('#GIPHY-form');
  $form.style.position = position;
}

function manageScroll(amountScrolled, windowHeight) {
  if (amountScrolled < windowHeight) {
    formPosition('static');
    removeButton();
  } else if (amountScrolled > windowHeight) {
    formPosition('fixed');
    renderButton();
  }
}

export default function setScrollListener() {
  document.addEventListener('scroll', () => {
    const amountScrolled = window.pageYOffset;
    const windowHeight = document.documentElement.clientHeight;
    manageScroll(amountScrolled, windowHeight);
  });
}

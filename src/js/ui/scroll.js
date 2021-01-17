function scrollToTop() {
  window.scrollTo(0, 0);
}

function renderButton() {
  const $button = document.querySelector('#scrollToTop');

  if ($button) {
    return;
  }

  const $container = document.querySelector('#container');
  const $scrollToTopButton = document.createElement('button');
  $scrollToTopButton.id = 'scrollToTop';
  $scrollToTopButton.classList.add('scroll-btn');
  $scrollToTopButton.textContent = '▲';
  $scrollToTopButton.onclick = scrollToTop;
  $container.prepend($scrollToTopButton);
}

function removeButton() {
  const $button = document.querySelector('#scrollToTop');

  if (!$button) {
    return;
  }

  $button.remove();
}

function formPosition(position) {
  const $form = document.querySelector('#form');
  if (position === 'fixed') {
    $form.classList.add('form-fixed');
  } else {
    $form.classList.remove('form-fixed');
  }
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

function scrollToTop() {
  window.scrollTo(0, 0);
}

function renderButton() {
  let $scrollToTopButton = document.querySelector('#scroll-to-top');

  if ($scrollToTopButton) {
    return;
  }

  const $container = document.querySelector('#container');
  $scrollToTopButton = document.createElement('button');
  $scrollToTopButton.id = 'scroll-to-top';
  $scrollToTopButton.classList.add('scroll-btn');
  $scrollToTopButton.textContent = '▲';
  $scrollToTopButton.onclick = scrollToTop;
  $container.prepend($scrollToTopButton);
}

function removeButton() {
  const $scrollToTopButton = document.querySelector('#scroll-to-top');

  if (!$scrollToTopButton) {
    return;
  }

  $scrollToTopButton.remove();
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

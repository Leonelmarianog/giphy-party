export default function showHelper(message) {
  const helper = document.querySelector('#helper p');

  if (message) {
    helper.classList.add('invalid');
    helper.textContent = message;
  } else {
    helper.classList.remove('invalid');
    helper.textContent = message;
  }
}

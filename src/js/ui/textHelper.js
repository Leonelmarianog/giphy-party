export default function showHelper(message) {
  const helper = document.querySelector('#helper > p');

  if (message) {
    helper.classList.add('error');
    helper.textContent = message;
  } else {
    helper.classList.remove('error');
    helper.textContent = message;
  }
}

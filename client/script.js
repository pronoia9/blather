import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

function loader(element) {
  element.textContent = '';

  loadInterval = setInterval(() => {
    element.textContent !== '...' ? (element.textContent += '.') : (element.textContent = '');
  }, 300);
}

function typeText(element, text) {
  let index = 0;
  let interval = setInterval(() => {
    if (index < text.length) {
      element.innetHTML += text.charAt(index);
      index++;
    } else clearInterval(interval);
  }, 20);
}

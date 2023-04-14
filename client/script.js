import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form.channel-message-form');
const chatContainer = document.querySelector('#chat_container');

console.log(form);
console.log(chatContainer);

let loadInterval;

// The . . . writing message thing for AI reply
function loader(element) {
  console.log('LOADER()');
  // element.textContent = '';
  // loadInterval = setInterval(() => {
  //   element.textContent !== '...' ? (element.textContent += '.') : (element.textContent = ' ');
  // }, 300);
  element.textContent = '';
  loadInterval = setInterval(() => {
    // Update the text content of the loading indicator
    element.textContent += '.';
    // If the loading indicator has reached three dots, reset it
    if (element.textContent === '....') element.textContent = '';
  }, 300);
}

// AI typing text letter by letter
function typeText(element, text) {
  console.log('TYPETEXT()');
  let index = 0;
  let interval = setInterval(() => {
    if (index < text.length) { element.innerHTML += text.charAt(index); index++; }
    else clearInterval(interval);
  }, 10);
}

// generate unique ID for each message div of bot
// necessary for typing text effect for that specific reply
// without unique ID, typing text will work on every element
function generateUniqueId() {
  console.log('GENERATEUNIQUEID()');
  const timestamp = Date.now(), randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);
  return `id-${timestamp}-${hexadecimalString}`;
}

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('HANDLESUBMIT()');

  console.log('form:', form);
  const data = new FormData(form);
  console.log('data:', data);

  // user's chatstripe
  chatContainer.innerHTML += `<div class='message'><div class='message__body'>${data.get('message')}</div><div class='message__footer'><span class='message__authoring'>User</span> - </div></div>`;

  // to clear the textarea input
  form.reset();

  // bot's chatstripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += `<div class='message message-ai'><div class='message__body' id=${uniqueId}></div><div class='message__footer'><span class='message__authoring'>Codex</span> - </div></div>`;

  // to focus scroll to the bottom
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // specific message div
  const messageDiv = document.getElementById(uniqueId);

  // messageDiv.innerHTML = "..."
  // loader(messageDiv);

  const response = await fetch('http://localhost:5005/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: data.get('message') }),
  });

  clearInterval(loadInterval);
  // messageDiv.innerHTML = ' ';

  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim(); // trims any trailing spaces/'\n'
    typeText(messageDiv, parsedData);
  } else {
    const err = await response.text();
    messageDiv.innerHTML = 'Something went wrong';
    alert(err);
  }
};

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  console.log('EVENT LISTENER (keyup)');
  if (e.keyCode === 13) handleSubmit(e);
});

function getDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

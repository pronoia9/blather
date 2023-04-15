import { useState } from 'react';
import axios from 'axios';

import MessagesTopBar from './MessagesTopBar';
import { generateUniqueId, getDate, loader, typeText } from '../utils/utils';

const Message = ({ id, message, from, time }) => {
  return (
    <div className={`message${from == 'Codex' ? ' message-ai' : ''}`} id={id}>
      <div className='message__body'>{message}</div>
      <div className='message__footer'><span className='message__authoring'>{from}{time}</span></div>
    </div>
  );
};

const hardMessages = [
  { message: 'Hi, how are you doing?', from: 'An Awesome User', time: ' - 10:30 PM', id: 'asdq3edsadfq13r' },
  { message: 'Stop bothering me with useless questions.', from: 'Codex', time: ' - 10:31 PM', id: '51dq3edadfq13r' },
];

const Messages = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(hardMessages);
  let loadInterval;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Users message
    setMessages([...messages, {}])
    // reset users input
    setMessage('');
  };

  return (
    <div className='app-main'>
      <div className='channel-feed'>
        {/* Only Visual Not Functional */}
        <MessagesTopBar />

        {/* Messages Area */}
        <div id='chat_container' className='channel-feed__body'>
          {hardMessages.map((msg) => (
            <Message key={msg.id} {...msg} />
          ))}
        </div>

        {/* Input / Send Message */}
        <div className='channel-feed__footer'>
          <form className='channel-message-form' onSubmit={(e) => handleSubmit(e)}>
            <div className='form-group'>
              <label className='form-label' htmlFor='message'>
                Message
              </label>
              <div className='form-control'>
                <textarea
                  id='message'
                  className='form-control'
                  name='message'
                  placeholder='Ask Codex...'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => { if (e.keyCode == 13 && !e.shiftKey) handleSubmit(e); }}></textarea>
              </div>
            </div>
            <div className='form-footer'>
              <button className='button button--primary button--size-xl' type='submit'>
                <span className='button__content'>Send</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;

async function handleSubmit(e) {
  e.preventDefault();
  const data = new FormData(form);

  // user's message
  chatContainer.innerHTML += message(false, data.get('message'));

  // to clear the textarea input
  form.reset();

  // bot's message
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += message(true, ' ', uniqueId);

  // to focus scroll to the bottom
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // specific message div
  const messageDiv = document.querySelector(`[id='${uniqueId}'] .message__body`);
  loader(messageDiv);

  const response = await fetch(import.meta.env.VITE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: data.get('message') }),
  });

  clearInterval(loadInterval);
  messageDiv.innerHTML = '';

  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim(); // trims any trailing spaces/'\n'
    typeText(messageDiv, parsedData, uniqueId);
  } else {
    const err = await response.text();
    messageDiv.innerHTML = 'Something went wrong';
    alert(err);
  }
}

function message(isAi, value, uniqueId) {
  return `<div class='message${isAi ? ' message-ai' : ''}' id=${
    uniqueId || generateUniqueId()
  }><div class='message__body'>${value}</div><div class='message__footer'><span class='message__authoring'>${
    !isAi ? 'An Awesome User' : 'Codex'
  }</span>${!isAi ? getDate(new Date()) : ''}</div></div>`;
}

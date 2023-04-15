import { useState } from 'react';
import axios from 'axios';

import MessagesTopBar from './MessagesTopBar';

const Messages = () => {
  const [message, setMessage] = useState('');

  return (
    <div className='app-main'>
      <div className='channel-feed'>
        {/* Only Visual Not Functional */}
        <MessagesTopBar />

        {/* Messages / Texting Area */}
        <div id='chat_container' className='channel-feed__body'></div>
        {/* Input / Send Message */}
        <div className='channel-feed__footer'>
          <form className='channel-message-form'>
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
                  onChange={(e) => setMessage(e.target.value)}></textarea>
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

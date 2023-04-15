import { useState, useEffect } from 'react';
import axios from 'axios';

import MessagesTopBar from './MessagesTopBar';
import { generateUniqueId, getTimestamp, loader, typeText } from '../utils/utils';

const Message = ({ id, message, from, time }) => {
  return (
    <div className={`message${from == 'Codex' ? ' message-ai' : ''}`} id={id}>
      <div className='message__body'>{message}</div>
      <div className='message__footer'>
        <span className='message__authoring'>
          {from}
          {time}
        </span>
      </div>
    </div>
  );
};

const Messages = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 'asdq3edsadfq13r', from: 'An Awesome User', message: 'Hi, how are you doing?', time: ' - 10:30 PM' },
    { id: '51dq3edadfq13r', from: 'Codex', message: 'Stop bothering me with useless questions.', time: ' - 10:31 PM' },
  ]);
  const [lastUID, setLastUID] = useState('');
  const [loading, setLoading] = useState(false);
  let loadInterval;

  const addMessage = (id, from, message, time) => {
    setMessages((messages) => [...messages, { id, from, message, time }]);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Return if there's no input
    if (!input.trim().length) {
      alert('You gotta type something you know...');
      return;
    }

    // Add user's message
    addMessage(generateUniqueId(), 'An Awesome User', input, getTimestamp(new Date()))
    // Reset user input/textarea
    setInput('');
    
    
    // Save the bot's unique id
    const uniqueId = generateUniqueId();
    setLastUID(uniqueId);
    // Add empty message for bot
    addMessage(uniqueId, 'Codex', ' ', '');

    // Do the . . . loading/typing for bot
    // loader()
    // console.log(messages);
  };

  useEffect(() => {
    console.log('messages (UE)', messages);
    console.log('last uid (UE)', lastUID);

    if (lastUID) {
      const x = messages.find((msg) => msg.id == lastUID);
      console.log('2nd UE', x);
      // setMessages([...messages, { ...x, message: '...' }]);

    }
  }, [messages]);

  return (
    <div className='app-main'>
      <div className='channel-feed'>
        {/* Only Visual Not Functional */}
        <MessagesTopBar />

        {/* Messages Area */}
        <div id='chat_container' className='channel-feed__body'>
          {messages.map((msg) => (
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
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.keyCode == 13 && !e.shiftKey) handleSubmit(e);
                  }}></textarea>
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

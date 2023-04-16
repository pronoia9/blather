import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import MessagesTopBar from './MessagesTopBar';
import { generateUniqueId, getTimestamp } from '../utils/utils';

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
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [fetched, setFetched] = useState(false);
  let lastUid = useRef(),
    loadInterval = useRef(),
    index = useRef();

  const loader = () => {};

  const typeText = () => { };

  const addMessage = (id, from, message, time) => {
    setMessages((messages) => [...messages, { id, from, message, time }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim().length) return alert('You gotta type something you know...');

    addMessage(generateUniqueId(), 'An Awesome User', input, getTimestamp(new Date())); // Add user's message
    setInput(''); // Reset user input/textarea

    lastUid.current = generateUniqueId(); // Save the bot's unique id
    addMessage(lastUid.current, 'Codex', ' ', ''); // Add empty message for bot
    setLoading(lastUid.current); // Set loading to bots id to useEffect and load the typing ...s

    // Fetch AI's response
    setTimeout(() => {
      console.log('Setting fetched now...');
      setFetched("I can't be bothered to fetch and waste my OpenAI free plan...");
    }, 3000);
  };

  useEffect(() => {
    if (loading) {
      loadInterval.current = setInterval(() => {
        // To do the loading thing, have to set the whole messages again with an update to the message T_T
        setMessages(messages.map((msg) => {
          if (msg.id === lastUid.current) msg.message.includes('...') ? (msg.message = ' ') : (msg.message += '.');
          return msg;
        }));
      }, 300);
      console.log('Interval set!', loadInterval);
    } else {
      console.log('Loading is now set to false!');
      console.log('Clearing interval...', loadInterval);
      clearInterval(loadInterval.current);
      // setMessages(messages?.map((msg) => {
      //   if (msg.id === loading || lastUid) msg.message = ' ';
      // }))
      console.log('Interval should be cleared!', loadInterval);
    }
  }, [loading]);

  useEffect(() => {
    if (fetched) {
      console.log('Fetch set to a string!', fetched);
      console.log('Setting loading false...');
      setLoading(false);

    }
    else setTyping(true);
  }, [fetched]);

  useEffect(() => {
    let i = 0, interval;
    if (typing) {
      setMessages(messages.map((msg) => {
        console.log('MSG', msg);
      }))
     }
    else console.log('typing is false');
  }, [typing]);


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // useEffect(() => { console.log('[UE] Messages updated!', messages); } , [messages])
  useEffect(() => { console.log(`\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t[UE] Loading state changed to`, loading); }, [loading]);
  useEffect(() => { console.log(`\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t[UE] Typing  state changed to`, typing); }, [typing]);
  useEffect(() => { console.log(`\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t[UE] Fetched state changed to`, fetched); }, [fetched]);
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className='app-main'>
      <div className='channel-feed'>
        {/* Only Visual Not Functional */}
        <MessagesTopBar />

        {/* Messages Area */}
        <div id='chat_container' className='channel-feed__body'>
          {messages?.map((msg) => (
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

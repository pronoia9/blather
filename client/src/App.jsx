import { useState, useEffect } from 'react';
import axios from 'axios';

import { Loader, Messages, Navbar, SidebarLeft, SidebarRight } from './components';

function App() {
  const [tags, setTags] = useState(localStorage.getItem('codexTags') || '');
  const [links, setLinks] = useState(localStorage.getItem('codexLinks') || '');
  const [poem, setPoem] = useState(localStorage.getItem('codexPoem') || '');
  const [loading, setLoading] = useState(1);
  const [messages, setMessages] = useState([]);

  // Check if theres data in local storage, if not fetch data
  // Once fetching from either openai or localstorage is done, format it
  useEffect(() => {
    if (!tags.length) fetchTags(); // else console.log('we already have tags!', tags);
    if (!links.length) fetchLinks(); // else console.log('we already have links!', tags);
    if (!poem.length) fetchPoem(); // else console.log('we already have a poem!', tags);
  }, []);

  // Once everythings fetched, check if the states have proper data, then cancel the loading screen
  useEffect(() => { setLoading(!(tags.length && links.length && poem.length)); }, [tags, links, poem]);

  // TAGS
  async function fetchTags() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_URL,
        { prompt: 'Get me the 5 trending twitter links and their tags in a json string format and remove whitespace' },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setTags(response.data.bot.trim());
      localStorage.setItem('codexTags', response.data.bot.trim());
    } catch (error) {
      console.error(error);
      console.alert('There was an error fetching tags from Codex.');
    }
  }

  // LINKS
  async function fetchLinks() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_URL,
        { prompt: 'Give at least 7 links about programming and their title in a json string format and remove whitespace' },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setLinks(response.data.bot.trim());
      localStorage.setItem('codexLinks', response.data.bot.trim());
    } catch (error) {
      console.error(error);
      console.alert('There was an error fetching links from Codex.');
    }
  }

  // POEM
  async function fetchPoem() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_URL,
        { prompt: 'Give me a random short poem' },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setPoem(response.data.bot.trim());
      localStorage.setItem('codexPoem', response.data.bot.trim());
      console.log('Finished fetching poems from Codex.');
    } catch (error) {
      console.error(error);
      console.alert('There was an error fetching poems from Codex.');
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='app-skeleton'>
          <Navbar />
          <div className='app-container'>
            <SidebarLeft tags={tags} links={links} />
            <Messages messages={messages} setMessages={setMessages} />
            <SidebarRight poem={poem} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;

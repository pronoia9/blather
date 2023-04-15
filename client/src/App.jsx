import { useState, useEffect } from 'react';
import axios from 'axios';

import { Loader, Messages, Navbar, SidebarLeft, SidebarRight } from './components';

function App() {
  const [tags, setTags] = useState('');
  const [links, setLinks] = useState('');
  const [poem, setPoem] = useState('');
  const [loading, setLoading] = useState(!(poem.length && tags.length && links.length));

  useEffect(() => {
    console.log('poem', poem.length);
    console.log('tags', tags.length);
    console.log('links', links.length);
    setLoading(!(poem.length || tags.length || links.length));
  }, [tags, links, poem]);

  // TAGS
  async function fetchTags() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_URL,
        { prompt: 'Get me the 5 trending twitter links and their tags in a json string format and remove whitespace' },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setTags(Object.values(JSON.parse(response.data.bot.trim())));
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => { fetchTags(); }, []);

  // LINKS

  // POEM
  async function fetchPoem() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_URL,
        { prompt: 'Give me a random short poem' },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setPoem(`\n${response.data.bot.trim()}`);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => { fetchPoem(); }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='app-skeleton'>
          <Navbar />
          <div className='app-container'>
            <SidebarLeft tags={tags} links={links} />
            <Messages />
            <SidebarRight poem={poem} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;

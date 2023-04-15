import { useState, useEffect } from 'react';
import axios from 'axios';

import { Loader, Messages, Navbar, SidebarLeft, SidebarRight } from './components';

function App() {
  const [tags, setTags] = useState('');
  const [links, setLinks] = useState('');
  const [poem, setPoem] = useState('');
  const [loading, setLoading] = useState(1);

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

  // LINKS
  async function fetchLinks() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_URL,
        { prompt: 'Give at least 7 links about programming and their title in a json string format and remove whitespace' },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setLinks(Object.values(JSON.parse(response.data.bot.trim())));
    } catch (error) {
      console.error(error);
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
      setPoem(`\n${response.data.bot.trim()}`);
    } catch (error) {
      console.error(error);
    }
  }

  // Fetch everything 
  useEffect(() => { fetchTags(); fetchLinks(); fetchPoem(); }, []);
  // Once everythings fetched, check if the states have proper data, then cancel the loading screen
  useEffect(() => { setLoading(!(tags.length && links.length && poem.length)); }, [tags, links, poem]);

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

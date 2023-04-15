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
  }, [tags, links, poem])

  // TAGS

  // LINKS
  
  // POEM
  async function getPoem() {
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
  useEffect(() => {
    getPoem();
  }, []);

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

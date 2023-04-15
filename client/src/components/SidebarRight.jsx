import { useState, useEffect } from 'react';
import axios from 'axios';

const SidebarRight = () => {
  const [poem, setPoem] = useState('');

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

  useEffect(() => { getPoem(); }, []);

  return (
    <div className='app-b'>
      <div className='pad'>
        <div className='pad__body'>
          <h4 className='text-heading3'>What's this?</h4>
          <p className='text-paragraph1'>{poem}</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarRight;

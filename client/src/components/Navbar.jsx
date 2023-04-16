import React from 'react';

const Navbar = () => {
  return (
    <header className='app-header'>
      {/* Logo-like Title */}
      <div className='app-header__anchor'>
        <span className='app-header__anchor__text'>Codex - Your Coding AI</span>
      </div>
      {/* Navbar */}
      <nav>
        <ul className='nav'>
          <li className='nav__item'>
            <a className='nav__link' href='#'>
              <span className='nav__link__element'>Home</span>
            </a>
          </li>
          <li className='nav__item'>
            <a className='nav__link nav__link--active' href='https://openai.com'>
              <span className='nav__link__element'>Open AI</span>
              <span className='nav__link__element'>
                <span className='badge'>new</span>
              </span>
            </a>
          </li>
          <li className='nav__item'>
            <a className='nav__link' href='http://github.com/' target='_blank'>
              <span className='nav__link__element'>GitHub</span>
            </a>
          </li>
          <li className='nav__item'>
            <a className='nav__link' href='http://vercel.com/' target='_blank'>
              <span className='nav__link__element'>Vercel</span>
            </a>
          </li>
          <li className='nav__item'>
            <a className='nav__link' href='https://dashboard.render.com/' target='_blank'>
              <span className='nav__link__element'>Render</span>
            </a>
          </li>
        </ul>
      </nav>
      {/* Need it as space */}
      <div></div>
    </header>
  );
};

export default Navbar;

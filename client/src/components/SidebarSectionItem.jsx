import React from 'react';

const SidebarSectionItem = ({ type, url, title }) => {
  return (
    <li className='nav__item'>
      <a className='nav__link' href={url} target='_blank'>
        <span className={`${type == 'tag' ? 'channel' : 'conversation'}-link`}>
          <span className={`${type == 'tag' ? 'channel' : 'conversation'}-link__icon`}>{type == 'tag' ? '#' : ' '}</span>
          <span className={`${type == 'tag' ? 'channel' : 'conversation'}-link__element`}>{title}</span>
        </span>
      </a>
    </li>
  );
};

export default SidebarSectionItem;

import React from 'react'

const SidebarSection = ({type, title, children}) => {
  return (
    <div className={`nav-section nav-${type}`}>
      <div className='nav-section__header'>
        <h2 className='nav-section__title'>{title}</h2>
      </div>
      <div className='nav-section__body'>
        <ul className='nav'>{children}</ul>
      </div>
    </div>
  );
}

export default SidebarSection
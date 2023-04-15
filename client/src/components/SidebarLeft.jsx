import React from 'react';

const SidebarLeft = ({ tags, links }) => {
  console.log('tags', tags);
  console.log('links', links);
  return (
    <div className='app-a'>
      <div className='segment-topbar'>
        <div className='segment-topbar__header'>
          <h3 className='text-heading3 segment-topbar__title'>Messages</h3>
        </div>
        <div className='segment-topbar__aside'>
          <div className='button-toolbar'>
            <a className='button button--primary button--size-lg'>
              <svg className='button__icon' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                <path d='M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z'></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className='form-search'>
        <div className='form-group'>
          <div className='form-control form-control--with-addon'>
            {/* <input name="query" placeholder="Search..." type="text" /> */}
            <div className='form-control__addon form-control__addon--prefix'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                <path d='M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z'></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className='nav-section nav-tags'>
        <div className='nav-section__header'>
          <h2 className='nav-section__title'>Trending</h2>
        </div>
        <div className='nav-section__body'>
          <ul className='nav'>
            {tags?.length &&
              tags.map(({ url, tags }) => (
                <li key={tags[0]} className='nav__item'>
                  <a className='nav__link' href={`${url}`} target='_blank'>
                    <span className='channel-link'>
                      <span className='channel-link__icon'>#</span>
                      <span className='channel-link__element'>{tags[0]}</span>
                    </span>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className='nav-section nav-links'>
        <div className='nav-section__header'>
          <h2 className='nav-section__title'>Links</h2>
        </div>
        <div className='nav-section__body'>
          <ul className='nav'>
            {links?.length &&
              links.map((link, i) => {
                if (!(i % 2)) {
                  return (
                    <li className='nav__item'>
                      <a className='nav__link' href={`${links[i]}`} target='_blank'>
                        <span className='conversation-link'>
                          <span className='conversation-link__icon'> </span>
                          <span className='conversation-link__element'>{links[i + 1]}</span>
                        </span>
                      </a>
                    </li>
                  );
                }
              }
              )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidebarLeft;

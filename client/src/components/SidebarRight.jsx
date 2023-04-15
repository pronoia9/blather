const SidebarRight = ({ poem }) => {
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

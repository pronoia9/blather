import { Messages, Navbar, SidebarLeft, SidebarRight } from './components';

function App() {
  return (
    <div className='app-skeleton'>
      <Navbar />

      <div className='app-container'>
        <SidebarLeft />
        <Messages />
        <SidebarRight />
      </div>
    </div>
  );
}

export default App;

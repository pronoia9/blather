import MessagesTopBar from "./MessagesTopBar";

const Messages = () => {
  return (
    <div className='app-main'>
      <div className='channel-feed'>
        {/* Only Visual Not Functional */}
        <MessagesTopBar />

        {/* Messages / Texting Area */}
        <div id='chat_container' className='channel-feed__body'></div>
        {/* Input / Send Message */}
        <div className='channel-feed__footer'>
          <form className='channel-message-form'>
            <div className='form-group'>
              <label className='form-label' htmlFor='message'>
                Message
              </label>
              <div className='form-control'>
                <textarea id='message' className='form-control' name='message' placeholder='Ask Codex...'></textarea>
              </div>
            </div>
            <div className='form-footer'>
              <button className='button button--primary button--size-xl' type='submit'>
                <span className='button__content'>Send</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;

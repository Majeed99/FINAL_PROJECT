import "../styles/chat-style.css";

function Chat() {
  return (
    <div>
      <div className="chatInfoHeader">
        <img
          src="http://res.cloudinary.com/location-based-socail/image/upload/v1639725166/DDEE32CD-A69B-4B3E-8B84-8086AD573F97_krjwru.jpg"
          alt="avatar"
        />
        <div className="userNameChatHeader">
          <p> abdulmajeed</p>
          <p className="userNameTitle"> @Majeedx99</p>
        </div>
      </div>
      <div className="ChattingPage">
        <div className="messageCard">
          <p className="messageText">HELLO MOHAMMED</p>
          <p className="TimeMessage">12:00</p>
        </div>
      </div>
      <div className="sendingPart">
        <form>
          <input type="text" className="chatInput" />
          <button type="submit" className="chatButton">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;

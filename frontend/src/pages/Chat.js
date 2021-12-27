import "../styles/chat-style.css";
import calcTime from "../functions/calcTime";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect();
function Chat() {
  let token, userId;
  const navigate = useNavigate();
  const [textMessage, setTextMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    const cookieCheck = document.cookie;
    if (cookieCheck === "") {
      navigate("/signin");
      return;
    }
    token = document.cookie.split("=")[1];
    userId = atob(token.split(".")[1]);
    socket.emit("join_room", "testRoom");
  }, []);
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  async function sendMessage() {
    token = document.cookie.split("=")[1];
    userId = atob(token.split(".")[1]);

    if (textMessage !== "") {
      const messageData = {
        room: "testRoom",
        author: userId,
        message: textMessage,
        time: new Date(),
      };
      await socket.emit("send_message", messageData);
      setTextMessage("");
      setMessageList((list) => [...list, messageData]);
    }
  }

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
        {messageList.map((e) => {
          token = document.cookie.split("=")[1];
          userId = atob(token.split(".")[1]);
          return e.author === userId ? (
            <div className="messageCard">
              <p className="messageText">{e.message}</p>
              <p className="TimeMessage">{calcTime(e.time)}</p>
            </div>
          ) : (
            <div className="messageCard_receive">
              <p className="messageText__receive">{e.message}</p>
              <p className="TimeMessage__receive">{calcTime(e.time)}</p>
            </div>
          );
        })}
      </div>
      <div className="sendingPart">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <input
            type="text"
            className="chatInput"
            value={textMessage}
            onChange={(e) => {
              e.preventDefault();
              setTextMessage(e.target.value);
            }}
          />
          <button type="submit" className="chatButton">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;

import "../styles/chat-style.css";
import calcTime from "../functions/calcTime";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import ScrollToBottom from "react-scroll-to-bottom";

const socket = io.connect();
function Chat() {
  let token, userId;
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  let [countRender, setCountRender] = useState(0);
  const [textMessage, setTextMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [data, setData] = useState({});
  const { roomId } = useParams();

  useEffect(() => {
    const cookieCheck = document.cookie;
    if (cookieCheck === "") {
      navigate("/signin");
      return;
    }
    token = document.cookie.split("=")[1];
    userId = atob(token.split(".")[1]);
    axios.get(`/api/chats/getChatInfo/${userId}/${roomId}`).then((res) => {
      console.log(res.data);
      setData(res.data);
      setMessageList(res.data.result.messagesList);
      socket.emit("join_room", res.data.result.RoomId);
      setloading(false);
    });
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
        room: data.result.RoomId,
        author: userId,
        message: textMessage,
        time: new Date(),
      };
      setTextMessage("");
      setCountRender(++countRender);
      setMessageList((list) => [...list, messageData]);
      await socket.emit("send_message", messageData);
      // ===============
    }
  }

  useEffect(() => {
    token = document.cookie.split("=")[1];
    userId = atob(token.split(".")[1]);
    if (countRender !== 0) {
      axios
        .post(
          "/api/chats/saveMessagesList/" + userId + "/" + data.result.RoomId,
          {
            messageList: messageList,
          }
        )
        .then((res) => {
          console.log(res.data);
        });
    }
  }, [countRender]);

  if (loading) return <Loading />;
  return (
    <div>
      <div className="chatInfoHeader">
        <img src={data.friendInfo.avatar} alt="avatar" />
        <div className="userNameChatHeader">
          <p> {data.friendInfo.name}</p>
          <p className="userNameTitle"> @{data.friendInfo.userName}</p>
        </div>
      </div>

      <ScrollToBottom className="ChattingPage">
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
      </ScrollToBottom>

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

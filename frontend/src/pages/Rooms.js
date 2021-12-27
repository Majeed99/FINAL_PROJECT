import "../styles/Rooms-style.css";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Rooms() {
  const navigate = useNavigate();
  const [DataSearched, setDataSearched] = useState([]);
  const [Rooms, setRooms] = useState([]);
  const [loading, setloading] = useState(false);
  const [loadingForPage, setloadingForPage] = useState(true);

  const [displayFriend, setdisplayFriend] = useState(false);
  useEffect(() => {
    let token = document.cookie.split("=")[1];
    let userId = atob(token.split(".")[1]);

    axios
      .get("/api/chats/getChats/" + userId)
      .then((res) => {
        console.log(res.data);
        setRooms(res.data);
        setloadingForPage(false);
      })
      .catch();
  }, []);

  function searchFriend(value) {
    let token = document.cookie.split("=")[1];
    let userId = atob(token.split(".")[1]);
    axios
      .post("/api/friends/searchFromFriends", { value: value, userId: userId })
      .then((res) => {
        setDataSearched(res.data);
        setloading(false);
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  }

  function openRoom(FriendId) {
    let token = document.cookie.split("=")[1];
    let userId = atob(token.split(".")[1]);

    const data = { usersOfRoom: [userId, FriendId] };
    axios.post("/api/chats/createRoom/" + userId, data).then((res) => {
      console.log(res.data);
    });
  }

  if (loadingForPage) return <Loading />;
  return (
    <div>
      <div className="RoomHeader">
        <input
          type="text"
          className="searchForChat"
          placeholder="Search"
          onChange={(e) => {
            e.preventDefault();
            if (e.target.value === "") {
              setdisplayFriend(false);
              return;
            } else {
              searchFriend(e.target.value);
              setdisplayFriend(true);
              setloading(true);
            }
          }}
        />
        {displayFriend ? (
          <div className="searchContainer">
            {loading ? (
              <Loading />
            ) : (
              <div>
                {DataSearched.length != 0 ? (
                  DataSearched.map((e) => {
                    return (
                      <div className="UserChat">
                        <img src={e.avatar} alt="avatar" />
                        <div className="ChatInfo">
                          <p className="usernameChat"> {e.name}</p>
                          <p className="lastMessage"> {e.userName}</p>
                        </div>
                        <div
                          className="startChat"
                          onClick={() => {
                            openRoom(e._id);
                          }}
                        >
                          Start chatting
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="noFriends">
                    There is no friends with this username
                  </p>
                )}
              </div>
            )}
          </div>
        ) : null}
      </div>
      <div className="RoomBody">
        {Rooms.map((el) => {
          return (
            <div
              className="UserChat"
              onClick={() => {
                navigate("/Chat/" + el.room.RoomId);
              }}
            >
              <img src={el.user.avatar} alt="avatar" />

              <div className="ChatInfo">
                <p className="usernameChat"> {el.user.name}</p>
                {el.room.messagesList.length !== 0 ? (
                  <p className="lastMessage">
                    {" "}
                    {
                      el.room.messagesList[el.room.messagesList.length - 1]
                        .author
                    }
                    :
                    {
                      el.room.messagesList[el.room.messagesList.length - 1]
                        .message
                    }
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Rooms;

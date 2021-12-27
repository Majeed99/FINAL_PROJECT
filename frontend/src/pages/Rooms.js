import "../styles/Rooms-style.css";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import axios from "axios";

function Rooms() {
  const [DataSearched, setDataSearched] = useState([]);
  const [loading, setloading] = useState(false);
  const [displayFriend, setdisplayFriend] = useState(false);
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
        <div className="UserChat">
          <img
            src="http://res.cloudinary.com/location-based-socail/image/upload/v1639725166/DDEE32CD-A69B-4B3E-8B84-8086AD573F97_krjwru.jpg"
            alt="avatar"
          />
          <div className="ChatInfo">
            <p className="usernameChat"> Abdulmajeed</p>
            <p className="lastMessage"> fahad: hello</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rooms;

import "../styles/Friends-style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../components/UserCard";
import Loading from "../components/Loading";
import CheckAuthorization from "../functions/CheckAuthorization";

function Friends() {
  const check = CheckAuthorization();
  let token;
  let userId;
  if (check) {
    token = document.cookie.split("=")[1];
    userId = atob(token.split(".")[1]);
  }
  const [Friends, setFriends] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    axios.get("/api/friends/getAllFriends/" + userId).then((res) => {
      setloading(false);
      setFriends(res.data);
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <div className="yourFriends__header"> My Friends</div>
      <div className="page">
        {Friends.map((el) => {
          return <UserCard user={el} />;
        })}
      </div>
    </div>
  );
}

export default Friends;

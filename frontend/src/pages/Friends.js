import "../styles/Friends-style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";
import Loading from "../components/Loading";


function Friends() {
  const navigate = useNavigate();
  const [Friends, setFriends] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const cookieCheck = document.cookie;
    if (cookieCheck === "") {
      navigate("/signin");
      return;
    }
    const token = cookieCheck.split("=")[1];
    const userId = atob(token.split(".")[1]);
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

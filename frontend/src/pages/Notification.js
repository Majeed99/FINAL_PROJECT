import { useEffect, useState } from "react";
import axios from "axios";
import RequestCard from "../components/RequestCard";

function Notification() {
  const [RequestUser, setRequestUser] = useState([]);

  const token = document.cookie.split("=")[1];
  const userId = atob(token.split(".")[1]);
  useEffect(() => {
    axios("/api/friends/getAllRequest/" + userId).then((res) => {
      setRequestUser(res.data);
    });
  }, []);
  return (
    <div>
      <div className="yourFriends__header"> All Requests</div>
      <div className="page">
        {RequestUser.map((e) => {
          return <RequestCard user={e} />;
        })}
      </div>
    </div>
  );
}

export default Notification;

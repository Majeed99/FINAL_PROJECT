import { useEffect, useState } from "react";
import axios from "axios";
// import RequestCard from "../components/RequestCard";
import { useNavigate } from "react-router-dom";
import "../styles/RequestCard-style.css";
import { FaCheck } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
import Loading from "../components/Loading";

function Notification() {
  const [RequestUser, setRequestUser] = useState([]);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  let token, userId;

  useEffect(() => {
    const cookieCheck = document.cookie;
    if (cookieCheck === "") {
      navigate("/signin");
      return;
    }
    token = cookieCheck.split("=")[1];
    userId = atob(token.split(".")[1]);
    fetchRequests();
  }, []);
  async function fetchRequests() {
    await axios("/api/friends/getAllRequest/" + userId).then((res) => {
      setRequestUser(res.data);
      setloading(false);
    });
  }

  function reject(id) {
    const cookieCheck = document.cookie;
    token = cookieCheck.split("=")[1];
    userId = atob(token.split(".")[1]);
    axios
      .delete("/api/friends/reject", {
        data: { userId: userId, friendId: id },
      })
      .then((res) => {
        fetchRequests();
      });
  }
  function accept(id) {
    const cookieCheck = document.cookie;
    token = cookieCheck.split("=")[1];
    userId = atob(token.split(".")[1]);
    axios
      .post("/api/friends/accept", { userId: userId, friendId: id })
      .then((res) => {
        fetchRequests();
      });
  }

  if (loading) return <Loading />;
  return (
    <div>
      <div className="yourFriends__header"> All Requests</div>
      <div className="page">
        {RequestUser.map((e) => {
          return (
            <div className="friend__Card">
              <div
                className="display-flex"
                onClick={() => {
                  navigate("/user/" + e._id);
                }}
              >
                <img src={e.avatar} alt="" />
                <div className="user__names__req">
                  <b>{e.name}</b>
                  <p>@{e.userName}</p>
                </div>
              </div>
              <div className="control_req_btns">
                <button
                  className="accept_btn"
                  onClick={(element) => {
                    element.preventDefault();
                    accept(e._id);
                  }}
                >
                  {" "}
                  <FaCheck fill="white" />
                </button>
                <button
                  className="reject_btn"
                  onClick={(element) => {
                    element.preventDefault();
                    reject(e._id);
                  }}
                >
                  {" "}
                  <RiCloseFill fill="white" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Notification;

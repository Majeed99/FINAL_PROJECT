import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../styles/User-style.css";

function User() {
  const token = document.cookie.split("=")[1];
  const userId = atob(token.split(".")[1]);
  const { id } = useParams();
  const [UserData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [relation, setRelation] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (userId === id) navigate("/profile");
    else fetchData();
  }, []);

  async function fetchData() {
    const res = await axios.get("/api/users/getUser/" + id);
    const data = await res.data;
    await setUserData(data);
    setLoading(false);
    if (data.friends.includes(userId)) setRelation("friends");
    else if (data.requests.includes(userId)) setRelation("requested");
    else setRelation("");
    // console.log(data);
  }

  async function sendRequest() {
    axios
      .post("/api/friends/request", { userId: userId, friendId: id })
      .then((res) => {
        fetchData();
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  }

  async function cancelRequest() {
    const data = await { userId: userId, friendId: id };
    axios
      .delete("/api/friends/cancel", { data: data })
      .then((res) => {
        fetchData();
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  }

  if (loading) return <Loading />;
  return (
    <div>
      <div className="first">
        <img className="img__header" src={UserData.header} alt="header" />
        <img className="img__avatar" src={UserData.avatar} alt="header" />
        <div className="for__top">
          <b>{UserData.name}</b>
          <br />
          <p className="userName">@{UserData.userName}</p>
          <p className="profile__bio">{UserData.bio}</p>
          <p className="profile__location">{UserData.location}</p>

          <div className="">
            {relation === "" ? (
              <button
                className="request__btn"
                onClick={(e) => {
                  e.preventDefault();
                  sendRequest();
                }}
              >
                Request
              </button>
            ) : relation === "requested" ? (
              <button
                className="pending__btn"
                onClick={(e) => {
                  e.preventDefault();
                  cancelRequest();
                }}
              >
                Pending
              </button>
            ) : null}
          </div>
          <hr />
          <div>You can't see there posts if you are not a friends</div>
        </div>
      </div>
    </div>
  );
}

export default User;

import "../styles/Profile-style.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import PostCard from "../components/PostCard";
import { IoIosNotifications } from "react-icons/io";

function Profile() {
  const navigate = useNavigate();
  const [UserData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const token = document.cookie.split("=")[1];
    const userId = atob(token.split(".")[1]);
    const res = await axios.get("/api/users/getUser/" + userId);
    const data = await res.data;
    await setUserData(data);
    setLoading(false);
    console.log(data);
  }
  if (loading) return <Loading />;
  return (
    <div>
      <div className="first">
        <div className="text_center">
          <img className="img__header" src={UserData.header} alt="header" />
          <img className="img__avatar" src={UserData.avatar} alt="header" />
          <div
            className="requests"
            onClick={() => {
              navigate("/notification");
            }}
          >
            <IoIosNotifications className="notification__icon" />
            {UserData.requests.length}
          </div>
          <div className="for__top">
            <b>{UserData.name}</b>
            <br />
            <p className="userName">@{UserData.userName}</p>
            <p className="profile__bio">{UserData.bio}</p>
            <p className="profile__location">{UserData.location}</p>

            <div className="two_btns_cover">
              <Link to="/Friends" className="friends__Card">
                {" "}
                Friends {UserData.friends.length}
              </Link>
              <Link to="/editProfile" className="friends__Card">
                {" "}
                Edit
              </Link>
            </div>
            <hr />
          </div>
        </div>
      </div>
      <div className="page">
        {UserData.posts.map((el) => {
          return <PostCard el={el} user={UserData} />;
        })}
      </div>
    </div>
  );
}

export default Profile;

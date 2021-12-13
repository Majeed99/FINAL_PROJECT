import "../styles/Profile-style.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";

function Profile() {
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
        <img className="img__header" src={UserData.header} alt="header" />
        <img className="img__avatar" src={UserData.avatar} alt="header" />
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
      <div className="page">
        <div className="post_Card">
          <div className="post_Card_avatar">
            <img
              src="https://pbs.twimg.com/profile_images/1173367116562685954/k-MYyrws_400x400.jpg"
              alt="avatar"
            />
          </div>

          <div className="post_Card_info">
            <p className="post__userName">MAJEED USERNAME</p>
            <b>MOE ,ministry od education مكتب تحقيق الرؤية VRO </b>
            <p> I'm in the work today</p>
            <img
              className="post__Image"
              src="data:image/jpeg;base64,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"
              alt="img"
            />
            <p className="post__time"> since 2 months ago</p>
            <hr />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

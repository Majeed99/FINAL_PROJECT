import "../styles/TimeLine-style.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import PostCard from "../components/PostCard";
import logo from "../images/image4.png";
import CheckAuthorization from "../functions/CheckAuthorization";

function TimeLine() {
  const check = CheckAuthorization();

  const [TimeLine, setTimeLine] = useState([]);
  const [loading, setLoading] = useState(true);
  let token;
  let userId;
  if (check) {
    token = document.cookie.split("=")[1];
    userId = atob(token.split(".")[1]);
  }

  useEffect(() => {
    axios
      .get("api/posts/getTimeLine/" + userId)
      .then((res) => {
        setTimeLine(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <div className="timeLine__header">
        <img src={logo} alt="" height="90%" />
      </div>
      <div className="page">
        {TimeLine.map((el) => {
          return <PostCard el={el.post} user={el.userData} />;
        })}
      </div>
    </div>
  );
}

export default TimeLine;

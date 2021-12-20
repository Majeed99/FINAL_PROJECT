import "../styles/TimeLine-style.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import PostCard from "../components/PostCard";
import logo from "../images/image4.png";

function TimeLine() {
  const navigate = useNavigate();
  const [TimeLine, setTimeLine] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const cookieCheck = document.cookie;
    if (cookieCheck === "") {
      navigate("/signin");
      return;
    }
    const token = cookieCheck.split("=")[1];
    const userId = atob(token.split(".")[1]);
    axios
      .get("api/posts/getTimeLine/" + userId)
      .then((res) => {
        setTimeLine(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  if (loading) return <Loading />;

  return (
    <div>
      <div className="timeLine__header">
        <img src={logo} alt="" height="90%" />
      </div>
      <div className="page">
        {TimeLine.map((el, index) => {
          return <PostCard key={index} el={el.post} user={el.userData} />;
        })}
      </div>
      
    </div>
  );
}

export default TimeLine;

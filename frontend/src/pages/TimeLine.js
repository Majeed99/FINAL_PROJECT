import axios from "axios";
import { useEffect, useState } from "react";
function TimeLine() {
  const [Posts, setPosts] = useState([]);
  const token = document.cookie.split("=")[1];
  const userInfo = JSON.parse(atob(token.split(".")[1]));
  console.log(userInfo);
  useEffect(() => {
    axios
      .get("api/posts/getPosts/" + userInfo._id)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {Posts.map((el) => {
        return (
          <div>
            <p>{el.location}</p>
            <p>{el.text}</p>
          </div>
        );
      })}
    </div>
  );
}

export default TimeLine;

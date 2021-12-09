import "../styles/TimeLine-style.css";
import axios from "axios";
import { useEffect, useState } from "react";
function TimeLine() {
  const [Posts, setPosts] = useState([]);
  const token = document.cookie.split("=")[1];
  const userId = atob(token.split(".")[1]);
//   console.log(userId);
  useEffect(() => {
    axios
      .get("api/posts/getPosts/" + userId)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function addNewPost() {
    console.log("clicked!!");
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addNewPost();
        }}
      >
        <input type="text" placeholder="What are you up to?"></input>
        <button type="submit"> Post </button>
      </form>

      {/* DISPLAY POSTS TIMELINE*/}
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

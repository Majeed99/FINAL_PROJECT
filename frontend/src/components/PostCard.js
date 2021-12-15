import calcTime from "../functions/calcTime";
import "../styles/PostCard-style.css";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function PostCard(props) {
  const navigate = useNavigate();
  const el = props.el;
  const user = props.user;
  // console.log(el, user);
  const token = document.cookie.split("=")[1];
  const userId = atob(token.split(".")[1]);

  async function deletePost() {
    await axios
      .delete("api/posts/deletePost", {
        data: { id: userId, postId: el._id },
      })
      .then((res) => {
        window.location.reload();
      });
  }

  return (
    <div className="post_Card">
      <div
        className="post_Card_avatar"
        onClick={() => {
          navigate("/user/" + user._id);
        }}
      >
        <img src={user.avatar} alt="avatar" />
      </div>

      <div className="post_Card_info">
        {user._id === userId && window.location.pathname === "/profile" ? (
          <button
            className="remove_post"
            onClick={(e) => {
              e.preventDefault();
              deletePost();
            }}
          >
            {" "}
            <MdDeleteForever className="REMOVE__ICON" fill="red" />{" "}
          </button>
        ) : null}
        <p
          className="post__userName"
          onClick={() => {
            navigate("/user/" + user._id);
          }}
        >
          {user.userName}
        </p>
        <b>{el.location}</b>
        <p> {el.text}</p>
        {el.photo ? (
          <img className="post__Image" src={el.photo} alt="img" />
        ) : null}
        <p
          className="post_view_comments"
          onClick={() => {
            navigate("/post");
          }}
        >
          {" "}
          View all comments
        </p>
        <p className="post__time"> since {calcTime(el.createdAt)}</p>
        <hr />{" "}
      </div>
    </div>
  );
}

export default PostCard;

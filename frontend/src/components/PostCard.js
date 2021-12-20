import calcTime from "../functions/calcTime";
import "../styles/PostCard-style.css";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

function PostCard(props) {
  const [displayPhoto, setDisplayPhoto] = useState("none");
  const navigate = useNavigate();
  const el = props.el;
  const user = props.user;
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
        {user._id === userId &&
        window.location.pathname.toLowerCase() === "/profile" ? (
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
        <b
          className="placeBtn"
          onClick={() => {
            navigate("/Place/" + el.locationId);
          }}
        >
          At {el.location}
        </b>
        {el.text ? <p> {el.text}</p> : null}
        {el.photo ? (
          <img
            className="post__Image"
            src={el.photo}
            alt="img"
            onClick={(e) => {
              e.preventDefault();
              setDisplayPhoto("block");
            }}
          />
        ) : null}
        {window.location.pathname.startsWith("/post") ? null : (
          <p
            className="post_view_comments"
            onClick={() => {
              navigate("/post/" + user._id + "/" + el._id);
            }}
          >
            {" "}
            View all comments
          </p>
        )}
        <p className="post__time"> since {calcTime(el.createdAt)}</p>
        <hr />
      </div>
      <div className="imageOpen" style={{ display: displayPhoto }}>
        <button
          className="closeBtn"
          onClick={(e) => {
            e.preventDefault();
            setDisplayPhoto("none");
          }}
        >
          {" "}
          <AiOutlineClose />{" "}
        </button>
        <img src={el.photo} alt="" />
      </div>
    </div>
  );
}

export default PostCard;

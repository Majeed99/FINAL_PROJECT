import "../styles/PostPage-style.css";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import calcTime from "../functions/calcTime";

function Post() {
  const { userId, postId } = useParams();
  const [PostInfo, setPostInfo] = useState({});
  const [loading, setloading] = useState(true);
  const [CommentText, setCommentText] = useState("");

  useEffect(() => {
    // console.log({ userId, postId });

    fetchData();
  }, []);

  function fetchData() {
    axios.get(`/api/posts/getPostInfo/${userId}/${postId}`).then((res) => {
      setPostInfo(res.data);
      // console.log(res.data);
      setloading(false);
    });
  }

  function getUserId() {
    let cookieCheck = document.cookie;
    const token = cookieCheck.split("=")[1];
    const userId = atob(token.split(".")[1]);
    return userId;
  }

  function sendComment() {
    const cookieCheck = document.cookie;
    const token = cookieCheck.split("=")[1];
    const userId = atob(token.split(".")[1]);

    axios
      .post("/api/posts/addComment", {
        commentText: CommentText,
        userId: PostInfo.userData._id,
        postId: PostInfo.post._id,
        senderId: userId,
      })
      .then((res) => {
        fetchData();
      });
  }

  function deleteComment(commentId) {
    axios
      .delete("/api/posts/DeleteComment", {
        data: {
          userId: PostInfo.userData._id,
          postId: PostInfo.post._id,
          commentId: commentId,
        },
      })
      .then((res) => {
        fetchData();
      });
  }

  if (loading) return <Loading />;

  return (
    <div className="page">
      <PostCard el={PostInfo.post} user={PostInfo.userData} />
      {/****************** COMMENTS **********************/}
      <div className="comments_cover">
        {PostInfo.post.comments.map((el) => {
          return (
            <div>
              <div className="comment_cover">
                <b>{el.userName}</b>
                <span>{el.comment}</span>
                {el.userId === getUserId() ? (
                  <button
                    className="delete_comment"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteComment(el._id);
                    }}
                  >
                    <MdDeleteForever fill="red" />
                  </button>
                ) : null}
              </div>
              <div className="comment_time">{calcTime(el.createdAt)}</div>
            </div>
          );
        })}
        <form
          className="form_add_comment"
          onSubmit={(e) => {
            e.preventDefault();
            setloading(true);
            sendComment();
          }}
        >
          <input
            className="insert_comment_input"
            type="text"
            placeholder="write comment .."
            onChange={(e) => {
              e.preventDefault();
              setCommentText(e.target.value);
            }}
          />
          <button type="submit" className="send_comment_button">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default Post;

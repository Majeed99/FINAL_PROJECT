import calcTime from "../functions/calcTime";
function PostCard(props) {
  const el = props.el;
  const user = props.user;

  return (
    <div className="post_Card">
      <div className="post_Card_avatar">
        <img src={user.avatar} alt="avatar" />
      </div>

      <div className="post_Card_info">
        <p className="post__userName">{user.userName}</p>
        <b>{el.location}</b>
        <p> {el.text}</p>
        {el.photo ? (
          <img className="post__Image" src={el.photo} alt="img" />
        ) : null}
        <p className="post__time"> since {calcTime(el.createdAt)}</p>
        <hr />{" "}
      </div>
    </div>
  );
}

export default PostCard;

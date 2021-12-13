import { useNavigate } from "react-router-dom";

function UserCard(props) {
  const e = props.user;
  const navigate = useNavigate();
  return (
    <div>
      <div
        className="friend__Card"
        onClick={() => {
          navigate("/user/" + e._id);
        }}
      >
        <img src={e.avatar} alt="" />
        <div className="user__names">
          <b>{e.name}</b>
          <p>@{e.userName}</p>
        </div>
      </div>
    </div>
  );
}

export default UserCard;

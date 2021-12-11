import "../styles/Friends-style.css";

function Friends() {
  return (
    <div>
      <div className="yourFriends__header"> Your Friends</div>
      <div className="page">
        <div className="friend__Card">
          <img
            src="https://pbs.twimg.com/profile_images/1173367116562685954/k-MYyrws_400x400.jpg"
            alt=""
          />
          <b>Name of User</b>
        </div>
      </div>
    </div>
  );
}

export default Friends;

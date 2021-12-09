import { Link } from "react-router-dom";
function NavBar() {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <Link to="/signup"> SignUp</Link>
      <Link to="/signin"> SignIn</Link>
    </div>
  );
}

export default NavBar;

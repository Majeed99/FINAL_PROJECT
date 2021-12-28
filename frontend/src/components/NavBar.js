import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar-style.css";
import userStatus from "../components/userStatus";
import { useContext } from "react";
import axios from "axios";
// ICONS IMPORTS
import { AiFillHome } from "react-icons/ai";
import { HiUserAdd } from "react-icons/hi";
import { BiLogIn } from "react-icons/bi";
import { MdTimeline } from "react-icons/md";
import { GrLogout } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";
import { BsFillChatLeftTextFill } from "react-icons/bs";

function NavBar() {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(userStatus);

  const token = document.cookie.split("jwt=")[1];
  const tokenAdmin = document.cookie.split("jwtAdmin=")[1];
  if (token) {
    setAuth("user");
  } else if (tokenAdmin) setAuth("admin");
  else setAuth("none");

  return (
    <div className="navBar">
      {/* PAGES FOR NOT REGISTER */}
      {auth === "none" ? (
        <Link
          to="/"
          className="navBar__links"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <AiFillHome className="Link__Icons" />
          <p className="navBar__text">Home</p>
        </Link>
      ) : null}
      {auth === "none" ? (
        <Link
          to="/signup"
          className="navBar__links"
          onClick={(e) => {
            e.preventDefault();
            navigate("/signup");
          }}
        >
          <HiUserAdd className="Link__Icons" />
          <p className="navBar__text">SignUp</p>
        </Link>
      ) : null}
      {auth === "none" ? (
        <Link
          to="/signin"
          className="navBar__links "
          onClick={(e) => {
            e.preventDefault();
            navigate("/signin");
          }}
        >
          <BiLogIn className="Link__Icons" />
          <p className="navBar__text">SignIn</p>
        </Link>
      ) : null}
      {/* PAGES FOR REGISTER */}
      {auth === "user" ? (
        <Link
          to="/timeline"
          className="navBar__links"
          onClick={(e) => {
            e.preventDefault();
            navigate("/timeline");
          }}
        >
          <MdTimeline className="Link__Icons" />
          <p className="navBar__text "> Time Line</p>
        </Link>
      ) : null}

      {auth === "user" ? (
        <Link
          to="/Search"
          className="navBar__links"
          onClick={(e) => {
            e.preventDefault();
            navigate("/Search");
          }}
        >
          <BiSearchAlt className="Link__Icons" />
          <p className="navBar__text "> Search</p>
        </Link>
      ) : null}

      {auth === "user" ? (
        <Link
          to="/NewPost"
          className="navBar__links active"
          onClick={(e) => {
            e.preventDefault();
            navigate("/NewPost");
          }}
        >
          <BiPlus className="Link__Icons" fill="white" />
          <p className="navBar__text"> </p>
        </Link>
      ) : null}

      {auth === "user" ? (
        <Link
          to="/Profile"
          className="navBar__links"
          onClick={(e) => {
            e.preventDefault();
            navigate("/Profile");
          }}
        >
          <FaUser className="Link__Icons" />
          <p className="navBar__text "> Profile</p>
        </Link>
      ) : null}

      {auth === "user" ? (
        <Link
          to="/Rooms"
          className="navBar__links"
          onClick={(e) => {
            e.preventDefault();
            navigate("/Rooms");
          }}
        >
          <BsFillChatLeftTextFill className="Link__Icons" />
          <p className="navBar__text "> Chat</p>
        </Link>
      ) : null}

      {auth === "user" ? (
        <Link
          to="/"
          className="navBar__links"
          onClick={async () => {
            await axios
              .get("api/users/signOut")
              .then((res) => {})
              .catch((err) => {
                console.log(err);
              });
            setAuth("none");
          }}
        >
          <GrLogout className="Link__Icons" fill="red" />
          <p
            className="navBar__text"
            style={{ color: "red", fontWeight: "700" }}
          >
            {" "}
            Sign Out
          </p>
        </Link>
      ) : null}

      {auth === "admin" ? (
        <Link
          to="/admin"
          className="navBar__links"
          onClick={(e) => {
            e.preventDefault();
            navigate("/admin");
          }}
        >
          <FaUser className="Link__Icons" />
          <p className="navBar__text "> Admin</p>
        </Link>
      ) : null}

      {auth === "admin" ? (
        <Link
          to="/"
          className="navBar__links"
          onClick={async () => {
            await axios
              .get("api/admins/signOut")
              .then((res) => {})
              .catch((err) => {
                console.log(err);
              });
            setAuth("none");
          }}
        >
          <GrLogout className="Link__Icons" fill="red" />
          <p
            className="navBar__text"
            style={{ color: "red", fontWeight: "700" }}
          >
            {" "}
            Sign Out
          </p>
        </Link>
      ) : null}
    </div>
  );
}

export default NavBar;

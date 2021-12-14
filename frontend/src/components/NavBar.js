import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar-style.css";
import userStatus from "../components/userStatus";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
// ICONS IMPORTS
import { AiFillHome } from "react-icons/ai";
import { HiUserAdd } from "react-icons/hi";
import { BiLogIn } from "react-icons/bi";
import { MdTimeline } from "react-icons/md";
import { GrLogout } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";

function NavBar() {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(userStatus);

  const token = document.cookie.split("jwt=")[1];
  let userId = null;
  if (token) {
    // console.log(token);
    userId = atob(token.split(".")[1]);
    setAuth(true);
  } else setAuth(false);

  //FUNCTION FOR ACTIVE LINK
  // function activeClass(clicked) {
  //   let elements = document.getElementsByTagName("a");
  //   for (const el of elements) {
  //     el.classList.remove("active");
  //   }
  //   if (clicked.target.tagName === "svg") {
  //     clicked.target.parentElement.className = "active";
  //   } else if (clicked.target.tagName === "path") {
  //     clicked.target.parentElement.parentElement.className = "active";
  //   } else if (clicked.target.tagName === "P") {
  //     clicked.target.parentElement.className = "active";
  //   } else clicked.target.className = "active";
  // }

  return (
    <div className="navBar">
      {/* PAGES FOR NOT REGISTER */}
      {!auth ? (
        <Link
          to="/"
          className="navBar__links"
          onClick={(e) => {
            e.preventDefault();
            // activeClass(e);
            navigate("/");
          }}
        >
          <AiFillHome className="Link__Icons" />
          <p className="navBar__text">Home</p>
        </Link>
      ) : null}
      {!auth ? (
        <Link
          to="/signup"
          className="navBar__links"
          onClick={(e) => {
            e.preventDefault();
            // activeClass(e);
            navigate("/signup");
          }}
        >
          <HiUserAdd className="Link__Icons" />
          <p className="navBar__text">SignUp</p>
        </Link>
      ) : null}
      {!auth ? (
        <Link
          to="/signin"
          className="navBar__links "
          onClick={(e) => {
            e.preventDefault();
            // activeClass(e);
            navigate("/signin");
          }}
        >
          <BiLogIn className="Link__Icons" />
          <p className="navBar__text">SignIn</p>
        </Link>
      ) : null}
      {/* PAGES FOR REGISTER */}
      {auth ? (
        <Link
          to="/timeline"
          className="navBar__links"
          onClick={(e) => {
            e.preventDefault();
            // activeClass(e);
            navigate("/timeline");
          }}
        >
          <MdTimeline className="Link__Icons" />
          <p className="navBar__text active"> </p>
        </Link>
      ) : null}

      {auth ? (
        <Link
          to="/Search"
          className="navBar__links"
          onClick={(e) => {
            e.preventDefault();
            // activeClass(e);
            navigate("/Search");
          }}
        >
          <BiSearchAlt className="Link__Icons" />
          <p className="navBar__text "> </p>
        </Link>
      ) : null}

      {auth ? (
        <Link
          to="/NewPost"
          className="navBar__links active"
          onClick={(e) => {
            e.preventDefault();
            // activeClass(e);
            navigate("/NewPost");
          }}
        >
          <FaPlus className="Link__Icons" />
          <p className="navBar__text"> </p>
        </Link>
      ) : null}

      {auth ? (
        <Link
          to="/Profile"
          className="navBar__links"
          onClick={(e) => {
            e.preventDefault();
            // activeClass(e);
            navigate("/Profile");
          }}
        >
          <FaUser className="Link__Icons" />
          <p className="navBar__text "> </p>
        </Link>
      ) : null}

      {auth ? (
        <Link
          to="/"
          className="navBar__links"
          onClick={async () => {
            await axios
              .get("api/users/signOut")
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
            setAuth(false);
          }}
        >
          <GrLogout className="Link__Icons" fill="red" />
          <p className="navBar__text"> </p>
        </Link>
      ) : null}
    </div>
  );
}

export default NavBar;

import { Link } from "react-router-dom";
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

function NavBar() {
  const { auth, setAuth } = useContext(userStatus);
  const token = document.cookie.split("jwt=")[1];
  let userId = null;
  if (token) {
    // console.log(token);
    userId = atob(token.split(".")[1]);
    setAuth(true);
  } else setAuth(false);

  // function getCookie(cname) {
  //   var arrayb = document.cookie.split(";");
  //   for (const item of arrayb) {
  //     if (item.startsWith("jwt=")) {
  //       return item.substr(4);
  //     }
  //   }
  // }
  // let token = getCookie("jwt");
  // console.log(token);
  // setAuth(token === undefined ? false : true);

  return (
    <div className="navBar">
      {/* PAGER FOR NOT REGISTER */}
      {!auth ? (
        <Link to="/">
          <AiFillHome className="Link__Icons" />
          Home
        </Link>
      ) : null}

      {!auth ? (
        <Link to="/signup">
          <HiUserAdd className="Link__Icons" />
          SignUp
        </Link>
      ) : null}
      {!auth ? (
        <Link to="/signin">
          <BiLogIn className="Link__Icons" />
          SignIn
        </Link>
      ) : null}

      {/* PAGER FOR NOT REGISTER */}
      {auth ? (
        <Link to="/timeline">
          <MdTimeline className="Link__Icons" />
          TimeLine
        </Link>
      ) : null}

      {auth ? (
        <Link
          to="/"
          onClick={async () => {
            await axios.get("/api/users/signOut");
            setAuth(false);
          }}
        >
          <GrLogout className="Link__Icons" fill="white" />
          Sign Out
        </Link>
      ) : null}
    </div>
  );
}

export default NavBar;

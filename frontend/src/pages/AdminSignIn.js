import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp-style.css";
import userStatus from "../components/userStatus";
import axios from "axios";

function AdminSignIn() {
  const [UserData, setUserData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const { auth, setAuth } = useContext(userStatus);
  const navigate = useNavigate();

  function checkAndSignin() {
    axios
      .post("api/admins/signIn", UserData)
      .then((res) => {
        if (res.data === "invalid email/password") {
          setErrorMessage(res.data);
          return;
        }
        setAuth("admin");
        navigate("/admin");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="page__signup ">
      <form
        className="form__signup"
        onSubmit={(e) => {
          e.preventDefault();
          checkAndSignin();
        }}
      >
        <h3 className="form__title"> ADMIN Sign In </h3>
        {errorMessage !== "" ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : null}

        <label>E-mail </label>
        <input
          type="email"
          onChange={(e) => {
            UserData.email = e.target.value;
            setUserData({ ...UserData });
          }}
          required
        />
        <br />

        <label>Password </label>
        <input
          type="password"
          onChange={(e) => {
            UserData.password = e.target.value;
            setUserData({ ...UserData });
          }}
          required
        />

        <button className="form__submit" type="submit">
          {" "}
          SIGN IN
        </button>
      </form>
    </div>
  );
}

export default AdminSignIn;

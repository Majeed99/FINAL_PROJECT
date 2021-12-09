import "../styles/SignUp-style.css";
import axios from "axios";
import userStatus from "../components/userStatus";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [UserData, setUserData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const { auth, setAuth } = useContext(userStatus);

  function checkAndSignin() {
    axios
      .post("/api/users/signIn", UserData)
      .then((res) => {
        console.log(res.data);
        if (res.data === "invalid email/password") {
          setErrorMessage(res.data);
          return;
        }
        setAuth(true);
        navigate("/timeLine");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="page__signup">
      <form
        className="form__signup"
        onSubmit={(e) => {
          e.preventDefault();
          checkAndSignin();
        }}
      >
        <h3 className="form__title"> Sign In for ANYTHING</h3>
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

export default SignIn;

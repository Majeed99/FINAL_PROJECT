import "../styles/SignUp-style.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function SignUp() {
  const navigate = useNavigate();
  const [UserData, setUserData] = useState({});
  const [Password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [CheckStyle, setCheckStyle] = useState({
    char: "",
    upperCase: "",
    lowerCase: "",
  });

  useEffect(() => {
    if (Password.length >= 8) {
      CheckStyle.char = "#28a5007d";
      setCheckStyle({ ...CheckStyle });
    } else {
      CheckStyle.char = "";
      setCheckStyle({ ...CheckStyle });
    }

    if (/[A-Z]/.test(Password)) {
      CheckStyle.upperCase = "#28a5007d";
      setCheckStyle({ ...CheckStyle });
    } else {
      CheckStyle.upperCase = "";
      setCheckStyle({ ...CheckStyle });
    }

    if (/[a-z]/.test(Password)) {
      CheckStyle.lowerCase = "#28a5007d";
      setCheckStyle({ ...CheckStyle });
    } else {
      CheckStyle.lowerCase = "";
      setCheckStyle({ ...CheckStyle });
    }
  }, [Password]);

  function checkAndSubmit() {
    if (
      !/[a-z]/.test(UserData.password) ||
      !/[A-Z]/.test(UserData.password) ||
      UserData.password.length < 8
    ) {
      setErrorMessage("Password is not as require !!");
      return;
    }
    axios
      .post("api/users/", UserData)
      .then((res) => {
        if (res.data === "done") navigate("/signin");
        else if (res.data === "userName is already used") {
          setErrorMessage("userName is already used");
          return;
        } else if (res.data === "E-mail is already used") {
          setErrorMessage("E-mail is already used");
          return;
        }
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
          checkAndSubmit();
        }}
      >
        <h3 className="form__title"> Sign Up </h3>
        {errorMessage !== "" ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : null}
        <label>Name </label>
        <input
          type="text"
          onChange={(e) => {
            UserData.name = e.target.value;
            setUserData({ ...UserData });
          }}
          required
        />
        <br />
        <label>UserName </label>
        <input
          type="text"
          onChange={(e) => {
            UserData.userName = e.target.value;
            setUserData({ ...UserData });
          }}
          required
        />
        <br />
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
            setPassword(e.target.value);
            UserData.password = e.target.value;
            setUserData({ ...UserData });
          }}
          required
        />

        <div className="Check_package">
          <p
            style={{ backgroundColor: CheckStyle.upperCase }}
            className="Check__case"
          >
            {}
            Upper Case
          </p>
          <p
            style={{ backgroundColor: CheckStyle.lowerCase }}
            className="Check__case"
          >
            Lower Case
          </p>
          <p
            style={{ backgroundColor: CheckStyle.char }}
            className="Check__case"
          >
            8 Characters
          </p>
        </div>
        <button className="form__submit" type="submit">
          {" "}
          SIGN UP
        </button>
      </form>
    </div>
  );
}

export default SignUp;

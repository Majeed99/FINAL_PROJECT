import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useContext } from "react";
import userStatus from "./components/userStatus";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NavBar from "./components/NavBar";
import TimeLine from "./pages/TimeLine";
function App() {
  let [auth, setAuth] = useState(false);
  return (
    <userStatus.Provider value={{ auth, setAuth }}>
      <div className="App">
        <BrowserRouter>
          <div className="navBar__cover">
            <NavBar />
          </div>
          <div className="pages__cover">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/signUp" element={<SignUp />} />
              <Route exact path="/SignIn" element={<SignIn />} />
              <Route exact path="/TimeLine" element={<TimeLine />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </userStatus.Provider>
  );
}

export default App;

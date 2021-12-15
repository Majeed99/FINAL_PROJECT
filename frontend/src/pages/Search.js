import "../styles/Search-style.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import UserCard from "../components/UserCard";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CheckAuthorization from "../functions/CheckAuthorization";

function Search() {
  const check = CheckAuthorization();
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [Search, setSearch] = useState("");
  const [Message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  let token, userId;
  if (check) {
    token = document.cookie.split("=")[1];
    userId = atob(token.split(".")[1]);
  }

  useEffect(() => {
    if (Search === "") {
      setloading(false);
      setMessage("There is no users");
      setUsers([]);
      return;
    }
    axios.post("api/friends/search", { userName: Search }).then((res) => {
      if (res.data === "no users") {
        setloading(false);
        setMessage("There is no users");
        setUsers([]);
      } else {
        setloading(false);
        setMessage("");
        setUsers(res.data);
      }
    });
  }, [Search]);

  return (
    <div>
      <div className="search__header">
        <form className="searchForm">
          <input
            className="search__input"
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setSearch(e.target.value);
              setUsers([]);
              setMessage("");
              setloading(true);
            }}
          />
        </form>
      </div>

      <div className="page">
        {loading ? (
          <Loading />
        ) : (
          <div>
            {Message !== "" ? (
              <p className="not__found_users">There is no users found</p>
            ) : null}

            {users.map((e) => {
              return <UserCard user={e} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;

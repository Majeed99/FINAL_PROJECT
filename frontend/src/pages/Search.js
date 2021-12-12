import "../styles/Search-style.css";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="search__header">
        <form className="searchForm">
          <input className="search__input" type="text" placeholder="Search" />
          <button type="submit" className="search__button">
            <IoMdSearch fill="white" />
          </button>
        </form>
      </div>

      <div className="page">
        <div
          className="friend__Card"
          onClick={() => {
            navigate("/user/");
          }}
        >
          <img
            src="https://pbs.twimg.com/profile_images/1173367116562685954/k-MYyrws_400x400.jpg"
            alt=""
          />
          <div className="user__names">
            <b>Name of User</b>
            <p>@userName</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;

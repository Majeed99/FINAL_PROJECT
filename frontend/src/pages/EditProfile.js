import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import "../styles/SignUp-style.css";
import UploadImage from "../functions/UploadImage";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  let token, userId;
  const navigate = useNavigate();
  const [UserData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cookieCheck = document.cookie;
    if (cookieCheck === "") {
      navigate("/signin");
      return;
    }
    token = document.cookie.split("=")[1];
    userId = atob(token.split(".")[1]);
    fetchData();
  }, []);

  async function fetchData() {
    const cookieCheck = document.cookie;
    token = cookieCheck.split("=")[1];
    userId = atob(token.split(".")[1]);
    const res = await axios.get("api/users/getUser/" + userId);
    const data = await res.data;
    setUserData(data);
    setLoading(false);
  }

  async function checkAndSubmit() {
    await axios
      .put("api/users/editProfile/" + UserData._id, UserData)
      .then((res) => {
        navigate("/Profile");
      });
  }

  if (loading) return <Loading />;
  return (
    <div className="page">
      <form
        className="form__signup"
        onSubmit={(e) => {
          e.preventDefault();
          checkAndSubmit();
        }}
      >
        <label>Email</label>
        <input type="text" value={UserData.email} disabled />
        <br />
        <label>userName</label>
        <input type="text" value={UserData.userName} disabled />
        <br />
        <label>Name</label>
        <input
          type="text"
          defaultValue={UserData.name}
          onChange={(e) => {
            UserData.name = e.target.value;
            setUserData({ ...UserData });
          }}
        />
        <br />
        <label>Location</label>
        <input
          type="text"
          defaultValue={UserData.location}
          onChange={(e) => {
            UserData.location = e.target.value;
            setUserData({ ...UserData });
          }}
        />
        <br />
        <label>Bio</label>
        <input
          type="text"
          defaultValue={UserData.bio}
          onChange={(e) => {
            UserData.bio = e.target.value;
            setUserData({ ...UserData });
          }}
        />
        <br />
        <label>Gender</label>
        <input
          type="text"
          defaultValue={UserData.gender}
          onChange={(e) => {
            UserData.gender = e.target.value;
            setUserData({ ...UserData });
          }}
        />
        <br />
        <label>Avatar</label>
        <img className="avatar__edit" src={UserData.avatar} alt="" />
        <input
          type="file"
          onChange={async (e) => {
            const imageURL = await UploadImage(e.target.files[0]);
            UserData.avatar = imageURL;
            setUserData({ ...UserData });
          }}
        />
        <br />
        <label>Header</label>
        <img className="header__edit" src={UserData.header} alt="" />
        <input
          type="file"
          onChange={async (e) => {
            const imageURL = await UploadImage(e.target.files[0]);
            UserData.header = imageURL;
            setUserData({ ...UserData });
          }}
        />
        <br />
        <button className="edit_profile_button" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditProfile;

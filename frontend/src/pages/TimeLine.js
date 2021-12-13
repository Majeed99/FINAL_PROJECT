import "../styles/TimeLine-style.css";
import axios from "axios";
import { useEffect, useState } from "react";
import useGeoLocation from "../components/useGeoLocation";
import PostCard from "../components/PostCard";
import UploadImage from "../functions/UploadImage";
import Loading from "../components/Loading";
function TimeLine() {
  const [Posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [Image, setImage] = useState();
  const token = document.cookie.split("=")[1];
  const userId = atob(token.split(".")[1]);
  const location = useGeoLocation();
  // console.log(userId);

  useEffect(() => {
    axios
      .get("api/posts/getPosts/" + userId)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // console.log(location);
    if (location.loaded) {
      if (location.error)
        setErrorMessage("Please allow permission of location");
      else {
        setErrorMessage("");
        console.log(location.coordinates);
      }
    }
  }, [location]);

  async function addNewPost() {
    const imageUrl = await UploadImage(Image);
    console.log(imageUrl);
    console.log("clicked!!");
  }

  return (
    <div className="page">
      {errorMessage !== "" ? (
        <div className="errorMessage">{errorMessage}</div>
      ) : null}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addNewPost();
        }}
      >
        <input type="text" placeholder="What are you up to?"></input>
        <input
          type="file"
          accept="image/jpeg, image/png"
          placeholder="upload you image"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <button type="submit"> Post </button>
      </form>

      <div className="page">
        {/* DISPLAY POSTS TIMELINE*/}
        {/*Posts.map((el) => {
          return <PostCard el={el} />;
        })*/}
      </div>
    </div>
  );
}

export default TimeLine;

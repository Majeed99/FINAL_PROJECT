import "../styles/NewPost-style.css";
import { MdAddPhotoAlternate, MdPlace } from "react-icons/md";
import { useState, useEffect } from "react";
import UploadImage from "../functions/UploadImage";
import useGeoLocation from "../components/useGeoLocation";
import Loading from "../components/Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CheckAuthorization from "../functions/CheckAuthorization";

function NewPost() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [PostData, setPostData] = useState({});
  const [displayDD, setDisplayDD] = useState("none");
  const [Title, setTitle] = useState("Choose location");
  const [errorMessage, setErrorMessage] = useState("");
  const [Coordinates, setCoordinates] = useState({});
  const [LocationsArea, setLocationsArea] = useState([]);
  const location = useGeoLocation();

  const check = CheckAuthorization();
  let token, userId;
  if (check) {
    token = document.cookie.split("=")[1];
    userId = atob(token.split(".")[1]);
  }
  useEffect(() => {
    // console.log(location);
    if (location.loaded) {
      if (location.error)
        setErrorMessage("Please allow permission of location");
      else {
        setErrorMessage("");
        setCoordinates(location.coordinates);

        // console.log(location.coordinates);
      }
    }
  }, [location]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "fsq3+8Wp0XwCLQpJH5TkN0okpqSHgoutxIIWgBbE2ibudvE=",
      },
    };

    fetch(
      `https://api.foursquare.com/v3/places/nearby?ll=${Coordinates.lat}%2C${Coordinates.lng}&limit=30`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        let arr = response.results;
        arr = arr.sort(function (a, b) {
          return a.distance - b.distance;
        });
        setLocationsArea(arr);
        if (response.results) setloading(false);

        // console.log(arr);
      })
      .catch((err) => console.error(err));
  }, [Coordinates]);

  function send() {
    console.log(PostData);
    //   CHECK OF LOCATION CHOOSE

    if (!PostData.location) return;
    const token = document.cookie.split("=")[1];
    const userId = atob(token.split(".")[1]);
    axios.post("/api/posts/addPost/" + userId, PostData).then((res) => {
      if (res.data) navigate("/TimeLine");
    });
  }

  if (loading) return <Loading />;
  return (
    <div>
      {errorMessage !== "" ? (
        <div className="errorMessage">{errorMessage}</div>
      ) : null}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        {/* <select
          className="custom_select"
          onChange={(e) => {
            PostData.location = e.target.value;
            setPostData({ ...PostData });
          }}
        >
          {
            // console.log(LocationsArea)
            LocationsArea.map((e) => {
              return <option className="">{e.name}</option>;
            })
          }
        </select>*/}

        <div class="dropdown">
          <div
            className="dropdown-header"
            onClick={(e) => {
              e.preventDefault();
              {
                displayDD === "none"
                  ? setDisplayDD("block")
                  : setDisplayDD("none");
              }
            }}
          >
            {Title}
          </div>
          <div class="dropdown-content" style={{ display: displayDD }}>
            {LocationsArea.map((place) => {
              return (
                <p
                  onClick={(e) => {
                    e.preventDefault();
                    PostData.location = place.name;
                    PostData.locationId = place.fsq_id;
                    setPostData({ ...PostData });
                    setTitle(place.name);
                    {
                      displayDD === "none"
                        ? setDisplayDD("block")
                        : setDisplayDD("none");
                    }
                  }}
                >
                  {" "}
                  <div className="place_icon">
                    <MdPlace fill="#09303a" />
                  </div>
                  <div className="place_name_distance">
                    <b>{place.name}</b>
                    <div>{place.distance} m</div>
                  </div>
                </p>
              );
            })}
          </div>
        </div>
        <textarea
          className="post_text"
          placeholder="What are you up to?"
          type="text"
          onChange={(e) => {
            PostData.text = e.target.value;
            setPostData({ ...PostData });
          }}
        />
        {PostData.photo != null ? (
          <img className="postPhoto" src={PostData.photo} alt="" />
        ) : null}
        <div className="file_and_post">
          <div>
            <div class="btn-file">
              <MdAddPhotoAlternate className="photo_icon" />
              <input
                type="file"
                className="upload__photo"
                onChange={async (e) => {
                  const imageURL = await UploadImage(e.target.files[0]);
                  PostData.photo = imageURL;
                  setPostData({ ...PostData });
                }}
              />
            </div>
          </div>
          <div>
            <button type="submit" className="submit_post">
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewPost;

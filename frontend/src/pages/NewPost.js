import "../styles/NewPost-style.css";
import { MdAddPhotoAlternate, MdPlace } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { useState, useEffect, useCallback } from "react";
import UploadImage from "../functions/UploadImage";
import useGeoLocation from "../components/useGeoLocation";
import Loading from "../components/Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewPost() {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [PostData, setPostData] = useState({});
  const [displayDD, setDisplayDD] = useState("none");
  const [displaySearch, setDisplaySearch] = useState("none");
  const [displaySearchContent, setDisplaySearchContent] = useState("none");
  const [Title, setTitle] = useState("Choose location");
  const [errorMessage, setErrorMessage] = useState("");
  const [Coordinates, setCoordinates] = useState({});
  const [LocationsArea, setLocationsArea] = useState([]);
  const [LocationsAreaForSearch, setLocationsAreaForSearch] = useState([]);
  // const location = useGeoLocation();
  // const [location, setLocation] = useState({});
  async function getPosition() {
    if (navigator.geolocation) {
      setTimeout(() => {
        navigator.geolocation.getCurrentPosition(showPosition);
      }, 3000);
    } else {
      setErrorMessage("Please allow permission of location");
      console.log("Geolocation is not supported by this browser.");
    }
    function showPosition(position) {
      setCoordinates({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    }
  }
  useEffect(() => {
    getPosition();
    //---------
    const cookieCheck = document.cookie;
    if (cookieCheck === "") {
      navigate("/signin");
      return;
    }
  }, []);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "fsq3+8Wp0XwCLQpJH5TkN0okpqSHgoutxIIWgBbE2ibudvE=",
      },
    };
    //api.foursquare.com/v3/places/search?query=%D8%A7%D9%84%D8%A7%D8%AA%D8%AD%D8%A7%D8%AF&ll=24.8649609%2C46.7188515&sort=RELEVANCE&limit=50
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
    //   CHECK OF LOCATION CHOOSE

    if (!PostData.location) return;
    const token = document.cookie.split("=")[1];
    const userId = atob(token.split(".")[1]);
    axios.post("/api/posts/addPost/" + userId, PostData).then((res) => {
      if (res.data) navigate("/TimeLine");
    });
  }

  function searchPlace(placeName) {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "fsq3+8Wp0XwCLQpJH5TkN0okpqSHgoutxIIWgBbE2ibudvE=",
      },
    };

    fetch(
      `https://api.foursquare.com/v3/places/search?query=${placeName}&ll=${Coordinates.lat}%2C${Coordinates.lng}&limit=50`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        let arr = response.results;
        arr = arr.sort(function (a, b) {
          return a.distance - b.distance;
        });
        setLocationsAreaForSearch(arr);
      })
      .catch((err) => console.error(err));
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
        <div className="dropdown_search_cover">
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
          <div className="search_cover">
            <div
              style={{ display: displaySearch }}
              className="search_new_place"
            >
              <input
                className="input_search_place"
                type="text"
                placeholder="search"
                onChange={(e) => {
                  e.preventDefault();
                  searchPlace(e.target.value);
                }}
              />
              <div
                class="dropdown-content-for-search"
                style={{ display: displaySearchContent }}
              >
                {LocationsAreaForSearch.map((place) => {
                  return (
                    <p
                      onClick={(e) => {
                        e.preventDefault();
                        PostData.location = place.name;
                        PostData.locationId = place.fsq_id;
                        setPostData({ ...PostData });
                        setTitle(place.name);
                        {
                          displaySearch === "none"
                            ? setDisplaySearch("flex")
                            : setDisplaySearch("none");
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
            <div
              className="button_search_newPlace"
              onClick={(e) => {
                e.preventDefault();
                {
                  if (displaySearch == "none") {
                    setDisplaySearch("flex");
                    setDisplaySearchContent("block");
                  } else {
                    setDisplaySearch("none");
                    setDisplaySearchContent("none");
                  }
                }
              }}
            >
              <BiSearch />
            </div>
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

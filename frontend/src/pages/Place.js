import "../styles/Place-style.css";
import { Carousel } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { AiOutlineClose } from "react-icons/ai";

function Place() {
  const { id } = useParams();
  const [Photos, setPhotos] = useState([]);
  const [details, setDetails] = useState({});
  const [loading, setloading] = useState(true);
  const [Display, setDisplay] = useState({
    content: "block",
    sliderPhoto: "none",
  });

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "fsq3+8Wp0XwCLQpJH5TkN0okpqSHgoutxIIWgBbE2ibudvE=",
      },
    };

    fetch(`https://api.foursquare.com/v3/places/${id}/photos?limit=50`, options)
      .then((response) => response.json())
      .then((response) => {
        setPhotos(response);
      })
      .catch((err) => console.error(err));

    fetch(`https://api.foursquare.com/v3/places/${id}`, options)
      .then((response) => response.json())
      .then((response) => {
        setDetails(response);
        setloading(false);
        console.log(response);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) return <Loading />;
  return (
    <div>
      <div style={{ display: Display.content }}>
        <Carousel
          className="slider"
          variant="dark"
          onClick={(e) => {
            e.preventDefault();
            Display.content = "none";
            Display.sliderPhoto = "block";
            setDisplay({ ...Display });
          }}
        >
          {Photos.map((e) => {
            return (
              <Carousel.Item>
                <img
                  className="d-block w-100 placeImg"
                  src={e.prefix + "original" + e.suffix}
                  alt="PlacePhoto"
                  width={"100%"}
                />
              </Carousel.Item>
            );
          })}
        </Carousel>

        <div className="titles_place">
          <h4>{details.name}</h4>
          <p>
            {details.categories[0] ? (
              <span>{details.categories[0].name}</span>
            ) : null}{" "}
            in {details.location.locality}
          </p>
        </div>
        <div className="divider"></div>
        <p className="title_map">Location Info</p>

        <iframe
          title="map"
          className="mapFrame"
          src={
            "https://maps.google.com/maps?q=" +
            details.geocodes.main.latitude +
            ", " +
            details.geocodes.main.longitude +
            "&z=15&output=embed"
          }
          width="100%"
          height="50vh"
          frameborder="0"
        ></iframe>
      </div>
      <div style={{ display: Display.sliderPhoto }}>
        <button
          className="closeBtn"
          onClick={(e) => {
            e.preventDefault();
            Display.content = "block";
            Display.sliderPhoto = "none";
            setDisplay({ ...Display });
          }}
        >
          {" "}
          <AiOutlineClose />{" "}
        </button>
        <Carousel className="sliderAll" variant="dark">
          {Photos.map((e) => {
            return (
              <Carousel.Item>
                <img
                  className="d-block w-100 placeImg"
                  src={e.prefix + "original" + e.suffix}
                  alt="PlacePhoto"
                  width={"100%"}
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default Place;

import axios from "axios";
async function UploadImage(pic) {
  const data = new FormData();
  data.append("file", pic);
  data.append("upload_preset", "majeedxx99");
  data.append("cloud_name", "location-based-socail");
  // MlrhUojRYZ7mHd0YObnyWylP0tM
  // CLOUDINARY_URL=cloudinary://982618959717943:MlrhUojRYZ7mHd0YObnyWylP0tM@location-based-socail
  let imageURL;
  await axios
    .post(
      "https://api.cloudinary.com/v1_1/location-based-socail/image/upload",
      data
    )
    .then((res) => {
      //   console.log(res.data.url);
      imageURL = res.data.url;
    });

  return imageURL;
}

export default UploadImage;

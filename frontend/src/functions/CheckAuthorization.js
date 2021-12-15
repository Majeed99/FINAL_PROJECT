import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function CheckAuthorization() {
  const navigate = useNavigate();
  useEffect(() => {
    const cookieCheck = document.cookie;
    if (cookieCheck === "") {
      navigate("/signin");
      return false;
    }
    const token = cookieCheck.split("=")[1];
    if (token) {
      navigate("/signin");
      return false;
    }
    const userId = atob(token.split(".")[1]);
    if (userId) {
      navigate("/signin");
      return false;
    }

    return true;
  }, []);
}

export default CheckAuthorization;

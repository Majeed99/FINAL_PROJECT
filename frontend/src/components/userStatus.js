import { createContext } from "react";

let userStatus = createContext({
  auth: "none",
  setAuth: (a) => {},
});

export default userStatus;

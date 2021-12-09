import { createContext } from "react";

let userStatus = createContext({
  auth: false,
  setAuth: (a) => {},
});

export default userStatus;

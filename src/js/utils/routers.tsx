import React from "react";
import { Login } from "../pages/Loginpage";
import { Chat } from "../pages/Chatpage";
import { PATH_CHAT, PATH_LOGIN } from "./constats";

const publicRoutes = [
  {
    path: PATH_LOGIN,
    element: <Login />,
  },
];
const privateRoutes = [
  {
    path: PATH_CHAT,
    element: <Chat />,
  },
];

export { publicRoutes, privateRoutes };

import { lazy } from "react";

import Loadable from "components/Loadable";
import RequireAuth from "features/auth/RequireAuth";

const AuthLogin = Loadable(lazy(() => import("features/auth/Login")));
const LoginRoutes = {
  path: "/",
  element: <RequireAuth guestOnly />,
  children: [
    {
      path: "login",
      element: <AuthLogin />,
    },
  ],
};

export default LoginRoutes;

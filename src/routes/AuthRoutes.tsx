import { lazy } from "react";

import Loadable from "components/Loadable";
import MinimalLayout from "layout/MinimalLayout";

const AuthLogin = Loadable(lazy(() => import("features/auth/Login/Login")));

const LoginRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "login",
      element: <AuthLogin />,
    },
  ],
};

export default LoginRoutes;

import { lazy } from "react";

import Loadable from "components/Loadable";
import MinimalLayout from "layout/MinimalLayout";

const PageNotFound = Loadable(lazy(() => import("features/errors/PageNotFound")));
const LoginRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "*",
      element: <PageNotFound />,
    },
  ],
};

export default LoginRoutes;

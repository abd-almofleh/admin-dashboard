import { lazy } from "react";

import Loadable from "components/Loadable";
import RequireAuth from "features/auth/RequireAuth";

const Dashboard = Loadable(lazy(() => import("features/dashboard")));

const MainRoutes = {
  path: "/",
  element: <RequireAuth />,
  children: [
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ],
};

export default MainRoutes;

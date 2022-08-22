import { lazy } from "react";

import Loadable from "components/Loadable";
import RequireAuth from "features/auth/RequireAuth";
import { Roles } from "app/constants";
const Dashboard = Loadable(lazy(() => import("features/dashboard")));
const MainRoutes = {
  path: "/",
  element: <RequireAuth allowedRoles={[Roles.superAdmin]} />,
  children: [
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ],
};

export default MainRoutes;

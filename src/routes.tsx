import { Navigate, Route, Routes } from "react-router-dom";

import RequireAuth from "features/auth/RequireAuth";
import Login from "features/auth/Login";
import { Roles } from "app/constants";
import Dashboard from "features/dashboard";
import MinimalLayout from "layout/MinimalLayout";
import PageNotFound from "features/errors/PageNotFound";
import MainLayout from "layout/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/dashboard" />} />
      {/* Auth Routes */}
      <Route element={<RequireAuth guestOnly />}>
        <Route path="login" element={<Login />} />
      </Route>

      {/* Main Routes */}
      <Route element={<RequireAuth allowedRoles={[Roles.superAdmin]} />}>
        <Route element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* Errors Route */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

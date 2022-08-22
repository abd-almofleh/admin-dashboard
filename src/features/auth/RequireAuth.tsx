import { useLocation, Navigate, Outlet } from "react-router-dom";
import { selectCurrentUser } from "./authSlice";
import { ILocationState } from "app/types";
import { useAppSelector } from "app/hooks";
import PropTypes from "prop-types";

const RequireAuth = ({ allowedRoles = [], guestOnly = false }: { allowedRoles?: string[]; guestOnly?: boolean }) => {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();
  const locationStat: ILocationState = { from: location };

  if (guestOnly) {
    return user ? <Navigate to="/dashboard" state={locationStat} replace /> : <Outlet />;
  } else
    return user?.roles.find((role) => allowedRoles.includes(role)) ? (
      <Outlet />
    ) : user ? (
      <Navigate to="/unauthorized" state={locationStat} replace />
    ) : (
      <Navigate to="/login" state={locationStat} replace />
    );
};

RequireAuth.prototype = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
  guestOnly: PropTypes.bool,
};

export default RequireAuth;

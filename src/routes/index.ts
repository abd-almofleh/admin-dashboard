import { useRoutes } from "react-router-dom";

import AuthRoutes from "routes/AuthRoutes";
import MainRoutes from "routes/MainRoutes";
import ErrorsRoutes from "routes/ErrorsRoutes";

export default function Routes() {
  return useRoutes([AuthRoutes, MainRoutes, ErrorsRoutes]);
}

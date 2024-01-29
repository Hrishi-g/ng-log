import React from "react";
import { Navigate, useLocation,Outlet} from "react-router-dom";

export function PrivateRoute() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const location = useLocation();

  return isAuthenticated ?  <Outlet /> : <Navigate to="/"  state={{ from: location }}/>;
}

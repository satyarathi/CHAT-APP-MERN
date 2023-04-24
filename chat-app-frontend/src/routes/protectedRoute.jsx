import { Outlet, Navigate } from "react-router-dom";
import React, { Children } from "react";

const ProtectedRoute = ({ children }) => {

  if (localStorage.getItem("token")) {
    return children;
  }
  return <Navigate to="/" />;
};

export default ProtectedRoute;
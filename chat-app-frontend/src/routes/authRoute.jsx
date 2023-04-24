import { Navigate } from "react-router-dom";
import React from "react";

const AuthRoute = ({ children }) => {
  if (localStorage.getItem("token")) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

export default AuthRoute;
import React from "react";
import { Navigate } from "react-router-dom";

const RedirectIfAuthenticated = ({ element, redirectTo }) => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const isAuthenticated = userId && token ? true : false;

  return isAuthenticated ? <Navigate to={redirectTo} /> : element;
};

export default RedirectIfAuthenticated;

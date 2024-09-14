import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const isAuthenticated = userId && token ? true : false;
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;

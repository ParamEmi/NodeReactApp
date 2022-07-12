import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const auth = localStorage.getItem("front_user_token");

  return auth ? <Navigate to="/dashboard" /> : children;
}

export default ProtectedRoutes;

// PublicRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const PublicRoute = () => {
  const { user } = useAuth();

  
  return user ? <Navigate to="/profile" replace /> : <Outlet />;
};

export default PublicRoute;

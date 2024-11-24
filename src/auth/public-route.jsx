import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth-context";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  return user ? <Navigate to="/" /> : children;
};

export default PublicRoute;

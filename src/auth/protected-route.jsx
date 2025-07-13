import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth-context";
import { Center, Spinner } from "@chakra-ui/react";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Center h="80vh">
        <Spinner size="xl" color="blue.500" thickness="4px" speed="0.65s" />
      </Center>
    );
  }
  return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;

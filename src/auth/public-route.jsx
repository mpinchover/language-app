import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth-context";
import { Center, Spinner } from "@chakra-ui/react";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  // if (!user) {
  //   return (
  //     <Center h="80vh">
  //       <Spinner size="xl" color="blue.500" thickness="4px" speed="0.65s" />
  //     </Center>
  //   );
  // }
  return children;

  // return user ? <Navigate to="/translate" /> : children;
};

export default PublicRoute;

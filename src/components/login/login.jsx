import React, { useState } from "react";
import { useAuth } from "../../auth/auth-context";
import {
  Box,
  Stack,
  Input,
  Button,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Signin from "./sign-in";
import SignUp from "./sign-up";

const Login = () => {
  const { logIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);

  const handleLogIn = async () => {
    try {
      await logIn(email, password);
      // setError("");
    } catch (err) {
      // setError(err.message);
    }
  };

  return (
    <Box
      // border="1px solid"
      flex={1}
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={6}
    >
      <Stack maxW="xl" w="full" spacing={4}>
        {isSignIn && <Signin setIsSignIn={setIsSignIn} />}
        {!isSignIn && <SignUp setIsSignIn={setIsSignIn} />}
      </Stack>
    </Box>
  );
};

export default Login;

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
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { STATE_FORGOT_PASSWORD, STATE_SIGN_UP } from "./constants";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const SignIn = ({ setLoginState }) => {
  const { logIn, handleSigninWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogIn = async () => {
    try {
      await logIn(email, password);
      navigate("/articles");
    } catch (err) {
      toast({
        title: "Error logging in",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        color="white"
        // fontWeight="bold"
        onChange={(e) => setEmail(e.target.value)}
        mb={2}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        color="white"
        onChange={(e) => setPassword(e.target.value)}
        mb={4}
      />
      <Button colorScheme="blue" onClick={handleLogIn} mb={2}>
        Log In
      </Button>
      <Button colorScheme="red" onClick={handleSigninWithGoogle} mb={4}>
        Sign in with Google
      </Button>

      <Text textAlign="center" fontSize="sm" color="gray.500">
        <Text
          as="span"
          color="grey.500"
          fontWeight="bold"
          cursor="pointer"
          onClick={() => setLoginState(STATE_FORGOT_PASSWORD)}
        >
          Forgot password
        </Text>
      </Text>
      <Text textAlign="center" fontSize="sm" color="gray.500">
        No account?{" "}
        <Text
          as="span"
          color="blue.500"
          fontWeight="semibold"
          cursor="pointer"
          onClick={() => setLoginState(STATE_SIGN_UP)}
        >
          Sign up
        </Text>
      </Text>
    </>
  );
};

export default SignIn;

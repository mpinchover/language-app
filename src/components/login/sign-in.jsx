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

const SignIn = ({ setLoginState }) => {
  const { logIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const toast = useToast();
  //   const [error, setError] = useState("");

  const handleLogIn = async () => {
    try {
      await logIn(email, password);
      navigate("/translate");
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
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button colorScheme="blue" onClick={handleLogIn}>
        Log In
      </Button>

      {/* Call to action */}
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

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

const SignIn = ({ setIsSignIn }) => {
  const { logIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogIn = async () => {
    try {
      await logIn(email, password);
      setError("");
    } catch (err) {
      setError(err.message);
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
        <Link as={RouterLink} to="/sign-up" color="grey.500" fontWeight="bold">
          Forgot password
        </Link>
      </Text>
      <Text textAlign="center" fontSize="sm" color="gray.500">
        No account?{" "}
        <Text
          as="span"
          color="blue.500"
          fontWeight="semibold"
          cursor="pointer"
          onClick={() => setIsSignIn(false)}
        >
          Sign up
        </Text>
      </Text>
    </>
  );
};

export default SignIn;

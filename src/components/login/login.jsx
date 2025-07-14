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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Signin from "./sign-in";
import SignUp from "./sign-up";
import {
  STATE_FORGOT_PASSWORD,
  STATE_SIGN_IN,
  STATE_SIGN_UP,
} from "./constants";
import ForgotPassword from "./forgot-password";

const Login = () => {
  const { logIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginState, setLoginState] = useState(STATE_SIGN_IN);
  const navigate = useNavigate();

  return (
    <Box
      // border="1px solid"
      flex={1}
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgGradient="linear(to-b, black, purple.900)"
      p={6}
    >
      <Stack maxW="xl" w="full" spacing={4}>
        {loginState === STATE_SIGN_IN && (
          <Signin setLoginState={setLoginState} />
        )}
        {loginState === STATE_SIGN_UP && (
          <SignUp setLoginState={setLoginState} />
        )}
        {loginState === STATE_FORGOT_PASSWORD && (
          <ForgotPassword setLoginState={setLoginState} />
        )}
      </Stack>
    </Box>
  );
};

export default Login;

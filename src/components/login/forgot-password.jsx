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
import { STATE_SIGN_IN } from "./constants";

const TOAST_TIMEOUT = 2000;
const ForgotPassword = ({ setLoginState }) => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const toast = useToast();

  const handleSendPasswordResetLink = async () => {
    try {
      await resetPassword(email);
      toast({
        title: "Reset password link has been sent!",
        status: "success",
        duration: TOAST_TIMEOUT,
        isClosable: true,
      });
      setTimeout(() => {
        setLoginState(STATE_SIGN_IN);
      }, TOAST_TIMEOUT); // Match the duration of the toast
    } catch (err) {
      toast({
        title: "Error sending reset password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Text as="span" color="grey.500" cursor="pointer">
        A link to reset your password link will be sent to this email address.
      </Text>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button colorScheme="blue" onClick={handleSendPasswordResetLink}>
        Submit
      </Button>
    </>
  );
};

export default ForgotPassword;

import React, { useState } from "react";
import {
  Box,
  Stack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Heading,
  useToast,
} from "@chakra-ui/react";

const Account = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();

  const handleUpdate = () => {
    // Simulate an API call to update account details
    toast({
      title: "Account updated.",
      description: "Your account details have been successfully updated.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // revert back to original state
  const handleCancel = () => {};

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Stack mt={6} spacing={6} maxW="1000px" w="full">
        {/* <Heading size="lg" textAlign="center">
          Account Settings
        </Heading> */}

        {/* Username Field */}
        <FormControl id="username">
          <FormLabel fontWeight="bold">Username</FormLabel>
          <Input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            borderColor="gray.300"
            focusBorderColor="blue.500"
          />
        </FormControl>

        {/* Email Field */}
        <FormControl id="email">
          <FormLabel fontWeight="bold">Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            borderColor="gray.300"
            focusBorderColor="blue.500"
          />
        </FormControl>

        {/* Password Field */}
        <FormControl id="password">
          <FormLabel fontWeight="bold">Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter a new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            borderColor="gray.300"
            focusBorderColor="blue.500"
          />
        </FormControl>

        <Button colorScheme="blue" onClick={handleUpdate}>
          Update Account
        </Button>

        <Button onClick={handleCancel}>Cancel</Button>
      </Stack>
    </Box>
  );
};

export default Account;

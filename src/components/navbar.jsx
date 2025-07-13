import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
  HStack,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth-context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { HamburgerIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { logOut } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Flex
      as="nav"
      p={12}
      align="center"
      justify="space-between"
      bg="transparent"
      position="absolute"
      top={0}
      width="100%"
      zIndex={10}
      // border="solid 1px green"
    >
      {/* Centered Title */}
      <Box flex="1">
        <Heading
          fontFamily={`'Orbitron', sans-serif`}
          fontSize={{ base: "3xl", md: "5xl" }}
          fontWeight="black"
          // fontFamily={`'Fugaz One', cursive`}
          bgGradient="linear(to-r, teal.300, blue.500, purple.600)"
          bgClip="text"
          letterSpacing="wide"
        >
          nikud
        </Heading>
      </Box>

      {/* Right Side Menu/Login */}
      <Box flex="1" display="flex" justifyContent="flex-end">
        {isLoggedIn ? (
          <Menu>
            <MenuButton as={Button} borderRadius="md" padding={2}>
              <HamburgerIcon w={5} h={5} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => navigate("/articles")}>
                Articles
              </MenuItem>
              <MenuItem onClick={logOut}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <HStack spacing={4}>
            <Button
              variant="outline"
              colorScheme="pink"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button colorScheme="pink" onClick={() => navigate("/login")}>
              Sign Up
            </Button>
          </HStack>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;

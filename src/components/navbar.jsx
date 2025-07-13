import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
  HStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth-context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { HamburgerIcon } from "@chakra-ui/icons";

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
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
    <Box
      // as="nav"
      // padding="1rem"
      // borderBottom="1px solid"
      // borderColor="gray.100"
      // display="flex"
      // justifyContent={"flex-end"}
      // p={12}
      as="nav"
      py={12}
      px={12}
      display="flex"
      justifyContent="flex-end"
      bg="transparent"
      position="absolute"
      top={0}
      right={0}
      zIndex={10}
      // border="solid 1px green"
      width="100%"
    >
      {isLoggedIn ? (
        <Menu>
          <MenuButton as={Button} borderRadius="md" padding={2}>
            <HamburgerIcon w={5} h={5} />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => navigate("/articles")}>Articles</MenuItem>
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
  );
};

export default Navbar;

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
      as="nav"
      padding="1rem"
      borderBottom="1px solid"
      borderColor="gray.100"
      display="flex"
      justifyContent={"flex-end"}
      p={12}
    >
      {isLoggedIn ? (
        <Menu>
          <MenuButton as={Button} borderRadius="md" padding={2}>
            <HamburgerIcon w={5} h={5} />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => navigate("/translate")}>
              New translation
            </MenuItem>
            <MenuItem onClick={() => navigate("/past-translations")}>
              Past Translations
            </MenuItem>
            <MenuItem onClick={logOut}>Logout</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <HStack spacing={4}>
          <Button
            colorScheme="blue"
            variant="outline"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button colorScheme="blue" onClick={() => navigate("/login")}>
            Sign Up
          </Button>
        </HStack>
      )}
    </Box>
  );
};

export default Navbar;

// import {
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   Button,
//   Box,
//   Flex,
//   Input,
//   InputGroup,
//   InputRightElement,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import { GiChefToque } from "react-icons/gi";
// import { TbChefHat } from "react-icons/tb";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../auth/auth-context";
// import { MdLightbulbOutline } from "react-icons/md";

// const Navbar = ({ onSearch }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();
//   const { logOut } = useAuth();

//   const handleSearch = () => {
//     if (searchQuery.trim()) {
//       onSearch(searchQuery.trim());
//     }
//   };

//   return (
//     <Box
//       as="nav"
//       padding="1rem"
//       borderBottom="1px solid"
//       borderColor="gray.100"
//     >
//       <Flex
//         maxW="1000px" // Limit navbar width
//         mx="auto" // Center the navbar horizontally
//         justifyContent="space-between"
//         alignItems="center"
//       >
//         {/* Left: Logo */}
//         <MdLightbulbOutline
//           cursor={"pointer"}
//           fontSize={28}
//           onClick={() => {
//             navigate("/");
//           }}
//         />

//         {/* Middle: Search Bar */}
//         <Box flex="1" mx="4">
//           <InputGroup height="60px">
//             <Input
//               height="60px"
//               placeholder="Find what's in, out and around the Earth."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               borderRadius="md"
//               bg="white"
//               borderColor="gray.300"
//               pr="5.5rem" // make space for the button
//             />
//             <InputRightElement height="100%" width="5.5rem">
//               <Flex height="100%" alignItems="center" justifyContent="center">
//                 <Button
//                   height="32px"
//                   size="sm"
//                   colorScheme="blue"
//                   onClick={handleSearch}
//                 >
//                   Search
//                 </Button>
//               </Flex>
//             </InputRightElement>
//           </InputGroup>
//         </Box>

//         {/* Right: Actions Button */}
//         <Menu>
//           <MenuButton borderRadius="md" as={Button}>
//             M P
//           </MenuButton>
//           <MenuList>
//             <MenuItem>Messages</MenuItem>
//             <MenuItem onClick={() => navigate("/my-posts")}>My posts</MenuItem>

//             <MenuItem onClick={() => navigate("/account")}>Account</MenuItem>
//             <MenuItem onClick={logOut}>Logout</MenuItem>
//           </MenuList>
//         </Menu>
//       </Flex>
//     </Box>
//   );
// };

// export default Navbar;

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { GiChefToque } from "react-icons/gi";
import { TbChefHat } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth-context";
import { MdLightbulbOutline } from "react-icons/md";

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { logOut } = useAuth();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

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
      {/* Right: Actions Button */}
      <Menu>
        <MenuButton borderRadius="md" as={Button}>
          M P
        </MenuButton>
        <MenuList>
          <MenuItem>Messages</MenuItem>
          <MenuItem onClick={() => navigate("/my-posts")}>My posts</MenuItem>

          <MenuItem onClick={() => navigate("/account")}>Account</MenuItem>
          <MenuItem onClick={() => navigate("/translate")}>
            New translation
          </MenuItem>
          <MenuItem onClick={() => navigate("/past-translations")}>
            Past Translations
          </MenuItem>
          <MenuItem onClick={logOut}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Navbar;

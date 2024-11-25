import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const CreatePostButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/create-post");
  };

  return (
    <Box
      onClick={handleClick}
      as={Button}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={10}
      w="full"
      textAlign="center"
    >
      <HStack spacing={0} justifyContent="center" alignItems="center">
        <IoIosAdd fontSize={24} />
        <Text>Upload</Text>
      </HStack>
      <HStack spacing={0} justifyContent="center" alignItems="center">
        <Text fontSize="sm">(Drag and drop images or video)</Text>
      </HStack>
    </Box>
  );
};

export default CreatePostButton;

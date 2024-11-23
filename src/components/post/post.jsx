import {
  Stack,
  Box,
  Avatar,
  Text,
  Image,
  Tag,
  TagLabel,
  TagCloseButton,
  Divider,
  IconButton,
  Input,
  ButtonGroup,
  HStack,
  Button,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaComment } from "react-icons/fa";
import { PiCookingPotFill } from "react-icons/pi";
import { PiChefHatLight } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";

const Post = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("Exploring the Mountains");
  const [tags, setTags] = useState(["Adventure", "Travel", "Nature"]);
  const [currentTag, setCurrentTag] = useState("");

  const handleTagInput = (e) => {
    const value = e.target.value;
    const curTag = currentTag.trim();

    if (e.key === "Enter" || (value.startsWith("#") && e.key === " ")) {
      if (curTag && !tags.includes(curTag)) {
        setTags((prevTags) => [...prevTags, curTag.replace(/^#/, "")]);
        setCurrentTag("");
      }
      e.preventDefault();
    } else {
      setCurrentTag(value);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  const handleEditClick = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSavePost = () => {
    setIsEditing(false);
  };

  const handleDeletePost = () => {
    // Add logic for deleting the post
    navigate("/"); // Redirect to the home page after deletion
  };

  return (
    <Box display="flex" justifyContent={"center"} mt={6}>
      <Stack borderRadius="md" p={4} width="xl" maxW="xl" spacing={6}>
        {/* User Info with Edit Icon */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center">
            <Avatar src="https://via.placeholder.com/50" />
            <Text fontWeight="bold">JohnDoe</Text>
          </Stack>
          <IconButton
            icon={<FiEdit />}
            onClick={handleEditClick}
            aria-label="Edit Post"
            variant="ghost"
          />
        </Stack>

        {/* Post Picture */}
        <Image
          src="https://via.placeholder.com/600x400"
          alt={title}
          borderRadius="md"
        />

        {/* Post Title */}
        {isEditing ? (
          <Input
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter post title"
            size="lg"
          />
        ) : (
          <Text fontSize="xl" fontWeight="bold">
            {title}
          </Text>
        )}

        <ButtonGroup spacing="2">
          <Box as={Button}>
            <HStack spacing={2}>
              <Text fontSize="sm" fontWeight={"bold"}>
                25
              </Text>
              <PiCookingPotFill />
            </HStack>
          </Box>
          <Box as={Button}>
            <HStack spacing={2}>
              <Text fontSize="sm" fontWeight={"bold"}>
                2
              </Text>
              <FaComment />
            </HStack>
          </Box>
        </ButtonGroup>

        {/* Tags */}
        {isEditing ? (
          <Stack>
            {tags.length > 0 && (
              <Stack direction="row" wrap="wrap" spacing={2} mb={2}>
                {tags.map((tag, index) => (
                  <Tag
                    key={index}
                    colorScheme="blue"
                    size="md"
                    variant="solid"
                    borderRadius="full"
                  >
                    <TagLabel>{tag}</TagLabel>
                    <TagCloseButton onClick={() => removeTag(tag)} />
                  </Tag>
                ))}
              </Stack>
            )}
            <Input
              placeholder="Add a tag (press Enter)"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={handleTagInput}
              size="sm"
            />
            <Button mt={4} onClick={handleSavePost} width="full">
              Save
            </Button>
            <Button mt={4} onClick={handleSavePost} width="full">
              Cancel
            </Button>
            <Button
              mt={4}
              colorScheme="red"
              onClick={handleDeletePost}
              width="full"
            >
              Delete Post
            </Button>
          </Stack>
        ) : (
          <Stack direction="row" spacing={2}>
            {tags.map((tag, index) => (
              <Tag key={index} colorScheme="blue">
                <TagLabel>{tag}</TagLabel>
              </Tag>
            ))}
          </Stack>
        )}

        <Divider />

        {/* Comments */}
        <Stack spacing={4}>
          {[
            { id: 1, user: "JaneDoe", text: "This looks breathtaking!" },
            { id: 2, user: "Traveler123", text: "Where is this place?" },
            {
              id: 3,
              user: "NatureLover",
              text: "Adding this to my bucket list!",
            },
          ].map((comment) => (
            <Box
              key={comment.id}
              p={2}
              borderRadius="md"
              //   border="1px solid"
              borderColor="gray.200"
            >
              <Text fontWeight="bold">{comment.user}</Text>
              <Text>{comment.text}</Text>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Post;

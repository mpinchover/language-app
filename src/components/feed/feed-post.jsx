import {
  Avatar,
  Image,
  Card,
  CardBody,
  Heading,
  HStack,
  Stack,
  Wrap,
  Tag,
  Button,
  Divider,
  CardFooter,
  WrapItem,
  Box,
  ButtonGroup,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaComment } from "react-icons/fa";
import { PiCookingPotFill } from "react-icons/pi";

const MAX_VISIBLE_TAGS = 6;

const Post = ({ avatarPicture, postTitle, imgSrc, description, tags }) => {
  const [showAllTags, setShowAllTags] = useState(false);

  const handleToggleTags = () => {
    setShowAllTags((prev) => !prev);
  };

  return (
    <Card maxW="xl" width="full" boxShadow={"none"}>
      <CardBody>
        <Stack mt="6" spacing="3">
          <HStack>
            <Avatar src={avatarPicture} />
            <Heading size="md">{postTitle}</Heading>
          </HStack>

          <Image
            maxHeight="400"
            objectFit="cover"
            src={imgSrc}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />

          {/* <Text>{description}</Text> */}
          <Wrap spacing="2">
            {(showAllTags ? tags : tags.slice(0, MAX_VISIBLE_TAGS)).map(
              (tag, index) => (
                <WrapItem key={index}>
                  <Tag>{tag}</Tag>
                </WrapItem>
              )
            )}
          </Wrap>
          {tags.length > MAX_VISIBLE_TAGS && (
            <Box mt="2" textAlign="left">
              <Button
                size="sm"
                onClick={handleToggleTags}
                variant="link"
                colorScheme="blue"
              >
                {showAllTags ? "Show Less" : "Show More"}
              </Button>
            </Box>
          )}
        </Stack>
      </CardBody>

      <CardFooter flexDir={"column"}>
        <Stack spacing="3">
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
        </Stack>
      </CardFooter>
    </Card>
  );
};

export default Post;

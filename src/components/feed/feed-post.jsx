import {
  Avatar,
  Image,
  Card,
  CardBody,
  Heading,
  HStack,
  Stack,
  Button,
  CardFooter,
  Box,
  ButtonGroup,
  Text,
  Link,
} from "@chakra-ui/react";
import { FaComment } from "react-icons/fa";
import { PiCaretDoubleUp } from "react-icons/pi";

const Post = ({
  avatarPicture,
  postTitle,
  imgSrc,
  description,
  author,
  publishedAt,
  articleSrc,
}) => {
  return (
    <Card maxW="xl" width="full" boxShadow="none">
      <CardBody>
        <Stack mt="6" spacing="4">
          <HStack>
            <Avatar src={avatarPicture} />
            <Box display="flex" flexDir={"column"}>
              <Text fontSize="xs">{author}</Text>
              <Heading size="md">{postTitle}</Heading>
              <Box>
                <Text fontWeight="bold" fontSize="xs">
                  {publishedAt}
                </Text>
              </Box>
            </Box>
          </HStack>

          <Image
            maxHeight="400"
            objectFit="cover"
            src={imgSrc}
            alt="Post image"
            borderRadius="lg"
          />

          {/* Styled Description */}
          <Box
            bg="gray.50"
            p="4"
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
          >
            <Text fontSize="md" lineHeight="tall" color="gray.800" mb="2">
              {description}
            </Text>

            {/* AP News Link */}
            <Link
              href={articleSrc}
              isExternal
              fontSize="sm"
              color="blue.500"
              fontWeight="medium"
            >
              AP News
            </Link>
          </Box>
        </Stack>
      </CardBody>

      <CardFooter flexDir="column">
        <Stack spacing="3">
          <ButtonGroup spacing="2">
            <Box as={Button}>
              <HStack spacing={2}>
                <Text fontSize="sm" fontWeight="bold">
                  25
                </Text>
                <PiCaretDoubleUp fontWeight="bold" />
              </HStack>
            </Box>
            <Box as={Button}>
              <HStack spacing={2}>
                <Text fontSize="sm" fontWeight="bold">
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

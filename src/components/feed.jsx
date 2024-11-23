import { Box } from "@chakra-ui/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Text,
  Divider,
  Stack,
  ButtonGroup,
  Button,
  Avatar,
  HStack,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { FaComment } from "react-icons/fa";
import { PiCookingPotFill } from "react-icons/pi";
import { PiChefHatLight } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { IoIosAdd } from "react-icons/io";
import { useState } from "react";

const data = [
  {
    avatarPicture:
      "https://img.stablecog.com/insecure/1920w/aHR0cHM6Ly9iLnN0YWJsZWNvZy5jb20vODJhNGE2NTctMDQ0OC00YzMxLTg3MmQtMmMwZjNjM2MzODI0LmpwZWc.webp",
    postTitle: "Salmon bliss bowl",
    imgSrc:
      "https://boulderlocavore.com/wp-content/uploads/2022/01/teriyaki-salmon-title-image.jpg",
    description:
      "A perfectly seared salmon fillet resting on a bed of quinoa, avocado, and kale. Drizzle of lemon tahini for that extra zing.",
    tags: ["garlic", "salmon", "cilantro", "lemon"],
  },
  {
    avatarPicture:
      "https://i.etsystatic.com/39152123/r/il/2f705e/5850191672/il_fullxfull.5850191672_dc1s.jpg",
    postTitle: "Caesar Salad",
    imgSrc:
      "https://www.yellowblissroad.com/wp-content/uploads/2020/07/Garden-Salad-with-Homemade-Ranch-social.jpg",
    description:
      "Classic Caesar with a twist! Crunchy croutons, creamy dressing, and a surprise topping of grilled shrimp.",
    tags: ["salad", "lettuc", "onion", "tomato", "cashews"],
  },
  {
    avatarPicture:
      "https://img.stablecog.com/insecure/1920w/aHR0cHM6Ly9iLnN0YWJsZWNvZy5jb20vODJhNGE2NTctMDQ0OC00YzMxLTg3MmQtMmMwZjNjM2MzODI0LmpwZWc.webp",
    postTitle: "Truffle Mushroom Pizza",
    imgSrc:
      "https://i.pinimg.com/736x/22/4b/dd/224bdd51f530ba5925a3cd78bce4de11.jpg",
    description:
      "Wood-fired pizza topped with truffle oil, wild mushrooms, mozzarella, and a sprinkle of arugula.",
    tags: ["mushroom", "tomato sauce", "cheese", "flour", "egg"],
  },
  {
    avatarPicture:
      "https://img.stablecog.com/insecure/1920w/aHR0cHM6Ly9iLnN0YWJsZWNvZy5jb20vODJhNGE2NTctMDQ0OC00YzMxLTg3MmQtMmMwZjNjM2MzODI0LmpwZWc.webp",
    postTitle: "Grandma’s Lasagna",
    imgSrc:
      "https://www.southernliving.com/thmb/iI2Pd7BIh0MFuQ79WIEtgli9Ji4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Extra_Easy_Lasagna_006_4x3-41b0a478514c43e9baed0659bd362625.jpg",
    description:
      "Layers of love: rich tomato sauce, creamy ricotta, and stretchy mozzarella baked to golden perfection.",
    tags: ["mushroom", "tomato sauce", "cheese", "flour", "egg"],
  },
  {
    avatarPicture:
      "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
    postTitle: "Citrus-Glazed Salmon",
    imgSrc:
      "https://www.allrecipes.com/thmb/ybizVh1atdnDM_OVrtU6pwst0sE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8630004-da7b477bdabe4ce985bace5f5c4bd44b.jpg",
    description:
      "Sweet and tangy citrus glaze on salmon, paired with roasted veggies for a fresh, healthy plate.",
    tags: [
      "mushroom",
      "tomato sauce",
      "cheese",
      "flour",
      "egg",
      "mushroom",
      "tomato sauce",
      "cheese",
      "flour",
      "egg",
    ],
  },
];

const MAX_VISIBLE_TAGS = 6;

const Post = ({ avatarPicture, postTitle, imgSrc, description, tags }) => {
  const [showAllTags, setShowAllTags] = useState(false);

  const handleToggleTags = () => {
    setShowAllTags((prev) => !prev);
  };

  return (
    <Card maxW="xl">
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
      <Divider />
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

const Feed = () => {
  return (
    <Box display="flex" justifyContent={"center"}>
      <Stack mt="6" mb="6" spacing="6">
        <CreatePostButton />
        {data.map((e, i) => {
          return (
            <Post
              key={i}
              postTitle={e.postTitle}
              imgSrc={e.imgSrc}
              description={e.description}
              avatarPicture={e.avatarPicture}
              tags={e.tags}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default Feed;

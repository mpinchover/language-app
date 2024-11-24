import {
  Box,
  Stack,
  Image,
  Text,
  Input,
  Textarea,
  Button,
  TagCloseButton,
  Tag,
  TagLabel,
  Wrap,
  Grid,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const STATE_UPLOAD_IMAGES = "STATE_UPLOAD_IMAGES";
const STATE_DESCRIPTION_IMAGES = "STATE_DESCRIPTION_IMAGES";

const images = [
  {
    src: "https://www.allrecipes.com/thmb/UsNtGp9OgIsKw6cPqGQ-CxLmnTE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-72657-best-hamburger-ever-ddmfs-4x3-hero-878e801ab30445988d007461782b3c25.jpg",
    idx: 0,
  },
  {
    src: "https://www.allrecipes.com/thmb/UsNtGp9OgIsKw6cPqGQ-CxLmnTE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-72657-best-hamburger-ever-ddmfs-4x3-hero-878e801ab30445988d007461782b3c25.jpg",
    idx: 1,
  },
  {
    src: "https://www.allrecipes.com/thmb/UsNtGp9OgIsKw6cPqGQ-CxLmnTE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-72657-best-hamburger-ever-ddmfs-4x3-hero-878e801ab30445988d007461782b3c25.jpg",
    idx: 2,
  },
  {
    src: "https://www.allrecipes.com/thmb/UsNtGp9OgIsKw6cPqGQ-CxLmnTE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-72657-best-hamburger-ever-ddmfs-4x3-hero-878e801ab30445988d007461782b3c25.jpg",
    idx: 3,
  },
  {
    src: "https://www.allrecipes.com/thmb/UsNtGp9OgIsKw6cPqGQ-CxLmnTE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-72657-best-hamburger-ever-ddmfs-4x3-hero-878e801ab30445988d007461782b3c25.jpg",
    idx: 4,
  },
];

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });

const UploadImages = ({
  setIsLoading,
  setIsProcessingImages,
  isProcessingImages,
  updateCreatePostState,
}) => {
  const [imageOrder, setImageOrder] = useState({});
  const [orderingQueue, setOrderingQueue] = useState([]);

  useEffect(() => {
    const orderQueue = [];

    images.map((e, i) => {
      orderQueue.push(i);
    });
    setOrderingQueue(orderQueue);
  }, []);

  const onDrop = async (acceptedFiles) => {
    setIsProcessingImages(false); // Show spinner while processing files

    // Convert files to a format suitable for the backend
    const processedFiles = await Promise.all(
      acceptedFiles.map(async (file) => {
        const base64 = await toBase64(file);
        return { name: file.name, content: base64, type: file.type };
      })
    );

    setIsProcessingImages(true); // Hide spinner when done
    // updateCreatePostState(STATE_DESCRIPTION_IMAGES);
    // onUpload(processedFiles); // Pass files to parent
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (isDragActive) {
    // console.log("DRAG ACTIVE");
  }

  const handleUpdateImageOrder = (imgIndex) => {
    if (imageOrder[imgIndex] !== undefined) {
      const orderForIdx = imageOrder[imgIndex];
      setOrderingQueue((prev) => [orderForIdx, ...prev]);
      setImageOrder((prev) => {
        delete prev[imgIndex];
        return prev;
      });
      return;
    }
    const nextOrderIdxInQueue = orderingQueue[0];
    setOrderingQueue((prev) => prev.slice(1));
    setImageOrder((prev) => {
      return {
        ...prev,
        [imgIndex]: nextOrderIdxInQueue,
      };
    });
  };

  //   console.log("image order ", imageOrder);

  // if it's false and the images have been uploaded to uploaded image state
  if (!isProcessingImages) {
    return (
      <Stack display="flex" justifyContent="center">
        <Box display="flex" justifyContent="flex-end" w="full">
          <Text
            as="button"
            color="blue.500"
            fontWeight="bold"
            fontSize="lg"
            cursor="pointer"
            onClick={() => updateCreatePostState(STATE_DESCRIPTION_IMAGES)} // Update the state on click
            _hover={{ color: "blue.400" }} // Subtle color change on hover
          >
            Next
          </Text>
        </Box>
        <Grid
          templateColumns="repeat(auto-fill, minmax(150px, 1fr))"
          gap={4}
          maxW="1000px"
          w="full"
        >
          {images.map((img, idx) => (
            <Box
              key={idx}
              as="button" // Makes the box clickable
              // onClick={() => handleClick(post.id)}

              // use a Q to manage the ordering
              onClick={() => handleUpdateImageOrder(img.idx)}
              //   borderWidth="1px"
              borderRadius="md"
              backgroundColor="black"
              overflow="hidden"
              position="relative"
              //   objectFit={"cover"}
              _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
              transition="transform 0.2s ease-in-out"
            >
              <Image h="100%" w="100%" objectFit={"cover"} src={img.src} />

              <Box
                position="absolute"
                bottom="8px"
                right="8px"
                h="30px"
                w="30px"
                bg="rgba(255, 255, 255, 0.8)"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontWeight="bold"
                color="black"
                fontSize="md"
              >
                {imageOrder[idx] !== undefined ? imageOrder[idx] + 1 : ""}
              </Box>
            </Box>
          ))}
        </Grid>
      </Stack>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      //   alignItems="center"
      p={10}
      //   w="full"
      //   textAlign="center"
      as={Button}
      {...getRootProps()}
      //   {...getInputProps()}
    >
      <Text>Create post</Text>
      <Text>Drag and drop images</Text>
    </Box>
  );
};

const DescribePost = ({ handleUploadImages }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTagInput = (e) => {
    const value = e.target.value;

    const curTag = currentTag.trim();
    if (!curTag) {
      setCurrentTag(value);
      return;
    }

    if (e.key === "Enter" || (value.startsWith("#") && e.key === " ")) {
      if (tags.includes(curTag)) {
        setCurrentTag("");
        e.preventDefault();
        return;
      }
      setTags((prevTags) => {
        const updatedTags = [...prevTags, curTag.replace(/^#/, "")];
        setCurrentTag("");
        return updatedTags;
      });
      e.preventDefault();
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Stack display="flex" justifyContent="center">
      {/* <Grid
        templateColumns="repeat(auto-fill, minmax(100px, 1fr))"
        gap={4}
        w="full"
      >
        {[1, 2, 3].map((img, i) => (
          <Box
            key={i}
            as="button" // Makes the box clickable
            // onClick={() => handleClick(post.id)}
            //   borderWidth="1px"
            borderRadius="md"
            backgroundColor="black"
            overflow="hidden"
            //   objectFit={"cover"}
            // _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
            // transition="transform 0.2s ease-in-out"
          >
            <Image
              h="100%"
              w="100%"
              objectFit={"cover"}
              src={
                "https://media.istockphoto.com/id/1468279469/photo/fresh-raw-salmon-and-ingredients-for-marinade-on-light-grey-table-closeup.jpg?s=612x612&w=0&k=20&c=U2qmWEAG4mdHzrUHqfPcO4YLcK3BsFGKffhIv68Rh4o="
              }
              //   alt={post.alt}
            />
          </Box>
        ))}
      </Grid> */}
      {/* Post Title Input */}
      <Box>
        <Input
          placeholder="Enter post title"
          value={title}
          onChange={handleTitleChange}
          //   size="lg"
        />
      </Box>

      {/* Post Description Input */}
      <Box>
        <Textarea
          m={0}
          rows={6}
          placeholder="Enter description or recipe"
          value={description}
          onChange={handleDescriptionChange}
          resize="none"
          overflowY={"scroll"}
          //   size="sm"
        />
      </Box>

      {/* Tags Input and List */}
      <Box>
        <Textarea
          m={0}
          resize="none"
          placeholder="Enter tags (press Enter or start with # and press Space)"
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          onKeyDown={handleTagInput}
          //   size="sm"
        />
        <Wrap mt={tags.length > 0 ? 6 : 0}>
          {tags.map((tag, index) => (
            <Tag key={index} size="md" variant="solid" colorScheme="blue">
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => handleTagRemove(tag)} />
            </Tag>
          ))}
        </Wrap>
      </Box>
      <Button onClick={handleUploadImages}>Create</Button>
    </Stack>
  );
};

const CreatePost = () => {
  const [createPostState, setCreatePostState] = useState(STATE_UPLOAD_IMAGES);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessingImages, setIsProcessingImages] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const updateCreatePostState = (newState) => {
    setCreatePostState(newState);
  };

  const handleUploadImages = () => {
    navigate("/");
  };

  return (
    <Box
      flex={1}
      //   border={"1px solid"}
      display="flex"
      alignItems={"center"}
      justifyContent="center"
    >
      <Stack mt="6" mb="6" spacing="6" maxW="xl" w="100%">
        {createPostState === STATE_UPLOAD_IMAGES && (
          <UploadImages
            updateCreatePostState={updateCreatePostState}
            setIsProcessingImages={setIsProcessingImages}
            isProcessingImages={isProcessingImages}
            setIsLoading={setIsLoading}
          />
        )}
        {createPostState === STATE_DESCRIPTION_IMAGES && (
          <DescribePost handleUploadImages={handleUploadImages} />
        )}
      </Stack>
    </Box>
  );
};

export default CreatePost;

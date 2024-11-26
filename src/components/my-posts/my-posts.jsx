import { Box, Grid, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MyPosts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([
    { id: 1, image: "https://via.placeholder.com/150", alt: "Post 1" },
    { id: 2, image: "https://via.placeholder.com/150", alt: "Post 2" },
    { id: 3, image: "https://via.placeholder.com/150", alt: "Post 3" },
    { id: 4, image: "https://via.placeholder.com/150", alt: "Post 4" },
    { id: 5, image: "https://via.placeholder.com/150", alt: "Post 5" },
    { id: 6, image: "https://via.placeholder.com/150", alt: "Post 6" },
    { id: 7, image: "https://via.placeholder.com/150", alt: "Post 7" },
    { id: 8, image: "https://via.placeholder.com/150", alt: "Post 8" },
  ]);

  const handleClick = (id) => {
    console.log(`Post clicked: ${id}`);
    navigate(`/post/${id}`);
    // Add your logic here (e.g., navigate to a new page or open a modal)
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={4}>
      <Grid
        templateColumns="repeat(auto-fill, minmax(150px, 1fr))"
        gap={4}
        maxW="1000px"
        w="full"
      >
        {posts.length ? (
          posts.map((post) => (
            <Box
              key={post.id}
              as="button" // Makes the box clickable
              onClick={() => handleClick(post.id)}
              //   borderWidth="1px"
              borderRadius="md"
              backgroundColor="black"
              overflow="hidden"
              //   objectFit={"cover"}
              _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
              transition="transform 0.2s ease-in-out"
            >
              <Image
                h="100%"
                w="100%"
                objectFit={"cover"}
                src={post.image}
                alt={post.alt}
              />
            </Box>
          ))
        ) : (
          <Text>No posts available</Text>
        )}
      </Grid>
    </Box>
  );
};

export default MyPosts;

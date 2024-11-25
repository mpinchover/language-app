import { Box, Stack, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import FeedPost from "./feed-post"; // Import the Post component
import CreatePostButton from "./create-post-button"; // Import the CreatePostButton component

const initialData = [
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
      "https://img.stablecog.com/insecure/1920w/aHR0cHM6Ly9iLnN0YWJsZWNvZy5jb20vODJhNGE2NTctMDQ0OC00YzMxLTg3MmQtMmMwZjNjM2MzODI0LmpwZWc.webp",
    postTitle: "Salmon bliss bowl",
    imgSrc:
      "https://boulderlocavore.com/wp-content/uploads/2022/01/teriyaki-salmon-title-image.jpg",
    description:
      "A perfectly seared salmon fillet resting on a bed of quinoa, avocado, and kale. Drizzle of lemon tahini for that extra zing.",
    tags: ["garlic", "salmon", "cilantro", "lemon"],
  },
];

const addedData2 = [
  {
    avatarPicture:
      "https://img.stablecog.com/insecure/1920w/aHR0cHM6Ly9iLnN0YWJsZWNvZy5jb20vODJhNGE2NTctMDQ0OC00YzMxLTg3MmQtMmMwZjNjM2MzODI0LmpwZWc.webp",
    postTitle: "Salmon bliss bowl",
    imgSrc:
      "https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
    description:
      "A perfectly seared salmon fillet resting on a bed of quinoa, avocado, and kale. Drizzle of lemon tahini for that extra zing.",
    tags: ["garlic", "salmon", "cilantro", "lemon"],
  },
  {
    avatarPicture:
      "https://img.stablecog.com/insecure/1920w/aHR0cHM6Ly9iLnN0YWJsZWNvZy5jb20vODJhNGE2NTctMDQ0OC00YzMxLTg3MmQtMmMwZjNjM2MzODI0LmpwZWc.webp",
    postTitle: "Salmon bliss bowl",
    imgSrc:
      "https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
    description:
      "A perfectly seared salmon fillet resting on a bed of quinoa, avocado, and kale. Drizzle of lemon tahini for that extra zing.",
    tags: ["garlic", "salmon", "cilantro", "lemon"],
  },
  {
    avatarPicture:
      "https://img.stablecog.com/insecure/1920w/aHR0cHM6Ly9iLnN0YWJsZWNvZy5jb20vODJhNGE2NTctMDQ0OC00YzMxLTg3MmQtMmMwZjNjM2MzODI0LmpwZWc.webp",
    postTitle: "Salmon bliss bowl",
    imgSrc:
      "https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
    description:
      "A perfectly seared salmon fillet resting on a bed of quinoa, avocado, and kale. Drizzle of lemon tahini for that extra zing.",
    tags: ["garlic", "salmon", "cilantro", "lemon"],
  },
  {
    avatarPicture:
      "https://img.stablecog.com/insecure/1920w/aHR0cHM6Ly9iLnN0YWJsZWNvZy5jb20vODJhNGE2NTctMDQ0OC00YzMxLTg3MmQtMmMwZjNjM2MzODI0LmpwZWc.webp",
    postTitle: "Salmon bliss bowl",
    imgSrc:
      "https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
    description:
      "A perfectly seared salmon fillet resting on a bed of quinoa, avocado, and kale. Drizzle of lemon tahini for that extra zing.",
    tags: ["garlic", "salmon", "cilantro", "lemon"],
  },
];

const Feed = () => {
  const [posts, setPosts] = useState(initialData); // Current list of posts
  const [loading, setLoading] = useState(false); // Loading state for more posts
  const [hasMore, setHasMore] = useState(true); // Flag to indicate if more posts are available

  // Simulate fetching more posts
  const fetchMorePosts = () => {
    if (!hasMore) return;

    setLoading(true);

    setTimeout(() => {
      setPosts((prevPosts) => [...prevPosts, ...addedData2]);
      setLoading(false);

      // Example: Stop loading after 3 fetches
      if (posts.length > 30) {
        setHasMore(false);
      }
    }, 2000); // Simulate network delay
  };

  // Infinite Scroll Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading && hasMore) {
          fetchMorePosts();
        }
      },
      { threshold: 1.0 }
    );

    const sentinel = document.querySelector("#infinite-scroll-sentinel");
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => observer.disconnect();
  }, [loading, hasMore]);

  return (
    <Box display="flex" justifyContent={"center"}>
      <Stack maxW="xl" width="full" mt="6" mb="6" spacing="6">
        <CreatePostButton />

        {posts.map((post, index) => (
          <FeedPost
            key={index}
            postTitle={post.postTitle}
            imgSrc={post.imgSrc}
            description={post.description}
            avatarPicture={post.avatarPicture}
            tags={post.tags}
          />
        ))}

        {/* Sentinel for Infinite Scroll */}
        {hasMore && (
          <Box id="infinite-scroll-sentinel" textAlign="center" py={4}>
            {loading ? <Spinner size="lg" /> : "Loading more..."}
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default Feed;

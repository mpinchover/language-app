import { Box, Stack, Spinner, Divider } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import FeedPost from "./feed-post"; // Import the Post component
import CreatePostButton from "./create-post-button"; // Import the CreatePostButton component

const initialData = [
  {
    author: "Space Girl",
    avatarPicture:
      "https://img.stablecog.com/insecure/1920w/aHR0cHM6Ly9iLnN0YWJsZWNvZy5jb20vODJhNGE2NTctMDQ0OC00YzMxLTg3MmQtMmMwZjNjM2MzODI0LmpwZWc.webp",
    postTitle: "Landing on the Moon Isn’t Easy",
    articleSrc:
      "https://apnews.com/article/japan-moon-landing-resilience-be77f0a34032ce5a4fc524fe96888bfa",
    imgSrc:
      "https://ucf83e2bfbe87ceca50a8ff83d72.previews.dropboxusercontent.com/p/thumb/ACqkd7DfoJ8VIJnvOOqN1F2Nh3hPjY68w945UiDM4q3hY95kMvRfM4Ue11D65h_z6lP7PQApWw-NTqezGmGlAV2ABIcTTwBHqppbONhJrpmeAy03aWmBCdXJajARQYJnVNcqueEJkpDJas0IziYsCQkMcIDxo6jBKaGZJOf51kPcaCIuRn2qQG3DR54AR03CyN9zRnS0XwMh-ac9lz15q6T5mDjZ8LiXXyji6KjWQNeZFoTggKC9u6eyrCotuQO1lWesCfPIRRiyq3QpRUNLU_IbWDhe0ARXkHCzCRJ5nIVZk0KF8aL3QWCEcNLs2sVHF4Eqd0NV717qHwSZEx6yD8-HfQg-SPuT2BVorUPt0rsWbyRConWskRtV6bs-nCWAJF6jfkNncH9Tt1o97DEEzDXg/p.png?is_prewarmed=true",
    description:
      "Japan’s private company ispace tried to land its Resilience spacecraft on the moon but lost contact just two minutes before touchdown. The team says a sensor that measures altitude didn’t work properly, causing the lander to descend too fast and crash. Onboard were a small rover and even a tiny model house as part of a science and art mission. This was ispace’s second failed lunar landing, but they plan to keep trying and aim for a larger NASA-backed mission in 2027. Landing on the moon is still very difficult, and this shows how tough space exploration can be, even for private companies.",
    tags: ["garlic", "salmon", "cilantro", "lemon"],
    publishedAt: "2 hours ago",
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
          <>
            <FeedPost
              articleSrc={post.articleSrc}
              publishedAt={post.publishedAt}
              author={post.author}
              key={index}
              postTitle={post.postTitle}
              imgSrc={post.imgSrc}
              description={post.description}
              avatarPicture={post.avatarPicture}
              tags={post.tags}
            />
            {index < posts.length - 1 && <Divider />}
          </>
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

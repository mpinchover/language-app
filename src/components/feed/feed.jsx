import { Box, Stack, Spinner, Divider } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import FeedPost from "./feed-post";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const PAGE_SIZE = 5;

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [curPage, setCurPage] = useState(1);
  const observerRef = useRef(null);

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/posts?page=${page}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      // If fewer than page size, assume no more posts
      if (data.length < PAGE_SIZE) {
        setHasMore(false);
      }

      setPosts((prev) => [...prev, ...data]);
      setCurPage((prev) => prev + 1);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(curPage); // Load initial page
  }, []);

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          fetchData(curPage);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [curPage, hasMore, loading]);

  return (
    <Box display="flex" justifyContent="center">
      <Stack maxW="xl" width="full" mt="6" mb="6" spacing="6">
        {posts.map((post, index) => (
          <Box key={post.uuid || index}>
            <FeedPost
              articleSrc={post.articleSrc}
              publishedAt={post.publishedAt}
              author={post.username}
              postTitle={post.title}
              imgSrc={post.media_url}
              description={post.text}
              avatarPicture={post.profile_picture_url}
              followUpQuestions={post.follow_up_questions}
            />
            {index < posts.length - 1 && <Divider />}
          </Box>
        ))}

        {hasMore && (
          <Box
            ref={observerRef}
            id="infinite-scroll-sentinel"
            textAlign="center"
            py={4}
          >
            {loading ? <Spinner size="lg" /> : "Loading more..."}
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default Feed;

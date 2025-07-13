import { Box, Text, VStack, Heading, Center, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const getArticles = async () => {
    const user = auth.currentUser;
    const idToken = await user.getIdToken();

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/get-articles`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      });
      const data = await response.json();

      if (data.success && data.articles) {
        setArticles(data.articles);
      } else {
        console.error("Failed to fetch articles:", data);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickArticle = (translationUUID) => {
    navigate(`/translation/${translationUUID}`);
  };

  useEffect(() => {
    getArticles();
  }, []);

  const renderArticles = (articles) => {
    return articles?.map((e, i) => (
      <Box
        key={i}
        p={6}
        borderRadius="xl"
        boxShadow="sm"
        bg="gray.50"
        _hover={{ bg: "gray.100", cursor: "pointer", boxShadow: "md" }}
        transition="all 0.2s ease-in-out"
        w="100%"
        onClick={() => handleClickArticle(e.uuid)} // ✅ click handler here
      >
        <Text fontSize="lg" fontWeight="semibold" mb={2} color="gray.800">
          {e.first_sentence_en}
        </Text>
        <Text fontSize="md" color="gray.600">
          {e.first_sentence_language}
        </Text>
      </Box>
    ));
  };

  if (loading) {
    return (
      <Center h="80vh">
        <Spinner size="xl" color="blue.500" thickness="4px" speed="0.65s" />
      </Center>
    );
  }

  return (
    <Box mt={24} p={[4, 8, 12]} bg="white" minH="100vh">
      <Heading size="lg" mb={6} color="gray.700">
        Click an article to read
      </Heading>
      <VStack spacing={6} align="stretch">
        {renderArticles(articles)}
      </VStack>
    </Box>
  );
};

export default Articles;

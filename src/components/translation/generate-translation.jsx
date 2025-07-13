import {
  Box,
  VStack,
  Text,
  HStack,
  Tooltip,
  Textarea,
  Button,
  Input,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const GenerateTranslation = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [articleContent, setArticleContent] = useState();
  const auth = getAuth();
  const toast = useToast();

  const getData = async () => {
    if (!articleContent || articleContent.trim().split(/\s+/).length < 5) {
      toast({
        title: "We need a little more text.",
        description: "Please enter at least 5 words.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const user = auth.currentUser;
    const idToken = await user.getIdToken();

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/translate-article`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          article_content: articleContent,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const translationUuid = data.uuid;
      navigate(`/translation/${translationUuid}`);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxW="3xl"
      mx="auto"
      mt={12}
      p={8}
      borderWidth={1}
      borderRadius="xl"
      boxShadow="lg"
    >
      <VStack spacing={6} align="stretch">
        <Text fontSize="xl" fontWeight="semibold">
          Paste an article to translate
        </Text>
        <Text fontSize="sm" color="gray.500">
          Enter the full article text below. We’ll analyze and simplify it into
          multiple reading levels.
        </Text>
        <Textarea
          placeholder="Paste article text here..."
          resize="none"
          value={articleContent}
          onChange={(e) => setArticleContent(e.target.value)}
          size="md"
          height="200px"
        />
        <Button
          colorScheme="blue"
          alignSelf="flex-end"
          isLoading={false}
          onClick={getData}
          disabled={loading}
        >
          {loading ? (
            <HStack spacing={3}>
              <Spinner size="sm" />
              <Text fontSize="sm">Hang on, this can take 1–2 minutes.</Text>
            </HStack>
          ) : (
            "Generate Translation"
          )}
        </Button>
      </VStack>
    </Box>
  );
};

export default GenerateTranslation;

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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // ✅ Add this line

const GenerateTranslation = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ Add this line

  const [articleContent, setArticleContent] = useState();
  const [machineGeneratedData, setMachineGeneratedData] = useState({});
  const auth = getAuth();

  const getData = async () => {
    const user = auth.currentUser;
    const idToken = await user.getIdToken();

    try {
      setLoading(true);
      //   const response = await fetch(
      //     "http://127.0.0.1:5005/api/translate-article",
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //         Authorization: `Bearer ${idToken}`,
      //       },
      //       body: JSON.stringify({
      //         article_content: articleContent,
      //       }),
      //     }
      //   );

      //   if (!response.ok) {
      //     throw new Error(`HTTP error! status: ${response.status}`);
      //   }

      //   const data = await response.json();

      const data = {
        uuid: "something",
      };

      const translationUuid = data.uuid;
      navigate(`/translation/${translationUuid}`); // ✅ Redirect here
      //   setMachineGeneratedData(data);
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
          isLoading={loading}
          onClick={getData}
        >
          Generate Translation
        </Button>
      </VStack>
    </Box>
  );
};

export default GenerateTranslation;

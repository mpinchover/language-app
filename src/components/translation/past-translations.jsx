import { Box, VStack, Text, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import fakeJson from "./past-translations-da.json";

const PastTranslations = () => {
  const [translations, setTranslations] = useState(fakeJson["translations"]);

  useEffect(() => {
    fetch("http://localhost:5000/api/get-translations")
      .then((res) => res.json())
      .then((data) => {
        const originalSentence = [];
        data["original"][0].map((e) => {
          originalSentence.push(e.he);
        });
        setTranslations(data);
      })
      .catch((err) => {
        console.error("Failed to fetch translations:", err);
      });
  }, []);

  const handleDelete = (e, idx) => {
    e.stopPropagation();
    fetch(`http://localhost:5000/api/delete-translation/${e.uuid}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setTranslations((prev) => prev.filter((t) => t.uuid !== e.uuid));
      })
      .catch((err) => {
        console.error("Failed to fetch translations:", err);
      });

    // setTranslations(translations.filter((_, i) => i !== idx));
  };

  const handleBoxClick = (idx) => {
    // router.push(`/translation/${idx}`);
  };

  return (
    <Box p={12}>
      {translations.map((item, idx) => (
        <Box
          key={idx}
          mb={6}
          p={6}
          borderRadius="md"
          borderWidth={1}
          _hover={{ bg: "gray.50", cursor: "pointer" }}
          onClick={() => handleBoxClick(idx)}
        >
          <VStack align="start" spacing={4}>
            <Text fontSize={24}>{item.preview_en}</Text>
            <Text fontSize={24}>{item.preview_he}</Text>
            <Button
              colorScheme="red"
              alignSelf="flex-end"
              onClick={(e) => handleDelete(e, idx)}
            >
              Delete
            </Button>
          </VStack>
        </Box>
      ))}
    </Box>
  );
};

export default PastTranslations;

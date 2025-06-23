import {
  Box,
  VStack,
  Text,
  Button,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import fakeJson from "./past-translations-da.json";

const PastTranslations = () => {
  const [translations, setTranslations] = useState(fakeJson["translations"]);

  useEffect(() => {
    fetch("http://localhost:5000/api/get-translations")
      .then((res) => res.json())
      .then((data) => {
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
      .then(() => {
        setTranslations((prev) => prev.filter((t) => t.uuid !== e.uuid));
      })
      .catch((err) => {
        console.error("Failed to delete translation:", err);
      });
  };

  const handleBoxClick = (idx) => {
    // router.push(`/translation/${idx}`);
  };

  return (
    <Box maxW="4xl" mx="auto" p={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        Your Past Translations
      </Text>
      <VStack spacing={6} align="stretch">
        {translations.map((item, idx) => (
          <Box
            key={idx}
            p={6}
            borderRadius="lg"
            borderWidth={1}
            boxShadow="sm"
            transition="all 0.2s"
            _hover={{ boxShadow: "md", bg: "gray.50", cursor: "pointer" }}
            onClick={() => handleBoxClick(idx)}
          >
            <HStack justify="space-between" align="start" mb={2}>
              <Text fontSize="md" fontWeight="medium" color="gray.600">
                Translation #{idx + 1}
              </Text>
              <IconButton
                icon={<CloseIcon />}
                size="sm"
                colorScheme="red"
                variant="ghost"
                aria-label="Delete"
                onClick={(e) => handleDelete(e, idx)}
              />
            </HStack>
            <VStack align="start" spacing={2}>
              <Text fontSize="lg" fontWeight="semibold">
                {item.preview_en}
              </Text>
              <Text fontSize="lg" color="gray.600">
                {item.preview_he}
              </Text>
            </VStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default PastTranslations;

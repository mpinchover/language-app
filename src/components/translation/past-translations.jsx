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
import { getAuth } from "firebase/auth";
// import fakeJson from "./past-translations-da.json";

const PastTranslations = () => {
  const [translations, setTranslations] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  const getPastTranslations = async () => {
    const idToken = await user.getIdToken(); // this is what you need

    fetch("http://localhost:5005/api/get-translations", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Got back data ", data);
        setTranslations(data["translations"]);
      })
      .catch((err) => {
        console.error("Failed to fetch translations:", err);
      });
  };

  useEffect(() => {
    getPastTranslations();
  }, []);

  const handleDelete = async (e, item, idx) => {
    e.stopPropagation();
    const idToken = await user.getIdToken(); // this is what you need
    fetch(`http://localhost:5005/api/delete-translation/${item.uuid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        setTranslations((prev) => prev.filter((t) => t.uuid !== item.uuid));
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
                onClick={(e) => handleDelete(e, item, idx)}
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

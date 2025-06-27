import {
  Box,
  VStack,
  Text,
  Button,
  HStack,
  IconButton,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const PastTranslations = () => {
  const [translations, setTranslations] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [deletingIdx, setDeletingIdx] = useState(null); // 🔹 Track item being deleted

  const getPastTranslations = async () => {
    setIsLoading(true);
    const idToken = await user.getIdToken();

    fetch(
      "https://translation-app-377296926112.southamerica-east1.run.app/api/get-translations",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setTranslations(data["translations"]);
      })
      .catch((err) => {
        console.error("Failed to fetch translations:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getPastTranslations();
  }, []);

  const handleDelete = async (e, item, idx) => {
    e.stopPropagation();
    setDeletingIdx(idx); // 🔹 Set current deleting index

    try {
      const idToken = await user.getIdToken();
      await fetch(
        `https://translation-app-377296926112.southamerica-east1.run.app/api/delete-translation/${item.uuid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      setTranslations((prev) => prev.filter((t) => t.uuid !== item.uuid));
    } catch (err) {
      console.error("Failed to delete translation:", err);
    } finally {
      setDeletingIdx(null); // 🔹 Clear after deletion attempt
    }
  };

  const handleBoxClick = (idx) => {
    const translationUUID = translations[idx].uuid;
    navigate(`/translation/${translationUUID}`);
  };

  return (
    <Box maxW="4xl" mx="auto" p={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        Your Past Translations
      </Text>

      {isLoading ? (
        <Center py={12} flexDirection="column" gap={4}>
          <Spinner size="lg" color="blue.500" />
          <Text fontSize="md" color="gray.600">
            Loading past translations...
          </Text>
        </Center>
      ) : (
        <VStack spacing={6} align="stretch">
          {translations.map((item, idx) => (
            <Box
              key={item.uuid}
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
                  icon={
                    deletingIdx === idx ? (
                      <Spinner size="xs" />
                    ) : (
                      <CloseIcon boxSize={3} />
                    )
                  }
                  size="sm"
                  colorScheme="red"
                  variant="ghost"
                  aria-label="Delete"
                  onClick={(e) => handleDelete(e, item, idx)}
                  isDisabled={deletingIdx === idx}
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
      )}
    </Box>
  );
};

export default PastTranslations;

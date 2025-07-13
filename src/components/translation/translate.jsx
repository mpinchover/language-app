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
import { useNavigate, useParams } from "react-router-dom";
import { Spinner, Center } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";

const Translate = () => {
  const [showIntake, setShowIntake] = useState(true);
  const [inputText, setInputText] = useState("");
  const [inputLink, setInputLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [selection1, setSelection1] = useState("gen_original");
  const [selection2, setSelection2] = useState("gen_level_1");
  const [allTranslations, setAllTranslations] = useState({});
  const [boxLeft, setBoxLeft] = useState([]);
  const [boxRight, setBoxRight] = useState([]);
  const [articleContent, setArticleContent] = useState();
  const [machineGeneratedData, setMachineGeneratedData] = useState({});
  const [tappedTokenIndex, setTappedTokenIndex] = useState(null); // ✅ Track tapped token on mobile
  const [tappedTokenMap, setTappedTokenMap] = useState({});
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const isMobile = useBreakpointValue({ base: true, md: false }); // ✅ Track if device is mobile
  const auth = getAuth();
  const { translation_uuid } = useParams();
  const navigate = useNavigate();

  const getData = async () => {
    const user = auth.currentUser;
    const idToken = await user.getIdToken();

    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/api/get-article/${translation_uuid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const article = data.article;
      setMachineGeneratedData(article);
      generateAllSentences(article.versions);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateSentences = (data, version) => {
    let curSentence = [];
    const sentences = [];

    data?.[version]?.forEach((sentence) => {
      sentence.forEach(({ he, nikud, en }) => {
        curSentence.push({ he, nikud, en });
      });
      sentences.push(curSentence);
      curSentence = [];
    });

    return sentences;
  };

  const generateAllSentences = (data) => {
    const originalSentences = generateSentences(data, "gen_original");
    const simplified1Sentences = generateSentences(data, "gen_level_1");

    setBoxLeft(originalSentences);
    setBoxRight(simplified1Sentences);
  };

  const onChangeSelection = (box, e) => {
    const value = e.target.value;
    const newSentences = generateSentences(
      machineGeneratedData.versions,
      value
    );

    if (box === "box_left") {
      setSelection1(value);
      setBoxLeft(newSentences);
    } else {
      setSelection2(value);
      setBoxRight(newSentences);
    }
  };

  useEffect(() => {
    if (!isMobile) return;

    const handleClickOutside = () => {
      setTappedTokenMap({});
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMobile]);

  useEffect(() => {
    if (translation_uuid) {
      getData();
    }
  }, [translation_uuid]);

  // ✅ Token renderer with mobile + desktop behavior
  const renderTokenBlock = (tokens, sentenceIdx) => (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={2}
      lineHeight="2.5rem"
      onClick={() =>
        setTappedTokenMap((prev) => ({ ...prev, [sentenceIdx]: null }))
      }
    >
      {tokens.map(({ he, nikud, en }, j) => {
        const isTapped = tappedTokenMap[sentenceIdx] === j;

        return (
          <Tooltip
            key={j}
            isOpen={isMobile ? isTapped : undefined}
            onOpen={() =>
              isMobile &&
              setTappedTokenMap((prev) => ({ ...prev, [sentenceIdx]: j }))
            }
            onClose={() =>
              isMobile &&
              setTappedTokenMap((prev) => ({ ...prev, [sentenceIdx]: null }))
            }
            label={
              <Box p={2}>
                <Text fontSize="md" color="blue.500">
                  {nikud}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {en}
                </Text>
              </Box>
            }
            placement="top"
            hasArrow
            bg="gray.100"
            color="black"
            borderRadius="md"
            boxShadow="md"
          >
            <Box
              as="span"
              fontSize="xl"
              px={2}
              py={1}
              _hover={{ bg: "gray.100" }}
              borderRadius="md"
              cursor="pointer"
              onClick={(e) => {
                if (isMobile) {
                  e.stopPropagation();
                  setTappedTokenMap((prev) => ({ ...prev, [sentenceIdx]: j }));
                }
              }}
            >
              {he}
            </Box>
          </Tooltip>
        );
      })}
    </Box>
  );

  if (loading) {
    return (
      <Center h="80vh">
        <Spinner size="xl" color="blue.500" thickness="4px" speed="0.65s" />
      </Center>
    );
  }

  return (
    <Box px={12}>
      <Box mt={4} display="flex" justifyContent="flex-end"></Box>

      <Box mt={6}>
        <HStack spacing={6}>
          <Box flex={1}>
            <Select
              value={selection1}
              onChange={(e) => onChangeSelection("box_left", e)}
              mb={4}
            >
              <option value="gen_original">Original</option>
              <option value="gen_level_1">Basic</option>
              <option value="gen_level_2">Intermediate</option>
              <option value="gen_level_3">Advanced</option>
            </Select>
          </Box>
          {!isMobile && (
            <Box flex={1}>
              <Select
                value={selection2}
                onChange={(e) => onChangeSelection("box_right", e)}
                mb={4}
              >
                <option value="gen_original">Original</option>
                <option value="gen_level_1">Basic</option>
                <option value="gen_level_2">Intermediate</option>
                <option value="gen_level_3">Advanced</option>
              </Select>
            </Box>
          )}
        </HStack>

        <VStack spacing={6} align="stretch" mt={2}>
          {boxLeft.map((leftSentence, idx) => {
            const rightSentence = boxRight[idx] || [];
            const hue = (idx * 50) % 360;
            const bgColor = `hsl(${hue}, 100%, 95%)`;

            return (
              <HStack
                key={idx}
                spacing={6}
                align="stretch"
                flexDir={{ base: "column", md: "row" }}
              >
                <Box flex={1} p={4} borderRadius="xl" bg={bgColor} dir="rtl">
                  {renderTokenBlock(leftSentence, idx)}
                </Box>

                {!isMobile && (
                  <Box flex={1} p={4} borderRadius="xl" bg={bgColor} dir="rtl">
                    {renderTokenBlock(rightSentence, idx + 10000)}{" "}
                    {/* offset index to separate tooltips */}
                  </Box>
                )}
              </HStack>
            );
          })}
        </VStack>
      </Box>
    </Box>
  );
};

export default Translate;

import {
  Box,
  VStack,
  Text,
  HStack,
  Tooltip,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Textarea,
  Button,
  Input,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
// import fakeData from "./generate-translation.json";
import { getAuth } from "firebase/auth";

const Translate = () => {
  const [showIntake, setShowIntake] = useState(true);
  const [inputText, setInputText] = useState("");
  const [inputLink, setInputLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [selection1, setSelection1] = useState("orignal");
  const [selection2, setSelection2] = useState("level_1");
  const [allTranslations, setAllTranslations] = useState({});
  const [boxLeft, setBoxLeft] = useState([]);
  const [boxRight, setBoxRight] = useState([]);
  const [articleContent, setArticleContent] = useState();
  const [machineGeneratedData, setMachineGeneratedData] = useState({});
  const auth = getAuth();

  // console.log("MDG: ", machineGeneratedData);
  const getData = async () => {
    const user = auth.currentUser;
    const idToken = await user.getIdToken(); // this is what you need

    try {
      setLoading(true);
      const response = await fetch(
        "http://127.0.0.1:5005/api/translate-article",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            article_content: articleContent,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMachineGeneratedData(data);
      console.log("Response:", data);
      setShowIntake(false);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateAllSentences = () => {
    const originalSentences = generateSentences("original");
    // console.log("Original sen ", originalSentences);
    const simplified1Sentences = generateSentences("level_1");
    const simplified2Sentences = generateSentences("level_2");
    const simplified3Sentences = generateSentences("level_3");

    // setAllTranslations(allTranslations);
    setBoxLeft(originalSentences);
    setBoxRight(simplified1Sentences);
    // setBoxRight(simplified4Sentences);
  };

  const generateSentences = (version) => {
    let curSentence = [];
    const sentences = [];

    machineGeneratedData?.[version]?.forEach((sentence) => {
      sentence.forEach(({ he, nikud, en }, idx) => {
        curSentence.push({ he, nikud, en });
      });
      sentences.push(curSentence);
      curSentence = [];
    });

    return sentences;
  };

  const onChangeSelection = (box, e) => {
    const value = e.target.value;

    const newSentences = generateSentences(value);

    if (box === "box_left") {
      setSelection1(value);
      console.log("Setting value ", value);
      setBoxLeft(newSentences);
    } else {
      setSelection2(value);
      setBoxRight(newSentences);
    }
  };

  useEffect(() => {
    if (!machineGeneratedData) generateAllSentences();
  }, [machineGeneratedData]);

  if (showIntake) {
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
            Enter the full article text below. We’ll analyze and simplify it
            into multiple reading levels.
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
  }

  const renderBoxContent = (boxData) => (
    <Box
      p={4}
      borderWidth={1}
      borderRadius="xl"
      bg="white"
      boxShadow="sm"
      maxW="100%"
      dir="rtl"
    >
      <Box display="flex" flexWrap="wrap" gap={2} lineHeight="2.5rem">
        {boxData.flat().map(({ he, nikud, en }, j) => (
          <Tooltip
            key={`he-${j}`}
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
            >
              {he}
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );

  return (
    <Box>
      <Box px={6} mt={4} display="flex" justifyContent="flex-end">
        <Button colorScheme="blue" onClick={() => setShowIntake(true)}>
          Generate New Article
        </Button>
      </Box>

      <HStack alignItems="start" spacing={8} p={6}>
        <Box flex={1}>
          <Select
            value={selection1}
            onChange={(e) => onChangeSelection("box_left", e)}
            mb={4}
          >
            <option value="original">Original</option>
            <option value="level_1">Level 1</option>
            <option value="level_2">Level 2</option>
            <option value="level_3">Level 3</option>
          </Select>
          {renderBoxContent(boxLeft)}
        </Box>
        <Box flex={1}>
          <Select
            value={selection2}
            onChange={(e) => onChangeSelection("box_right", e)}
            mb={4}
          >
            <option value="original">Original</option>
            <option value="level_1">Level 1</option>
            <option value="level_2">Level 2</option>
            <option value="level_3">Level 3</option>
          </Select>
          {renderBoxContent(boxRight)}
        </Box>
      </HStack>
    </Box>
  );
};

export default Translate;

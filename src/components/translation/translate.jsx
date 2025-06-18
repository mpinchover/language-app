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
import fakeData from "./fake-data.json";

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

  const generateAllSentences = () => {
    const originalSentences = generateSentences("original");
    const simplified1Sentences = generateSentences("versions", 0);
    const simplified2Sentences = generateSentences("versions", 1);
    const simplified3Sentences = generateSentences("versions", 2);
    const simplified4Sentences = generateSentences("versions", 3);

    const allTranslations = {
      original: originalSentences,
      level1: simplified1Sentences,
      level2: simplified2Sentences,
      level3: simplified3Sentences,
      level4: simplified4Sentences,
    };
    setAllTranslations(allTranslations);
    setBoxLeft(originalSentences);
    setBoxRight(simplified4Sentences);
  };

  const generateSentences = (version, level = null) => {
    let curSentence = [];
    const sentences = [];

    if (version === "original") {
      fakeData["original"]["translations"].forEach(([he, ni, en]) => {
        curSentence.push({ he, ni, en });

        if (he.endsWith(".") || he.endsWith('."')) {
          sentences.push(curSentence);
          curSentence = [];
        }
      });
    } else {
      fakeData["versions"][level]["translations"].forEach(([he, ni, en]) => {
        curSentence.push({ he, ni, en });

        if (he.endsWith(".") || he.endsWith('."')) {
          sentences.push(curSentence);
          curSentence = [];
        }
      });
    }

    if (curSentence.length > 0) sentences.push(curSentence);
    return sentences;
    // setAllSentences(sentences);
  };

  const getLanguageLevel = (value) => {
    if (value === "level_1") {
      return allTranslations.level1;
    } else if (value === "level_2") {
      return allTranslations.level2;
    } else if (value === "level_3") {
      return allTranslations.level3;
    } else if (value === "level_4") {
      return allTranslations.level4;
    }
    return allTranslations.original;
  };

  const onChangeSelection = (box, e) => {
    const value = e.target.value;
    if (box === "box_left") {
      const newSentences = getLanguageLevel(value);
      setSelection1(value);
      setBoxLeft(newSentences);
    } else {
      const newSentences = getLanguageLevel(value);
      setSelection2(value);
      setBoxRight(newSentences);
    }
  };

  useEffect(() => {
    generateAllSentences();
  }, []);

  if (showIntake) {
    return (
      <Box p={12}>
        <Tabs variant="unstyled">
          <TabList>
            <Tab
              _selected={{
                bg: "gray.200",
                borderRadius: "md",
              }}
            >
              Text
            </Tab>
            <Tab
              _selected={{
                bg: "gray.200",
                borderRadius: "md",
              }}
            >
              Use Link
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel p={0} mt={4}>
              <Textarea
                resize="none"
                placeholder="Paste article text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                size="md"
                height="200px"
              />
              <Button
                mt={4}
                colorScheme="blue"
                isLoading={loading}
                onClick={() => {
                  setLoading(true);
                  console.log("Generating from link:", inputLink);
                  setTimeout(() => {
                    setShowIntake(false);
                    setLoading(false);
                  }, 1000);
                }}
              >
                Generate
              </Button>
            </TabPanel>

            <TabPanel p={0} mt={4}>
              <Input
                padding={6}
                placeholder="Paste link to news article"
                value={inputLink}
                onChange={(e) => setInputLink(e.target.value)}
                size="md"
              />
              <Button
                mt={4}
                colorScheme="blue"
                isLoading={loading}
                onClick={() => {
                  setLoading(true);
                  console.log("Generating from link:", inputLink);
                  setTimeout(() => {
                    setShowIntake(false);
                    setLoading(false);
                  }, 1000);
                }}
              >
                Generate
              </Button>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    );
  }

  return (
    <HStack alignItems="start">
      <Box p={12} flex={1}>
        <Select
          value={selection1}
          onChange={(e) => onChangeSelection("box_left", e)}
          //   onChange={(e) => setSelection1(e.target.value)}
          mb={4}
        >
          <option value="original">Original</option>
          <option value="level_1">Level 1</option>
          <option value="level_2">Level 2</option>
          <option value="level_3">Level 3</option>
          <option value="level_4">Level 4</option>
        </Select>
        {boxLeft?.map((sentence, i) => (
          <VStack key={i} align="start" spacing={2} dir="rtl">
            <HStack mb={10} dir="rtl" wrap="wrap" spacing={2}>
              {[...sentence].map(({ he, ni, en }, j) => (
                <Tooltip
                  key={`he-${j}`}
                  label={
                    <Box p={6}>
                      <Text fontSize="xl" color="blue.300">
                        {ni}
                      </Text>
                      <Text fontSize="xl" color="gray.300">
                        {en}
                      </Text>
                    </Box>
                  }
                  placement="top"
                  hasArrow
                  bg="white"
                >
                  <Text fontWeight="none">{he}</Text>
                </Tooltip>
              ))}
            </HStack>
          </VStack>
        ))}
      </Box>
      <Box p={12} flex={1}>
        <Select
          value={selection2}
          onChange={(e) => onChangeSelection("box_right", e)}
          //   onChange={(e) => setSelection1(e.target.value)}
          mb={4}
        >
          <option value="original">Original</option>
          <option value="level_1">Level 1</option>
          <option value="level_2">Level 2</option>
          <option value="level_3">Level 3</option>
          <option value="level_4">Level 4</option>
        </Select>
        {boxRight?.map((sentence, i) => (
          <VStack key={i} align="start" spacing={2} dir="rtl">
            <HStack mb={10} dir="rtl" wrap="wrap" spacing={2}>
              {[...sentence].map(({ he, ni, en }, j) => (
                <Tooltip
                  key={`he-${j}`}
                  label={
                    <Box p={6}>
                      <Text fontSize="xl" color="blue.300">
                        {ni}
                      </Text>
                      <Text fontSize="xl" color="gray.300">
                        {en}
                      </Text>
                    </Box>
                  }
                  placement="top"
                  hasArrow
                  bg="white"
                >
                  <Text fontWeight="none">{he}</Text>
                </Tooltip>
              ))}
            </HStack>
          </VStack>
        ))}
      </Box>
    </HStack>
  );
};

export default Translate;

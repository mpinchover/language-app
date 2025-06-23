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
import fakeData from "./generate-translation.json";

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
  const [machineGeneratedData, setMachineGeneratedData] = useState(fakeData);
  // console.log("MDG: ", machineGeneratedData);
  const getData = async () => {
    try {
      //   setLoading(true);
      //   const response = await fetch(
      //     "http://127.0.0.1:5000/api/translate-article",
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
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
      //   setMachineGeneratedData(data);
      //   console.log("Response:", data);
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
    generateAllSentences();
  }, []);

  if (showIntake) {
    return (
      <Box p={12}>
        <Tabs variant="unstyled">
          <TabList>
            <Tab _selected={{ bg: "gray.200", borderRadius: "md" }}>Text</Tab>
            <Tab _selected={{ bg: "gray.200", borderRadius: "md" }}>
              Use Link
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel p={0} mt={4}>
              <Textarea
                resize="none"
                placeholder="Paste article text here..."
                value={articleContent}
                onChange={(e) => setArticleContent(e.target.value)}
                size="md"
                height="200px"
              />
              <Button
                mt={4}
                colorScheme="blue"
                isLoading={loading}
                onClick={getData}
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

  const renderBoxContent = (boxData) =>
    boxData?.map((sentence, i) => (
      <Box key={i} mb={10} dir="rtl" maxW="100%" whiteSpace="normal">
        <Box display="flex" flexWrap="wrap">
          {sentence.map(({ he, nikud, en }, j) => (
            <Tooltip
              key={`he-${j}`}
              label={
                <Box p={4}>
                  <Text fontSize={30} color="blue.300">
                    {nikud}
                  </Text>
                  <Text fontSize={30} color="gray.300">
                    {en}
                  </Text>
                </Box>
              }
              placement="top"
              hasArrow
              bg="white"
            >
              <Box fontSize={30} as="span" mx={1} cursor="pointer">
                {he}
              </Box>
            </Tooltip>
          ))}
        </Box>
      </Box>
    ));

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

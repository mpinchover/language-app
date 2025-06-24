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
import { useParams } from "react-router-dom";

const Translate = () => {
  const [showIntake, setShowIntake] = useState(true);
  const [inputText, setInputText] = useState("");
  const [inputLink, setInputLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [selection1, setSelection1] = useState("original");
  const [selection2, setSelection2] = useState("level_1");
  const [allTranslations, setAllTranslations] = useState({});
  const [boxLeft, setBoxLeft] = useState([]);
  const [boxRight, setBoxRight] = useState([]);
  const [articleContent, setArticleContent] = useState();
  const [machineGeneratedData, setMachineGeneratedData] = useState({});
  const auth = getAuth();
  const { translation_uuid } = useParams();

  const getData = async () => {
    const user = auth.currentUser;
    const idToken = await user.getIdToken();

    try {
      setLoading(true);
      const response = await fetch(
        `http://127.0.0.1:5005/api/get-translation/${translation_uuid}`,
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
      // console.log("Got back data ", data);
      setMachineGeneratedData(data);
      generateAllSentences(data.translation);
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
    const originalSentences = generateSentences(data, "original");
    const simplified1Sentences = generateSentences(data, "level_1");

    setBoxLeft(originalSentences);
    setBoxRight(simplified1Sentences);
  };

  const onChangeSelection = (box, e) => {
    const value = e.target.value;
    const newSentences = generateSentences(
      machineGeneratedData.translation,
      value
    );

    console.log("Sentences");

    if (box === "box_left") {
      setSelection1(value);
      setBoxLeft(newSentences);
    } else {
      setSelection2(value);
      setBoxRight(newSentences);
    }
  };

  useEffect(() => {
    if (translation_uuid) {
      getData();
    }
  }, [translation_uuid]);

  // console.log("Tselection ", selection1);
  const renderTokenBlock = (tokens) => (
    <Box display="flex" flexWrap="wrap" gap={2} lineHeight="2.5rem">
      {tokens.map(({ he, nikud, en }, j) => (
        <Tooltip
          key={j}
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
  );

  return (
    <Box px={12}>
      <Box mt={4} display="flex" justifyContent="flex-end">
        <Button colorScheme="blue" onClick={() => setShowIntake(true)}>
          Generate New Article
        </Button>
      </Box>

      <Box mt={6}>
        <HStack spacing={6}>
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
          </Box>
        </HStack>

        <VStack spacing={6} align="stretch" mt={2}>
          {boxLeft.map((leftSentence, idx) => {
            const rightSentence = boxRight[idx] || [];
            const hue = (idx * 50) % 360;
            const bgColor = `hsl(${hue}, 100%, 95%)`;

            return (
              <HStack key={idx} spacing={6} align="stretch">
                <Box
                  flex={1}
                  p={4}
                  // borderWidth={1}
                  borderRadius="xl"
                  bg={bgColor}
                  // boxShadow="sm"
                  dir="rtl"
                >
                  {renderTokenBlock(leftSentence)}
                </Box>
                <Box
                  flex={1}
                  p={4}
                  // borderWidth={1}
                  borderRadius="xl"
                  bg={bgColor}
                  // boxShadow="sm"
                  dir="rtl"
                >
                  {renderTokenBlock(rightSentence)}
                </Box>
              </HStack>
            );
          })}
        </VStack>
      </Box>
    </Box>
  );
};

export default Translate;

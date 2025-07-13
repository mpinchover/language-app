import {
  Box,
  Heading,
  Text,
  Image,
  VStack,
  StackDivider,
  Flex,
} from "@chakra-ui/react";
import image_1 from "./image_1.png";
import image_2 from "./image_2.png";
import image_3 from "./image_3.png";

const Home = () => {
  return (
    <Box p={12} maxW="6xl" mx="auto">
      <VStack
        spacing={20}
        align="stretch"
        divider={<StackDivider borderColor="gray.200" />}
      >
        {/* Section 1 */}
        <Flex direction={{ base: "column", md: "row" }} align="center" gap={8}>
          <Box w={{ base: "100%", md: "50%" }}>
            <Heading size="lg" mb={4}>
              Choose an article to read.
            </Heading>
            <Text fontSize="md" color="gray.600">
              We break it down into basic, intermediate and advanced versions.
            </Text>
          </Box>
          <Box w={{ base: "100%", md: "50%" }}>
            <Image
              src={image_1}
              alt="Paste article"
              w="100%"
              h="auto"
              objectFit="contain"
              borderRadius="xl"
            />
          </Box>
        </Flex>

        {/* Section 2 */}
        <Flex direction={{ base: "column", md: "row" }} align="center" gap={8}>
          <Box w={{ base: "100%", md: "50%" }}>
            <Heading size="lg" mb={4}>
              Map each sentence
            </Heading>
            <Text fontSize="md" color="gray.600">
              Each sentence is shown in basic, intermediate and advanced form.
            </Text>
          </Box>
          <Box w={{ base: "100%", md: "50%" }}>
            <Image
              src={image_2}
              alt="Sentence mapping"
              w="100%"
              h="auto"
              objectFit="contain"
              borderRadius="xl"
            />
          </Box>
        </Flex>

        {/* Section 3 */}
        <Flex direction={{ base: "column", md: "row" }} align="center" gap={8}>
          <Box w={{ base: "100%", md: "50%" }}>
            <Heading size="lg" mb={4}>
              Hover to get the nikud and English translation
            </Heading>
            <Text fontSize="md" color="gray.600">
              Hover over any word to see its nikud and English meaning in
              context.
            </Text>
          </Box>
          <Box w={{ base: "100%", md: "50%" }}>
            <Image
              src={image_3}
              alt="Nikud hover"
              w="100%"
              h="auto"
              objectFit="contain"
              borderRadius="xl"
            />
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Home;

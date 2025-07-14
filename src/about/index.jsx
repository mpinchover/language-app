import { Box, Heading, Text, VStack } from "@chakra-ui/react";

const About = () => {
  return (
    <Box
      bg="black"
      color="white"
      minH="100vh"
      py={16}
      px={[4, 8, 12]}
      bgGradient="linear(to-b, black, purple.900)"
    >
      <VStack mt={24} spacing={12} align="start" maxW="4xl" mx="auto">
        {/* Section 1: What you do */}
        <Box>
          <Heading fontSize="2xl" mb={4} color="blue.300">
            What we solve.
          </Heading>
          <Text color="gray.300">
            We are a language learning app that helps people learn languages
            through news articles. Using the Gemini API, we convert articles
            into basic, intermediate, and advanced versions of the selected
            language. We are starting with Hebrew and targeting people who want
            to practice conversational Hebrew. More languages will be coming
            soon.
          </Text>
        </Box>

        {/* Section 2: Team */}
        <Box>
          <Heading fontSize="2xl" mb={4} color="blue.300">
            Who we are.
          </Heading>
          <Text color="gray.300">
            The founder is Matt, who is currently a software engineer at Uber.
            Matt has 7+ years of experience building fullstack applications and
            a passion for how languages help people connect.
          </Text>
        </Box>

        {/* Section 3: Products */}
        <Box>
          <Heading fontSize="2xl" mb={4} color="blue.300">
            What we're building.
          </Heading>
          <Text color="gray.300">
            We're building a language learning app for people who want to learn
            or practice a language by reading the news. We’re currently in the
            early stages, focused on finding our first users.
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default About;

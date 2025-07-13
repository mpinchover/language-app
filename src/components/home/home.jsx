import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  useBreakpointValue,
  Flex,
} from "@chakra-ui/react";

const Home = () => {
  const columnCount = useBreakpointValue({ base: 1, md: 3 });

  const features = [
    {
      title: "Choose an article to read",
      description:
        "Each article is broken into basic, intermediate and advanced versions.",
      color: "blue.300",
    },
    {
      title: "Map each sentence",
      description:
        "Each sentence is shown in basic, intermediate and advanced form.",
      color: "pink.300",
    },
    {
      title: "Hover to get the nikud and English translation",
      description:
        "Hover over any word to see its nikud and English meaning in context.",
      color: "cyan.300",
    },
  ];

  return (
    <Box
      bg="black"
      color="white"
      minH="100vh"
      bgGradient="linear(to-b, black, purple.900)"
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        minH="100vh"
        px={[4, 8, 12]}
        textAlign="center"
      >
        <SimpleGrid columns={columnCount} spacing={10} maxW="6xl" mx="auto">
          {features.map((f, i) => (
            <Box
              key={i}
              p={8}
              borderWidth={2}
              borderColor={f.color}
              borderRadius="2xl"
              bg="gray.900"
              boxShadow="xl"
            >
              <Heading fontSize="2xl" mb={4} color={f.color}>
                {f.title}
              </Heading>
              <Text color="gray.300">{f.description}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default Home;

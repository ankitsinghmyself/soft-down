"use client";
import { Box, Text, Heading } from "@chakra-ui/react";
import SoftwareList from "./softwareList/SoftwareList";

function MainPage() {
  return (
    <Box bg="blue.100" minHeight="100vh" py={8}>
      <Box
        mx="auto"
        maxW="container.xl"
        bg="gray.200"
        p={4}
        rounded="lg"
        boxShadow="md"
      >
        <Box textAlign="center">
          <Heading
            as="h1"
            fontSize={{ base: "2xl", sm: "3xl", lg: "4xl" }}
            fontWeight="bold"
            color="gray.800"
            mb={4}
          >
            Best Browsers Software
          </Heading>
          <Text
            fontSize={{ base: "lg", sm: "xl" }}
            color="gray.600"
            lineHeight="tall"
          >
            Explore a curated list of the best browser software.
          </Text>
        </Box>
        <SoftwareList />
      </Box>
    </Box>
  );
}

export default MainPage;

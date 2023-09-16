import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./sidebar/Sidebar"; // Import the Sidebar component
import Header from "./Header";
import {
  ChakraProvider,
  ColorModeScript,
  CSSReset,
  extendTheme,
} from "@chakra-ui/react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ChakraProvider>
      {" "}
      <Flex>
        {/* Add the Sidebar component */}
        <Sidebar />
        <Flex direction="column" flex="1">
          <Header />
          <Box
            px="20px"
            py="20px"
            flexGrow={1}
            overflowY="auto"
            className="bg-blue-100"
          >
            {children}
          </Box>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default Layout;

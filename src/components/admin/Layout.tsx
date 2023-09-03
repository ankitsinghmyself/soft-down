// components/Layout.tsx
import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

import Sidebar from './sidebar/Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const contentStyles = {
    paddingLeft: '300px', // Adjust the left padding as needed
  };

  return (
    <Flex h="100vh">
      <Sidebar />
      <Flex direction="column" flex="1" style={contentStyles}>
        <Header />
        <Box
          px="50px" // No horizontal padding here
          py="50px"
          flexGrow={1}
          overflowY="auto"
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;

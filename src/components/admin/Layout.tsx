import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './sidebar/Sidebar'; // Import the Sidebar component
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex>
      {/* Add the Sidebar component */}
      <Sidebar />
      <Flex direction="column" flex="1">
        <Header />
        <Box px="50px" py="50px" flexGrow={1} overflowY="auto">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;

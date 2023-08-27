// components/Layout.tsx
import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

import Sidebar from './sidebar/Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex h="100vh">
      <Sidebar />
      <Flex direction="column" flex="1">
        <Header />
        <Box
            mx='auto'
            p={{ base: '20px', md: '30px' }}
            pe='20px'
            minH='100vh'
            pt='50px'
          >
            {children}
          </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;

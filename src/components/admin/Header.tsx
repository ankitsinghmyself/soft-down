import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';

const Header: React.FC = () => {
  return (
    <Flex bg="white" p="4" boxShadow="md" align="center">
      <Heading size="md">Admin Dashboard</Heading>
      {/* Add user profile or settings */}
    </Flex>
  );
};

export default Header;

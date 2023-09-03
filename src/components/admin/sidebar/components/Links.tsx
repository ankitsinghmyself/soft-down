import React from 'react';
import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import Link from 'next/link';

interface SidebarLinksProps {
  routes: Array<{
    layout: string;
    path: string;
    icon?: React.ReactNode;
    name: string;
  }>;
}

export function SidebarLinks(props: SidebarLinksProps) {
  const { routes } = props;
  const createLinks = (routes: SidebarLinksProps['routes']) => {
    return routes.map((route, index: number) => {
      if (route.layout === '/admin') {
        return (
          <Link key={index} href={route.layout + route.path}>
              {route.icon ? (
                <Box>
                  <HStack spacing="26px" py="5px" ps="10px">
                    <Flex w="100%" alignItems="center" justifyContent="center">
                      <Box me="18px">{route.icon}</Box>
                      <Text me="auto" fontWeight="normal">
                        {route.name}
                      </Text>
                    </Flex>
                    <Box h="36px" w="4px" borderRadius="5px" />
                  </HStack>
                </Box>
              ) : (
                <Box>
                  <HStack spacing="26px" py="5px" ps="10px">
                    <Text me="auto" fontWeight="normal">
                      {route.name}
                    </Text>
                    <Box h="36px" w="4px" bg="brand.400" borderRadius="5px" />
                  </HStack>
                </Box>
              )}
          </Link>
        );
      }
    });
  }

  return <>{createLinks(routes)}</>;
}

export default SidebarLinks;

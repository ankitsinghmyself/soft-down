import React from "react";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const createLinks = (routes: SidebarLinksProps["routes"]) => {
    return routes.map((route, index: number) => {
      console.warn("tt",pathname);
      console.warn("dd",route.layout + route.path);
      let isActive = pathname === route.layout + route.path;
      if (route.layout === "/admin") {
        return (
          <Link key={index} href={route.layout + route.path}>
            {route.icon ? (
              <Box>
                <HStack
                  spacing="26px"
                  py="5px"
                  ps="10px"
                  style={{
                    color: isActive ? "blue" : "black",
                  }}
                >
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
                <HStack
                  spacing="26px"
                  py="5px"
                  ps="10px"
                  style={{
                    color: isActive ? "blue" : "black",
                  }}
                >
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
  };

  return <>{createLinks(routes)}</>;
}

export default SidebarLinks;

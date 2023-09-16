import React, { useState } from "react";
import {
  Box,
  Text,
  Link,
  VStack,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { SoftDown } from "./SoftDownLogo.jsx";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = ["Help & Feedback"];

  return (
    <Box borderWidth={isMenuOpen ? "1px" : "0"} padding="0 190px" bg="brand.100">
      <HStack
        alignItems="center"
        p={3}
        spacing={4}
        justifyContent="space-between"
      >
        <Box display={{ sm: "none", md: "block" }}>
          <HStack spacing={4}>
            <Link color="foreground" href="/">
              <SoftDown />
              <Text fontWeight="bold" color="inherit">
                SoftDown
              </Text>
            </Link>
          </HStack>
        </Box>

        <Box>
          <IconButton
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            icon={<HamburgerIcon />}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            display={{ sm: "block", md: "none" }}
          />
        </Box>

        <HStack spacing={4} display={{ base: "none", md: "none" }}>
          <Link color="foreground" href="/">
            <SoftDown />
            <Text fontWeight="bold" color="inherit">
              SoftDown
            </Text>
          </Link>
        </HStack>

        <Box display={{ base: "none", sm: "block" }}>
          <Menu>
            <MenuButton>
              <Text
                color="foreground"
                fontWeight="bold"
                cursor="pointer"
                _hover={{ color: "warning" }}
              >
                {menuItems[0]}
              </Text>
            </MenuButton>
            <MenuList>
              {menuItems.map((item, index) => (
                <MenuItem
                  key={`${item}-${index}`}
                  color={
                    index === 2
                      ? "warning"
                      : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                  }
                >
                  {item}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
      </HStack>

      {isMenuOpen && (
        <VStack
          p={4}
          borderTopWidth="1px"
          borderBottomWidth="1px"
          display={{ sm: "block", md: "none" }}
        >
          {menuItems.map((item, index) => (
            <Link
              key={`${item}-${index}`}
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          ))}
        </VStack>
      )}
    </Box>
  );
}

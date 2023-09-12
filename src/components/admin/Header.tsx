import React, { useState, useEffect } from "react";
import {
  Flex,
  Heading,
  Spacer,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { lightGreen } from "@mui/material/colors";

const Header: React.FC = () => {
  const pathname = usePathname();


  return (
    <Flex bg="lightgray" p="4" boxShadow="2xl"  justify="space-between"  align="center" >
      <Heading size="md">Home</Heading>
      <Heading size="md">{pathname}</Heading>
      <Spacer />
      <Flex alignItems="center">
        {/* {pathname} */}
      </Flex>
    </Flex>
  );
};

export default Header;

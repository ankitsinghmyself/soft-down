import React from "react";
import {
  Box,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { Scrollbars } from "react-custom-scrollbars-2";
import Links from "./Links";
import { MdCategory, MdDashboard, MdDocumentScanner } from "react-icons/md";
import { SoftDown } from "@/components/frontend/header/SoftDownLogo";

function Sidebar() {
  const routes = [
    {
      layout: "/admin",
      path: "/dashboard",
      name: "Dashboard",
      icon: <MdDashboard />,
    },
    {
      layout: "/admin",
      path: "/softwares",
      name: "Software",
      icon: <MdDocumentScanner />,
    },
    {
      layout: "/admin",
      path: "/categories",
      name: "Categories",
      icon: <MdCategory />,
    },
  ];

  return (
    <Box width="300px" height="100vh" color="white" className="bg-blue-200">
      <Scrollbars
        autoHide
        style={{ width: "100%", height: "100%" }}
        renderView={() => <div style={{ overflow: "hidden" }} />}
        renderTrackVertical={() => <div />}
        renderTrackHorizontal={() => <div />}
        className="border-r border-gray-500 "
      >
        <Flex direction="column" height="100%" borderRadius="30px">
          <Flex
            direction="row"
            align="center"
            justify="space-between"
            p={3}
            boxShadow={'md'}
            className="bg-blue-400"
          >
            <Flex alignItems="center" flexDirection="row" fontWeight="extrabold" fontSize="2xl">
              Soft Down
              <SoftDown />
            </Flex>
          </Flex>
          <Stack direction="column" mt="8px" mb="auto">
            <Box>
              <Links routes={routes} />
            </Box>
          </Stack>
        </Flex>
      </Scrollbars>
    </Box>
  );
}

export default Sidebar;

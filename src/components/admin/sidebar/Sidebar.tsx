import React, { useEffect, useState } from "react";
import { Drawer, Box, IconButton, Tooltip } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars-2";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Links from "./components/Links";
import Brand from "./components/Brand";
import {
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function Sidebar() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setUserData(res.data.user);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  };
  const routes = [
    {
      layout: "/admin",
      path: "/dashboard",
      name: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      layout: "/admin",
      path: "/softwares",
      name: "Software",
      icon: <DashboardIcon />,
    },
    {
      layout: "/admin",
      path: "/categories",
      name: "Categories",
      icon: <DashboardIcon />,
    },
  ];

  return (
    <>
      <Box
        width="300px"
        height="100vh"
        boxShadow="14px 17px 40px 4px rgba(112, 144, 176, 0.08)"
      >
        <Scrollbars autoHide>
          <Flex direction="row" height="10%" pt="25px" borderRadius="30px">
            <Brand />
            <Flex alignItems="center">
              <Menu>
                <MenuButton className="flex flex-1">
                  {userData && (
                    <div className="flex">
                      <div>
                        {" "}
                        <Avatar
                          size="xs"
                          name={userData.userName}
                          src={userData.userAvatarUrl}
                          marginRight="2"
                          borderRadius="20"
                          onClick={() => setIsMenuOpen(!isMenuOpen)}
                          cursor="pointer"
                          className="w-[32px]"
                        />
                      </div>
                      <div>
                        <p className="">{userData.userName.toUpperCase()}</p>
                      </div>
                    </div>
                  )}
                </MenuButton>
                <MenuList bg={"lightgray"} p={"10"} borderRadius={"5px"}>
                  <MenuItem onClick={() => setIsMenuOpen(false)}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
          <Flex direction="column" height="100%" pt="25px" borderRadius="30px">
           
            <Stack direction="column" mt="8px" mb="auto">
              <Box>
                <Links routes={routes} />
              </Box>
            </Stack>
          </Flex>
        </Scrollbars>
      </Box>
    </>
  );
}

export default Sidebar;

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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { MdLogout, MdPortrait, MdUsbOff } from "react-icons/md";

const Header: React.FC = () => {
  const pathname = usePathname();
  const toTitleCase = (str: any) => {
    return str.replace(/\w\S*/g, function (txt: any) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
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
      toast.error(error.message);
    }
  };
  return (
    <>
   <Flex rounded="md" justify="space-between" bg="blue.400" color="white" p={4}>
      <Flex>
        <a href="/">
          Home <ChevronRightIcon color="gray.500" />
        </a>
        {pathname && (
          <>
            <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
              <BreadcrumbItem>
                <BreadcrumbLink href={pathname} className="">
                  {toTitleCase(pathname.split("/").pop())}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </>
        )}
      </Flex>

      <Menu>
        <MenuButton className="flex"  >
          {userData && (
            <Flex alignItems="center">
              <Avatar
                size="xs"
                name={userData.userName}
                src={userData.userAvatarUrl}
                marginRight="2"
                borderRadius="full"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                cursor="pointer"
                className="w-[32px]"
              />
              <p className="mt-1">{userData.userName.toUpperCase()}</p>
            </Flex>
          )}
        </MenuButton>
        <MenuList bg="blue.300" p="5" borderRadius="5px" >
          <MenuItem  bg="blue.300" onClick={() => setIsMenuOpen(false)}>Profile <MdPortrait /> </MenuItem>
          <MenuItem  bg="blue.300" onClick={handleLogout}>Logout <MdLogout/> </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
</>

  );
};

export default Header;

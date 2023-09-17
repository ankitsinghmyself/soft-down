"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Box, useColorModeValue, Text, Flex, SimpleGrid } from "@chakra-ui/react";
interface Software {
  _id: string;
  name: string;
  link: string;
  image: string;
  description: string;
  category: string;
  platform: string;
}
export default function SoftwareList() {
  const [softwareList, setSoftwareList] = useState<Software[]>([]);
  const [originalSoftwareList, setOriginalSoftwareList] = useState<Software[]>(
    []
  );
  const [categories, setCategories] = useState([{ name: "" }]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [activeTab, setActiveTab] = useState("windows");
  const [initialDisplayCount, setInitialDisplayCount] = useState(8);
  const [expandCount, setExpandCount] = useState(8);
  const [tabDisplayCounts, setTabDisplayCounts] = useState<{
    [key: string]: number;
  }>({
    windows: initialDisplayCount,
    mac: initialDisplayCount,
    linux: initialDisplayCount,
  });

  useEffect(() => {
    const fetchSoftware = async () => {
      const response = await fetch("/api/admin/softwares/getSoftwares");
      const data = await response.json();
      const softwares = data.softwares;
      setSoftwareList(softwares);
      setOriginalSoftwareList(softwares); // Store the original unfiltered list
    };
    fetchSoftware();

    const fetchCategories = async () => {
      const response = await fetch("/api/admin/categories/getCategory");
      const data = await response.json();
      const rescategories = data.categories;
      setCategories(rescategories);
    };
    fetchCategories();
  }, []);
  const handleTabClick = (tab:any) => {
    setActiveTab(tab);
  };
  const filterList = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory("");
      setSoftwareList(originalSoftwareList); // Restore the original list
    } else {
      const filteredList = originalSoftwareList.filter(
        (software) => software.category === category
      );
      setActiveCategory(category);
      setSoftwareList(filteredList);
    }
  };

  const handleSeeAllClick = () => {
    setTabDisplayCounts((prevCounts) => ({
      ...prevCounts,
      [activeTab]: prevCounts[activeTab] + expandCount,
    }));
  };

  const filteredSoftwareList = softwareList
    .filter((item) => item.platform === activeTab)
    .slice(0, tabDisplayCounts[activeTab]);

  const path = usePathname();
  return (
    <Box bg="blue.100" minHeight="100vh" p={8}>
      <Flex justify="left" gap={{ base: 4, sm: 8 }} pl={1}>
        <button
          onClick={() => handleTabClick("windows")}
          className={`tab-button pb-2 ${
            activeTab === "windows"
              ? "border-b-2 border-b-green-800 text-green-800"
              : "bg-transparent"
          }`}
        >
          Windows
        </button>
        <button
          onClick={() => handleTabClick("mac")}
          className={`tab-button pb-2 ${
            activeTab === "mac"
              ? "border-b-2 border-b-green-800 text-green-800"
              : "bg-transparent"
          }`}
        >
          Mac
        </button>
        <button
          onClick={() => handleTabClick("linux")}
          className={`tab-button pb-2 ${
            activeTab === "linux"
              ? "border-b-2 border-b-green-800 text-green-800"
              : "bg-transparent"
          }`}
        >
          Linux
        </button>
      </Flex>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={{ base: 3, sm: 8 }} pt={4}>
        {filteredSoftwareList.map((item, index) => (
          <Link href={`/softwareDetails/${item._id}`} key={index}>
            <Box
              p={5}
              bg="white"
              shadow="lg"
              rounded="lg"
              overflow="hidden"
              minH="180px"
              _hover={{ bg: "blue.50" }}
            >
              <Flex justify="space-between">
                <Box
                  w="20"
                  h="20"
                  bgImage={`url(${item.image})`}
                  bgSize="cover"
                  bgPos="center"
                />
                <Box bottom="0" left="0" right="0" pl={4}>
                  <Text
                    transition="all .3s ease"
                    _groupHover={{ color: "blue.400" }}
                    fontWeight={500}
                  >{item.name}</Text>
                  <Box className="text-green-500 text-sm font-semibold">{"FREE"}</Box>
                </Box>
              </Flex>
              <Box pt={4}>
                <Box
                  className="text-sm text-gray-600 overflow-hidden text-center "
                  style={{
                    maxHeight: "4rem",
                    WebkitLineClamp: 2,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item.description}
                </Box>
              </Box>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
      {filteredSoftwareList.length > 0 && (
        <Flex pt={5} pb={5} justify="center" direction="column" gap={4}>
          <Box
            w="64"
            h="12"
            borderWidth="1px"
            borderColor="green.500"
            cursor="pointer"
          >
            <Text
              fontWeight="bold"
              color="green.500"
              fontSize="sm"
              textAlign="center"
              lineHeight="10"
              onClick={handleSeeAllClick}
            >
              SEE ALL
            </Text>
          </Box>
        </Flex>
      )}
    </Box>
  );
}

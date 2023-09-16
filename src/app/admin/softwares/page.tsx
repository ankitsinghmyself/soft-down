"use client";
import React, { use, useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Card,
  Text,
  Select,
  Center,
  VStack,
  Flex,
  Input,
  Button,
  Divider,
  Image,
  DrawerBody,
  Stack,
  Textarea,
  DrawerFooter,
  DrawerContent,
  Drawer,
  InputLeftAddon,
  InputGroup,
  InputRightAddon,
  DrawerHeader,
  DrawerCloseButton,
  DrawerOverlay,
  useDisclosure,
  ModalBody,
  ModalFooter,
  ModalContent,
  Modal,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import Layout from "@/components/admin/Layout";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "../../../helpers/pagination";
interface Software {
  _id: string;
  name: string;
  description: string;
  category: string;
  link: string;
  image: string;
}

interface Category {
  _id: string;
  name: string;
}
export default function Software() {
  // Sample software data
  const [allSoftware, setAllSoftware] = useState<Software[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [newSoftware, setNewSoftware] = useState({
    name: "",
    description: "",
    category: "",
    link: "",
    image: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(allSoftware.length / itemsPerPage);
  const paginateSoftware = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allSoftware.slice(startIndex, endIndex);
  };

  useEffect(() => {
    const fetchSoftwares = async () => {
      const response = await axios.get("/api/admin/softwares/getSoftwares");
      if (response.status === 200) {
        setAllSoftware(response.data.softwares);
      }
    };
    fetchSoftwares();
    const fetchCategories = async () => {
      const response = await axios.get("/api/admin/categories/getCategory");

      if (response.status === 200) {
        setCategories(response.data.categories);
      }
    };
    fetchCategories();
  }, []);

  const handleEdit = (softwareId: any) => {};

  const handleDelete = async (softwareId: any) => {
    try {
      if (!confirm("Are you sure you want to delete this software?")) {
        return;
      }
      console.log(softwareId);
      const response = await axios.delete(
        `/api/admin/softwares/deleteSoftware/`,
        {
          params: { softwareId: softwareId },
        }
      );

      if (response.status === 200) {
        // Remove the software from the software array
        const newSoftware = allSoftware.filter(
          (item: any) => item._id !== softwareId
        );
        setAllSoftware(newSoftware);

        toast.success("Software deleted successfully");
      } else {
        toast.error("Software deleted failed");
      }
    } catch (error) {
      // Handle any errors that occur during the request
      toast.error("An error occurred while deleting software");
    }
  };

  const handleAddSoftware = async () => {
    // Add the new software to the software array
    setAllSoftware([
      ...allSoftware,
      {
        _id: "",
        name: newSoftware.name,
        description: newSoftware.description,
        category: newSoftware.category,
        link: newSoftware.link,
        image: newSoftware.image,
      },
    ]);
    const response = await axios.post(
      "/api/admin/softwares/saveSoftwares",
      newSoftware
    );
    if (response.status === 200) {
      toast.success("Software added successfully");
    } else {
      toast.error("Software added failed");
    }
    // Clear the input fields
    setNewSoftware({
      name: "",
      description: "",
      category: "",
      link: "",
      image: "",
    });
  };
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  return (
    <>
      <Layout>
        <Stack direction="row" spacing={4}></Stack>
        <Box>
          <VStack>
            <Flex flexWrap="wrap" justifyContent="space-between">
              <Box mb={4}>
                <Input
                  variant="filled"
                  placeholder="Software Name"
                  value={newSoftware.name}
                  onChange={(e) =>
                    setNewSoftware({ ...newSoftware, name: e.target.value })
                  }
                />
              </Box>
              <Box mb={4}>
                <Select
                  variant="filled"
                  placeholder="Select a Category"
                  value={newSoftware.category}
                  onChange={(e) =>
                    setNewSoftware({
                      ...newSoftware,
                      category: e.target.value,
                    })
                  }
                >
                  {categories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box mb={4}>
                <Input
                  variant="filled"
                  placeholder="Software Link"
                  value={newSoftware.link}
                  onChange={(e) =>
                    setNewSoftware({ ...newSoftware, link: e.target.value })
                  }
                />
              </Box>
              <Box mb={4}>
                <Input
                  variant="filled"
                  placeholder="Software Description"
                  value={newSoftware.description}
                  onChange={(e) =>
                    setNewSoftware({
                      ...newSoftware,
                      description: e.target.value,
                    })
                  }
                />
              </Box>
              <Box mb={4}>
                <Input
                  variant="filled"
                  placeholder="Image URL"
                  value={newSoftware.image}
                  onChange={(e) =>
                    setNewSoftware({ ...newSoftware, image: e.target.value })
                  }
                />
              </Box>
              <Box>
                <Button colorScheme="blue" onClick={handleAddSoftware}>
                  Add Software
                </Button>
              </Box>
            </Flex>
            <Divider my={4} />
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Software Name</Th>
                  <Th>Image</Th>
                  <Th>Edit</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {paginateSoftware && paginateSoftware().map((item) => (
                  <Tr key={item._id}>
                    <Td>{item.name}</Td>
                    <Td>
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          boxSize="12"
                          loading="lazy"
                        />
                      ) : item.link ? (
                        <Image
                          src={item.link}
                          alt={item.name}
                          boxSize="12"
                          loading="lazy"
                        />
                      ) : null}
                    </Td>
                    <Td>
                      <IconButton
                        size="sm"
                        colorScheme="teal"
                        aria-label="Edit"
                        icon={<EditIcon />}
                        onClick={() => handleEdit(item._id)}
                      />
                    </Td>
                    <Td>
                      <IconButton
                        size="sm"
                        colorScheme="red"
                        aria-label="Delete"
                        icon={<DeleteIcon />}
                        onClick={() => handleDelete(item._id)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </VStack>
        </Box>
        <Toaster />
      </Layout>
    </>
  );
}

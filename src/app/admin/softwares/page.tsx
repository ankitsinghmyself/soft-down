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
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Layout from "@/components/admin/Layout";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Software() {
  // Sample software data
  const [software, setSoftware] = useState([
    {
      _id: "",
      name: "",
      description: "",
      category: "",
      link: "",
      image: "",
    },
  ]);
  const [categories, setCategories] = useState([
    {
      _id: "",
      name: "",
    },
  ]);

  const [newSoftware, setNewSoftware] = useState({
    name: "",
    description: "",
    category: "",
    link: "",
    image: "",
  });
  useEffect(() => {
    const fetchSoftwares = async () => {
      const response = await axios.get("/api/admin/softwares/getSoftwares");
      if (response.status === 200) {
        setSoftware(response.data.softwares);
      }
    };
    fetchSoftwares();
    // Fetch categories data
    const fetchCategories = async () => {
      const response = await axios.get("/api/admin/categories/getCategory"); // Replace with your category API endpoint
      console.log("dd", response.data);

      if (response.status === 200) {
        setCategories(response.data.categories);
      }
    };
    fetchCategories();
  }, []);

  // Function to handle editing a software (you can implement this)
  const handleEdit = (softwareId: any) => {
    // Implement the edit functionality here
    console.log(`Editing software with ID ${softwareId}`);
  };

  const handleDelete = async (softwareId: any) => {
    try {
      //popup to confirm delete
      if (!confirm("Are you sure you want to delete this software?")) {
        return;
      }

      const response = await axios.delete(
        `/api/admin/softwares/deleteSoftware/`,
        {
          params: { softwareId: softwareId },
        }
      );

      if (response.status === 200) {
        // Remove the software from the software array
        const newSoftware = software.filter((item) => item._id !== softwareId);
        setSoftware(newSoftware);

        toast.success("Software deleted successfully");
      } else {
        toast.error("Software deleted failed");
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error deleting software:", error);
      toast.error("An error occurred while deleting software");
    }
  };

  // Function to handle adding a new software
  const handleAddSoftware = async () => {
    // Add the new software to the software array
    setSoftware([
      ...software,
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

  return (
    <>
      <Layout>
      <Box p={4}>
        <Center>
          <VStack spacing={4} align="stretch">
            <Text fontSize="2xl" fontWeight="bold">
              Add New Software
            </Text>
            <Flex flexWrap="wrap" justifyContent="space-between">
              <Box width={{ base: "100%", md: "30%" }} mb={4}>
                <Input
                  variant="filled"
                  placeholder="Software Name"
                  value={newSoftware.name}
                  onChange={(e) =>
                    setNewSoftware({ ...newSoftware, name: e.target.value })
                  }
                />
              </Box>
              <Box width={{ base: "100%", md: "30%" }} mb={4}>
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
              <Box width={{ base: "100%", md: "30%" }} mb={4}>
                <Select
                  variant="filled"
                  placeholder="Select a Category"
                  value={newSoftware.category}
                  onChange={(e) =>
                    setNewSoftware({ ...newSoftware, category: e.target.value })
                  }
                >
                  {categories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box width={{ base: "100%", md: "30%" }} mb={4}>
                <Input
                  variant="filled"
                  placeholder="Software Link"
                  value={newSoftware.link}
                  onChange={(e) =>
                    setNewSoftware({ ...newSoftware, link: e.target.value })
                  }
                />
              </Box>
              <Box width={{ base: "100%", md: "30%" }} mb={4}>
                <Input
                  variant="filled"
                  placeholder="Image URL"
                  value={newSoftware.image}
                  onChange={(e) =>
                    setNewSoftware({ ...newSoftware, image: e.target.value })
                  }
                />
              </Box>
              <Box width={{ base: "100%", md: "30%" }}>
                <Button
                  colorScheme="blue"
                  onClick={handleAddSoftware}
                >
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
                {software.length === 0 ? (
                  <Tr>
                    <Td colSpan={4} textAlign="center">
                      No software found
                    </Td>
                  </Tr>
                ) : (
                  software.map((item) => (
                    <Tr key={item._id}>
                      <Td>{item.name}</Td>
                      <Td>
                        {item.image ? (
                          <Image src={item.image} alt={item.name} boxSize="12" />
                        ) : item.link ? (
                          <Image src={item.link} alt={item.name} boxSize="12" />
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
                  ))
                )}
              </Tbody>
            </Table>
          </VStack>
        </Center>
      </Box>
      <Toaster />
    </Layout>
    </>
  );
}

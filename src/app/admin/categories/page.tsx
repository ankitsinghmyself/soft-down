"use client";
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
  Center,
  Button,
  Divider,
  Input,
  VStack,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Layout from "@/components/admin/Layout";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Category() {
  // Sample software data
  const [category, setCategory] = useState([
    {
      _id: "",
      name: "",
    },
  ]);

  const [newCategory, setNewCategory] = useState({
    name: "",
  });
  useEffect(() => {
    const fetchCategorys = async () => {
      const response = await axios.get("/api/admin/categories/getCategory");
      if (response.status === 200) {
        setCategory(response.data.categories);
      }
    };
    fetchCategorys();
  }, []);

  // Function to handle editing a software (you can implement this)
  const handleEdit = (categoryId: any) => {
    // Implement the edit functionality here
  };

  const handleDelete = async (categoryId: any) => {
    try {
      //popup to confirm delete
      if (!confirm("Are you sure you want to delete this software?")) {
        return;
      }

      const response = await axios.delete(
        `/api/admin/categories/deleteCategory/`,
        {
          params: { categoryId: categoryId },
        }
      );

      if (response.status === 200) {
        // Remove the software from the software array
        const newCategory = category.filter((item) => item._id !== categoryId);
        setCategory(newCategory);

        toast.success("Category deleted successfully");
      } else {
        toast.error("Category deleted failed");
      }
    } catch (error) {
      // Handle any errors that occur during the request
      toast.error("An error occurred while deleting software");
    }
  };

  // Function to handle adding a new software
  const handleAddCategory = async () => {
    // Add the new software to the software array
    setCategory([
      ...category,
      {
        _id: "",
        name: newCategory.name,
      },
    ]);
    const response = await axios.post(
      "/api/admin/categories/saveCategory",
      newCategory
    );
    if (response.status === 200) {
      toast.success("Category added successfully");
    } else {
      toast.error("Category added failed");
    }
    setNewCategory({
      name: "",
    });
  };

  return (
    <>
     <Layout>
      <Box p={4}>
        <Center>
          <VStack spacing={4} align="stretch">
            <Input
              variant="filled"
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ name: e.target.value })}
            />
            <Button
              colorScheme="blue"
              onClick={handleAddCategory}
            >
              Add Category
            </Button>
            <Divider my={4} />
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Category Name</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {category.map((item) => (
                  <Tr key={item._id}>
                    <Td>{item.name}</Td>
                    <Td>
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))}
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

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
        setCategory(response.data.Category);
      }
    };
    fetchCategorys();
  }, []);

  // Function to handle editing a software (you can implement this)
  const handleEdit = (categoryId: any) => {
    // Implement the edit functionality here
    console.log(`Editing software with ID ${categoryId}`);
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
      console.error("Error deleting software:", error);
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
        <Box>
          {/* Admin content */}
          {/* <h1 className="text-xl font-bold mb-2">Categorys</h1> */}
          {/* Category Card */}
          <div className="w-full p-4 text-center">
            <h2 className="text-xl font-bold mb-2">Add New Category</h2>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="w-full md:w-1/3 p-4 border border-gray-300 rounded-lg shadow-md">
              <div className="mb-4">
                <input
                  className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
                  id="softwareName"
                  type="text"
                  placeholder="Category Name"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleAddCategory}
              >
                Add Category
              </button>
            </div>
          </div>

          <hr />
          <div className="flex flex-row justify-between items-center mb-4">
            {/* Category Table */}
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Category Name
                  </th>
                
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {category.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="px-2 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Box>
        <Toaster />
      </Layout>
    </>
  );
}

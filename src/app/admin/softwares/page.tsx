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

  // Function to handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setNewSoftware({ ...newSoftware, image: file });
  };

  return (
    <>
      <Layout>
        <Box>
          {/* Admin content */}
          {/* <h1 className="text-xl font-bold mb-2">Softwares</h1> */}
          {/* Software Card */}
          <div className="w-full p-4 text-center">
            <h2 className="text-xl font-bold mb-2">Add New Software</h2>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="w-full md:w-1/3 p-4 border border-gray-300 rounded-lg shadow-md">
              <div className="mb-4">
                <input
                  className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
                  id="softwareName"
                  type="text"
                  placeholder="Software Name"
                  value={newSoftware.name}
                  onChange={(e) =>
                    setNewSoftware({ ...newSoftware, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <input
                  className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
                  id="softwareDescription"
                  type="text"
                  placeholder="Software Description"
                  value={newSoftware.description}
                  onChange={(e) =>
                    setNewSoftware({
                      ...newSoftware,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4 border border-gray-300 rounded-lg shadow-md">
              <div className="mb-4">
                <Select
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
              </div>
              <div className="mb-4">
                <input
                  className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
                  id="softwareLink"
                  type="text"
                  placeholder="Software Link"
                  value={newSoftware.link}
                  onChange={(e) =>
                    setNewSoftware({ ...newSoftware, link: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4 border border-gray-300 rounded-lg shadow-md">
              <div className="mb-4">
                <input
                  type="file"
                  accept="image/*"
                  id="softwareImage"
                  onChange={handleFileUpload}
                />
              </div>
              <div className="mb-4">
                <p className="mb-1">OR</p>
                <input
                  className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
                  id="softwareImageUrl"
                  type="text"
                  placeholder="Image URL"
                  value={newSoftware.image}
                  onChange={(e) =>
                    setNewSoftware({ ...newSoftware, image: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="w-full p-4 text-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddSoftware}
            >
              Add Software
            </button>
          </div>

          <hr />
          <div className="flex flex-row justify-between items-center mb-4">
            {/* Software Table */}
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Software Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Image
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Edit
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
                {software.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12"
                        />
                      ) : (
                        item.link && (
                          <img
                            src={item.link}
                            alt={item.name}
                            className="w-12 h-12"
                          />
                        )
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="px-2 py-1 text-sm text-white bg-teal-500 hover:bg-teal-600 rounded"
                        onClick={() => handleEdit(item._id)}
                      >
                        Edit
                      </button>
                    </td>
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

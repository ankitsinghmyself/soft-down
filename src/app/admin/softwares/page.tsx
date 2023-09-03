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
import toast, { Toaster } from 'react-hot-toast';

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

  const [newSoftware, setNewSoftware] = useState({
    name: "",
    description: "",
    category: "",
    link: "",
    image: "",
  });
useEffect(() => {
    const fetchSoftwares = async () => {
      const response = await axios.get("/api/admin/getSoftwares");
      if (response.status === 200) {
        setSoftware(response.data.softwares);
      }
    };
    fetchSoftwares();
  }, []);
  
  // Function to handle editing a software (you can implement this)
  const handleEdit = (softwareId:any) => {
    // Implement the edit functionality here
    console.log(`Editing software with ID ${softwareId}`);
  };

  const handleDelete = async (softwareId: any) => {
    try {
      const response = await axios.delete(`/api/admin/deleteSoftware/`, {
        params: { softwareId: softwareId },
      });
  
      if (response.status === 200) {
        // Remove the software from the software array
        const newSoftware = software.filter(
          (item) => item._id !== softwareId
        );
        setSoftware(newSoftware);
        
        toast.success('Software deleted successfully');
      } else {
        toast.error('Software deleted failed');
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error deleting software:', error);
      toast.error('An error occurred while deleting software');
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
    const response = await axios.post("/api/admin/saveSoftwares", newSoftware);
    if(response.status === 200) {
      toast.success('Software added successfully');
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
          <h1>Softwares</h1>

          {/* Software Card */}
          <Card
            p={2}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="base"
            className="h-auto"
          >
            <Text fontSize="xl" fontWeight="bold" mb="2">
              Add New Software
            </Text>
            <label htmlFor="softwareName">Software Name</label>
            <input
              className="p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-gray-600 text-black"
              id="softwareName"
              type="text"
              placeholder="Software Name"
              value={newSoftware.name}
              onChange={(e) =>
                setNewSoftware({ ...newSoftware, name: e.target.value })
              }
            />
            <label htmlFor="softwareLink">Software Description </label>
            <input
              className="p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-gray-600 text-black"
              id="softwareDescription"
              type="text"
              placeholder="Software Description"
              value={newSoftware.description}
              onChange={(e) =>
                setNewSoftware({ ...newSoftware, description: e.target.value })
              }
            />
                <label htmlFor="softwareLink">Software Category </label>
            <input
              className="p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-gray-600 text-black"
              id="softwareCategory"
              type="text"
              placeholder="Software Category"
              value={newSoftware.category}
              onChange={(e) =>
                setNewSoftware({ ...newSoftware, category: e.target.value })
              }
            />
            

            <label htmlFor="softwareLink">Software Link</label>
            <input
              className="p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-gray-600 text-black"
              id="softwareLink"
              type="text"
              placeholder="Software Link"
              value={newSoftware.link}
              onChange={(e) =>
                setNewSoftware({ ...newSoftware, link: e.target.value })
              }
            />
            <label htmlFor="softwareImage">Software Image</label>
            <input
              type="file"
              accept="image/*"
              id="softwareImage"
              onChange={handleFileUpload}
            />
            <p>OR</p>
            <label htmlFor="softwareImageUrl">Paste Image URL</label>
            <input
              className="p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-gray-600 text-black"
              id="softwareImageUrl"
              type="text"
              placeholder="Image URL"
              value={newSoftware.image}
              onChange={(e) =>
                setNewSoftware({ ...newSoftware, image: e.target.value })
              }
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddSoftware}
            >
              Add Software
            </button>
          </Card>

          {/* Software Table */}
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Software Name</Th>
                <Th>Image</Th>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {software.map((item) => (
                <Tr key={item._id}>
                  <Td>{item.name}</Td>
                  <Td>
                    {item.image ? (
                      <img
                        // src={URL.createObjectURL(item.image)}
                        alt={item.name}
                        width="50"
                        height="50"
                      />
                    ) : (
                      item.link && (
                        <img
                          src={item.link}
                          alt={item.name}
                          width="50"
                          height="50"
                        />
                      )
                    )}
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Edit"
                      icon={<EditIcon />}
                      colorScheme="teal"
                      size="sm"
                      onClick={() => handleEdit(item._id)}
                    />
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDelete(item._id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Toaster />
      </Layout>
    </>
  );
}

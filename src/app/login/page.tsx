"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Box, Button, Center, Input, Stack, Text, Link as ChakraUILink } from "@chakra-ui/react";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Added error state

  const onLogin = async () => {
    try {
      setLoading(true);
      setError(null); // Clear any previous errors
      const response = await axios.post("/api/users/login", user);
      toast.success("Login success");
      if (response.data.isAdmin === true) {
        router.push("/admin/dashboard");
      } else {
        router.push("/profile");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <Box
    display="flex"
    flexDir="column"
    alignItems="center"
    justifyContent="center"
    minH="100vh"
    py={2}
  >
    {/* Title */}
    <Text fontSize="3xl" fontWeight="bold" mb={4} color="gray.800">
      SoftDown
    </Text>

    {/* Login Form */}
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      p={10}
      bg="whiteAlpha.800"
      rounded="lg"
      boxShadow="lg"
    >
      <Text fontSize="2xl" fontWeight="semibold" mb={4} color="gray.800">
        Login
      </Text>
      <hr className="w-16 h-1 bg-gray-600 mb-6" />

      {/* Email Input */}
      <Input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-gray-800"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />

      {/* Password Input */}
      <Input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-gray-800"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />

      {/* Loading or Login Button */}
      {loading ? (
        <Center mb={4}>
          <Text fontSize="lg" color="gray.800">
            Loading...
          </Text>
        </Center>
      ) : (
        <Button
          onClick={onLogin}
          isDisabled={buttonDisabled}
          className={`p-2 border rounded-lg mb-4 focus:outline-none ${
            buttonDisabled
              ? "border-gray-300 text-gray-500 cursor-not-allowed"
              : "border-gray-600 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:from-green-600 hover:via-green-700 hover:to-green-800"
          }`}
        >
          Login
        </Button>
      )}

      {/* Display error message if there is an error */}
      {error && (
        <Text fontSize="lg" color="red.500" mb={4}>
          {error}
        </Text>
      )}

      {/* Signup Link */}
      <Stack direction="row" spacing={2} mt={2}>
        <ChakraUILink as={Link} href="/signup" color="blue.500">
          Signup
        </ChakraUILink>
      </Stack>

      <Toaster />
    </Box>
  </Box>
  );
}

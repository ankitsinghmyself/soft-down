"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

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
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-600">
      <div className="flex flex-col items-center justify-center p-10 bg-white bg-opacity-80 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Login</h1>
        <hr className="w-16 h-1 bg-gray-600 mb-6" />

        <label htmlFor="email" className="text-gray-800 mb-2">
          Email
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-gray-800"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />

        <label htmlFor="password" className="text-gray-800 mb-2">
          Password
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-gray-800"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />

        {loading ? (
          <div className="flex items-center justify-center mb-4">
            <p className="text-gray-800">Loading...</p>
          </div>
        ) : (
          <button
            onClick={onLogin}
            disabled={buttonDisabled}
            className={`p-2 border rounded-lg mb-4 focus:outline-none ${
              buttonDisabled
                ? "border-gray-300 text-gray-500 cursor-not-allowed"
                : "border-gray-600 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:from-green-600 hover:via-green-700 hover:to-green-800"
            }`}
          >
            Login
          </button>
        )}

        {/* Display error message if there is an error */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* <Link href="/signup" className="text-blue-500">
      Visit Signup page
    </Link> */}
        <Toaster />
      </div>
    </div>
  );
}

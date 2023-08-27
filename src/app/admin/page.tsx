"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = React.useState(false);
  const admin = async () => {
    try {
      const response = await axios.get("/api/admin/dashboard");
      if (response.data.isAdmin === false) {
        router.push("/");
        return;
      }
      setIsAdmin(response.data.isAdmin);
      toast.success("Admin success");
    } catch (error: any) {
      console.log("Admin failed", error.message);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    admin();
  }, []);
  return (
    <>
      {isAdmin ? (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1>Admin Page</h1>
          <hr />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1>Page not found</h1>
          <hr />
        </div>
      )}
    </>
  );
}

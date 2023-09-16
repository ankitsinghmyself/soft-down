"use client";
import React from "react";
import Navbar from "@/components/frontend/header/Navbar";
import Footer from "@/components/frontend/footer/Footer";
import axios from "axios";

interface Software {
  _id: string;
  name: string;
  link: string;
  image: string;
  description: string;
  category: string;
  platform: string;
}

export default function SoftwaresDetails({ params }: any) {
  const [software, setSoftware] = React.useState<Software | null>(null);

  React.useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const response = await axios.get(`/api/admin/softwares/getSoftware?softwareId=${params.id}`);
        setSoftware(response.data.software);
      } catch (error) {
        console.error("Error fetching software details:", error);
      }
    };
    fetchSoftware();
  }, [params.id]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center">
        <div className="flex flex-col bg-background/70 gap-4 px-20 w-full max-w-screen-xl">
          {software ? (
            <>
              <h1 className="text-2xl font-bold">{software.name}</h1>
              <div>
                <img src={software.image} alt={software.name} className="w-64 h-64" />
              </div>
              <p className="text-gray-700">{software.description}</p>
              <p className="text-gray-600">Category: {software.category}</p>
              <p className="text-gray-600">Platform: {software.platform}</p>
              <a href={software.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Visit Website
              </a>
            </>
          ) : (
            <p>Loading software details...</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

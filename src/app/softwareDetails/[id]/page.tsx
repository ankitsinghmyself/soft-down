"use client";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/header/Navbar";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
interface Software {
  _id: string;
  name: string;
  link: string;
  image: string;
  description: string;
  category: string;
  platform: string;
}

export default function SoftwaresDetails({ id}) {
  const [softwareList, setSoftwareList] = useState<Software[]>([]);
  const [originalSoftwareList, setOriginalSoftwareList] = useState<Software[]>(
    []
  );
  const [categories, setCategories] = useState([
    {
      name: "",
    },
  ]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [activeTab, setActiveTab] = useState("windows");
  const filteredSoftwareList = softwareList.filter(
    (item) =>
      activeTab === "mac"
        ? item.platform === "mac"
        : activeTab === "windows"
        ? item.platform === "windows"
        : activeTab === "linux"
        ? item.platform === "linux"
        : false // Return false if the activeTab doesn't match any platform
  );

  useEffect(() => {
    const fetchSoftware = async () => {
      const response = await fetch("/api/admin/softwares/getSoftwares");
      const data = await response.json();
      const softwaresId = data.softwares._id;
      if(softwaresId === id){
        ///show one software
      }
      
    };
    fetchSoftware();

    const fetchCategories = async () => {
      const response = await fetch("/api/admin/categories/getCategory");
      const data = await response.json();
      const rescategories = data.categories;
      setCategories(rescategories);
    };
    fetchCategories();
  }, []);

  const filterList = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory("");
      setSoftwareList(originalSoftwareList); // Restore the original list
    } else {
      const filteredList = originalSoftwareList.filter(
        (software) => software.category === category
      );
      setActiveCategory(category);
      setSoftwareList(filteredList);
    }
  };
  const path = usePathname();

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center">
        <div className=" flex flex-col bg-background/70 gap-4 px-20 w-full max-w-screen-xl">
        {}
        </div>
      </div>
      <Footer />
    </div>
  );
}

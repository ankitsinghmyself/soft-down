"use client";
import Image from "next/image";
import { NextUIProvider } from "@nextui-org/react";
import Navbar from "@/components/header/Navbar";
import Footer from "@/components/footer/Footer";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
interface Software {
  _id: string;
  name: string;
  link: string;
  image: string;
  description: string;
  category: string;
  platform: string;
}
export default function Home() {
  const [softwareList, setSoftwareList] = useState<Software[]>([]);
  const [originalSoftwareList, setOriginalSoftwareList] = useState<Software[]>(
    []
  );
  const [categories, setCategories] = useState([{ name: "" }]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [activeTab, setActiveTab] = useState("windows");
  const [initialDisplayCount, setInitialDisplayCount] = useState(8);
  const [expandCount, setExpandCount] = useState(8);
  const [tabDisplayCounts, setTabDisplayCounts] = useState<{
    [key: string]: number;
  }>({
    windows: initialDisplayCount,
    mac: initialDisplayCount,
    linux: initialDisplayCount,
  });

  useEffect(() => {
    const fetchSoftware = async () => {
      const response = await fetch("/api/admin/softwares/getSoftwares");
      const data = await response.json();
      const softwares = data.softwares;
      setSoftwareList(softwares);
      setOriginalSoftwareList(softwares); // Store the original unfiltered list
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

  const handleSeeAllClick = () => {
    setTabDisplayCounts((prevCounts) => ({
      ...prevCounts,
      [activeTab]: prevCounts[activeTab] + expandCount,
    }));
  };

  const filteredSoftwareList = softwareList
    .filter((item) => item.platform === activeTab)
    .slice(0, tabDisplayCounts[activeTab]);

  const path = usePathname();

  return (
    <NextUIProvider>
      <Navbar />

      <main className="flex flex-col items-center justify-center  px-4 sm:px-8 lg:px-16">
        <div className="w-full max-w-screen-xl bg-background/70 py-4 px-4 sm:py-8 sm:px-8">
          <div className="items-center relative">
            <div className="flex flex-col items-start gap-4 sm:gap-8">
              <div className="font-bold text-neutral-800 text-2xl sm:text-3xl lg:text-4xl tracking-normal leading-9 whitespace-nowrap">
                Best Software
              </div>
              <div className="flex gap-4 sm:gap-8 pl-1">
                <button
                  className={`tab-button pb-2 ${
                    activeTab === "windows"
                      ? "border-b-2 border-b-green-800   text-green-800"
                      : "bg-transparent "
                  }`}
                  onClick={() => setActiveTab("windows")}
                >
                  Windows
                </button>
                <button
                  className={`tab-button pb-2 ${
                    activeTab === "mac"
                      ? "border-b-2 border-b-green-800   text-green-800"
                      : "bg-transparent "
                  }`}
                  onClick={() => setActiveTab("mac")}
                >
                  Mac
                </button>
                <button
                  className={`tab-button pb-2 ${
                    activeTab === "linux"
                      ? "border-b-2 border-b-green-800  text-green-800 "
                      : "bg-transparent "
                  }`}
                  onClick={() => setActiveTab("linux")}
                >
                  Linux
                </button>
              </div>
            </div>
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
              {filteredSoftwareList.map((item, index) => (
                <Link href={`/softwareDetails/${item._id}`} key={index}>
                  <div className="relative bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="relative flex">
                      <div
                        className="w-20 h-20 bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="bottom-0 pl-4  left-0 right-0">
                        <div className="text-sm font-semibold text-neutral-600">
                          {item.name}
                        </div>
                        <div className="text-green-500 text-sm font-semibold">
                          FREE
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-sm text-gray-600">
                        {item.description}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {filteredSoftwareList.length > 0 && (
              <div className="pt-5 pb-5 items-center justify-center flex flex-col gap-4">
                <div className="text-center w-64 h-12 border border-solid border-green-500">
                  <div
                    className="font-bold text-green-500 text-sm text-center leading-10 cursor-pointer"
                    onClick={handleSeeAllClick}
                  >
                    SEE ALL
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </NextUIProvider>
  );
}

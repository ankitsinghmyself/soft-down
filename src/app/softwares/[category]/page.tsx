"use client";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/header/Navbar";
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
}

export default function Softwares({ categoryName: string }) {
  const [softwareList, setSoftwareList] = useState<Software[]>([]);
  const [originalSoftwareList, setOriginalSoftwareList] = useState<Software[]>(
    []
  ); // Initialize originalSoftwareList
  const [activeCategory, setActiveCategory] = useState<string>("");
  useEffect(() => {
    const fetchSoftware = async () => {
      const response = await fetch("/api/admin/softwares/getSoftwares");
      const data = await response.json();
      const softwares = data.softwares;
      setSoftwareList(softwares);
      setOriginalSoftwareList(softwares); // Store the original unfiltered list
    };
    fetchSoftware();
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

  const routeSegments = path.split("/").filter((segment) => segment);

  return (
    <div>
      <Navbar />

      <div className="flex">
        <div className="w-3/12 p-4 bg-gray-200">
          <h1 className="text-2xl font-semibold">Filter</h1>
          <ul className="mt-4">
            <li>
              <a
                className={activeCategory === "Browsers" ? "text-blue-600" : ""}
                onClick={() => filterList("Browsers")}
              >
                Browsers
              </a>
            </li>
            <li>
              <a
                className={
                  activeCategory === "Antivirus" ? "text-blue-600" : ""
                }
                onClick={() => filterList("Antivirus")}
              >
                Antivirus
              </a>
            </li>
            {/* Add more category links here */}
          </ul>
        </div>
        <div className="w-9/12 p-4">
          {/* <div className="bg-gray-300 p-2 mb-10">
            <div
              className=" flex
              justify-left items-center text-sm text-gray-600 font-light 
              "
            >
              <span>
                <Link href="/">
                  <p className="text-blue-600">Home</p>
                </Link>
              </span>
              {routeSegments.map((segment, index) => (
                <span key={segment}>
                  {" > "}
                  {index === routeSegments.length - 1 ? (
                    <span>{segment}</span>
                  ) : (
                    <Link href={`/${segment}`}>
                      <p className="text-blue-600">{segment}</p>
                    </Link>
                  )}
                </span>
              ))}
            </div>
          </div> */}
          <ul className="space-y-6">
            {softwareList.map((software) => (
              <li
                key={software._id}
                className="flex items-center p-4 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <a
                  href={software.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center space-x-4"
                >
                  <div className="w-20 h-20 relative">
                    <img
                      src={software.image}
                      alt={software.name}
                      className="w-full h-full rounded-lg "
                    />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {software.name}
                    </h2>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {software.description}
                    </p>
                  </div>
                </a>
                <div className="p-4 text-center">
                  <a
                    href={software.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out"
                  >
                    Download
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

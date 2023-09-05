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

export default function WindowsSoftwares() {
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
          <div className="bg-gray-300 p-2 mb-10">
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
          </div>
          <ul className="grid grid-cols-4 gap-4">
            {softwareList.map((software) => (
              <li key={software._id} className="  ">
                <a href={software.link} target="_blank" rel="noreferrer">
                  <img
                    className="w-1/2 h-auto object-fill rounded-lg shadow-md mb-2 hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:rotate-12"
                    src={software.image}
                    alt={software.name}
                  />
                  <h2 className="text-xl font-semibold">{software.name}</h2>
                </a>
                <p className="text-gray-600 line-clamp-2">
                  {software.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

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
  platform: string;
}

export default function Softwares({ categoryName: string }) {
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
  const path = usePathname();

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center">
        <div className=" flex flex-col bg-background/70 gap-4 px-20 w-full max-w-screen-xl">
          <div className="  items-center relative">
            <div className="flex flex-col items-start gap-[8.4px]">
              <div className="relative w-fit  font-bold text-neutral-800 text-[22px] tracking-[0] leading-[32px] whitespace-nowrap">
                Best Browsers Software
              </div>
              <div className="flex gap-[24px]">
                <button
                  className="tab-button"
                  onClick={() => setActiveTab("windows")}
                  style={{
                    backgroundColor:
                      activeTab === "windows" ? "#2a874b" : "transparent",
                    color: activeTab === "windows" ? "#fff" : "#2a874b",
                  }}
                >
                  Windows
                </button>
                <button
                  className="tab-button"
                  onClick={() => setActiveTab("mac")}
                  style={{
                    backgroundColor:
                      activeTab === "mac" ? "#2a874b" : "transparent",
                    color: activeTab === "mac" ? "#fff" : "#2a874b",
                  }}
                >
                  Mac
                </button>
                <button
                  className="tab-button"
                  onClick={() => setActiveTab("linux")}
                  style={{
                    backgroundColor:
                      activeTab === "linux" ? "#2a874b" : "transparent",
                    color: activeTab === "linux" ? "#fff" : "#2a874b",
                  }}
                >
                  Linax
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-[16px] mt-4">
              {filteredSoftwareList.map((item, index) => (
                 <Link href={`/softwareDetails/${item._id}`}> 
                <div key={index} className="relative h-[180px] bg-[#e4dfdfc7]">
                  <div className="w-[274px] gap-[16px] absolute top-[16px] left-[16px] flex items-start">
                    <div className="relative max-w-[48px] w-[48px] h-[48px] bg-[url(https://play-lh.googleusercontent.com/KwUBNPbMTk9jDXYS2AeX3illtVRTkrKVh5xR1Mg4WHd0CG2tV4mrh1z3kXi5z_warlk)] bg-cover bg-[50%_50%]" />
                    <div className="flex-col gap-[4.4px] pl-0  py-0 relative flex-1 grow flex items-start">
                      <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Bold',_Helvetica] font-bold text-neutral-800 text-[18px] tracking-[0] leading-[28px] whitespace-nowrap">
                        {item.name}
                      </div>
                      <div className="relative w-fit [font-family:'Inter-Bold',_Helvetica] font-bold text-[#2a874b] text-[12px] tracking-[2.00px] leading-[16px] whitespace-nowrap">
                        FREE
                      </div>
                    </div>
                  </div>
                  <div className="flex-col w-[274px] pt-0 pb-[24px] px-0 absolute top-[80px] left-[16px] flex items-start">
                    <div className="flex-col pl-0 pr-[28px] py-0 relative self-stretch w-full flex-[0_0_auto] flex items-start">
                      <p className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',_Helvetica] font-normal text-[#666666] text-[12px] tracking-[0] leading-[20px]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute w-[112px] h-[52px] top-[-15px] left-[-2304px] [font-family:'Inter-Regular',_Helvetica] font-normal text-transparent text-[16px] tracking-[0] leading-[26px]">
                    {item.name}
                  </div>
                </div>
                </Link>
              ))}
            </div>
            <div className=" items-center justify-center flex flex-col bg-background/70 gap-4 px-20 w-full max-w-screen-xl">
              <div className="text-center flex w-[620px] h-[48px] items-center justify-center  border border-solid border-[#2a874b]">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Bold',_Helvetica] font-bold text-[#2a874b] text-[13px] text-center tracking-[0] leading-[33.6px] whitespace-nowrap">
                  SEE ALL
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className=" flex flex-col bg-background/70 gap-4 px-20 w-full max-w-screen-xl">
          <div className="  items-center relative">
            <div className="flex flex-col items-start gap-[8.4px]">
              <div className="relative w-fit  font-bold text-neutral-800 text-[22px] tracking-[0] leading-[32px] whitespace-nowrap">
                Best Browsers Software
              </div>
              <div className="flex gap-[24px]">
                <button
                  className="tab-button"
                  onClick={() => setActiveTab("windows")}
                  style={{
                    backgroundColor:
                      activeTab === "windows" ? "#2a874b" : "transparent",
                    color: activeTab === "windows" ? "#fff" : "#2a874b",
                  }}
                >
                  Windows
                </button>
                <button
                  className="tab-button"
                  onClick={() => setActiveTab("mac")}
                  style={{
                    backgroundColor:
                      activeTab === "mac" ? "#2a874b" : "transparent",
                    color: activeTab === "mac" ? "#fff" : "#2a874b",
                  }}
                >
                  Mac
                </button>
                <button
                  className="tab-button"
                  onClick={() => setActiveTab("linux")}
                  style={{
                    backgroundColor:
                      activeTab === "linux" ? "#2a874b" : "transparent",
                    color: activeTab === "linux" ? "#fff" : "#2a874b",
                  }}
                >
                  Linax
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-[16px] mt-4">
              {filteredSoftwareList.map((item, index) => (
                <div key={index} className="relative h-[180px] bg-[#e4dfdfc7]">
                  <div className="w-[274px] gap-[16px] absolute top-[16px] left-[16px] flex items-start">
                    <div className="relative max-w-[48px] w-[48px] h-[48px] bg-[url(https://play-lh.googleusercontent.com/KwUBNPbMTk9jDXYS2AeX3illtVRTkrKVh5xR1Mg4WHd0CG2tV4mrh1z3kXi5z_warlk)] bg-cover bg-[50%_50%]" />
                    <div className="flex-col gap-[4.4px] pl-0  py-0 relative flex-1 grow flex items-start">
                      <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Bold',_Helvetica] font-bold text-neutral-800 text-[18px] tracking-[0] leading-[28px] whitespace-nowrap">
                        {item.name}
                      </div>
                      <div className="relative w-fit [font-family:'Inter-Bold',_Helvetica] font-bold text-[#2a874b] text-[12px] tracking-[2.00px] leading-[16px] whitespace-nowrap">
                        FREE
                      </div>
                    </div>
                  </div>
                  <div className="flex-col w-[274px] pt-0 pb-[24px] px-0 absolute top-[80px] left-[16px] flex items-start">
                    <div className="flex-col pl-0 pr-[28px] py-0 relative self-stretch w-full flex-[0_0_auto] flex items-start">
                      <p className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',_Helvetica] font-normal text-[#666666] text-[12px] tracking-[0] leading-[20px]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute w-[112px] h-[52px] top-[-15px] left-[-2304px] [font-family:'Inter-Regular',_Helvetica] font-normal text-transparent text-[16px] tracking-[0] leading-[26px]">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
            <div className=" items-center justify-center flex flex-col bg-background/70 gap-4 px-20 w-full max-w-screen-xl">
              <div className="text-center flex w-[620px] h-[48px] items-center justify-center  border border-solid border-[#2a874b]">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Bold',_Helvetica] font-bold text-[#2a874b] text-[13px] text-center tracking-[0] leading-[33.6px] whitespace-nowrap">
                  SEE ALL
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

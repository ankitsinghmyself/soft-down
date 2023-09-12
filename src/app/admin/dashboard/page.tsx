"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Layout from "@/components/admin/Layout";
import MiniStatistics from "@/components/card/MiniStatistics";
import IconBox from "@/components/icons/IconBox";
import { MdBarChart } from "react-icons/md";

export default function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = React.useState(false);
  const admin = async () => {
    try {
      const response = await axios.get("/api/admin/dashboard");
      setIsAdmin(response.data.isAdmin);
      if (response.data.isAdmin === false) {
        router.push("/");
        return;
      }
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
        <>
          <Layout>
            <div className="pt-80px md:pt-130px xl:pt-80px">
              {/* Admin content */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-20px mb-20px">
                <MiniStatistics
                  startContent={
                    <IconBox
                      className="w-56px h-56px bg-secondaryGray-300"
                      icon={
                        <MdBarChart className="w-32px h-32px text-brand-500" />
                      }
                    />
                  }
                  name="Earnings"
                  value="$350.4"
                />
                <MiniStatistics
                  startContent={
                    <IconBox
                      className="w-56px h-56px bg-secondaryGray-300"
                      icon={
                        <MdBarChart className="w-32px h-32px text-brand-500" />
                      }
                    />
                  }
                  name="Earnings"
                  value="$350.4"
                />
                {/* Add more MiniStatistics components here */}
              </div>
            </div>
          </Layout>
        </>
    </>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Grid, GridItem, useColorModeValue, Text } from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Layout from "@/components/admin/Layout";
import { MdBarChart } from "react-icons/md";

function MiniStatisticsCard({ icon, name, value }) {
  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius="lg"
      bg={useColorModeValue("white", "gray.700")}
    >
      <Grid templateColumns="1fr auto" gap={4}>
        <Box>{icon}</Box>
        <Box textAlign="right">
          <Text fontSize="lg" fontWeight="bold">
            {value}
          </Text>
          <Text color="gray.500">{name}</Text>
        </Box>
      </Grid>
    </Box>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [softwareCount, setSoftwareCount] = useState(0);

  const admin = async () => {
    try {
      const response = await axios.get("/api/admin/dashboard");
      setIsAdmin(response.data.isAdmin);
      if (response.data.isAdmin === false) {
        router.push("/");
        return;
      }
      toast.success("Admin success");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchSoftwareCount = async () => {
      try {
        const response = await axios.get("/api/admin/softwares/getSoftwares");
        if (response.status === 200) {
          const { softwares } = response.data;
          const count = softwares.length;
          setSoftwareCount(count);
        }
      } catch (error) {
        console.error("Error fetching software count:", error);
      }
    };

    fetchSoftwareCount();
    admin();
  }, []);

  return (
    <Layout>
      <Box pt="80px" md={{ pt: "130px", xl: "80px" }}>
        <Grid
          gridTemplateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            "2xl": "repeat(6, 1fr)",
          }}
          gap={4}
          mb="20px"
        >
          <GridItem colSpan={1}>
            <MiniStatisticsCard
              icon={<MdBarChart className="w-32px h-32px text-brand-500" />}
              name="Total Software"
              value={softwareCount}
            />
          </GridItem>
          {/* Add more MiniStatisticsCard components as needed */}
        </Grid>
      </Box>
    </Layout>
  );
}

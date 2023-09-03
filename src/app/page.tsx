"use client";

import Image from "next/image";
import { NextUIProvider } from "@nextui-org/react";
import Navbar from "@/components/header/Navbar";
import Footer from "@/components/footer/Footer";
export default function Home() {
  return (
    <NextUIProvider>
      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-96 flex items-center">
        <Image
          src="/images/bg.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          style={{ filter: "brightness(0.9)", transform: "scaleY(-1)" }}
        />
        <div className="absolute left-0 flex flex-col justify-center h-96 py-0 px-4 md:px-20 z-2 w-full md:w-1/2 -mt-20">
          <h1 className="text-3xl md:text-6xl text-white font-extrabold mt-0 md:mt-16">
            The Best Place to Download Software
          </h1>
          <p className="text-md md:text-2xl text-white mt-4">
            Discover a vast collection of software for Windows, Mac, and Linux
            operating systems.
          </p>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md mt-8 hover:bg-blue-600">
            Browse Software
          </button>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 lg:p-16">
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-3xl md:text-5xl font-bold text-center">
            Browse Software by Operating System
          </h1>
          <p className="text-md md:text-2xl text-center mt-4">
            Discover a vast collection of software for Windows, Mac, and Linux
            operating systems.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center w-full mt-8">
          <div className="flex flex-col items-center justify-center w-full md:w-1/3 p-4">
          <a href="/windows-software"> 
            <div className="flex flex-col items-center justify-center w-full">
              <Image
                src="/images/windows.png"
                alt="Windows"
                width={100}
                height={100}
              />
              <h1 className="text-2xl font-bold text-center mt-4">Windows</h1>
            </div>
            </a>
          </div>
          <div className="flex flex-col items-center justify-center w-full md:w-2/3 p-4">
            <div className="flex flex-col md:flex-row items-center justify-center w-full">
              <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-4">
                <a href="/mac-software">
                <div className="flex flex-col items-center justify-center w-full mt-4">
                  <Image
                    src="/images/mac.png"
                    alt="Mac"
                    width={100}
                    height={100}
                  />
                  <h1 className="text-2xl font-bold text-center mt-4">Mac</h1>
                </div>
                </a>
              </div>
              <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-4">
                <a href="/linux-software">
                <div className="flex flex-col items-center justify-center w-full mt-4">
                  <Image
                    src="/images/linux.png"
                    alt="Linux"
                    width={100}
                    height={100}
                  />
                  <h1 className="text-2xl font-bold text-center mt-4">Linux</h1>
                </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full mt-8">
          <h1 className="text-3xl md:text-5xl font-bold text-center">
            Browse Software by Category
          </h1>
          <p className="text-md md:text-2xl text-center mt-4">
            Discover a vast collection of software for Windows, Mac, and Linux
            operating systems.
          </p>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </NextUIProvider>
  );
}

"use client";

import Image from 'next/image';
import { NextUIProvider } from "@nextui-org/react";
import Navbar from '@/components/header/Navbar';
import Footer from '@/components/footer/Footer';

export default function Home() {
  return (
    <NextUIProvider>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Hello World!!!</h1>
      </main>
      <Footer />
    </NextUIProvider>
  );
}

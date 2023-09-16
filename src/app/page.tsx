"use client";
import Navbar from "@/components/frontend/header/Navbar";
import Footer from "@/components/frontend/footer/Footer";
import {
  ChakraProvider,
  ColorModeScript,
  CSSReset,
  extendTheme,
} from "@chakra-ui/react";
import MainPage from "./mainPage/page";
const theme = extendTheme({
  colors: {
    transparent: "transparent",
    black: "#000",
    white: "#fff",
    brand: {
      50: "F0FFF4",
      100: "#C6F6D5",
      200: "#9AE6B4",
      300: "#68D391",
      400: "#48BB78",
    },
  },
});

export default function Home() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Navbar />
        <MainPage />
        <Footer />
      </ChakraProvider>
    </>
  );
}

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
    breakpoints: {
      base: "0em", // Mobile (default)
      sm: "30em",  // Small screens
      md: "48em",  // Medium screens
      lg: "62em",  // Large screens
      xl: "80em",  // Extra-large screens
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

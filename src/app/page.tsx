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
    // brand: {
    //   100: "#f7fafc",
    //   // ...
    //   900: "#1a202c",
    // },
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

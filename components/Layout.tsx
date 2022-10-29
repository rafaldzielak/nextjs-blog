import React, { PropsWithChildren } from "react";
import styles from "../styles/Layout.module.scss";
import {
  ChakraProvider,
  extendTheme,
  type ThemeConfig,
} from "@chakra-ui/react";
import Navbar from "./Navbar";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `'Oswald', sans-serif;`,
  },
  sizes: {
    heading: "3rem",
  },
  colors: {
    gray: {
      800: "#1c2230",
    },
  },
  styles: {
    global: {
      html: {
        fontSize: "16px",
      },
      h1: {
        fontSize: "2.5rem",
        marginBottom: "1.5rem",
      },
      h2: {
        fontSize: "1.75rem",
        marginBottom: "1.25rem",
      },
      h3: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        marginBottom: "1rem",
      },
      p: {
        fontSize: "1rem",
        marginBottom: "0.5rem",
      },
    },
  },
});

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <main>
        <Navbar />
        <div className={styles.container}>{children}</div>
      </main>
    </ChakraProvider>
  );
};

export default Layout;

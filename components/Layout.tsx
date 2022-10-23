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
  colors: {
    gray: {
      800: "#1c2230",
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

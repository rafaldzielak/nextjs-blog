import React, { PropsWithChildren } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Layout.module.scss";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className={styles.container}>
      <Link href="/">
        <a>
          <Image src="/car-logo.png" alt="logo" width={150} height={50} />
        </a>
      </Link>
      <div>{children}</div>
    </main>
  );
};

export default Layout;

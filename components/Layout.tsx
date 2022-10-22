import React, { PropsWithChildren } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Layout.module.scss";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main>
      <nav className={styles.nav}>
        <div className={styles.navContent}>
          <Link href="/">
            <a>
              <Image src="/car-logo.png" alt="logo" width={150} height={50} />
              <h2>RD Car Blog</h2>
            </a>
          </Link>
          <h3>Log in</h3>
        </div>
      </nav>
      <div className={styles.container}>{children}</div>
    </main>
  );
};

export default Layout;

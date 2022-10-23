import React, { PropsWithChildren } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Layout.module.scss";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const auth = getAuth(firebaseApp);
  const [user, loading, error] = useAuthState(auth);
  console.log(user, loading, error);

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
          {user ? <h3>Hi {user.displayName}</h3> : <h3>Log in</h3>}
        </div>
      </nav>
      <div className={styles.container}>{children}</div>
    </main>
  );
};

export default Layout;

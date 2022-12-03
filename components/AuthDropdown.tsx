import React from "react";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { Menu, MenuButton, MenuList, MenuItem, Button, Heading } from "@chakra-ui/react";
import LoginModal from "./LoginModal/LoginModal";
import { useRouter } from "next/router";

const AuthDropdown = () => {
  const auth = getAuth(firebaseApp);
  const [user, loading, error] = useAuthState(auth);

  const router = useRouter();

  console.log(user, loading, error);

  if (!user) return <LoginModal />;

  return (
    <Menu>
      <MenuButton mr="5" as={Button}>
        <Heading as="h3" size={"md"} fontWeight="500">
          {user ? user.displayName || user.email : "Sign in"}
        </Heading>
      </MenuButton>
      <MenuList border={"none"}>
        <MenuItem onClick={() => router.push("/posts/my")}>My Posts</MenuItem>
        <MenuItem onClick={() => router.push("/posts/favourites")}>My Favourites</MenuItem>
        <MenuItem onClick={() => auth.signOut()}>Log out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AuthDropdown;

import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseApp } from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Heading,
} from "@chakra-ui/react";

const AuthDropdown = () => {
  const auth = getAuth(firebaseApp);
  const [user, loading, error] = useAuthState(auth);
  const provider = new GoogleAuthProvider();
  console.log(user, loading, error);

  const signIn = async () => await signInWithPopup(auth, provider);

  return (
    <Menu>
      <MenuButton mr="5" as={Button}>
        <Heading as="h3" size={"md"} fontWeight="500">
          {user ? `${user.displayName}` : "Sign in"}
        </Heading>
      </MenuButton>
      <MenuList border={"none"}>
        {user ? (
          <>
            <MenuItem>My Posts</MenuItem>
            <MenuItem>My Favourites</MenuItem>
            <MenuItem onClick={() => auth.signOut()}>Log out</MenuItem>
          </>
        ) : (
          <MenuItem onClick={signIn}>Sign In</MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default AuthDropdown;

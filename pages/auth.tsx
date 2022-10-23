import React from "react";
import { initFirebase } from "../firebase/clientApp";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

const SignIn = () => {
  const app = initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const router = useRouter();

  const [user, loading] = useAuthState(auth);

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  };

  if (loading) return <div>Loading</div>;
  if (user) router.push("/");

  return (
    <div
      style={{
        maxWidth: "320px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Login</h1>
      <button onClick={signIn}>Please sign in</button>
    </div>
  );
};

export default SignIn;

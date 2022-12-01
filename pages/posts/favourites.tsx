import { Center } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where, updateDoc, addDoc, doc, getDoc } from "firebase/firestore";
import React, { FC, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PostGrid from "../../components/PostGrid";
import { firestoreDb } from "../../firebase/clientApp";
import { Post } from "../../types/Post";

const MyPosts: FC<Post> = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!user) return;

    const getFavourites = async () => {
      const docRef = doc(firestoreDb, "favourites", user.uid);
      const document = (await getDoc(docRef)).data();
      setPosts((document?.favourites || []) as Post[]);
      console.log(user.uid);
      // if (document) {
      //   await updateDoc(docRef, { favourites: [...document.favourites, { dupa: "aaa", dupa2: "BBB" }] });
      // }
    };
    getFavourites();

    console.log(user?.uid);
  }, [user]);

  if (!user && !loading)
    return (
      <Center>
        <h1>Please log in to view your posts</h1>
      </Center>
    );

  return <PostGrid posts={posts} />;
};

export default MyPosts;

import { Center } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { FC, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PostGrid from "../../components/PostGrid";
import { firestoreDb } from "../../firebase/clientApp";
import { Post } from "../../types/Post";

const MyPosts: FC<Post> = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  console.log(posts);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(firestoreDb, "posts"), where("author", "==", user?.email));
    getDocs(q).then((querySnapshot) => setPosts(querySnapshot.docs?.map((doc) => doc.data() as Post)));
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

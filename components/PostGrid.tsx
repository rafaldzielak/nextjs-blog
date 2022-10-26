import { Grid } from "@chakra-ui/react";
import React from "react";
import PostCard, { PostProps } from "./PostCard";
import { useCollection } from "react-firebase-hooks/firestore";
import { getFirestore, collection } from "firebase/firestore";
import { firebaseApp } from "../firebase/clientApp";
import { Spinner } from "@chakra-ui/react";
import { GetServerSideProps } from "next";

const PostGrid = () => {
  const [postsData, postsLoading, postsError] = useCollection(
    collection(getFirestore(firebaseApp), "posts"),
    {}
  );

  if (postsLoading)
    return (
      <Grid height="90vh" width="100%" placeItems="center">
        <Spinner size="xl" />
      </Grid>
    );

  return (
    <Grid gridTemplateColumns="1fr 1fr" gap="6">
      <PostCard
        title="Darmowe przeglądy w ponad 1300 stacjach. Mamy listę"
        img="https://menworld.pl/wp-content/uploads/2022/07/2023-honda-civic-type-r-front-view-1.jpg"
        author="RD"
      />
      <PostCard
        title="Darmowe przeglądy w ponad 1300 stacjach."
        img="https://d-art.ppstatic.pl/kadry/k/r/1/bc/ef/624b343f861a1_o_original.jpg"
        author="RD"
      />
      {postsData?.docs.map((doc) => {
        const post = doc.data();
        return (
          <PostCard
            key={post.title}
            title={post.title}
            img={post.img}
            author={post.author}
          />
        );
      })}
    </Grid>
  );
};

export default PostGrid;

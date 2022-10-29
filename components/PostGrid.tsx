import { Grid } from "@chakra-ui/react";
import React, { FC } from "react";
import PostCard, { PostProps } from "./PostCard";
import { useCollection } from "react-firebase-hooks/firestore";
import { Spinner } from "@chakra-ui/react";
import { GetServerSideProps } from "next";

type PostGridProps = {
  posts: PostProps[];
};

const PostGrid: FC<PostGridProps> = ({ posts }) => {
  return (
    <Grid gridTemplateColumns="1fr 1fr" gap="6">
      {posts.map((post) => {
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

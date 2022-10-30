import { Grid } from "@chakra-ui/react";
import React, { FC } from "react";
import PostCard from "./PostCard";
import { Post } from "../types/Post";

type PostGridProps = {
  posts: Post[];
};

const PostGrid: FC<PostGridProps> = ({ posts }) => {
  return (
    <Grid gridTemplateColumns="1fr 1fr" gap="6" mb="6">
      {posts.map((post) => (
        <PostCard key={post.title} {...post} />
      ))}
    </Grid>
  );
};

export default PostGrid;

import { Grid } from "@chakra-ui/react";
import React from "react";
import PostCard from "./PostCard";

const PostGrid = () => {
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
    </Grid>
  );
};

export default PostGrid;

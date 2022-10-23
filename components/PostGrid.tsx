import React from "react";
import styles from "../styles/PostGrid.module.scss";
import PostCard from "./PostCard";

const PostGrid = () => {
  return (
    <div className={styles.postGrid}>
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
    </div>
  );
};

export default PostGrid;

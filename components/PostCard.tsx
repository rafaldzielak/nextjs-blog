import Image from "next/image";
import React, { FC } from "react";
import styles from "../styles/PostCard.module.scss";

type PostProps = {
  title: string;
  author: string;
  img: string;
};

const PostCard: FC<PostProps> = ({ title, img, author }) => {
  return (
    <div className={styles.postCard}>
      <Image
        className={styles.cardImage}
        src={img}
        layout="fill"
        alt="car"
        objectFit="cover"
      />
      <h2 className={styles.cardTitle}>{title}</h2>
    </div>
  );
};

export default PostCard;

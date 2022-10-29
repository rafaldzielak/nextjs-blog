import { Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";
import React, { FC } from "react";
import styles from "../styles/PostCard.module.scss";

export type PostProps = {
  title: string;
  author: string;
  img: string;
};

const PostCard: FC<PostProps> = ({ title, img, author }) => {
  return (
    <Flex
      className={styles.postCard}
      alignItems="flex-end"
      padding="4"
      height="450px"
      position="relative"
      boxShadow="inset 0px -120px 60px -60px #111;"
    >
      <Image className={styles.cardImage} src={img} layout="fill" alt="car" objectFit="cover" />
      <Heading as="h4" fontSize={"2xl"} fontWeight="400" mb="2">
        {title}
      </Heading>
    </Flex>
  );
};

export default PostCard;

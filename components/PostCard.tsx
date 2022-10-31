import { Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import styles from "../styles/PostCard.module.scss";
import { Post } from "../types/Post";

const PostCard: FC<Post> = ({ title, img, author, timestamp }) => {
  return (
    <Flex
      className={styles.postCard}
      alignItems="flex-end"
      padding="4"
      height="450px"
      position="relative"
      boxShadow="inset 0px -120px 60px -60px #111;"
    >
      <Link href={`/posts/${timestamp}`}>
        <a>
          <Image className={styles.cardImage} src={img} layout="fill" alt="car" objectFit="cover" />
          <Heading as="h4" fontSize={"2xl"} fontWeight="400" mb="2">
            {title}
          </Heading>
        </a>
      </Link>
    </Flex>
  );
};

export default PostCard;

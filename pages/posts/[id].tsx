import { Box, Heading } from "@chakra-ui/react";
import TiptapImage from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { GetServerSideProps } from "next";
import Image from "next/image";
import React, { FC } from "react";
import { firestoreDb } from "../../firebase/clientApp";
import { Post } from "../../types/Post";

const SinglePost: FC<Post> = (post) => {
  const editor = useEditor({
    extensions: [StarterKit, TiptapImage],
    content: post.description,
    editable: false,
  });

  return (
    <Box maxWidth="840px" margin="auto" style={{ textAlign: "justify", textJustify: "inter-word" }}>
      <Heading>{post.title}</Heading>
      <Box position="relative" width="100%" height="400px" mb="1rem">
        <Image src={post.img} layout="fill" alt="car" objectFit="cover" />
      </Box>
      <EditorContent editor={editor} contentEditable={false} />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.params?.id);
  const q = query(collection(firestoreDb, "posts"), where("timestamp", "==", Number(context.params?.id)));
  const querySnapshot = await getDocs(q);
  const post = querySnapshot.docs?.[0].data();
  if (!post) return { notFound: true };
  return {
    props: post,
  };
};

export default SinglePost;

import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import TiptapImage from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { getAuth } from "firebase/auth";
import { collection, doc, DocumentData, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { firestoreDb } from "../../firebase/clientApp";
import { useFavourtes } from "../../hooks/useFavourites";
import { Post } from "../../types/Post";

const SinglePost: FC<Post> = (post) => {
  const { isFavourite, toggleFavourite, setisFavourite, favouriteDocument, user } = useFavourtes(post);

  const editor = useEditor({
    extensions: [StarterKit, TiptapImage],
    content: post.description,
    editable: false,
  });

  const router = useRouter();

  useEffect(() => {
    if (!favouriteDocument) return;
    setisFavourite(favouriteDocument.favourites.some((favourite: Post) => favourite.timestamp.toString() === router.query.id));
  }, [favouriteDocument, router.query.id, setisFavourite]);

  return (
    <Box maxWidth="840px" margin="auto" style={{ textAlign: "justify", textJustify: "inter-word" }}>
      <Heading>{post.title}</Heading>
      <Flex justifyContent="space-between">
        <Box>
          <Box mb=".5rem">
            <Text as="span" textColor="#ddd">
              Author:{" "}
            </Text>
            <Text as="span" textColor="#aaa">
              {post.author}
            </Text>
          </Box>
          <Box mb="1rem">
            <Text as="span" textColor="#ddd">
              Date:{" "}
            </Text>
            <Text as="span" textColor="#aaa">
              {new Date(post.timestamp).toUTCString()}
            </Text>
          </Box>
        </Box>
        {user && <Button onClick={toggleFavourite}>{isFavourite ? "Remove from favourites" : "Add to favourites"}</Button>}
      </Flex>
      <Box position="relative" width="100%" height="400px" mb="1rem">
        <Image src={post.img} layout="fill" alt="car" objectFit="cover" />
      </Box>
      <EditorContent editor={editor} contentEditable={false} />
    </Box>
  );
};

type Params = { id: string };

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const q = query(collection(firestoreDb, "posts"));
  const querySnapshot = await getDocs(q);

  const paths = querySnapshot.docs.map((doc) => ({ params: { id: doc.data().timestamp.toString() } }));
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<Post, Params> = async (context) => {
  console.log(context.params?.id);
  const q = query(collection(firestoreDb, "posts"), where("timestamp", "==", Number(context.params?.id)));
  const querySnapshot = await getDocs(q);
  const post = querySnapshot.docs?.[0].data() as Post;
  return { props: post };
};

export default SinglePost;

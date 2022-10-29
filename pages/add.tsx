import { Alert, AlertIcon, AlertTitle, Box, Button, Input } from "@chakra-ui/react";
import { EditorContent, useEditor } from "@tiptap/react";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import React, { useState } from "react";
import AddPostMenu from "../components/AddPostMenu";
import { collection, addDoc } from "firebase/firestore";
import { firestoreDb } from "../firebase/clientApp";
import { useRouter } from "next/router";

const Add = () => {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const editor = useEditor({
    extensions: [StarterKit, Image],
    autofocus: true,
    content: `
      <h2>
        Please enter your content here
      </h2>
      <img src="https://source.unsplash.com/8xznAGy4HcY/800x400" />
      <p>Description</p>
    `,
  });

  const onClick = async () => {
    setError("");
    if (!title || !img) {
      setError(!title ? "Please provide title" : "Please provide main image url");
      return;
    }
    console.log(editor?.getHTML());
    console.log(editor?.getText());
    console.log(editor?.getJSON());
    await addDoc(collection(firestoreDb, "posts"), {
      author: "RD",
      description: editor?.getHTML(),
      img,
      title,
      timestamp: Date.now(),
    });
    router.push("/");
  };

  const inputProps = {
    backgroundColor: "gray.700",
    type: "text",
    mb: "1rem",
    _placeholder: { opacity: 1, color: "gray.300" },
  };

  return (
    <Box maxWidth="840px" margin="auto">
      <AddPostMenu editor={editor} />
      {error && (
        <Alert status="error" mt="1rem">
          <AlertIcon />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}
      <Input {...inputProps} value={title} mt="1rem" onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <Input {...inputProps} value={img} onChange={(e) => setImg(e.target.value)} placeholder="Main image URL" />

      <Box backgroundColor="gray.700" borderRadius="5px">
        <EditorContent editor={editor} />
      </Box>
      <Button my="1rem" size="lg" px="2.5rem" onClick={onClick}>
        Save
      </Button>
    </Box>
  );
};

export default Add;

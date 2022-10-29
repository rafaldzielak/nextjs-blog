import { Box, Button } from "@chakra-ui/react";
import { EditorContent, useEditor } from "@tiptap/react";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import AddPostMenu from "../components/AddPostMenu";

const Add = () => {
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

  const onClick = () => {
    console.log(editor?.getHTML());
    console.log(editor?.getText());
    console.log(editor?.getJSON());
  };

  return (
    <Box maxWidth="840px" margin="auto">
      <AddPostMenu editor={editor} />
      <Box backgroundColor="gray.700" borderRadius="5px">
        <EditorContent editor={editor} />
      </Box>
      <Button mt="1rem" onClick={onClick}>
        Save
      </Button>
    </Box>
  );
};

export default Add;

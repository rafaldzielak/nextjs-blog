import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { Editor } from "@tiptap/react";
import React, { FC } from "react";

type AddPostMenuProps = {
  editor: Editor | null;
};

const AddPostMenu: FC<AddPostMenuProps> = ({ editor }) => {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <Stack spacing={"0.5rem"}>
      <Flex>
        <Button
          m="0.5rem"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          h1
        </Button>
        <Button
          m="0.5rem"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          h2
        </Button>
        <Button
          m="0.5rem"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          h3
        </Button>
        <Button m="0.5rem" ml="auto" onClick={addImage}>
          Add image from URL
        </Button>
      </Flex>
      <Flex>
        <Button
          m="0.5rem"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <Text as="strong">Bold</Text>
        </Button>
        <Button
          m="0.5rem"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <Text as="i">italic</Text>
        </Button>
        <Button
          m="0.5rem"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <Text as="s">strike</Text>
        </Button>
        <Button
          m="0.5rem"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "is-active" : ""}
        >
          <Text as="code">code</Text>
        </Button>
      </Flex>

      <Flex>
        <Button
          m="0.5rem"
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          clear nodes
        </Button>
        <Button
          m="0.5rem"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          paragraph
        </Button>
        <Button
          m="0.5rem"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          bullet list
        </Button>
        <Button
          m="0.5rem"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          ordered list
        </Button>
        <Button
          m="0.5rem"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          code block
        </Button>
        <Button
          m="0.5rem"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          horizontal rule
        </Button>
        <Button
          m="0.5rem"
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          hard break
        </Button>
      </Flex>
      <Flex>
        <Button
          m="0.5rem"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          undo
        </Button>
        <Button
          m="0.5rem"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          redo
        </Button>
      </Flex>
    </Stack>
  );
};

export default AddPostMenu;

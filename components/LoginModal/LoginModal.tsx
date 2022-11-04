import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import LoginInputsForm from "./LoginInputsForm";

const LoginModal = () => {
  const auth = getAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button py="0.75rem" onClick={onOpen} mr="5" px="2rem">
        Sign In
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Sign In</ModalHeader>
          <ModalBody>
            <Image
              style={{ cursor: "pointer" }}
              src="/google-sign-in.png"
              alt="sign-in"
              width={191}
              height={46}
              onClick={signInWithGoogle}
            />
            <ModalHeader pl="0">Or sign in with email</ModalHeader>
            <LoginInputsForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;

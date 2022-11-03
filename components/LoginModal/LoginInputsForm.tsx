import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type LoginInputs = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

const loginDefaultValues: LoginInputs = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
};

const LoginInputsForm: FC = () => {
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputs>({ defaultValues: loginDefaultValues });

  const auth = getAuth();

  const onSubmit: SubmitHandler<LoginInputs> = ({ email, password, name, confirmPassword }) => {
    console.log("ONSUBMIT");
    setError("");
    if (isSignUp && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (isSignUp) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          if (auth.currentUser) updateProfile(auth.currentUser, { displayName: name });
        })
        .catch((error) => setError(error.message));
    } else {
      signInWithEmailAndPassword(auth, email, password).catch((error) => setError(error.message));
    }
  };

  const renderNameInput = () => (
    <>
      <FormLabel htmlFor="name">name</FormLabel>
      <Input id="name" placeholder="Name" {...register("name")} />
      <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
    </>
  );

  const renderEmailAndPasswordInputs = () => (
    <>
      <FormLabel mt="1rem" htmlFor="email">
        Email
      </FormLabel>
      <Input
        id="email"
        placeholder="email"
        {...register("email", {
          required: "This is required",
          minLength: { value: 4, message: "Minimum length should be 4" },
        })}
      />
      <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>

      <FormLabel mt="1rem" htmlFor="password">
        Password
      </FormLabel>
      <Input
        id="password"
        type="password"
        placeholder="Password"
        {...register("password", {
          required: "This is required",
          minLength: { value: 4, message: "Minimum length should be 4" },
        })}
      />
      <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
    </>
  );

  const renderConfirmPassword = () => (
    <>
      <FormLabel mt="1rem" htmlFor="confirmPassword">
        Confirm Password
      </FormLabel>
      <Input id="confirmPassword" placeholder="Confirm Password" type="password" {...register("confirmPassword")} />
      <FormErrorMessage>{errors.confirmPassword && errors.confirmPassword.message}</FormErrorMessage>
    </>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert status="error" mb="1rem">
          <AlertIcon />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}
      <Tabs isFitted colorScheme="cyan" variant="enclosed" onChange={(index) => setIsSignUp(index === 0 ? false : true)}>
        <TabList mb="0">
          <Tab _selected={{ color: "white", bg: "blue.600" }} backgroundColor="gray.600" mr="0.25rem">
            Sign In
          </Tab>
          <Tab _selected={{ color: "white", bg: "blue.600" }} backgroundColor="gray.600" ml="0.25rem">
            Sign Up
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FormControl isInvalid={!!errors.email || !!errors.password}>{!isSignUp && renderEmailAndPasswordInputs()}</FormControl>
          </TabPanel>
          <TabPanel>
            {isSignUp && (
              <>
                {renderNameInput()}
                {renderEmailAndPasswordInputs()}
                {renderConfirmPassword()}
              </>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Button px="2rem" colorScheme="blue" backgroundColor="blue.600" color="gray.100" isLoading={isSubmitting} type="submit" my="1rem">
        Submit
      </Button>
    </form>
  );
};

export default LoginInputsForm;

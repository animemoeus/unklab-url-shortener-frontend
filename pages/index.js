import Footer from "../components/molecules/Footer";
import Head from "next/head";
import Navbar from "../components/molecules/Navbar";
import React, { useState } from "react";
import copy from "copy-to-clipboard";
import Contributors from "../components/organisms/Contributors";

import cookie from "cookie";

import { useToast } from "@chakra-ui/react";
import {
  chakra,
  Box,
  useColorModeValue,
  Flex,
  SimpleGrid,
  GridItem,
  VisuallyHidden,
  Input,
  Button,
  Stack,
  Icon,
} from "@chakra-ui/react";

const KuttyHero = (props) => {
  const toast = useToast();
  const user = props.user;

  console.log(user);

  const Feature = (props) => (
    <Flex alignItems="center" color={useColorModeValue(null, "white")}>
      <Icon
        boxSize={4}
        mr={1}
        color="green.600"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        ></path>
      </Icon>
      {props.children}
    </Flex>
  );

  const [isLoading, setIsloading] = useState(false);
  const [inputUrl, setInputUrl] = useState("");

  const handleSubmitButton = () => {
    setIsloading(true);

    if (inputUrl.length <= 0) {
      toast({
        description: "Tautan tidak boleh kosong!",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      setIsloading(false);
      return;
    }

    // API calling
    let formdata = new FormData();
    formdata.append("target_url", inputUrl);
    let requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(`${process.env.rootApiEndpoint}/api/shorten/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.slug) {
          // copy to clipboard
          copy(`${process.env.domain}/${result.slug}`);

          toast({
            description: "Tautan baru telah disalin ke clipboard.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        } else {
          toast({
            description: "Tautan yang diberikan tidak valid.",
            status: "warning",
            duration: 2000,
            isClosable: true,
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        toast({
          description: "Server sedang main tenis 🙃",
          status: "info",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      })
      .finally(() => {
        setIsloading(false);
        setInputUrl("");
      });
  };

  return (
    <>
      <Head>
        <title>🔥 Unklab URL Shortener</title>
      </Head>

      <Navbar user={user} />

      <Box px={4} py={32} mx="auto">
        <Box
          w={{ base: "full", md: 11 / 12, xl: 8 / 12 }}
          textAlign={{ base: "left", md: "center" }}
          mx="auto"
        >
          <chakra.h1
            mb={3}
            fontSize={{ base: "4xl", md: "5xl" }}
            fontWeight={{ base: "bold", md: "extrabold" }}
            color={useColorModeValue("gray.900", "gray.100")}
            lineHeight="shorter"
          >
            Penyingkat Tautan Universitas Klabat
          </chakra.h1>
          <chakra.p
            mb={6}
            fontSize={{ base: "lg", md: "xl" }}
            color="gray.500"
            lineHeight="base"
          >
            “The difference between ordinary and extraordinary is that little
            extra.”
          </chakra.p>
          <SimpleGrid
            as="form"
            w={{ base: "full", md: 7 / 12 }}
            columns={{ base: 1, lg: 6 }}
            spacing={3}
            pt={1}
            mx="auto"
            mb={8}
          >
            <GridItem as="label" colSpan={{ base: "auto", lg: 4 }}>
              <VisuallyHidden>Masukkan Tautan</VisuallyHidden>
              <Input
                mt={0}
                size="lg"
                type="text"
                placeholder="Masukkan link..."
                required
                onChange={(e) => setInputUrl(e.target.value)}
                value={inputUrl}
              />
            </GridItem>
            <Button
              as={GridItem}
              w="full"
              variant="solid"
              colSpan={{ base: "auto", lg: 2 }}
              size="lg"
              type="submit"
              colorScheme="purple"
              cursor="pointer"
              isLoading={isLoading}
              loadingText="Sabar..."
              onClick={handleSubmitButton}
              // onClick={() =>
              //   toast({
              //     title: "Account created.",
              //     description: "We've created your account for you.",
              //     status: "success",
              //     duration: 9000,
              //     isClosable: true,
              //   })
              // }
            >
              Singkatkan!
            </Button>
          </SimpleGrid>
          <Stack
            display="flex"
            direction={{ base: "column", md: "row" }}
            justifyContent={{ base: "start", md: "center" }}
            mb={3}
            spacing={{ base: 2, md: 8 }}
            fontSize="xs"
            color="gray.600"
          >
            <Feature>Project Final Fullstack FIK Unklab</Feature>
            <Feature>NextJs</Feature>
            <Feature>Django</Feature>
          </Stack>
        </Box>
      </Box>

      <Contributors />

      <Footer />
    </>
  );
};

export default KuttyHero;

export async function getServerSideProps(context) {
  const data = {};

  // get the cookies from web browser
  if ("cookie" in context.req.headers) {
    const parsedCookies = cookie.parse(context.req.headers.cookie);

    if ("token" in parsedCookies) {
      // get the jwt
      data["token"] = parsedCookies.token;
    } else {
      data["token"] = "";
    }
  }

  // check if jwt is valid
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${data["token"]}`);
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  const res = await fetch(
    `${process.env.rootApiEndpoint}/api/account/validate-jwt/`,
    requestOptions
  );
  const response = await res.json();

  if (response.success === true) {
    // redirect to home page if the user is authenticated
    return {
      props: { user: response.user },
    };
  } else {
    return { props: { user: null } };
  }
}

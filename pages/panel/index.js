import {
  Avatar,
  Box,
  Collapse,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
  useDisclosure,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useToast,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { FaBell, FaClipboardCheck, FaRss } from "react-icons/fa";
import { AiFillGift } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { FiMenu, FiSearch } from "react-icons/fi";
import { HiCode, HiCollection } from "react-icons/hi";
import { MdHome, MdKeyboardArrowRight } from "react-icons/md";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import cookie from "cookie"; // SSR
import Cookies from "js-cookie";

export default function Swibc(props) {
  const router = useRouter();
  const toast = useToast();
  const user = props.user;

  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiEndpoint, setApiEndpoint] = useState(
    `${process.env.rootApiEndpoint}/api/account/my-urls/?page=1`
  );
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${user.token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(apiEndpoint, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setLinks(result.data);

          setIsLoading(false);
        }
      })
      .catch((error) => {
        toast({
          description: "Server sedang main tenis 🙃",
          status: "info",
          duration: 15000,
          isClosable: true,
          position: "top-right",
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrevButton = () => {
    console.log("prev");
    updateLinks();
  };

  const handleNextButton = () => {
    console.log("next");
    updateLinks();
  };

  const handleLogoutButton = () => {
    const confirm = window.confirm("Yakin ingin keluar?");
    if (confirm === true) {
      Cookies.remove("token");
      router.push("/");
    }
  };

  const sidebar = useDisclosure();
  const integrations = useDisclosure();
  const color = useColorModeValue("gray.600", "gray.300");

  const NavItem = (props) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color={useColorModeValue("inherit", "gray.400")}
        _hover={{
          bg: useColorModeValue("gray.100", "gray.900"),
          color: useColorModeValue("gray.900", "gray.200"),
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="4"
            _groupHover={{
              color: color,
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props) => {
    return (
      <Box
        as="nav"
        pos="fixed"
        top="0"
        left="0"
        zIndex="sticky"
        h="full"
        pb="10"
        overflowX="hidden"
        overflowY="auto"
        bg={useColorModeValue("white", "gray.800")}
        borderColor={useColorModeValue("inherit", "gray.700")}
        borderRightWidth="1px"
        w="60"
        {...props}
      >
        <Flex px="4" py="5" align="center">
          <Text
            fontSize="2xl"
            ml="2"
            color={useColorModeValue("brand.500", "white")}
            fontWeight="semibold"
          >
            Unklab URL Shortener
          </Text>
        </Flex>
        <Flex
          direction="column"
          as="nav"
          fontSize="sm"
          color="gray.600"
          aria-label="Main Navigation"
        >
          <NavItem icon={MdHome}>Home</NavItem>
          {/* <NavItem icon={FaRss}>Articles</NavItem>
        <NavItem icon={HiCollection}>Collections</NavItem>
        <NavItem icon={FaClipboardCheck}>Checklists</NavItem>
        <NavItem icon={HiCode} onClick={integrations.onToggle}>
          Integrations
          <Icon
            as={MdKeyboardArrowRight}
            ml="auto"
            transform={integrations.isOpen && "rotate(90deg)"}
          />
        </NavItem>
        <Collapse in={integrations.isOpen}>
          <NavItem pl="12" py="2">
            Shopify
          </NavItem>
          <NavItem pl="12" py="2">
            Slack
          </NavItem>
          <NavItem pl="12" py="2">
            Zapier
          </NavItem>
        </Collapse>
        <NavItem icon={AiFillGift}>Changelog</NavItem> */}
          <NavItem icon={BsGearFill} onClick={handleLogoutButton}>
            Keluar
          </NavItem>
        </Flex>
      </Box>
    );
  };

  return (
    <>
      <Head>
        <title>Unklab URL Shortener | Akun</title>
      </Head>
      <Box
        as="section"
        bg={useColorModeValue("gray.50", "gray.700")}
        minH="100vh"
      >
        <SidebarContent display={{ base: "none", md: "unset" }} />
        <Drawer
          isOpen={sidebar.isOpen}
          onClose={sidebar.onClose}
          placement="left"
        >
          <DrawerOverlay />
          <DrawerContent>
            <SidebarContent w="full" borderRight="none" />
          </DrawerContent>
        </Drawer>
        <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
          <Flex
            as="header"
            align="center"
            justify="space-between"
            w="full"
            px="4"
            bg={useColorModeValue("white", "gray.800")}
            borderBottomWidth="1px"
            borderColor={useColorModeValue("inherit", "gray.700")}
            h="14"
          >
            <IconButton
              aria-label="Menu"
              display={{ base: "inline-flex", md: "none" }}
              onClick={sidebar.onOpen}
              icon={<FiMenu />}
              size="sm"
            />
            <InputGroup w="96" display={{ base: "none", md: "flex" }}>
              <InputLeftElement color="gray.500">
                <FiSearch />
              </InputLeftElement>
              <Input placeholder="Search for articles..." disabled />
            </InputGroup>

            <Flex align="center">
              <Icon color="gray.500" as={FaBell} cursor="pointer" />
              <Avatar
                ml="4"
                size="sm"
                name={`${user.first_name} ${user.last_name}`}
                // src="https://avatars.githubusercontent.com/u/30869823?v=4"
                cursor="pointer"
              />
            </Flex>
          </Flex>

          <Box as="main" p="4">
            {/* Add content here, remove div below  */}
            {/* <Box borderWidth="4px" borderStyle="dashed" rounded="md" h="96" /> */}
            {(isLoading == false && (
              <TableContainer>
                <Table variant="striped" colorScheme="purple">
                  <TableCaption></TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Link</Th>
                      <Th>Original</Th>
                      <Th isNumeric>Kunjungan</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {links.results.map((item, index) => {
                      return (
                        <Tr key={index}>
                          <Td>
                            {process.env.domain}/{item.slug}
                          </Td>
                          <Td>{item.target_url}</Td>
                          <Td isNumeric>{item.number_of_visits}</Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                  {/* <Tfoot>
                <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
                </Tr>
              </Tfoot> */}
                </Table>
              </TableContainer>
            )) || (
              <Box borderWidth="4px" borderStyle="dashed" rounded="md" h="96" />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

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
    return {
      props: { user: response.user },
    };
  } else {
    return {
      // redirect user to login page if token is invalid
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}

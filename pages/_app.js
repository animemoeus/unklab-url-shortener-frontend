import "animate.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "../styles/nprogress.css";

import Router from "next/router";
import NProgress from "nprogress";
// import { ChakraProvider } from "@chakra-ui/react";
import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";

const { toast, ToastContainer } = createStandaloneToast();

// nprogress loading
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
      <ToastContainer />
    </>
  );
}

export default MyApp;

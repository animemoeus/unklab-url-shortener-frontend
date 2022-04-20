import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Cookies from "js-cookie";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import LoadingButton from "@mui/lab/LoadingButton";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import NextLink from "next/link";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import cookie from "cookie";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useRouter } from "next/router";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://instagram.com/arter_tendean/">
        Unklab URL Shortener
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [accessToken, setAccessToken] = useState(Cookies.get("accessToken"));

  const router = useRouter();

  // handle login button
  const handleLoginButton = (event) => {
    setIsLoading(true);

    if (email.length === 0) {
      alert("Masukan alamat email!");
      setIsLoading(false);
      return;
    }

    if (password.length === 0) {
      alert("Masukan kata sandi!");
      setIsLoading(false);
      return;
    }

    // post data payload
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    // API calling
    fetch(
      `${process.env.rootApiEndpoint}/api/account/login/v2a/`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          Cookies.set("token", result.user.token, { expires: 7 });

          // redirect to /login again
          // why?
          // coz getServerSideProps already handle that case
          router.push("/login");
        } else {
          alert(result.message);
        }
      })
      .catch((error) => {
        alert("Sedang ada masalah. Coba lagi nanti.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Unklab URL Shortener | Masuk</title>
      </Head>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Masuk Unklab URL Shortener
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Login Button */}
            {isLoading === false && (
              <Button
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLoginButton}
              >
                Masuk
              </Button>
            )}
            {isLoading === true && (
              <LoadingButton
                loadingPosition="start"
                loading
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                startIcon={<SaveIcon />}
                disabled
              >
                Masuk
              </LoadingButton>
            )}
            {/* End Login Button */}
            <Grid container>
              <Grid item xs>
                <NextLink href="/reset-password" passHref>
                  <Link variant="body2">Lupa Kata Sandi?</Link>
                </NextLink>
              </Grid>
              <Grid item>
                <NextLink href="/register" passHref>
                  <Link variant="body2">Belum memiliki akun? Mendaftar</Link>
                </NextLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
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
    // redirect to home page
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return { props: { data } };
  }
}

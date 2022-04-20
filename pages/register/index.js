import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Cookies from "js-cookie";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Head from "next/head";
import LoadingButton from "@mui/lab/LoadingButton";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import NextLink from "next/link";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import cookie from "cookie";

import { Link as MUILink } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useState } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <MUILink color="inherit" href="https://instagram.com/arter_tendean">
        Unklab URL Shortener
      </MUILink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterButton = () => {
    setIsLoading(true);

    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("email", email);
    formdata.append("first_name", firstName);
    formdata.append("last_name", lastName);
    formdata.append("password", password);
    formdata.append("confirm_password", password);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    // API calling
    fetch(
      `${process.env.rootApiEndpoint}/api/account/register/v2/`,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.success === true) {
          // save the jwt to web browser cookie
          Cookies.set("token", response.user.token, { expires: 7 });

          // redirect to /login again
          // why?
          // coz getServerSideProps already handle that case
          router.push("/register");
        } else {
          alert(response.message);
        }
      })
      .catch((error) => {
        alert("Sedang ada masalah. Coba lagi nanti.");
      })
      .finally(() => {
        setIsLoading(false);
      });
    // end API calling
  };

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Unklab URL Shortener | Mendaftar</title>
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
            Mendaftar Unklab URL Shortener
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Nama Depan"
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Nama Belakang"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Nama pengguna"
                  name="username"
                  // autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Alamat Email"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Kata sandi"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            {/* Login Button */}
            {isLoading === false && (
              <Button
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleRegisterButton}
              >
                Mendaftar
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
                // onClick={handleSubmit}
                startIcon={<SaveIcon />}
                disabled
              >
                Mendaftar
              </LoadingButton>
            )}
            {/* End Login Button */}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NextLink href="/login" passHref>
                  <MUILink variant="body2">Sudah memiliki akun? Masuk</MUILink>
                </NextLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
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

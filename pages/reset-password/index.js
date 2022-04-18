import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";

import Cookies from "js-cookie";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SaveIcon from "@mui/icons-material/Save";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

export default function ResetPassword(props) {
  const router = useRouter();

  const { jwt } = props.data;

  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(Cookies.get("accessToken"));

  // force redirect to home page if the user is authenticated
  useEffect(() => {
    if (accessToken !== undefined) {
      router.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  // handle reset password button
  const handleResetPassword = (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (email.length === 0) {
      alert("Email tidak boleh kosong!");
      setIsLoading(false);
      return;
    }

    // API calling
    var formdata = new FormData();
    formdata.append("email", email);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `${process.env.rootApiEndpoint}/api/account/reset-password/`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result["success"] === true) {
          alert("Link reset password telah dikirimkan ke alamat email Anda.");
        } else {
          alert(result["message"]);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setIsLoading(false);
      });
    // end API calling
  };

  // handle change password button
  const handleChangePassword = () => {
    setIsLoading(true);

    if (password.length <= 0 || confirmPassword.length <= 0) {
      alert("Kata sandi tidak boleh kosong.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      alert("Kata sandi yang dimasukkan harus sama.");
      setIsLoading(false);
      return;
    }

    // API calling
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt}`);

    var formdata = new FormData();
    formdata.append("password", password);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `${process.env.rootApiEndpoint}/api/account/change-password/`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.success == true) {
          alert("Kata sandi berhasil diganti.");
          router.push("/login");
        }
      })
      .catch((error) => {
        alert("Ups, ada masalah. Coba lagi.");
      })
      .finally(() => {
        setIsLoading(false);
      });
    // end API calling
  };

  if (jwt === undefined) {
    return (
      <ThemeProvider theme={theme}>
        <Head>
          <title>{process.env.NEXT_PUBLIC_siteName} | Reset Kata Sandi</title>
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
              Ganti Kata Sandi
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
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
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                disabled
              />
              {/* Login Button */}
              {isLoading === false && (
                <Button
                  type="submit"
                  color="primary"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleResetPassword}
                >
                  Reset
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
                  onClick={handleResetPassword}
                  startIcon={<SaveIcon />}
                  disabled
                >
                  Reset
                </LoadingButton>
              )}
              {/* End Login Button */}
              <Grid container>
                <Grid item xs>
                  <NextLink href="/login" passHref>
                    <Link variant="body2">Masuk</Link>
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
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Head>
          <title>{process.env.NEXT_PUBLIC_siteName} | Reset Kata Sandi</title>
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
              Ganti Kata Sandi
            </Typography>
            <Box noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Kata Sandi Baru"
                name="password"
                autoComplete="password"
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                // required
                fullWidth
                label="Konfirmasi Kata Sandi Baru"
                name="password"
                autoComplete="password"
                autoFocus
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {/* Login Button */}
              {isLoading === false && (
                <Button
                  type="submit"
                  color="primary"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleChangePassword}
                >
                  Simpan
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
                  Simpan
                </LoadingButton>
              )}
              {/* End Login Button */}
              <Grid container>
                <Grid item xs>
                  <NextLink href="/login" passHref>
                    <Link variant="body2">Masuk</Link>
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
}

export async function getServerSideProps(context) {
  // get the jwt
  const { akmj } = context.query;

  if (akmj !== undefined) {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${akmj}`);
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    const res = await fetch(
      `${process.env.rootApiEndpoint}/api/account/validate-jwt/`,
      requestOptions
    );

    if (res.status === 200) {
      const data = await res.json();
      data["jwt"] = akmj;

      return {
        props: { data },
      };
    } else {
      // redirect to /reset-password page (input email)
      return {
        redirect: {
          destination: "/reset-password",
          permanent: false,
        },
      };
    }
  }

  const data = {};

  return {
    props: { data },
  };
}

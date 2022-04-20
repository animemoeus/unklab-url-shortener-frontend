import Link from "next/link";
import { useState } from "react";

import Cookies from "js-cookie";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Offcanvas from "react-bootstrap/Offcanvas";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import Form from "react-bootstrap/Form";
// import FormControl from "react-bootstrap/FormControl";

export default function NavbarX() {
  const [name, setName] = useState(Cookies.get("name"));
  const [email, setEmail] = useState(Cookies.get("email"));
  const [accessToken, setAccessToken] = useState(Cookies.get("accessToken"));

  const handleLogoutButton = () => {
    const confirmLogout = confirm("Kamu yakin ingin keluar?");

    if (confirmLogout) {
      // remove the cookie
      Cookies.remove("name");
      Cookies.remove("email");
      Cookies.remove("accessToken");

      // update the state
      setName(undefined);
      setEmail(undefined);
      setAccessToken(undefined);

      alert("Berhasil.");
    }
  };

  return (
    <Navbar bg="bg-white" expand={false}>
      <Container fluid>
        <Navbar.Brand as="span">
          {" "}
          <Link href="/">
            <a className="fw-bolder text-decoration-none text-dark">
              Unklab URL Shortener
            </a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {accessToken === undefined && (
                <>
                  <Nav.Link as="span">
                    <Link href="/login">
                      <a className="text-decoration-none text-dark">Masuk</a>
                    </Link>
                  </Nav.Link>
                  <Nav.Link as="span">
                    <Link href="/register">
                      <a className="text-decoration-none text-dark">
                        Mendaftar
                      </a>
                    </Link>
                  </Nav.Link>
                </>
              )}
              {accessToken !== undefined && (
                <>
                  <Nav.Link as="span">
                    <Link href="/profile">
                      <a className="text-decoration-none text-dark">{name}</a>
                    </Link>
                  </Nav.Link>
                  <Nav.Link as="span">
                    {/* <Link href="/profile"> */}
                    <a
                      className="text-decoration-none text-dark"
                      onClick={handleLogoutButton}
                    >
                      <Button variant="outline-secondary">Logout</Button>
                    </a>
                    {/* </Link> */}
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

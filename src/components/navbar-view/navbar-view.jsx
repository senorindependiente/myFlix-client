import React from "react";
import "./navbar-view.scss";
import { Navbar, Nav, Button } from "react-bootstrap";

function NavbarView({ user }) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar className="navbar" variant="dark" expand="md">
      <Navbar.Brand href="/">myFlix Movie Database</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>

          {isAuth() && <Nav.Link href={`/users/${user}`}>User</Nav.Link>}
          {isAuth() && (
            <Button
              variant="link"
              onClick={() => {
                this.onLoggedOut();
              }}
            >
              Sign-out
            </Button>
          )}

          {!isAuth() && <Nav.Link href="/">Sign-in</Nav.Link>}
          {!isAuth() && <Nav.Link href="/register">Sign-up</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarView;

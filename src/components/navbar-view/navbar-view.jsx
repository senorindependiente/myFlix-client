import React from "react";
import "./navbar-view.scss";
import { Navbar, Nav, Button } from "react-bootstrap";

function NavbarView({ user }) {

 const  onLoggedOut = () => {
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
    <Navbar className="navbar" expand="md">
      <Navbar.Brand className="brand" href="/"> < span className="text-gradient">
       myFlix </span></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="collapse" id="basic-navbar-nav">
        <Nav className=" nav ms-auto">
          <Nav.Link className="nav-link movies" href="/">Movies</Nav.Link>

          {isAuth() && <Nav.Link className="nav-link users" href={`/users/${user}`}>User</Nav.Link>}
          {isAuth() && (
            <button 
            className="nav-link signout"
              variant="link"
              onClick={() => {
                onLoggedOut();
              }}
            >
              Sign-out
            </button>
          )}

          {!isAuth() && <Nav.Link className="nav-link signin" href="/">  Sign-In</Nav.Link>}
          {!isAuth() && <Nav.Link  className="signup" href="/register"> <button>Register</button> </Nav.Link>}
        </Nav >
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarView;

import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

export function NavbarView({ user }) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };

  const isAuth = () => {
    let accessToken = localStorage.getItem('token');
    if (typeof window == 'undefined') {
      return false;
    }
    if (accessToken) {
      return accessToken;
    } else {
      return false;
    }
  };
  console.log(user);
  return (
    <Navbar
      className="main-nav"
      sticky="top"
      bg="dark"
      expand="lg"
      variant="dark"
    >
      <Container>
        <Navbar.Brand className="navbar-logo" href="/">
          myFlixCinema
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && <Nav.Link to={`/users/${user}`}>{user}</Nav.Link>},
            {isAuth() && (
              <Button
                variant="link"
                onClick={() => {
                  onLoggedOut();
                }}
              >
                Logout
              </Button>
            )}
            {!isAuth() && <Nav.Link href="/">Sign-In</Nav.Link>}
            {!isAuth() && <Nav.Link href="/register">Sign-Up</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

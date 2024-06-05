/* import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {" "}
      <Navbar bg={token ? "primary" : "dark"} data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            {token ? "Logged In" : "Not Logged In"}
          </Navbar.Brand>
          <Nav className="me-auto">
            {token ? (
              <>
                <Nav.Link as={Link} to="/dashboard">
                  Dashboard
                </Nav.Link>
                <Nav.Link onClick={handleLogOut}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/Login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/Signup">
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
 */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavScrollExample() {
  return (
    <Navbar expand="lg" className="main-navbar">
      {" "}
      {/* bg-body-tertiary  */}
      <Container fluid>
        <Navbar.Brand href="#">Mov3Thek</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          {/* search bar */}
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const Header = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Navbar
      // bg={token ? "primary" : "dark"}
      // data-bs-theme="dark"
      style={{ height: "40px" }}
      className={token ? "sub-navbar-loggedin" : "sub-navbar-loggedout"}
    >
      <Container>
        <Navbar.Brand href="#home">
          {token ? "Logged In" : "Not Logged In"}
        </Navbar.Brand>
        <Nav className="me-auto">
          {token ? (
            <>
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
              <Nav.Link onClick={handleLogOut}>Logout</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/Login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/Signup">
                Signup
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

const App = () => {
  return (
    <>
      <NavScrollExample />
      <Header />
    </>
  );
};

export default App;

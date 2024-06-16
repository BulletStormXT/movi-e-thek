import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import { TbShoppingBag } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";

function NavScrollExample() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();

  // card styling must be added
  const debouncedFetchMovies = debounce(async (query) => {
    if (query) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/products?search=${query}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSearchResult(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    } else {
      setSearchResult([]);
    }
  }, 500);

  const handleSearch = () => {
    debouncedFetchMovies(search);
  };

  // Clear search results and navigate to product details
  const handleSearchResultClick = (productId) => {
    setSearchResult([]);
    setSearch("");
    navigate(`/product/${productId}`);
  };

  return (
    <Navbar expand="lg" className="main-navbar">
      {/* bg-body-tertiary  */}
      <Container fluid>
        <Navbar.Brand className="ari">
          <Nav.Link as={Link} to="/">
            Mov•Ǝ•Thek
          </Nav.Link>
        </Navbar.Brand>{" "}
        {/* <Navbar.Brand href="#home">Mov•Ǝ•Thek</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <div className="main-navbar-div">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {/* ! home button in header doesn't work // only after actualization */}
              {/* {localStorage.getItem("role") === "user" ? (
                <Nav.Link as={Link} to="/user">
                  Home
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
              )} */}

              {/* <Nav.Link href="/">Home</Nav.Link> */}
              {/* <Nav.Link href="#action2">Link</Nav.Link>
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
              </Nav.Link> */}
            </Nav>
          </div>
          {/* search bar */}
          <div className="main-navbar-div searchbar">
            <Form className="searchbar-form">
              {/* className="d-flex" */}
              <Form.Control
                type="search"
                placeholder="Enter a keyword and press 🦆 to search..."
                className="me-2 searchbar-input"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant="searchbar-button" onClick={handleSearch}>
                Search
              </Button>
            </Form>
            {searchResult.length > 0 && (
              <div className="search-results">
                {searchResult.map((product) => (
                  <div
                    key={product._id}
                    className="search-result-item"
                    onClick={() => handleSearchResultClick(product._id)}
                  >
                    <Link to={`/product/${product._id}`}>
                      {product.name} - €{product.price.toFixed(2)}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* profile and shopping bag */}
          {/* <div className="me-auto">
            <Nav.Link as={Link} to="/user/profile">
              Profile
            </Nav.Link>
          </div> */}
          <div className="main-navbar-div text-end shopping-bag">
            <Nav.Link as={Link} to="/user/profile">
              <CgProfile />
            </Nav.Link>
            &nbsp;
            <Nav.Link as={Link} to="/user/cart">
              <TbShoppingBag />
            </Nav.Link>
          </div>
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
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("cart");
    localStorage.removeItem("userId");
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
        <Navbar.Brand className="sidar" href="#home">
          {token ? `Hallo ${localStorage.getItem("name")}!` : "Please Login!"}
        </Navbar.Brand>
        <Nav className="ml-auto">
          {token ? (
            <>
              {localStorage.getItem("role") === "admin" ? (
                <Nav.Link as={Link} to="/admin/dashboard">
                  Dashboard
                </Nav.Link>
              ) : localStorage.getItem("role") === "user" ? (
                <Nav.Link as={Link} to="/user/dashboard">
                  Dashboard
                </Nav.Link>
              ) : (
                console.log("Invalid User")
              )}

              {/* <Nav.Link as={Link} to="/admin/dashboard">
                Dashboard
              </Nav.Link> */}
              <Nav.Link as={Link} to="/user/profile">
                Profile
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

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
import { TbShoppingBag } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";

function NavScrollExample() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();

  const debouncedFetchProducts = debounce(async (query) => {
    if (query.trim() !== "") {
      try {
        const response = await fetch(
          `http://localhost:3001/api/products/search?search=${encodeURIComponent(
            query
          )}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSearchResult(data);

        console.log("Search results:", data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    } else {
      setSearchResult([]); // Clear search results if query is empty
    }
  }, 500);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearch(query);

    // Immediately clear search results if input is empty or contains only whitespace
    if (query.trim() === "") {
      setSearchResult([]);
    } else {
      debouncedFetchProducts(query);
    }
  };

  const handleSearchResultClick = (productId) => {
    setSearchResult([]);
    setSearch("");
    navigate(`/product/${productId}`);
  };

  const handleSearch = () => {
    debouncedFetchProducts(search);
  };

  return (
    <Navbar expand="lg" className="main-navbar">
      <Container fluid>
        <Navbar.Brand className="ari">
          <Nav.Link as={Link} to="/">
            <img
              src="./assets/logos/mvt_nbg.svg"
              alt=""
              style={{ boxShadow: "none" }}
              height="50px"
            />{" "}
            &nbsp;
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <div className="main-navbar-div">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {/* Navigation items */}
            </Nav>
          </div>
          <div className="main-navbar-div searchbar">
            <Form className="searchbar-form">
              <Form.Control
                type="search"
                placeholder="Type a keyword and press Enter to search..."
                className="me-2 searchbar-input"
                aria-label="Search"
                value={search}
                onChange={handleInputChange}
              />
              <Button variant="searchbar-button" onClick={handleSearch}>
                Search
              </Button>
            </Form>{" "}
            {searchResult.length > 0 && (
              <div className="search-results">
                {searchResult.map((product) => (
                  <div
                    key={product._id}
                    className="search-result-item"
                    onClick={() => handleSearchResultClick(product._id)}
                  >
                    <Link to={`/product/${product._id}`}>
                      <div className="d-flex align-items-center">
                        <img
                          src={product.image} // Assuming product.image contains the image URL
                          alt={product.name}
                          style={{
                            width: "50px",
                            height: "auto",
                            marginRight: "10px",
                          }}
                        />
                        <div>
                          <div>{product.name}</div>
                          <div>€{product.price.toFixed(2)}</div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
            {/* Conditional rendering for empty search results */}
            {searchResult.length === 0 && search.trim() !== "" && (
              <div className="search-results">No products found.</div>
            )}
          </div>
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
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <Navbar
      style={{ height: "40px" }}
      className={token ? "sub-navbar-loggedin" : "sub-navbar-loggedout"}
    >
      <Container>
        <Navbar.Brand href="#home">
          {token ? `Hello ${localStorage.getItem("name")}!` : "Please Login!"}
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

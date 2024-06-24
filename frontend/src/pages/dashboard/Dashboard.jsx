import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import { FaRegTrashAlt } from "react-icons/fa";

function Dashboard() {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Function to fetch list of products
  // Funktion in useCallback einwickeln
  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      setProducts(result);
    } catch (error) {
      console.log(error.message);
    }
  }, [token]); // Abhängigkeiten für useCallback

  // Kontrolle ob es sich um einen Admin handelt
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      console.error(
        "Access denied. Users are not allowed to access the admin dashboard."
      );
      navigate("/user/dashboard"); // navigate to a different page, e.g., home page
    }
  }, [navigate]);

  // Fetch list of users on component mount or token change
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setUsers(result);
      } catch (error) {
        console.log(error.message);
      }
    };

    if (token) {
      fetchUsers();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  // Fetch list of products on component mount
  useEffect(() => {
    if (token) {
      fetchProducts();
    }
  }, [token, fetchProducts]);

  // Function to handle product deletion
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Successful deletion, update products list
        fetchProducts();
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // fetchProducts is wrong, we need to use fetchUsers
        fetchProducts();
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>Admin Dashboard</h1>
      </div>
      <Container>
        <Table striped bordered hover size="sm" variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {/* establish a navigate, because the user is only deleted with a refresh */}
                  <FaRegTrashAlt
                    onClick={() => handleDeleteUser(user._id)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <div>
        <h1 style={{ textAlign: "center" }}>Products</h1>
      </div>
      <Container>
        <Table striped bordered hover size="sm" variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Image</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </td>
                <td>{product.category}</td>
                <td>
                  <FaRegTrashAlt
                    onClick={() => handleDeleteProduct(product._id)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Dashboard;

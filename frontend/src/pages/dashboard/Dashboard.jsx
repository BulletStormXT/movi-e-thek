import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Table, Form } from "react-bootstrap";
import { FaRegTrashAlt, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import AddProductForm from "./AddProductForm"; // Import the new component

function Dashboard() {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingProductData, setEditingProductData] = useState({});
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

  // Function to fetch list of users
  const fetchUsers = useCallback(async () => {
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
    if (token) {
      fetchUsers();
    } else {
      navigate("/login");
    }
  }, [token, navigate, fetchUsers]);

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

  // Function to handle user deletion
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Successful deletion, update users list
        fetchUsers();
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Function to handle editing of a product
  const handleEditProduct = (product) => {
    setEditingProductId(product._id);
    setEditingProductData(product);
  };

  // Function to handle input changes for the editing product
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProductData({ ...editingProductData, [name]: value });
  };

  // Function to handle saving the edited product
  const handleSaveProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/products/${editingProductId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editingProductData),
        }
      );

      if (response.ok) {
        // Successful update, update products list
        fetchProducts();
        setEditingProductId(null);
      } else {
        throw new Error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Function to handle canceling the editing
  const handleCancelEdit = () => {
    setEditingProductId(null);
    setEditingProductData({});
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
                <td>
                  {editingProductId === product._id ? (
                    <Form.Control
                      type="text"
                      name="name"
                      value={editingProductData.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td>
                  {editingProductId === product._id ? (
                    <Form.Control
                      type="number"
                      name="price"
                      value={editingProductData.price}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.price
                  )}
                </td>
                <td>
                  {editingProductId === product._id ? (
                    <Form.Control
                      type="text"
                      name="description"
                      value={editingProductData.description}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.description
                  )}
                </td>
                <td>
                  {editingProductId === product._id ? (
                    <Form.Control
                      type="text"
                      name="image"
                      value={editingProductData.image}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  )}
                </td>
                <td>
                  {editingProductId === product._id ? (
                    <Form.Control
                      type="text"
                      name="category"
                      value={editingProductData.category}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.category
                  )}
                </td>
                <td>
                  {editingProductId === product._id ? (
                    <>
                      <FaSave
                        onClick={handleSaveProduct}
                        style={{ cursor: "pointer", marginRight: "10px" }}
                      />
                      <FaTimes
                        onClick={handleCancelEdit}
                        style={{ cursor: "pointer" }}
                      />
                    </>
                  ) : (
                    <>
                      <FaEdit
                        onClick={() => handleEditProduct(product)}
                        style={{ cursor: "pointer", marginRight: "10px" }}
                      />
                      <FaRegTrashAlt
                        onClick={() => handleDeleteProduct(product._id)}
                        style={{ cursor: "pointer" }}
                      />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <AddProductForm onProductAdded={fetchProducts} />
      </Container>
    </>
  );
}

export default Dashboard;

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import { FaRegTrashAlt, FaPen } from "react-icons/fa";
import { IoTrashSharp } from "react-icons/io5";
import { BsFloppyFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";

function Dashboard() {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const navigate = useNavigate();

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
  }, [token]);

  //? Kontrolle ob es sich um einen Admin handelt
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      console.error(
        "Access denied. Users are not allowed to access the admin dashboard."
      );
      navigate("/user/dashboard");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/users", {
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
      fetchProducts();
    } else {
      navigate("/login");
    }
  }, [token, navigate, fetchProducts]);

  const handleDelete = async (productId) => {
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
        fetchProducts();
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const startEditing = (product) => {
    setEditingProduct(product);
    setEditedProduct({ ...product });
  };

  const saveChanges = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/products/${editedProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedProduct),
        }
      );

      if (response.ok) {
        fetchProducts();
        setEditingProduct(null);
      } else {
        throw new Error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const cancelEditing = () => {
    setEditingProduct(null);
    setEditedProduct({});
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/user/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updatedUsers = users.filter((user) => user._id !== userId);
        setUsers(updatedUsers);
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
                <td style={{ display: "flex", justifyContent: "center" }}>
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
                  {editingProduct === product ? (
                    <input
                      type="text"
                      value={editedProduct.name}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td>
                  {editingProduct === product ? (
                    <input
                      type="text"
                      value={editedProduct.price}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          price: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.price
                  )}
                </td>
                <td>
                  {editingProduct === product ? (
                    <input
                      type="text"
                      value={editedProduct.description}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          description: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.description
                  )}
                </td>
                <td>
                  {editingProduct === product ? (
                    <input
                      type="text"
                      value={editedProduct.image}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          image: e.target.value,
                        })
                      }
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
                  {editingProduct === product ? (
                    <input
                      type="text"
                      value={editedProduct.category}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          category: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.category
                  )}
                </td>
                <td>
                  {editingProduct === product ? (
                    <>
                      <BsFloppyFill
                        onClick={saveChanges}
                        style={{ cursor: "pointer" }}
                      />
                      <MdCancel
                        onClick={cancelEditing}
                        style={{ cursor: "pointer" }}
                      />
                    </>
                  ) : (
                    <>
                      <FaPen
                        onClick={() => startEditing(product)}
                        style={{ cursor: "pointer" }}
                      />
                      <IoTrashSharp
                        onClick={() => handleDelete(product._id)}
                        style={{ cursor: "pointer" }}
                      />
                    </>
                  )}
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

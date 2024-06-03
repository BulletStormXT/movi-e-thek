import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import { FaRegTrashAlt } from "react-icons/fa";
function Dashboard() {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await fetch(`http://localhost:3001/api/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/user", {
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
              <th></th>
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
                  <FaRegTrashAlt
                    onClick={() => handleDelete(user._id)}
                    style={{ cursor: "pointer" }}
                  ></FaRegTrashAlt>
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
              <th>description</th>
              <th>category</th>
            </tr>
            {/* add product content here */}
          </thead>
        </Table>
      </Container>
    </>
  );
}
export default Dashboard;

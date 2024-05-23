import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
function Dashboard() {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
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
        <h1 style={{ textAlign: "center" }}>Dashboard</h1>
      </div>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
export default Dashboard;

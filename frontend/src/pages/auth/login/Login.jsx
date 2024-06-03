import React, { useState } from "react";
import { Container, Form, Button, CardBody } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);

      localStorage.setItem("token", data.token);

      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setFormData({
        email: "",
        password: "",
      });
    }
    console.log(formData);
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  //? später vielleicht noch Farben ändern! @BulletStormXT

  return (
    <React.Fragment>
      <Card
        style={{
          width: "24rem",
          height: "30rem",
          margin: "40px auto",
          backgroundColor: "skyblue",
          color: "#0d1b2a",
          borderRadius: "20px",
        }}
        className="cardShadow"
      >
        <Card.Body variant="dark">
          <div className="text-center">
            <h1>Login</h1>
          </div>
          <Container>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
            <div className="text-center mt-3">
              <a href="#" onClick={handleForgotPassword}>
                Forgot Password?
              </a>
            </div>
          </Container>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default Login;

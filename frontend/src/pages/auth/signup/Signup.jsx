import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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
      const response = await fetch("http://localhost:3001/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
    console.log(formData);
  };

  return (
    <React.Fragment>
      <div></div>
      <Card
        style={{
          width: "24rem",
          height: "30rem",
          margin: "100px auto",
          backgroundColor: "skyblue",
          color: "#0d1b2a",
          borderRadius: "20px",
        }}
        className="cardLogin cardShadow"
      >
        <Card.Body>
          <div className="text-center">
            <h1>SignUp</h1>
          </div>
          <Container>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <Form.Text className="text-muted" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {/* <Form.Text className="text-mutend">
                  We'll never share your email with anyone else.
                </Form.Text> */}
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
              <Button variant="primary" type="submit" className="btnLogin">
                Submit
              </Button>
            </Form>
            <div className="gotoLogin text-center mt-3">
              Already have an account? Go to <a href="/login">Login</a>
            </div>
          </Container>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default Signup;

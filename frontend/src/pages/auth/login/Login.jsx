import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";

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

      // Check user role from the response (maybe PopUp)
      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else if (data.role === "user") {
        navigate("/user/dashboard");
      } else {
        console.log("Invalid User");
      }
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch("http://localhost:3001/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //     const data = await response.json();
  //     console.log(data);

  //     localStorage.setItem("token", data.token);
  //     localStorage.setItem("role", data.role);

  //     const admin = localStorage.getItem('role') === 'admin';
  //     if(admin) {
  //       navigate("/admin/dashboard");
  //     } else {
  //       navigate("/user/dashboard");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setFormData({
  //       email: "",
  //       password: "",
  //     });
  //   }
  // };

  // alternative handlesubmit

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <React.Fragment>
      <div></div>
      <Card
        style={{
          width: "24rem",
          height: "30rem",
          margin: "100px auto",
          color: "#0d1b2a",
          borderRadius: "20px",
        }}
        className="cardLogin cardShadow"
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
                {/* <div className="text-mutend text-center">
                  We'll never share your email with anyone else.
                </div> */}
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
                <div className="mt-0">
                  <a href="#" onClick={handleForgotPassword}>
                    Forgot your Password? Click here!
                  </a>
                </div>
              </Form.Group>
              <Button className="btnLogin" variant="primary" type="submit">
                Login
              </Button>
            </Form>

            <div className="gotoSignup text-center mt-5">
              Don't have an account? Go to <a href="/signup">Signup</a>
            </div>
          </Container>
          {/* <div className="text-center text-danger mt-3 "> WIP </div> */}
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default Login;

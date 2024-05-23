import { useState, useEffect, useContext } from "react";
import { URL } from "../main";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../backup/context/LoginContext";
import "../assets/styling.css";

const defaultError = String.fromCharCode(160);

const Login = () => {
  const [error, setError] = useState(defaultError);
  const navigate = useNavigate();
  const { setLoginUser } = useContext(LoginContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      console.log(formData);
      const url = `${URL}users/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        throw new Error("Couldn't log in");
      }

      console.log(data);
      if (data.user) {
        setError(data.message);
        localStorage.setItem("userid", data.user._id);
      }

      const userid = localStorage.getItem("userid");
      if (userid) {
        setLoginUser(userid);
      }

      // console.log(userid);
      setTimeout(() => {
        setError(defaultError);
        navigate("/profile");
      }, 3000);
      e.target.reset();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (error !== defaultError) {
      setTimeout(() => {
        setError(defaultError);
      }, 2000);
    }
  }, [error]);

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <p>{error}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-3"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter your Password"
              name="password"
              className="form-control rounded-3"
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-3">
            Login
          </button>
        </form>
        <p>Don't have an Account?</p>
        <Link
          to="/register"
          className="btn btn-default border w-100 bg-light rounded-3 text-decoration-none"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;

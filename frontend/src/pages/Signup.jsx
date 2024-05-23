import { useState, useEffect } from "react";
import { URL } from "../main";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styling.css";

const defaultError = String.fromCharCode(160);

const Signup = () => {
  const [error, setError] = useState(defaultError);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    console.log("Form Data Entries:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const url = `${URL}users/register`;
      const response = await fetch(url, {
        method: "POST",

        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        throw new Error("Couldn't register");
      }

      setError(data.message);
      setTimeout(() => {
        setError(defaultError);
        navigate("/login");
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
        <h2>Register</h2>
        <p>{error}</p>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="username">
              <strong>Username</strong>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              autoComplete="off"
              name="username"
              className="form-control rounded-3"
            />
          </div>
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
          <div className="mb-3">
            <label htmlFor="firstName">
              <strong>Firstname</strong>
            </label>
            <input
              type="text"
              placeholder="Enter your Firstname"
              name="firstname"
              className="form-control rounded-3"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName">
              <strong>Lastname</strong>
            </label>
            <input
              type="text"
              placeholder="Enter your Lastname"
              name="lastname"
              className="form-control rounded-3"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="profilePicture">
              <strong>Profilepicture</strong>
            </label>
            <input
              type="file"
              placeholder="Place your Profilepicture"
              name="profilePicture"
              className="form-control rounded-3"
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-3">
            Register
          </button>
        </form>
        <p>Already have an Account?</p>
        <Link
          to="/login"
          className="btn btn-default border w-100 bg-light rounded-3 text-decoration-none"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;

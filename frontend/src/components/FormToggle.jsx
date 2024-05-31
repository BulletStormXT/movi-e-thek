import React, { useState } from "react";
import "./FormToggle.css";

const FormToggle = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="form-container">
      <div className="tabs">
        <button
          className={`tab ${isLogin ? "active" : ""}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`tab ${!isLogin ? "active" : ""}`}
          onClick={() => setIsLogin(false)}
        >
          Signup
        </button>
      </div>

      {isLogin ? (
        <form className="form active">
          <input type="email" placeholder="example@here.com" required />
          <input type="password" placeholder="Password" required />
          <a href="#">Forgot password?</a>
          <button type="submit">Login</button>
          <p>
            Don't have an Account?{" "}
            <a href="#" onClick={toggleForm}>
              Go to Signup
            </a>
          </p>
        </form>
      ) : (
        <form className="form active">
          <input type="email" placeholder="example@here.com" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm password" required />
          <button type="submit">Signup</button>
          <p>
            Already have an Account?{" "}
            <a href="#" onClick={toggleForm}>
              Go to Login
            </a>
          </p>
        </form>
      )}
    </div>
  );
};

export default FormToggle;

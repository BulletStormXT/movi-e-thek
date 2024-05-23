import React from "react";

const ErrorPage = () => {
  const handleRedirect = () => {
    window.location.href = "/";
  };
  return (
    <div>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p onClick={handleRedirect}>Back Home</p>
    </div>
  );
};

export default ErrorPage;

import { useContext } from "react";
/* import "bootstrap/dist/css/bootstrap.min.css"; */
import Signup from "./pages/Signup.jsx";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { LoginContext } from "./context/LoginContext";
import ProfilePage from "./pages/ProfilePage.jsx";
import ErrorPage from "./ErrorPage.jsx";

function App() {
  const { loginUser } = useContext(LoginContext);

  return (
    <Routes>
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile/:userid" element={<ProfilePage />} />
      {loginUser ? (
        <Route path="/profile" element={<ProfilePage />} />
      ) : (
        <Route path="/profile" element={<Login />} />
      )}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;

import "./App.css";
import Header from "./pages/header/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Userdashboard from "./pages/dashboard/Userdashboard";
import Home from "./pages/Home";
import HomeUser from "./pages/HomeUser";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<HomeUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/user/dashboard" element={<Userdashboard />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
      </Routes>
    </div>
  );
}

export default App;

import "./App.css";
import Header from "./pages/header/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import FormToggle from "./components/FormToggle";

function App() {
  return (
    <div>
      <Header />
      <select>
        <option value="select">Select</option>
      </select>{" "}
      <FormToggle />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;

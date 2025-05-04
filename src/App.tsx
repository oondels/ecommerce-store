import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/layout/Admin";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AdminProducts from "./pages/AdminProducts";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Staff from "./pages/Staff";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="staff" element={<Staff />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

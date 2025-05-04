import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/layout/Admin";
import BottomNav from "./components/layout/BottomNav";
import Footer from "./components/layout/Footer";
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
import { CartProvider } from "./context/CartContext";

// Layout wrapper for including BottomNav and Footer
const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <div className="flex-grow">
      {children}
    </div>
    <Footer />
    <BottomNav />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
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
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/products" element={<MainLayout><Products /></MainLayout>} />
            <Route path="/dash" element={<MainLayout><Dashboard /></MainLayout>} />
            <Route path="/customers" element={<MainLayout><Customers /></MainLayout>} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

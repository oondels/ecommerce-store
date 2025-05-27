import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import AdminLayout from "./components/layout/Admin";
import BottomNav from "./components/layout/BottomNav";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import FloatingMenu from "./components/layout/FloatingMenu";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Crochet from "./pages/Crochet";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

import { AdminRoute } from "./components/AdminRoute";
import { PrivateRoute } from "./components/PrivateRoute";
import { GuestOnlyRoute } from "./components/GuestOnlyRoute";
import Unauthorized from "./components/Unauthorized";
import { AuthProvider } from "./context/AuthContext";
import AdminProducts from "./pages/AdminProducts";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Staff from "./pages/Staff";
import Settings from "./pages/Settings";

import { NotificationsProvider } from "./context/NotificationsContext";
import Notifications from "./components/ui/Notifications";
import NotificationDemo from "./pages/NotificationDemo";

const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col pt-16 md:pt-20 bg-gray-50 dark:bg-gray-800">
    <Header />
    <div className="flex-grow">{children}</div>
    <Footer />
    <BottomNav />
    <FloatingMenu className="hidden md:block bottom-6 right-6" />
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <NotificationsProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Router>
                <Notifications />
                <Routes>
                  <Route
                    path="/notification-demo"
                    element={
                      <MainLayout>
                        <NotificationDemo />
                      </MainLayout>
                    }
                  />
                  <Route path="/login" element={<GuestOnlyRoute><Login /></GuestOnlyRoute>} />
                  <Route path="/register" element={<GuestOnlyRoute><Register /></GuestOnlyRoute>} />
                  <Route path="/admin" element={
                    <AdminRoute requiredRole="admin">
                      <AdminLayout />
                    </AdminRoute>
                  }>
                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="customers" element={<Customers />} />
                    <Route path="staff" element={<Staff />} />
                    <Route path="settings" element={<Settings />} />
                  </Route>
                  <Route
                    path="/"
                    element={
                      <MainLayout>
                        <Home />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/products"
                    element={
                      <MainLayout>
                        <Products />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/product/:id"
                    element={
                      <MainLayout>
                        <ProductDetail />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <MainLayout>
                        <Cart />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <MainLayout>
                        <Checkout />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/payment"
                    element={
                      <MainLayout>
                        <Payment />
                      </MainLayout>
                    }
                  />
                  {/* protect this route */}
                  <Route
                    path="/profile"
                    element={
                      <MainLayout>
                        <PrivateRoute>
                          <Profile />
                        </PrivateRoute>
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/about"
                    element={
                      <MainLayout>
                        <About />
                      </MainLayout>
                    }
                  />
                  <Route
                    path="/crochet"
                    element={
                      <MainLayout>
                        <Crochet />
                      </MainLayout>
                    }
                  />
                  {/* <Route
                    path="/customers"
                    element={
                      <MainLayout>
                        <Customers />
                      </MainLayout>
                    }
                  /> */}
                  <Route path="/unauthorized" element={<Unauthorized />} />
                </Routes>
              </Router>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </NotificationsProvider>
    </ThemeProvider>
  );
}

export default App;

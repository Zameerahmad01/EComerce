import { Routes, Route } from "react-router-dom";
import "./App.css";
import AuthLayout from "./components/auth/Layout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./components/admin/Layout";
import AdminDashboard from "./pages/admin/Dasboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminFeatures from "./pages/admin/Features";
import ShoppingLayout from "./components/shopping/Layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping/Home";
import ShoppingListing from "./pages/shopping/Listing";
import ShoppingCheckout from "./pages/shopping/Checkout";
import ShoppingAccount from "./pages/shopping/Account";

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* {common component} */}
      <h1>header component</h1>
      <Routes>
        {/* auth routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        {/* shopping routes */}
        <Route path="/shop" element={<ShoppingLayout />}>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

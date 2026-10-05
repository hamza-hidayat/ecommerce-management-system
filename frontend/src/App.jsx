import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/customer/Navbar';
import Login from './pages/auth/Login';
import ProductListing from './pages/customer/ProductListing';
import ProductDetail from './pages/customer/ProductDetail';
import Cart from './pages/customer/Cart';
import Wishlist from './pages/customer/Wishlist';
import Checkout from './pages/customer/Checkout';
import OrderHistory from './pages/customer/OrderHistory';

import Profile from './pages/customer/Profile';
import ContactUs from './pages/customer/ContactUs';
import AdminCategories from './pages/admin/AdminCategories';
import AdminLogin from './pages/admin/AdminLogin';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';



// Admin imports
import AdminLayout from './layouts/AdminLayout';
import AdminProducts from './pages/admin/AdminProducts';
import ProductEdit from './pages/admin/ProductEdit';
import AdminOrders from './pages/admin/AdminOrders';
import Customers from './pages/admin/Customers';
import Dashboard from './pages/admin/Dashboard';
import AdminReviews from './pages/admin/AdminReviews';

// Routes
import ProtectedRoute from './routes/ProtectedRoute';
import Register from './pages/auth/Register';

function Home() {
  return (
    <div className="bg-blue-50 h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-extrabold text-blue-800 mb-4">Welcome to ShopZone</h1>
      <p className="text-lg text-gray-700 mb-8">Your one-stop shop for everything amazing.</p>
      <a href="/products" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition">Start Shopping</a>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
            <Routes>
        {/* Public Routes (Anyone can view) */}
        <Route path="/" element={<><Navbar /><main className="min-h-screen bg-gray-50"><Home /></main></>} />
        <Route path="/login" element={<><Navbar /><main className="min-h-screen bg-gray-50"><Login /></main></>} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/register" element={<><Navbar /><main className="min-h-screen bg-gray-50"><Register /></main></>} />
        <Route path="/products" element={<><Navbar /><main className="min-h-screen bg-gray-50"><ProductListing /></main></>} />
        <Route path="/product/:id" element={<><Navbar /><main className="min-h-screen bg-gray-50"><ProductDetail /></main></>} />
        
        <Route path="/profile" element={<><Navbar /><main className="min-h-screen bg-gray-50"><Profile /></main></>} />
        <Route path="/contact" element={<><Navbar /><main className="min-h-screen bg-gray-50"><ContactUs /></main></>} />
        <Route path="/forgot-password" element={<><Navbar /><main className="min-h-screen bg-gray-50"><ForgotPassword /></main></>} />
        <Route path="/reset-password" element={<><Navbar /><main className="min-h-screen bg-gray-50"><ResetPassword /></main></>} />

        
        {/* Protected Customer Routes (Must be logged in) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<><Navbar /><main className="min-h-screen bg-gray-50"><Cart /></main></>} />
          <Route path="/wishlist" element={<><Navbar /><main className="min-h-screen bg-gray-50"><Wishlist /></main></>} />
          <Route path="/checkout" element={<><Navbar /><main className="min-h-screen bg-gray-50"><Checkout /></main></>} />
          <Route path="/orders" element={<><Navbar /><main className="min-h-screen bg-gray-50"><OrderHistory /></main></>} />
        </Route>

                {/* Admin Routes */}
        <Route element={<ProtectedRoute isAdminRoute={true} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new" element={<ProductEdit />} />
            <Route path="products/edit/:id" element={<ProductEdit />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
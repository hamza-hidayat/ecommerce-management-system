import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import {
  ShoppingBag,
  User,
  LogOut,
  ShoppingCart,
  Heart,
  Package,
  LayoutDashboard,
  Search,
} from "lucide-react";
import toast from "react-hot-toast";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-blue-600"
          >
            <ShoppingBag />
            <span>ShopZone</span>
          </Link>

          <div className="hidden md:flex space-x-8 ml-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Shop
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Contact Us
            </Link>
          </div>

          {/* Search Bar (Hidden on small screens) */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center flex-1 max-w-md mx-8"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700"
            >
              <Search size={20} />
            </button>
          </form>

          <div className="flex items-center space-x-6">
            {user && (
              <Link
                to="/orders"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                <Package size={22} />
              </Link>
            )}

            {user && (
              <Link
                to="/wishlist"
                className="text-gray-600 hover:text-red-500 transition"
              >
                <Heart size={22} />
              </Link>
            )}

            {user && (
              <Link
                to="/cart"
                className="relative text-gray-600 hover:text-blue-600 transition"
              >
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {user ? (
              <div className="flex items-center gap-3">
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition text-sm"
                  >
                    <LayoutDashboard size={16} /> Admin Panel
                  </Link>
                )}

                <span className="text-sm text-gray-600 hidden sm:block">
                  Hi, {user.username}
                </span>
                <button
                  onClick={() => {
                    logout();
                    toast.success("Logged out successfully!");
                    navigate("/");
                  }}
                  className="p-2 text-gray-600 hover:text-red-500 transition"
                >
                  <LogOut size={20} />
                </button>

                {user && (
                  <Link
                    to="/profile"
                    className="text-gray-600 hover:text-blue-600 transition"
                  >
                    <User size={22} />
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
                >
                  <User size={20} /> Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm hidden sm:block"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

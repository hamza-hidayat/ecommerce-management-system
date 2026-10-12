import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ShieldCheck } from "lucide-react";

function AdminLogin() {
  const { login, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(formData.username, formData.password);
      if (user.role !== "admin") {
        logout();
        toast.error("Access Denied: You are not an Admin.");
        return;
      }
      toast.success("Welcome Admin!");
      navigate("/admin");
    } catch (err) {
      toast.error("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow-2xl w-96 border border-gray-700"
      >
        <div className="flex flex-col items-center mb-6">
          <ShieldCheck className="text-blue-500 mb-2" size={40} />
          <h2 className="text-2xl font-bold text-white">Admin Portal</h2>
          <p className="text-gray-400 text-sm">Authorized personnel only</p>
        </div>
        <input
          type="text"
          placeholder="Admin Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          className="w-full p-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full p-2 mb-6 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Secure Login
        </button>

        <div className="text-center text-sm text-gray-400 mt-4 space-y-2">
          <p>
            <Link to="/forgot-password" className="hover:text-blue-500">
              Forgot Password?
            </Link>
          </p>
          <p>
            <Link to="/reset-password" className="hover:text-blue-500">
              Have a Token? Reset Password
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default AdminLogin;

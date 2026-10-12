import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function ResetPassword() {
  const [formData, setFormData] = useState({ token: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/password/confirm/", formData);
      toast.success("Password reset successful! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error("Invalid token or failed to reset.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <input
          type="text"
          placeholder="Paste your reset token here"
          value={formData.token}
          onChange={(e) => setFormData({ ...formData, token: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;

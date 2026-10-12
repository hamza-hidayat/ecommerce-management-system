import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "lucide-react";

function ProtectedRoute({ isAdminRoute = false }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  // If not logged in, send to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If it's an admin route but user is a customer, send them home
  if (isAdminRoute && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  // If all good, render the page
  return <Outlet />;
}

export default ProtectedRoute;

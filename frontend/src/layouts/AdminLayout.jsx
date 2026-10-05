import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Package, ShoppingBag, LayoutDashboard, Home, Users, LogOut, Tags , Star, User } from 'lucide-react';
import toast from 'react-hot-toast';

function AdminLayout() {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-gray-900 text-white flex flex-col">
                <div className="p-6 text-2xl font-bold border-b border-gray-700">
                    Admin Panel
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition">
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>
                    <Link to="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition">
                        <Package size={20} /> Products
                    </Link>
                    <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition">
                        <ShoppingBag size={20} /> Orders
                    </Link>
                    <Link to="/admin/customers" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition">
                        <Users size={20} /> Customers
                    </Link>
                    <Link to="/admin/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition">
                        <User size={20} /> Profile
                    </Link>
                    <Link to="/admin/reviews" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition">
                        <Star size={20} /> Reviews
                    </Link>
                    <Link to="/admin/categories" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition">
                        <Tags size={20} /> Categories
                    </Link>
                </nav>
                <div className="p-4 border-t border-gray-700 space-y-2">
                    <button onClick={() => navigate('/')} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition w-full">
                        <Home size={20} /> Back to Store
                    </button>
                    <button onClick={() => { logout(); toast.success('Logged out successfully!'); navigate('/'); }} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-700 transition w-full text-red-400 hover:text-white">
                        <LogOut size={20} /> Logout
                    </button>                   
                </div>
            </aside>

            <main className="flex-1 overflow-y-auto p-8">
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;
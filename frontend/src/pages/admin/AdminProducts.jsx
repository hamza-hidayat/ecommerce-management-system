import { useState, useEffect } from 'react';
import { getAdminProducts, deleteProduct } from '../../api/adminApi';
import { Loader, Trash2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const data = await getAdminProducts();
            setProducts(data);
        } catch (err) {
            toast.error("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id);
                toast.success("Product deleted");
                fetchProducts();
            } catch (err) {
                toast.error("Delete failed");
            }
        }
    };

    if (loading) return <div className="flex justify-center mt-20"><Loader className="animate-spin text-blue-600" size={40} /></div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Products</h1>
                <Link to="/admin/products/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
                    <Plus size={20} /> Add Product
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-md bg-gray-100 mr-3 overflow-hidden">
                                            {product.image && <img src={product.image.startsWith('http') ? product.image : `http://127.0.0.1:8000${product.image}`} alt={product.name} className="h-full w-full object-cover" />}
                                        </div>
                                        <span className="font-medium text-gray-900">{product.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{product.category?.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">${product.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{product.stock}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex gap-2">
                                        <Link to={`/admin/products/edit/${product.id}`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                                        <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900 flex items-center gap-1">
                                            <Trash2 size={16} /> Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminProducts;
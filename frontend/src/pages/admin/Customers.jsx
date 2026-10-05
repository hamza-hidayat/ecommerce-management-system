import { useState, useEffect } from 'react';
import { getCustomers } from '../../api/adminApi';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast';

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const data = await getCustomers();
                setCustomers(data);
            } catch (err) {
                toast.error("Failed to load customers");
            } finally {
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);

    if (loading) return <div className="flex justify-center mt-20"><Loader className="animate-spin text-blue-600" size={40} /></div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Customers</h1>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {customers.map((customer) => (
                            <tr key={customer.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.username}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.phone_number || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Customers;
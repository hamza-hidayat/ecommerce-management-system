import { useState, useEffect } from 'react';
import { getOrderHistory } from '../../api/orderApi';
import { Loader } from 'lucide-react';

function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrderHistory();
                setOrders(data);
            } catch (err) {
                console.error("Failed to fetch orders");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <div className="min-h-screen flex justify-center items-center"><Loader className="animate-spin text-blue-600" size={40} /></div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Order History</h1>
            
            {orders.length === 0 ? (
                <p className="text-center text-gray-500 py-20 text-xl">You have no orders yet.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="flex justify-between items-center border-b pb-4 mb-4">
                                <div>
                                    <h3 className="font-bold text-lg">Order #{order.id}</h3>
                                    <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-xl text-blue-600">${order.total_price}</p>
                                    <span className="text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">{order.status}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex justify-between text-gray-700">
                                        <span>{item.product.name} x {item.quantity}</span>
                                        <span>${item.price}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-4 border-t text-sm text-gray-500">
                                <p>Shipping to: {order.address}, {order.city}, {order.postal_code}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrderHistory;
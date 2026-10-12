import { useState, useEffect } from "react";
import { getAdminOrders, updateOrder, deleteOrder } from "../../api/adminApi";
import { Loader, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const data = await getAdminOrders();
      setOrders(data);
    } catch (err) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(() => {
      fetchOrders();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (e, orderId) => {
    const newStatus = e.target.value;
    try {
      await updateOrder(orderId, { status: newStatus });
      toast.success("Order status updated");
      fetchOrders();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleMarkPaid = async (orderId, currentlyPaid) => {
    const employeeName = prompt("Enter employee name who received the cash:");
    if (employeeName === null) return;

    try {
      await updateOrder(orderId, {
        is_paid: !currentlyPaid,
        received_by: !currentlyPaid ? employeeName : "",
      });
      toast.success("Payment status updated");
      fetchOrders();
    } catch (err) {
      toast.error("Failed to update payment");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this order permanently?")) {
      try {
        await deleteOrder(id);
        toast.success("Order deleted");
        fetchOrders();
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <Loader className="animate-spin text-blue-600" size={40} />
      </div>
    );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">All Orders</h1>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Payment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Cash Received?
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.full_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${order.total_price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                  {order.payment_method}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(e, order.id)}
                    className="border rounded p-1 text-xs"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.payment_method === "cash" ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={order.is_paid}
                        onChange={() => handleMarkPaid(order.id, order.is_paid)}
                        className="w-4 h-4 text-green-600"
                      />
                      {order.is_paid && order.received_by && (
                        <span className="text-xs">by {order.received_by}</span>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="text-red-600 hover:text-red-900 flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrders;

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { createOrder } from "../../api/orderApi";
import toast from "react-hot-toast";
import { Loader, CreditCard, Banknote } from "lucide-react";

function Checkout() {
  const { cartItems, fetchCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
    city: "",
    postal_code: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.item_total),
    0,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (paymentMethod === "paypal") {
        // SIMULATING PAYPAL PAYMENT
        toast.success("PayPal payment simulated successfully!");
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Fake 1 second delay
      }

      // Create the order with the selected payment method
      await createOrder({ ...formData, payment_method: paymentMethod });
      await fetchCart(); // Clear cart in frontend
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      toast.error("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <button
          onClick={() => navigate("/products")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Shipping Info */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold border-b pb-2">
                Shipping Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  type="text"
                  placeholder="Full Name"
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                  className="p-2 border rounded col-span-2"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="p-2 border rounded col-span-2"
                />
                <input
                  required
                  type="text"
                  placeholder="Phone Number"
                  value={formData.phone_number}
                  onChange={(e) =>
                    setFormData({ ...formData, phone_number: e.target.value })
                  }
                  className="p-2 border rounded col-span-2"
                />
                <input
                  required
                  type="text"
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="p-2 border rounded col-span-2"
                />
                <input
                  required
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="p-2 border rounded"
                />
                <input
                  required
                  type="text"
                  placeholder="Postal Code"
                  value={formData.postal_code}
                  onChange={(e) =>
                    setFormData({ ...formData, postal_code: e.target.value })
                  }
                  className="p-2 border rounded"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold border-b pb-2">
                Payment Method
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <label
                  className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${paymentMethod === "cash" ? "border-blue-600 bg-blue-50" : "border-gray-200"}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                    className="hidden"
                  />
                  <Banknote className="text-green-600" size={24} />
                  <span className="font-medium">Cash on Delivery</span>
                </label>
                <label
                  className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition ${paymentMethod === "paypal" ? "border-blue-600 bg-blue-50" : "border-gray-200"}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={() => setPaymentMethod("paypal")}
                    className="hidden"
                  />
                  <CreditCard className="text-blue-600" size={24} />
                  <span className="font-medium">PayPal (Simulated)</span>
                </label>
              </div>
              {paymentMethod === "paypal" && (
                <p className="text-sm text-gray-500 bg-yellow-50 p-3 rounded">
                  Note: This is a simulated PayPal payment. No real money will
                  be charged. You can connect your real PayPal API keys later.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                `Place Order ($${totalPrice.toFixed(2)})`
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between mb-2 text-gray-600"
            >
              <span>
                {item.product.name} x {item.quantity}
              </span>
              <span>${item.item_total}</span>
            </div>
          ))}
          <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

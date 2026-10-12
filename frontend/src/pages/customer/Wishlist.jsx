import { useState, useEffect } from "react";
import { getWishlist, toggleWishlist } from "../../api/wishlistApi";
import { Loader, X } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Wishlist() {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const data = await getWishlist();
      setWishlistProducts(data.products || []);
    } catch (err) {
      console.error("Failed to fetch wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await toggleWishlist(productId);
      toast.success("Removed from wishlist");
      fetchWishlist(); // Refresh the list
    } catch (err) {
      toast.error("Failed to remove");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader className="animate-spin text-blue-600" size={40} />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Wishlist</h1>
      {wishlistProducts.length === 0 ? (
        <p className="text-center text-gray-500 py-20 text-xl">
          Your wishlist is empty.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden relative"
            >
              <button
                onClick={() => handleRemove(product.id)}
                className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md text-red-500 hover:bg-red-50 z-10"
              >
                <X size={18} />
              </button>

              <Link to={`/product/${product.id}`}>
                <div className="h-52 bg-gray-100 flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <img
                      src={
                        product.image.startsWith("http")
                          ? product.image
                          : `http://127.0.0.1:8000${product.image}`
                      }
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Placeholder"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {product.name}
                  </h3>
                  <p className="text-xl font-bold text-blue-600 mt-2">
                    ${product.price}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;

import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
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
            <ShoppingBag size={48} className="text-gray-300" />
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{product.category?.name}</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-xl font-bold text-blue-600">
              ${product.price}
            </span>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;

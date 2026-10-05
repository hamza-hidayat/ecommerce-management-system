import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductDetails } from '../../api/productApi';
import { getProductReviews, createReview } from '../../api/reviewApi';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { addToCart } from '../../api/cartApi';
import { toggleWishlist } from '../../api/wishlistApi';
import toast from 'react-hot-toast';
import { Loader, ArrowLeft, ShoppingBag, Heart, Star } from 'lucide-react';

function ProductDetail() {
    const { id } = useParams();
    const { fetchCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Review state
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductDetails(id);
                setProduct(data);
            } catch (error) {
                console.error("Failed to fetch product details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    useEffect(() => {
        const fetchReviews = async () => {
            if (id) {
                try {
                    const data = await getProductReviews(id);
                    setReviews(data);
                } catch (err) {
                    console.error("Failed to fetch reviews");
                }
            }
        };
        fetchReviews();
    }, [id]);

    const handleAddToCart = async () => {
        if (!user) return toast.error("Please login to add items to cart");
        try {
            await addToCart(product.id);
            await fetchCart();
            toast.success("Added to cart!");
        } catch (err) {
            toast.error("Failed to add to cart");
        }
    };

    const handleWishlist = async () => {
        if (!user) return toast.error("Please login to add to wishlist");
        try {
            const res = await toggleWishlist(product.id);
            toast.success(res.message);
        } catch (err) {
            toast.error("Failed to update wishlist");
        }
    };

        const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!user) return toast.error("Please login to leave a review");
        try {
            await createReview({ product_id: id, rating, comment });
            toast.success("Review added!");
            setComment('');
            setRating(5);
            // Refresh reviews
            const data = await getProductReviews(id);
            setReviews(data);
        } catch (err) {
            toast.error("You might have already reviewed this product.");
        }
    };

    if (loading) return <div className="min-h-screen flex justify-center items-center"><Loader className="animate-spin text-blue-600" size={40} /></div>;
    if (!product) return <div className="text-center py-20">Product not found.</div>;

    // Calculate average rating
    const avgRating = reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : 'No ratings yet';

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link to="/products" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition">
                <ArrowLeft size={20} /> Back to Products
            </Link>

            <div className="grid md:grid-cols-2 gap-10 mb-12">
                <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center h-96">
                    {product.image ? (
                        <img src={product.image.startsWith('http') ? product.image : `http://127.0.0.1:8000${product.image}`} alt={product.name} className="h-full w-full object-contain" />
                    ) : (
                        <ShoppingBag size={80} className="text-gray-300" />
                    )}
                </div>

                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                    <p className="text-lg text-blue-600 mt-2">{product.category?.name}</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className={star <= Math.round(avgRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} size={20} />
                            ))}
                        </div>
                        <span className="text-gray-500 text-sm">({avgRating})</span>
                    </div>

                    <p className="text-3xl font-bold text-gray-900 mt-4">${product.price}</p>
                    <p className="text-gray-600 mt-6">{product.description}</p>
                    
                    <div className="mt-6 flex items-center gap-4">
                        <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                        </span>
                    </div>

                    <div className="mt-8 flex gap-4">
                        <button onClick={handleAddToCart} disabled={product.stock === 0} className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400">
                            Add to Cart
                        </button>
                        <button onClick={handleWishlist} className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                            <Heart className="text-red-500" />
                        </button>
                    </div>
                </div>
            </div>

            {/* REVIEWS SECTION */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews ({reviews.length})</h2>
                
                {/* Add Review Form */}
                {user ? (
                    <form onSubmit={handleReviewSubmit} className="mb-8 border-b pb-6">
                        <h3 className="font-bold mb-2">Leave a Review</h3>
                        <select value={rating} onChange={(e) => setRating(e.target.value)} className="p-2 border rounded mb-2">
                            <option value="5">5 Stars (Excellent)</option>
                            <option value="4">4 Stars (Good)</option>
                            <option value="3">3 Stars (Average)</option>
                            <option value="2">2 Stars (Poor)</option>
                            <option value="1">1 Star (Terrible)</option>
                        </select>
                        <textarea 
                            rows="3" 
                            placeholder="Write your comment here..." 
                            value={comment} 
                            onChange={(e) => setComment(e.target.value)} 
                            className="w-full p-2 border rounded mb-2" 
                            required
                        ></textarea>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit Review</button>
                    </form>
                ) : (
                    <p className="mb-8 text-gray-500 border-b pb-6"><Link to="/login" className="text-blue-600">Login</Link> to write a review.</p>
                )}

                {/* Display Reviews */}
                {reviews.length === 0 ? (
                    <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                ) : (
                    <div className="space-y-4">
                        {reviews.map((review) => (
                            <div key={review.id} className="border-b pb-4">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold">{review.user}</span>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} className={star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} size={16} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm">{review.comment}</p>
                                <p className="text-gray-400 text-xs mt-1">{new Date(review.created_at).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductDetail;
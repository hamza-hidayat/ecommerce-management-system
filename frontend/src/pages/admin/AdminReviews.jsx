import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Loader, Trash2, Star } from 'lucide-react';
import toast from 'react-hot-toast';

function AdminReviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        try {
            const res = await api.get('/reviews/');
            setReviews(res.data);
        } catch (err) {
            toast.error("Failed to load reviews");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Delete this review?")) {
            try {
                await api.delete(`/reviews/${id}/`);
                toast.success("Review deleted");
                fetchReviews();
            } catch (err) {
                toast.error("Failed to delete");
            }
        }
    };

    if (loading) return <div className="flex justify-center mt-20"><Loader className="animate-spin text-blue-600" size={40} /></div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Product Reviews</h1>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comment</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {reviews.map((review) => (
                            <tr key={review.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{review.product}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{review.user}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} className={star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} size={16} />
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 max-w-md whitespace-normal break-words">{review.comment}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <button onClick={() => handleDelete(review.id)} className="text-red-600 hover:text-red-900 flex items-center gap-1">
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

export default AdminReviews;
import { useState } from 'react';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/password/', { email });
            toast.success("Reset link sent! Check your terminal (backend).");
        } catch (err) {
            toast.error("Failed to send reset email.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
                <p className="text-sm text-gray-500 mb-4 text-center">Enter your email and we'll send you a reset token.</p>
                <input 
                    type="email" 
                    placeholder="Your Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />
                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    {loading ? 'Sending...' : 'Send Reset Token'}
                </button>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Remembered? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
                </p>
            </form>
        </div>
    );
}

export default ForgotPassword;
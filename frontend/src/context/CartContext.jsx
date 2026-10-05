import { createContext, useState, useContext, useEffect } from 'react';
import { getCart } from '../api/cartApi';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    const fetchCart = async () => {
        if (user) {
            try {
                const data = await getCart();
                setCartItems(data.items || []);
                setCartCount(data.items?.length || 0);
            } catch (err) {
                console.error("Failed to fetch cart");
            }
        } else {
            setCartItems([]);
            setCartCount(0);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [user]);

    return (
        <CartContext.Provider value={{ cartItems, cartCount, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};
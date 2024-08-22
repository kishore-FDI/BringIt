'use client';
import { createContext, useContext, useEffect, useState } from 'react';

// Create the context
export const CartContext = createContext({});

// Create the provider component
export const CartContextProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([]);

    const addProducts = (productId) => {
        setCartProducts(prev => [...prev, productId]);
    };

    const removeProducts = (productId) => {
        setCartProducts(prev => {
            const index = prev.lastIndexOf(productId);
            if (index > -1) {
                const updatedCart = [...prev];
                updatedCart.splice(index, 1);
                return updatedCart;
            }
            return prev;
        });
    };

    const removeAllProducts = (productId) => {
        setCartProducts(prev => prev.filter(id => id !== productId));
    };

    const emptyCart = () => {
        setCartProducts([]);
    };

    useEffect(() => {
        const ls = typeof window !== "undefined" ? window.localStorage : null;
        if (ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')));
        }
    }, []);

    useEffect(() => {
        if (cartProducts.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cartProducts));
        } else {
            localStorage.removeItem('cart');
        }
    }, [cartProducts]);

    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts, addProducts, removeProducts, removeAllProducts, emptyCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the CartContext
export function useCartContext() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCartContext must be used within a CartContextProvider');
    }
    return context;
}

// Export the context for other components to use
export default CartContext;

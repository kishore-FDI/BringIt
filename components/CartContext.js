'use client';
import { createContext, useContext, useState } from 'react';

// Create the context
export const CartContext = createContext({});

// Create the provider component
export const CartContextProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([]);

    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts }}>
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

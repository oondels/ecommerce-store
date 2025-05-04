import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, CartState } from '../types';

interface CartContextType {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  subtotal: 0,
  shipping: 0,
  tax: 0,
  total: 0,
  itemCount: 0,
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartState>(() => {
    // Initialize cart from localStorage if available
    const savedCart = localStorage.getItem('Loja-cart');
    return savedCart
      ? JSON.parse(savedCart)
      : {
          items: [],
          subtotal: 0,
          shipping: 0,
          tax: 0,
          total: 0,
        };
  });

  // Calculate totals when items change
  useEffect(() => {
    const subtotal = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    
    // Fixed shipping and tax rate for demo
    const shipping = subtotal > 100 ? 0 : 10;
    const taxRate = 0.08; // 8% tax
    const tax = subtotal * taxRate;
    const total = subtotal + shipping + tax;
    
    setCart((prev) => ({
      ...prev,
      subtotal,
      shipping,
      tax,
      total,
    }));
  }, [cart.items]);

  // Save to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('Loja-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    setCart((prev) => {
      // Check if item already exists
      const existingItemIndex = prev.items.findIndex(
        (item) => item.productId === newItem.productId
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prev.items];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        
        return {
          ...prev,
          items: updatedItems,
        };
      } else {
        // Add new item
        return {
          ...prev,
          items: [...prev.items, newItem],
        };
      }
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCart((prev) => {
      const updatedItems = prev.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      
      return {
        ...prev,
        items: updatedItems,
      };
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const clearCart = () => {
    setCart({
      items: [],
      subtotal: 0,
      shipping: 0,
      tax: 0,
      total: 0,
    });
  };

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        ...cart,
        itemCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
import React, { createContext, useContext, useState, useEffect } from 'react';
import { WishlistItem } from '../types';

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType>({
  items: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  clearWishlist: () => {},
  isInWishlist: () => false,
});

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
    // Initialize wishlist from localStorage if available
    const savedWishlist = localStorage.getItem('Loja-wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Save to localStorage when wishlist changes
  useEffect(() => {
    localStorage.setItem('Loja-wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems((prev) => {
      // Check if item already exists
      const exists = prev.some((i) => i.productId === item.productId);
      if (exists) return prev;
      
      // Add new item
      return [...prev, item];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems((prev) =>
      prev.filter((item) => item.productId !== productId)
    );
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.productId === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        items: wishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
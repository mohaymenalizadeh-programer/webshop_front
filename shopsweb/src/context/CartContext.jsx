import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);


const api = axios.create({
  baseURL: 'http://api.yadakkan.ir/api/',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export function CartProvider({ children }) {
  const { isLoggedIn } = useAuth();
  const [cartCount, setCartCount] = useState(0);


  const refreshCart = useCallback(async () => {
    if (!isLoggedIn) {
      setCartCount(0);
      return;
    }
    try {
      const response = await api.get('cart/');
      const data = response.data;
      const totalItems = (data.items || []).reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      setCartCount(totalItems);
    } catch (err) {
      console.error('خطا در دریافت سبد خرید:', err);
      setCartCount(0);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);


  const addToCart = async (productId) => {
    try {
      const response = await api.post('add-to-cart/', {
        product_id: productId,
      });

      await refreshCart();
      return { success: true, msg: response.data.msg };
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'خطا در ارتباط با سرور';
      return { success: false, error: errorMessage };
    }
  };

  return (
    <CartContext.Provider value={{ cartCount, refreshCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart باید داخل CartProvider استفاده شود');
  }
  return ctx;
}
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Home from './components/Home.jsx'; 
import Footer from './components/Footer.jsx';
import Shops from './components/Shops.jsx';
import AuthForm from './components/AuthForm.jsx';
import Accounts from './components/Accounts.jsx';
import CartPage from './components/CartPage.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import CheckoutPage from './components/CheckoutPage';
import Callme from './components/Callme';
import Aboutme from './components/Aboutme';
import PaymentSuccess from './components/PaymentSuccess.jsx';
import PaymentFailed from './components/PaymentFailed.jsx';
function App() {
  // useEffect(() => {
  //   const handleContextMenu = (e) => {
  //     e.preventDefault();
  //   };
  //   document.addEventListener("contextmenu", handleContextMenu);
    
  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //   };
  // }, []);

  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.type = 'image/png';
    link.href = '/images/file_0000000003688211a1b602e35c259d2a.png';
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/shop" element={<Shops />} />
            <Route path="/shops" element={<Shops />} /> 
            <Route path="/authform" element={<AuthForm />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/cartPage" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/callme" element={<Callme />} />
            <Route path="/aboutme" element={<Aboutme />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from './api';
import Navbarpage from './Navbarpage.jsx';
import SEO from './SEO.jsx';

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await api.get('/cart/');
      setCart(response.data);
      setError(null);
    } catch (err) {
      console.error("خطا در دریافت سبد خرید:", err);
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setError("لطفاً برای مشاهده سبد خرید ابتدا وارد حساب کاربری خود شوید.");
      } else {
        setError("خطا در ارتباط با سرور.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (itemId, action) => {
    try {
      const response = await api.post('/update-cart/', {
        item_id: itemId,
        action: action
      });
      setCart(response.data);
    } catch (err) {
      console.error("خطا در به‌روزرسانی سبد خرید:", err);
      alert("خطا در به‌روزرسانی تعداد محصول.");
    }
  };

  const handleGoToCheckout = () => {
    if (totalPrice <= 0) {
      alert("سبد خرید شما خالی است.");
      return;
    }
    navigate('/checkout', {
      state: {
        totalPrice: totalPrice,
        items: items,
        totalCount: totalCount
      }
    });
  };

  const seoTag = (
    <SEO
      title="سبد خرید"
      description="سبد خرید شما در یدک‌کان"
      canonical="/cartPage"
      noindex={true}
    />
  );

  if (loading) {
    return (
      <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        {seoTag}
        <Navbarpage />
        <div style={{ padding: '120px', textAlign: 'center', color: '#0284c7', fontSize: '18px', fontWeight: '700' }} dir="rtl">
          در حال بارگذاری سبد خرید...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        {seoTag}
        <Navbarpage />
        <div style={{ padding: '120px', textAlign: 'center', color: '#ef4444', fontSize: '18px', fontWeight: '700' }} dir="rtl">
          {error}
        </div>
      </div>
    );
  }

  const items = cart?.items || [];
  const totalPrice = cart?.grand_total || 0;
  const totalCount = cart?.total_items_count || 0;

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '80px', color: '#1e293b' }}>
      {seoTag}
      <Navbarpage />

      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }} dir="rtl">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px', borderBottom: '2px solid #e2e8f0', paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '28px', color: '#0f172a', fontWeight: '900', margin: 0 }}>
            سبد خرید شما
          </h1>
          <span style={{ backgroundColor: '#e0f2fe', color: '#0284c7', padding: '6px 16px', borderRadius: '20px', fontWeight: '800', fontSize: '14px', border: '1px solid #bae6fd' }}>
            {totalCount} محصول
          </span>
        </div>

        {items.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '30px', alignItems: 'start' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px',
                    backgroundColor: '#ffffff',
                    borderRadius: '14px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <img
                      src={
                        !item.product_image
                          ? "/images/products/product-placeholder.jpg"
                          : item.product_image.startsWith('http')
                            ? item.product_image
                            : `https://webflow.pythonanywhere.com/${item.product_image.startsWith('/') ? '' : '/'}${item.product_image}`
                      }
                      alt={item.product_title}
                      style={{
                        width: '110px',
                        height: '110px',
                        objectFit: 'cover',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        backgroundColor: '#f8fafc'
                      }}
                    />
                    <div>
                      <h3 style={{ margin: '0 0 8px 0', fontSize: '17px', color: '#0f172a', fontWeight: '800' }}>
                        {item.product_title}
                      </h3>
                      <p style={{ margin: '0 0 6px 0', color: '#64748b', fontSize: '14px', fontWeight: '600' }}>
                        فی: {Number(item.product_price).toLocaleString('fa-IR')} تومان
                      </p>
                      <p style={{ margin: 0, color: '#059669', fontSize: '15px', fontWeight: '900' }}>
                        مجموع: {Number(item.total_price).toLocaleString('fa-IR')} تومان
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '14px' }}>
                    <button
                      type="button"
                      onClick={() => handleUpdateQuantity(item.id, 'remove')}
                      style={{
                        backgroundColor: '#fee2e2',
                        border: '1px solid #fca5a5',
                        color: '#dc2626',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '700',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                      حذف
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '4px' }}>
                      <button
                        type="button"
                        onClick={() => handleUpdateQuantity(item.id, 'increase')}
                        style={{
                          width: '32px', height: '32px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1',
                          borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a'
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </button>

                      <span style={{ padding: '0 16px', fontWeight: '900', fontSize: '15px', color: '#0284c7' }}>
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleUpdateQuantity(item.id, 'decrease')}
                        style={{
                          width: '32px', height: '32px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1',
                          borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a'
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                backgroundColor: '#ffffff',
                padding: '24px',
                borderRadius: '14px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)',
                position: 'sticky',
                top: '20px'
              }}
            >
              <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '12px', fontWeight: '900' }}>
                خلاصه صورتحساب
              </h3>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', color: '#64748b', fontSize: '15px' }}>
                <span>تعداد کل کالاها:</span>
                <span style={{ fontWeight: '800', color: '#0284c7' }}>{totalCount} عدد</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '16px', color: '#0f172a' }}>
                <span style={{ fontWeight: '800' }}>مبلغ قابل پرداخت:</span>
                <span style={{ fontWeight: '900', color: '#059669', fontSize: '19px' }}>
                  {Number(totalPrice).toLocaleString('fa-IR')} <small style={{ fontSize: '12px' }}>تومان</small>
                </span>
              </div>

              <button
                type="button"
                style={{
                  width: '100%', padding: '14px', backgroundColor: '#facc15', color: '#0f172a',
                  border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '900',
                  cursor: 'pointer', boxShadow: '0 4px 15px rgba(250, 204, 21, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  transition: 'opacity 0.2s'
                }}
                onClick={handleGoToCheckout}
              >
                تایید و ثبت سفارش نهایی
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>

          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
            <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '20px', fontWeight: '800' }}>سبد خرید شما در حال حاضر خالی است.</p>
            <Link
              to="/shops"
              style={{
                display: 'inline-block', padding: '12px 30px', backgroundColor: '#facc15',
                color: '#0f172a', borderRadius: '8px', textDecoration: 'none', fontWeight: '900', fontSize: '15px',
                boxShadow: '0 4px 15px rgba(250, 204, 21, 0.3)'
              }}
            >
              مشاهده محصولات فروشگاه
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

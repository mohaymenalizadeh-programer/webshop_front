import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SEO from './SEO.jsx';
import Navbarpage from './Navbarpage.jsx';
const API_BASE = "http://api.yadakkan.ir/api";

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [msg, setMsg] = useState('');

  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef(null);

  useEffect(() => {
    axios.get(`${API_BASE}/product/${slug}/`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [slug]);

  const addToCart = async () => {
    try {
      await axios.post(`${API_BASE}/add-to-cart/`,
        { product_id: product.id },
        { withCredentials: true, headers: { "X-CSRFToken": getCookie("csrftoken") || "" } }
      );
      navigate('/cartPage');
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        alert("لطفاً ابتدا وارد حساب کاربری خود شوید.");
      } else {
        alert("خطا در افزودن به سبد خرید");
      }
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('text', text);
    if (avatar) formData.append('avatar', avatar);

    try {
      await axios.post(`${API_BASE}/product/${slug}/`, formData, {
        withCredentials: true,
        headers: { "X-CSRFToken": getCookie("csrftoken") || "" }
      });
      setMsg("نظر شما با موفقیت ثبت شد.");
      setName('');
      setText('');
      setAvatar(null);
    } catch (err) {
      setMsg("خطا در ارسال نظر");
    }
  };

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    if (!clientX || !clientY) return;
    setZoomPos({
      x: ((clientX - left) / width) * 100,
      y: ((clientY - top) / height) * 100
    });
  };

  if (!product) return (
    <div style={{ textAlign: 'center', padding: '150px', fontSize: '16px', color: '#6b7280', background: '#fdfdfd', minHeight: '100vh' }}>
      در حال بارگذاری اطلاعات محصول...
    </div>
  );

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.description,
    "image": product.image1,
    "sku": String(product.id),
    "brand": { "@type": "Brand", "name": product.brand_name || "یدک‌کان" },
    "offers": {
      "@type": "Offer",
      "url": `https://yadakkan.ir/product/${slug}`,
      "priceCurrency": "IRR",
      "price": product.price,
      "availability": "https://schema.org/InStock"
    }
  };

  const metaDescription = product.description ? product.description.slice(0, 155) : `خرید ${product.title} از یدک‌کان.`;

  return (
    <div dir="rtl"><Navbarpage/>
      <style>{`
        .yd-container {
          max-width: 1200px;
          margin: 30px auto;
          padding: 0 15px;
          font-family: inherit;
          box-sizing: border-box;
        }
        .yd-main-box {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 30px;
          background: #ffffff;
          border: 1px solid #eaeaea;
          border-radius: 24px;
          padding: 35px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
          align-items: center;
          box-sizing: border-box;
        }
        .yd-img-box {
          position: relative;
          width: 100%;
          height: 420px;
          border-radius: 18px;
          overflow: hidden;
          border: 2px solid #f4b800;
          background-color: #fffdf5;
          cursor: crosshair;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(244, 184, 0, 0.15);
          box-sizing: border-box;
        }
        .yd-info-box {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          box-sizing: border-box;
        }
        .yd-price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fafafa;
          border: 1px solid #e5e7eb;
          padding: 18px 20px;
          border-radius: 16px;
          box-sizing: border-box;
        }
        .yd-comments-wrapper {
          margin-top: 30px;
          background: #ffffff;
          border: 1px solid #eaeaea;
          border-radius: 24px;
          padding: 35px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
          box-sizing: border-box;
        }
        .yd-comments-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          align-items: start;
          box-sizing: border-box;
        }
        .yd-input-field {
          padding: 14px 16px;
          background: #fafafa;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          fontSize: 14px;
          outline: none;
          width: 100%;
          box-sizing: border-box;
        }
        .yd-btn-primary {
          background: #f4b800;
          color: #000000;
          border: none;
          padding: 14px 20px;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 900;
          font-size: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 6px 20px rgba(244, 184, 0, 0.4);
          transition: all 0.2s ease;
          width: 90%;
        }
        .yd-btn-primary:hover {
          background: #e0a800;
          transform: translateY(-2px);
        }
        .yd-btn-dark {
          background: #14171e;
          color: #ffffff;
          border: none;
          padding: 14px;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 900;
          font-size: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          width: 100%;
          transition: background 0.2s;
        }
        .yd-btn-dark:hover {
          background: #f4b800;
          color: #000000;
        }

        @media (max-width: 900px) {
          .yd-main-box {
            grid-template-columns: 1fr;
            padding: 20px;
          }
          .yd-img-box {
            height: 300px;
            order: -1;
          }
          .yd-price-row {
            flex-direction: column;
            align-items: stretch;
            gap: 15px;
          }
          .yd-comments-grid {
            grid-template-columns: 1fr;
          }
          .yd-comments-wrapper {
            padding: 20px;
          }
        }
      `}</style>

      <SEO
        title={product.title}
        description={metaDescription}
        keywords={`${product.title}, خرید ${product.title}, قیمت ${product.title}`}
        canonical={`/product/${slug}`}
        image={product.image1}
        type="product"
        price={product.price}
        jsonLd={[productSchema]}
      />

      <div className="yd-container">
        <div className="yd-main-box">
          
          <div
            ref={imageContainerRef}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsZoomed(true)}
            onTouchEnd={() => setIsZoomed(false)}
            onTouchMove={handleMouseMove}
            className="yd-img-box"
          >
            <img
              src={product.image1}
              alt={product.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                transition: isZoomed ? 'none' : 'transform 0.3s ease',
                transform: isZoomed ? 'scale(2.2)' : 'scale(1)',
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
              }}
            />
            <div style={{
              position: 'absolute', bottom: '12px', right: '12px',
              backgroundColor: '#14171e', color: '#f4b800',
              padding: '6px 12px', borderRadius: '8px', fontSize: '11px',
              fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)', pointerEvents: 'none'
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              بزرگ‌نمایی
            </div>
          </div>

          <div className="yd-info-box">
            <div>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#f4b800', background: '#fff9db', padding: '4px 10px', borderRadius: '6px', border: '1px solid #ffe066', display: 'inline-block' }}>
                کالای اصلی و تضمین شده
              </span>
              <h1 style={{ fontSize: '24px', color: '#111827', fontWeight: '900', margin: '12px 0 10px 0', lineHeight: '1.4' }}>
                {product.title}
              </h1>
              <p style={{ color: '#4b5563', fontSize: '14px', lineHeight: '1.8', margin: 0 }}>
                {product.description}
              </p>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #f3f4f6', margin: '5px 0' }} />

            <div className="yd-price-row">
              <div>
                <span style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>قیمت محصول:</span>
                <span style={{ fontSize: '22px', fontWeight: '900', color: '#111827' }}>
                  {Number(product.price || 0).toLocaleString("fa-IR")} <small style={{ fontSize: '12px', color: '#f4b800', fontWeight: 'bold' }}>ریال</small>
                </span>
              </div>

              <button onClick={addToCart} className="yd-btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                افزودن به سبد خرید
              </button>
            </div>
          </div>

        </div>

        <div className="yd-comments-wrapper">
          <h2 style={{ fontSize: '18px', color: '#111827', fontWeight: '900', marginBottom: '8px' }}>نظرات و دیدگاه‌های کاربران</h2>
          <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '20px' }}>نظر یا پرسش خود درباره این قطعه را با ما به اشتراک بگذارید.</p>

          {msg && (
            <div style={{ background: '#fff9db', border: '1px solid #ffe066', color: '#b27b00', padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontWeight: 'bold', fontSize: '14px' }}>
              {msg}
            </div>
          )}

          <div className="yd-comments-grid">
            <form onSubmit={handleComment} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input
                type="text"
                placeholder="نام شما"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="yd-input-field"
              />
              <input
                type="file"
                onChange={e => setAvatar(e.target.files[0])}
                className="yd-input-field"
                style={{ padding: '10px', color: '#6b7280', fontSize: '13px' }}
              />
              <textarea
                placeholder="متن نظر خود را بنویسید..."
                value={text}
                onChange={e => setText(e.target.value)}
                required
                className="yd-input-field"
                style={{ height: '110px', resize: 'vertical' }}
              />
              <button type="submit" className="yd-btn-dark">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                ثبت نظر نهایی
              </button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '350px', overflowY: 'auto' }}>
              {product.comments && product.comments.length > 0 ? (
                product.comments.map((c, i) => (
                  <div key={i} style={{ display: 'flex', gap: '15px', background: '#fafafa', border: '1px solid #f3f4f6', padding: '15px', borderRadius: '14px', alignItems: 'flex-start' }}>
                    {c.avatar ? (
                      <img src={c.avatar} alt={`پروفایل ${c.name}`} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #f4b800', flexShrink: 0 }} />
                    ) : (
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#14171e', color: '#f4b800', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '15px', flexShrink: 0 }}>
                        {c.name ? c.name.charAt(0) : 'ک'}
                      </div>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <h4 style={{ margin: 0, fontSize: '14px', color: '#111827', fontWeight: '800' }}>{c.name}</h4>
                      <p style={{ margin: 0, fontSize: '13px', color: '#4b5563', lineHeight: '1.6' }}>{c.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: '#9ca3af', fontSize: '14px', textAlign: 'center', marginTop: '30px' }}>هنوز نظری برای این محصول ثبت نشده است.</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
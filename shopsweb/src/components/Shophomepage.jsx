import React, { useRef, useState, useEffect } from 'react';
import '../styles/Shophomepage.css';
import axios from "axios";

const API_URL = "https://api.yadakkan.ir//api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default function Shophomepage() {
  const sliderRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHover, setIsHover] = useState(false);

  const [firstdata, setFirstdata] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    api
      .get("/products/")
      .then((res) => {
        const productsList = Array.isArray(res.data) ? res.data : (res.data.portfolio || res.data.results || []);
        setFirstdata(productsList.slice(0, 15));
      })
      .catch((err) => console.error("خطا در دریافت محصولات:", err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHover && !isDown && sliderRef.current) {
        const el = sliderRef.current;
        if (el.scrollLeft <= -(el.scrollWidth - el.clientWidth - 5)) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: -260, behavior: 'smooth' });
        }
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [isHover, isDown]);

  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    setIsHover(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const scroll = (direction) => {
    if (sliderRef.current) {
      const offset = direction === 'left' ? -300 : 300;
      sliderRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((item) => item !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className="shop-section">
      <div className="header-container">
        <a href="/shops" className="view-all">مشاهده همه</a>
        <div className="title-area">
          <h2 className="title-text">جدیدترین محصولات</h2>
          <div className="underline"></div>
        </div>
      </div>

      <div 
        className="slider-container" 
        onMouseEnter={() => setIsHover(true)} 
        onMouseLeave={() => setIsHover(false)}
      >
        <button className="nav-btn left-btn" onClick={() => scroll('left')}>&#10094;</button>

        <div 
          className="track" 
          ref={sliderRef} 
          onMouseDown={handleMouseDown} 
          onMouseLeave={handleMouseLeave} 
          onMouseUp={handleMouseUp} 
          onMouseMove={handleMouseMove}
        >
          {firstdata.map((item, index) => {
            const currentId = item.id || item.pk;
            const currentSlug = item.slug || currentId;

            return (
              <div className="product-card" key={currentId || index}>
                <div className="card-top">
                  <button 
                    type="button"
                    className={favorites.includes(currentId) ? "heart-btn liked" : "heart-btn"} 
                    onClick={() => toggleFavorite(currentId)}
                  >
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 21 C12 21 4 14.5 4 9 C4 5.5 6.5 3.5 9.2 3.5 C10.9 3.5 12 4.5 12 4.5 C12 4.5 13.1 3.5 14.8 3.5 C17.5 3.5 20 5.5 20 9 C20 14.5 12 21 12 21 Z" />
                    </svg>
                  </button>
                  <span className="badge">جدید</span>
                </div>

                <a href={`/product/${currentSlug}`} className="img-box">
                  <div className="img-inner">
                    <img 
                      className="imgboxurl" 
                      src={
                        !item.image1 
                          ? "/images/products/product-placeholder.jpg"
                          : item.image1.startsWith('http') 
                            ? item.image1 
                            : `https://api.yadakkan.ir//media/${item.image1.replace(/^\/+/, '')}`
                      } 
                      alt={item.title} 
                    />
                  </div>
                </a>

                <div className="info">
                  <a href={`/product/${currentSlug}`} className="prod-name" style={{ textDecoration: 'none', color: 'inherit' }}>
                    {item.title}
                  </a>
                  <p className="prod-desc">{item.description}</p>
                  <p className="prod-brand">{item.brand_name || "قطعه اصلی"}</p>
                  <p className="prod-price">
                    {Number(item.price || 0).toLocaleString("fa-IR")} ریال
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <button className="nav-btn right-btn" onClick={() => scroll('right')}>&#10095;</button>
      </div>
    </div>
  );
}
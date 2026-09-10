import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Carbrand.css';

const API_URL = "http://api.yadakkan.ir/api";

export default function Carbrand() {
  const [brands, setBrands] = useState([]);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/brands/`)
      .then((response) => setBrands(response.data))
      .catch((err) => console.error("Error loading brands:", err));
  }, []);

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = 300;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleBrandClick = (brandId) => {
    navigate(`/shop?brand=${brandId}`);
  };

  return (
    <div>
      <h2 className='titr'>انتخاب برند خودرو ها</h2>
      <div className="brand-wrapper">
        <button className="nav-btn" onClick={() => scroll('left')}>&lt;</button>

        <div className="brand-scroll-container" ref={containerRef}>
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="brand-card"
              onClick={() => handleBrandClick(brand.id)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={
                  brand.imagesbrand.startsWith('http')
                    ? brand.imagesbrand
                    : `https://api.yadakkan.ir${brand.imagesbrand.startsWith('/') ? '' : '/'}${brand.imagesbrand}`
                }
                alt={brand.title}
              />
              <p>{brand.title}</p>
            </div>
          ))}
        </div>

        <button className="nav-btn" onClick={() => scroll('right')}>&gt;</button>
      </div>

      <div className='gg'>
        <div className="main-wrapper">
          <div className="grid-container">
            <div className="card">
              <img className="imagesone" src="/images/file_000000003748820abb24f97bbb36dea6.webp" alt="محصول ۱" />
              <button className="overlay-btn">مشاهده و خرید</button>
            </div>
            <div className="card">
              <img className="imagestwo" src="/images/file_00000000253c820ab187ce7d245f3652.webp" alt="محصول ۲" />
              <button className="overlay-btn">مشاهده و خرید</button>
            </div>
            <div className="card">
              <img className="imagesthree" src="/images/file_000000008c18820a9a931ed95af8a718.webp" alt="محصول ۳" />
              <button className="overlay-btn">مشاهده و خرید</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
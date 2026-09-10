import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Category.css";

const API_BASE_URL = "http://api.yadakkan.ir/api";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/categories/`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCategories(res.data);
        }
      })
      .catch((err) => console.error("خطا در دریافت دسته‌بندی‌ها:", err));
  }, []);

  if (!categories || categories.length === 0) {
    return null;
  }

  const handleCategoryClick = (categoryId) => {
    navigate(`/shops?category=${categoryId}`);
  };

  return (
    <div className="category-wrapper" dir="rtl">
      <div className="category-scroll">

        {categories.map((cat) => (
          <div
            className="category-item"
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            style={{ cursor: "pointer" }}
          >
            <div className="category-image">
              <img
                src={cat.imgcategory ? (cat.imgcategory.startsWith("http") ? cat.imgcategory : `http://api.yadakkan.ir${cat.imgcategory}`) : "/images/products/product-placeholder.jpg"}
                alt={cat.title}
              />
            </div>
            <span className="category-title">{cat.title}</span>
            <span className="category-underline"></span>
          </div>
        ))}

        <div
          className="category-item category-item--all"
          onClick={() => navigate("/shops")}
          style={{ cursor: "pointer" }}
        >
          <div className="category-icon">
            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <rect x="8" y="8" width="20" height="20" rx="6" fill="none" stroke="#F2F2F2" strokeWidth="3.2" />
              <rect x="36" y="8" width="20" height="20" rx="6" fill="none" stroke="#C9A15B" strokeWidth="3.2" />
              <rect x="8" y="36" width="20" height="20" rx="6" fill="none" stroke="#F2F2F2" strokeWidth="3.2" />
              <rect x="36" y="36" width="20" height="20" rx="6" fill="none" stroke="#C9A15B" strokeWidth="3.2" />
            </svg>
          </div>
          <span className="category-title">همه دسته‌ها</span>
          <span className="category-underline"></span>
        </div>

      </div>
    </div>
  );
}
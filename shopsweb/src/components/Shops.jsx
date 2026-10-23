import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Shops.css";
import Navbarpage from './Navbarpage.jsx';
import SEO from './SEO.jsx';

const API_BASE_URL = "https://webflow.pythonanywhere.com//api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

function getRelativeTime(dateString) {
  if (!dateString) return "چندی پیش";

  const now = new Date();
  const past = new Date(dateString);

  if (isNaN(past.getTime())) return "چندی پیش";

  const diffInSeconds = Math.floor((now - past) / 1000);
  if (diffInSeconds < 30) return "همین الان";

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes.toLocaleString('fa-IR')} دقیقه پیش`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours.toLocaleString('fa-IR')} ساعت پیش`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "دیروز";
  if (diffInDays < 7) return `${diffInDays.toLocaleString('fa-IR')} روز پیش`;

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks.toLocaleString('fa-IR')} هفته پیش`;

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths.toLocaleString('fa-IR')} ماه پیش`;

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears.toLocaleString('fa-IR')} سال پیش`;
}

export default function Shops() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const [selectedBrand, setSelectedBrand] = useState(
    searchParams.get("brand") || searchParams.get("brands") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );

  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    const brandFromUrl = searchParams.get("brand") || searchParams.get("brands");

    if (categoryFromUrl !== null) setSelectedCategory(categoryFromUrl);
    if (brandFromUrl !== null) setSelectedBrand(brandFromUrl);
  }, [searchParams]);

  useEffect(() => {
    api
      .get("/brands/")
      .then((res) => setBrands(res.data))
      .catch((err) => console.error("خطا در دریافت برندها:", err));

    api
      .get("/categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("خطا در دریافت دسته‌بندی‌ها:", err));
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setLoading(true);

      try {
        const params = {};
        if (search.trim()) params.search = search.trim();
        if (selectedBrand) params.brand = selectedBrand;
        if (selectedCategory) params.category = selectedCategory;
        if (sort) params.sort = sort;

        const response = await api.get("/products/", {
          params,
          signal: controller.signal,
        });

        setProducts(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        if (!axios.isCancel(error)) {
          setProducts([]);
        }
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search, selectedBrand, selectedCategory, sort]);

  const changeSearch = (value) => {
    setSearch(value);
  };

  const clearAllFilters = () => {
    setSearch("");
    setSelectedBrand("");
    setSelectedCategory("");
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((item) => item !== id));
      return;
    }
    setFavorites([...favorites, id]);
  };

  const selectedBrandName = brands.find((b) => String(b.id) === String(selectedBrand))?.title;
  const selectedCategoryName = categories.find((c) => String(c.id) === String(selectedCategory))?.title;

  let dynamicTitle = "فروشگاه قطعات خودرو - همه محصولات";
  let dynamicDescription = "خرید انواع قطعات یدکی خودرو شامل سیستم ترمز، موتور، تعلیق و برق خودرو با بهترین قیمت در یدک‌کان.";
  let dynamicKeywords = "خرید قطعه خودرو, لوازم یدکی, قطعات موتور, لنت ترمز, فیلتر خودرو, یدک کان, یدکان";

  if (selectedBrandName) {
    dynamicTitle = `لوازم یدکی ${selectedBrandName} - خرید آنلاین`;
    dynamicDescription = `خرید انواع لوازم یدکی و قطعات اصلی ${selectedBrandName} با بهترین قیمت بازار و ضمانت اصالت کالا از یدک‌کان.`;
    dynamicKeywords = `لوازم یدکی ${selectedBrandName}, قطعات ${selectedBrandName}, یدکی ${selectedBrandName}, خرید قطعه ${selectedBrandName}`;
  } else if (selectedCategoryName) {
    dynamicTitle = `${selectedCategoryName} - قطعات یدکی خودرو`;
    dynamicDescription = `خرید انواع ${selectedCategoryName} خودرو با بهترین قیمت و ضمانت اصالت کالا از یدک‌کان.`;
    dynamicKeywords = `${selectedCategoryName}, خرید ${selectedCategoryName}, قطعات ${selectedCategoryName}`;
  }

  const canonicalUrl = selectedBrand
    ? `/shops?brand=${selectedBrand}`
    : selectedCategory
      ? `/shops?category=${selectedCategory}`
      : "/shops";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "صفحه اصلی",
        "item": "https://yadakkan.ir/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": selectedBrandName || selectedCategoryName || "محصولات",
        "item": `https://yadakkan.ir${canonicalUrl}`
      }
    ]
  };

  return (
    <div>
      <SEO
        title={dynamicTitle}
        description={dynamicDescription}
        keywords={dynamicKeywords}
        canonical={canonicalUrl}
        jsonLd={breadcrumbSchema}
      />
      <Navbarpage />
      <main className="shops-page" dir="rtl">
        <section className="shops-header">
          <div className="shops-container shops-header-inner">
            <div>
              <div className="shops-breadcrumb">
                <Link to="/">صفحه اصلی</Link>
                <span>‹</span>
                <strong>محصولات</strong>
              </div>

              <h1>{selectedBrandName ? `لوازم یدکی ${selectedBrandName}` : selectedCategoryName || "فروشگاه قطعات خودرو"}</h1>
              <p>خرید آنلاین انواع قطعات اصلی با بهترین قیمت و ضمانت اصالت کالا</p>
            </div>

            <div className="shops-header-box">
              <svg viewBox="0 0 24 24">
                <path d="M3 5h18" />
                <path d="M5 5l2 14h10l2-14" />
                <path d="M8 9h8" />
                <path d="M8 13h8" />
                <circle cx="9" cy="21" r="1" />
                <circle cx="17" cy="21" r="1" />
              </svg>
            </div>
          </div>
        </section>

        <section className="shops-container shops-content">
          <aside className="shops-sidebar">
            <div className="shops-sidebar-card shops-search-card">
              <h2>جستجوی محصول</h2>

              <div className="shops-search-box">
                <svg viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m16.5 16.5 4 4" />
                </svg>

                <input
                  type="search"
                  value={search}
                  onChange={(event) => changeSearch(event.target.value)}
                  placeholder="نام یا کد قطعه..."
                />

                {search && (
                  <button type="button" onClick={() => changeSearch("")}>
                    ×
                  </button>
                )}
              </div>

              <small>نام قطعه یا مدل خودروی خود را وارد کنید</small>
            </div>

            <div className="shops-sidebar-card">
              <div className="shops-side-title">
                <h2>دسته‌بندی‌ها</h2>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedCategory("")}
                >
                  پاک‌سازی
                </span>
              </div>

              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={String(selectedCategory) === String(cat.id) ? "active-filter" : ""}
                  onClick={() =>
                    setSelectedCategory(String(cat.id) === String(selectedCategory) ? "" : String(cat.id))
                  }
                >
                  <span className="shops-side-icon">
                    <svg viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="8" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </span>
                  <span>{cat.title}</span>
                </button>
              ))}
            </div>

            <div className="shops-sidebar-card">
              <div className="shops-side-title">
                <h2>برندها</h2>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedBrand("")}
                >
                  همه برندها
                </span>
              </div>

              <div className="shops-brands">
                {brands.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    className={String(selectedBrand) === String(b.id) ? "active-brand" : ""}
                    onClick={() =>
                      setSelectedBrand(String(b.id) === String(selectedBrand) ? "" : String(b.id))
                    }
                  >
                    {b.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="shops-delivery">
              <div className="shops-delivery-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M3 6h12v10H3z" />
                  <path d="M15 10h3l3 3v3h-6z" />
                  <circle cx="7" cy="19" r="2" />
                  <circle cx="18" cy="19" r="2" />
                </svg>
              </div>

              <div>
                <strong>ارسال سریع و مطمئن</strong>
                <span>تحویل اکسپرس در کوتاه‌ترین زمان</span>
              </div>
            </div>
          </aside>

          <section className="shops-products">
            <div className="shops-products-top">
              <div>
                <h2>لیست محصولات</h2>
                <p>نمایش قطعات موجود در انبار</p>
              </div>

              <div className="shops-sort">
                <label htmlFor="sort">مرتب‌سازی بر اساس:</label>

                <select
                  id="sort"
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                >
                  <option value="newest">جدیدترین</option>
                  <option value="cheap">ارزان‌ترین</option>
                  <option value="expensive">گران‌ترین</option>
                </select>
              </div>
            </div>

            <div className="shops-product-grid">
              {loading ? (
                <>
                  <div className="shops-loading-card" />
                  <div className="shops-loading-card" />
                  <div className="shops-loading-card" />
                  <div className="shops-loading-card" />
                </>
              ) : products.length ? (
                products.map((product) => (
                  <article className="shops-product-card" key={product.id}>
                    <div className="shops-product-top">
                      <span className="shops-product-badge">
                        {product.category_name || "قطعه اصلی"}
                      </span>

                      <button
                        type="button"
                        className={
                          favorites.includes(product.id)
                            ? "shops-heart active"
                            : "shops-heart"
                        }
                        onClick={() => toggleFavorite(product.id)}
                        aria-label="افزودن به علاقه‌مندی"
                      >
                        <svg viewBox="0 0 24 24">
                          <path d="M20.8 8.7c0 5-8.8 10.2-8.8 10.2S3.2 13.7 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z" />
                        </svg>
                      </button>
                    </div>

                    <Link
                      to={`/product/${product.slug || product.id}`}
                      className="shops-product-image"
                    >
                      <img
                        src={
                          product.image1 ||
                          "/images/products/product-placeholder.jpg"
                        }
                        alt={product.title}
                        loading="lazy"
                      />
                    </Link>

                    <div className="shops-product-details">
                      <Link
                        to={`/product/${product.slug || product.id}`}
                        className="shops-product-name"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        {product.title}
                      </Link>

                      <div className="shops-product-meta">
                        <span className="shops-product-brand">
                          {product.brand_name || "قطعات اصلی"}
                        </span>
                        <span className="shops-product-time">
                          • {getRelativeTime(product.created_at || product.date)}
                        </span>
                      </div>

                      <div className="shops-product-price">
                        <strong>
                          {Number(product.price || 0).toLocaleString("fa-IR")}
                        </strong>
                        <span>ریال</span>
                      </div>

                      <Link
                        to={`/product/${product.slug || product.id}`}
                        className="shops-add-cart"
                        style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}
                      >
                        <span>مشاهده و خرید</span>
                      </Link>
                    </div>
                  </article>
                ))
              ) : (
                <div className="shops-empty">
                  <div className="shops-empty-icon">
                    <svg viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="7" />
                      <path d="m16.5 16.5 4 4" />
                    </svg>
                  </div>
                  <h2>محصولی یافت نشد</h2>
                  <p>عبارت دیگری را جستجو کنید یا فیلترها را بازنشانی کنید.</p>
                  <button type="button" onClick={clearAllFilters}>
                    مشاهده همه محصولات
                  </button>
                </div>
              )}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

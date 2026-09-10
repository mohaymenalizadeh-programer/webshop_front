import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "../styles/Navbarpage.css";

const toPersianDigits = (num) => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/[0-9]/g, (d) => persianDigits[d]);
};

export default function Navbarpage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showBottomNav, setShowBottomNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowBottomNav(false);
      } else {
        setShowBottomNav(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <div
        className={`mobile-overlay ${isSidebarOpen ? "active" : ""}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <aside className={`mobile-sidebar ${isSidebarOpen ? "active" : ""}`}>
        <div className="sidebar-header">
          <button
            className="close-sidebar-btn"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="بستن منو"
          >
            ✕
          </button>
        </div>
        <nav className="mobile-nav-links">
          <Link to="/" onClick={() => setIsSidebarOpen(false)}>صفحه اصلی</Link>
          <Link to="/shops" onClick={() => setIsSidebarOpen(false)}>محصولات</Link>
          <Link to="/aboutme" onClick={() => setIsSidebarOpen(false)}>درباره ما</Link>
          <Link to="/callme" onClick={() => setIsSidebarOpen(false)}>تماس با ما</Link>
        </nav>
      </aside>

      <header className="navbar-page" dir="rtl">
        <div className="navbar-top">
          <div className="navbar-top-inner">
            <div className="navbar-top-right">
              <span>ضمانت اصالت و کیفیت کالا</span>
              <span>ارسال به سراسر ایران</span>
              <span>پشتیبانی ۲۴/۷</span>
            </div>
            <div className="navbar-top-left">
              <Link to="/contact">تماس با ما</Link>
              <Link to="/about">درباره ما</Link>
            </div>
          </div>
        </div>

        <div className={`navbar-main ${showBottomNav ? "nav-visible" : "nav-hidden"}`}>
          <div className="navbar-main-inner">
            <button
              className="hamburger-menu-btn"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="باز کردن منو"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <Link className="navbar-logo" to="/">
              <span className="navbar-logo-mark">
            <div className="logo">
                <Link to="/">
                  <img src="/images/file_00000000c6b881f4b5dd4069c83c792c.png" alt="یدک‌کان - فروشگاه تخصصی قطعات یدکی خودرو" />
                </Link>
              </div>
              </span>
            </Link>

            <nav className="navbar-links" aria-label="منوی اصلی">
              <Link className="is-active" to="/">صفحه اصلی</Link>
              <Link to="/shops">محصولات</Link>
              <Link to="/aboutme">درباره ما</Link>
              <Link to="/callme">تماس باما</Link>
            </nav>

            <div className="navbar-actions">
              {isLoggedIn ? (
                <div className="navbar-user-menu" ref={userMenuRef}>
                  <button
                    type="button"
                    className="navbar-account"
                    aria-expanded={isUserMenuOpen}
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="12" cy="8" r="3.5" />
                      <path d="M5 20c.8-3.4 3.1-5 7-5s6.2 1.6 7 5" />
                    </svg>
                    <span>حساب کاربری</span>
                    <svg className="navbar-user-chevron" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="m7 9 5 5 5-5" />
                    </svg>
                  </button>

                  <ul className={`navbar-user-dropdown ${isUserMenuOpen ? "open" : ""}`}>
                    <li>
                      <Link to="/accounts" onClick={() => setIsUserMenuOpen(false)}>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <circle cx="12" cy="8" r="3.5" />
                          <path d="M5 20c.8-3.4 3.1-5 7-5s6.2 1.6 7 5" />
                        </svg>
                        <span>مشاهده حساب کاربری</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/orders" onClick={() => setIsUserMenuOpen(false)}>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M3 3h18v4H3zM3 7v14h18V7M8 12h8" />
                        </svg>
                        <span>سفارش های من</span>
                      </Link>
                    </li>
                    <li>
                      <button type="button" className="navbar-user-logout" onClick={handleLogout}>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                        </svg>
                        <span>خروج از حساب کاربری</span>
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link className="navbar-account" to="/authform">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M5 20c.8-3.4 3.1-5 7-5s6.2 1.6 7 5" />
                  </svg>
                  <span>ورود / ثبت‌نام</span>
                </Link>
              )}

              <Link className="navbar-cart" to="/cartPage" aria-label="سبد خرید">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 4h2l2.2 11h10.7l2-8H6" />
                  <circle cx="9" cy="20" r="1.5" />
                  <circle cx="17" cy="20" r="1.5" />
                </svg>
                <b>{toPersianDigits(cartCount)}</b>
              </Link>
            </div>
          </div>
        </div>

        <div className="navbar-search-row">
          <div className="navbar-search-inner">
            <div className="navbar-category">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 5h16M4 12h16M4 19h16" />
              </svg>
              <span>همه دسته‌بندی‌ها</span>
              <svg className="navbar-chevron" viewBox="0 0 24 24" aria-hidden="true">
                <path d="m7 9 5 5 5-5" />
              </svg>
            </div>
            <form className="navbar-search" action="/shops" method="get">
              <input
                name="search"
                type="search"
                placeholder="نام محصول، برند یا قطعه مورد نظر را جستجو کنید..."
                aria-label="جستجوی محصولات"
              />
              <button type="submit" aria-label="جستجو">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m16.5 16.5 4 4" />
                </svg>
                <span>جستجو</span>
              </button>
            </form>
          </div>
        </div>
      </header>
    </>
  );
}
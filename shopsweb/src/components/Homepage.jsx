import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "../styles/Navbar.css";

const HeadphonesIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <path d="M4 14h2.5v4H4.8A1.8 1.8 0 0 1 3 16.2v-.4A1.8 1.8 0 0 1 4.8 14ZM20 14h-2.5v4h1.7a1.8 1.8 0 0 0 1.8-1.8v-.4A1.8 1.8 0 0 0 20 14Z" />
  </svg>
);

const TruckIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M3 6.5h11v10H3z" />
    <path d="M14 10h3.6l3.4 3.2v3.3H14z" />
    <circle cx="7" cy="18" r="1.8" />
    <circle cx="18" cy="18" r="1.8" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 3.5 20 6v5.3c0 4.7-3.1 7.9-8 9.2-4.9-1.3-8-4.5-8-9.2V6l8-2.5Z" />
    <path d="m8.7 12.2 2.1 2.1 4.6-4.7" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 24 24">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" className="user-menu-chevron">
    <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const OrdersIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M3 3h18v4H3zM3 7v14h18V7M8 12h8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const toPersianDigits = (num) => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/[0-9]/g, (d) => persianDigits[d]);
};

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    navigate("/");
  };

  return (
    <div className="user-menu-wrapper" ref={menuRef}>
      <button
        className="glass-btn glass-btn-rect user-menu-trigger"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <UserIcon />
        <span>حساب کاربری</span>
        <ChevronDownIcon />
      </button>

      <ul className={`user-dropdown-menu ${isOpen ? "open" : ""}`}>
        <li>
          <Link to="/accounts" className="user-dropdown-item" onClick={() => setIsOpen(false)}>
            <UserIcon />
            <span>مشاهده حساب کاربری</span>
          </Link>
        </li>
        <li>
          <Link to="/accounts" className="user-dropdown-item" onClick={() => setIsOpen(false)}>
            <OrdersIcon />
            <span>سفارش های من</span>
          </Link>
        </li>
        <li>
          <button type="button" className="user-dropdown-item user-dropdown-logout" onClick={handleLogout}>
            <LogoutIcon />
            <span>خروج از حساب کاربری</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default function Homepage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { isLoggedIn } = useAuth();
  const { cartCount } = useCart();

  const NAV_LINKS = [
    { id: 1, label: "صفحه اصلی", path: "/" },
    { id: 2, label: "محصولات", path: "/shop" },
    { id: 3, label: "درباره ما", path: "/aboutme" },
    { id: 4, label: "تماس با ما", path: "/callme" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div>
      <div>
        <header className="navbar">
          
          <div className="topbar">
            
            <div className="topbar-container">
            <div className="logo">
                <Link to="/">
                  <img src="/images/file_00000000c6b881f4b5dd4069c83c792c.png" alt="یدک‌کان - فروشگاه تخصصی قطعات یدکی خودرو" />
                </Link>
              </div>
              <div className="topbar-services">
                <div className="service-item" title="پشتیبانی ۲۴/۷">
                  <HeadphonesIcon />
                  <span>پشتیبانی ۲۴/۷</span>
                </div>

                <div className="service-item" title="ارسال به سراسر ایران">
                  <TruckIcon />
                  <span>ارسال به سراسر ایران</span>
                </div>

                <div className="service-item" title="ضمانت اصالت و کیفیت کالا">
                  <ShieldIcon />
                  <span>ضمانت اصالت و کیفیت کالا</span>
                </div>
              </div>

            </div>
          </div>
        </header>

        <div className="img_covers">
          <nav className={`navigation ${isVisible ? "nav-visible" : "nav-hidden"}`} aria-label="منوی اصلی">
            <div className="navigation-container">

              <div className="glass-actions">
                {isLoggedIn ? (
                  <UserMenu />
                ) : (
                  <Link to="/authform" className="glass-btn glass-btn-rect">
                    <UserIcon />
                    <span>ورود / ثبت‌نام</span>
                  </Link>
                )}

                <Link to="/cartPage" className="glass-btn glass-btn-circle" title="سبد خرید">
                  <CartIcon />
                  <span className="cart-badge">{toPersianDigits(cartCount)}</span>
                </Link>
              </div>


              <ul className="nav-list desktop-menu">
                {NAV_LINKS.map((link) => (
                  <li key={link.id} className="nav-item">
                    <Link to={link.path} className="nav-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <button 
                className="glass-btn glass-btn-circle hamburger-btn" 
                onClick={toggleMobileMenu}
                aria-label="منوی موبایل"
              >
                <MenuIcon />
              </button>
            </div>
          </nav>

          <div className="search-section-wrapper">
            <div className="search-bar-wrapper">
              <div className="search-box">
                <button className="search-btn" aria-label="جستجو">
                  <SearchIcon />
                </button>
                <input 
                  type="text" 
                  placeholder="جستجوی قطعه مورد نظر..." 
                  className="search-input"
                />
              </div>
            </div>
          </div>

          <div className="hero-content-wrapper">
            <div className="hero-content">
              <h1 className="hero-title">
                قطعات اصلی خودرو
                <span className="highlight-text">کیفیت بالا، قیمت مناسب</span>
              </h1>

              <p className="hero-subtitle">
                تضمین اصالت کالا با ضمانت بازگشت وجه
              </p>

              <Link to="/shop" className="cta-button">
                <span>مشاهده محصولات</span>
                <ArrowLeftIcon />
              </Link>
            </div>
          </div>

          <div 
            className={`mobile-overlay ${isMobileMenuOpen ? "active" : ""}`} 
            onClick={toggleMobileMenu} 
          />

          <aside className={`mobile-sidebar ${isMobileMenuOpen ? "active" : ""}`}>
            <div className="sidebar-header">
              <button className="glass-btn glass-btn-circle close-btn" onClick={toggleMobileMenu}>
                <CloseIcon />
              </button>
            </div>
            <ul className="mobile-nav-list">
              {NAV_LINKS.map((link) => (
                <li key={link.id} className="mobile-nav-item">
                  <Link to={link.path} className="mobile-nav-link" onClick={toggleMobileMenu}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
      
      <div className="coniners">
        <div className="icon-guarantee">
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 4 C34 8 40 11 47 12 C50 12.5 52 13 52 13 C52 13 53 24 53 28 C53 44 44 55 32 60 C20 55 11 44 11 28 C11 24 12 13 12 13 C12 13 14 12.5 17 12 C24 11 30 8 32 4 Z" fill="none" stroke="#F0F1F0" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round"/>
            <path d="M22 31 L29.5 39 L43 24" fill="none" stroke="#D9B85A" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="text_icons">
            <p className="pargrafone">ضمانت و اصالت کالا</p>
            <p className="pargraftwo">ضمانت هفت روز بازگشت کالا</p>
          </div>
        </div>
        <div className="icon-price">
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="13" r="2.6" fill="none" stroke="#F0F1F0" strokeWidth="2.4"/>
            <path d="M32 15.5 V19" stroke="#F0F1F0" strokeWidth="2.4" strokeLinecap="round"/>
            <path d="M24 19 C20 22 20 25 22 27 C15 31 10 38 10 46 C10 55 20 60 32 60 C44 60 54 55 54 46 C54 38 49 31 42 27 C44 25 44 22 40 19 C36.5 21.5 27.5 21.5 24 19 Z" fill="none" stroke="#F0F1F0" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round"/>
            <path d="M32 36 L40 45 L32 54 L24 45 Z" fill="none" stroke="#D9B85A" strokeWidth="2.8" strokeLinejoin="round"/>
            <circle cx="32" cy="45" r="2.3" fill="#D9B85A"/>
          </svg>
          <div className="text_icons">
            <p className="pargrafone">بهترین قیمت بازار</p>
            <p className="pargraftwo">مقایسه و تضمین پایین ترین قیمت</p>
          </div>
        </div>
        <div className="icon-shipping">
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 45 V38 H8" stroke="#F0F1F0" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="4" y1="24" x2="18" y2="24" stroke="#F0F1F0" strokeWidth="2.4" strokeLinecap="round"/>
            <line x1="4" y1="30" x2="14" y2="30" stroke="#F0F1F0" strokeWidth="2.4" strokeLinecap="round"/>
            <line x1="4" y1="36" x2="10" y2="36" stroke="#F0F1F0" strokeWidth="2.4" strokeLinecap="round"/>
            <path d="M8 14 H38 V45 H8 Z" fill="none" stroke="#F0F1F0" strokeWidth="2.6" strokeLinejoin="round"/>
            <path d="M38 22 H48 L58 32 V45 H38 Z" fill="none" stroke="#F0F1F0" strokeWidth="2.6" strokeLinejoin="round"/>
            <path d="M41 25 H47 L54 32 H41 Z" fill="none" stroke="#D9B85A" strokeWidth="2.2" strokeLinejoin="round"/>
            <path d="M44.5 26.5 a3 3 0 1 0 3 3" fill="none" stroke="#D9B85A" strokeWidth="1.6" strokeLinecap="round"/>
            <circle cx="18" cy="49" r="5.5" fill="none" stroke="#F0F1F0" strokeWidth="2.6"/>
            <circle cx="49" cy="49" r="5.5" fill="none" stroke="#F0F1F0" strokeWidth="2.6"/>
            <line x1="23.5" y1="49" x2="43.5" y2="49" stroke="#F0F1F0" strokeWidth="2.6"/>
          </svg>
          <div className="text_icons">
            <p className="pargrafone">ارسال سریع</p>
            <p className="pargraftwo">ارسال به سرار ایران</p>
          </div>

        </div>
        <div className="icon-support">
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 34 V29 C10 16 20 6 32 6 C44 6 54 16 54 29 V34" fill="none" stroke="#F0F1F0" strokeWidth="2.8" strokeLinecap="round"/>
            <rect x="6" y="32" width="12" height="20" rx="5" fill="none" stroke="#F0F1F0" strokeWidth="2.6"/>
            <rect x="9" y="37" width="6" height="10" rx="1.5" fill="none" stroke="#D9B85A" strokeWidth="1.8"/>
            <rect x="46" y="32" width="12" height="20" rx="5" fill="none" stroke="#F0F1F0" strokeWidth="2.6"/>
            <rect x="49" y="37" width="6" height="10" rx="1.5" fill="none" stroke="#D9B85A" strokeWidth="1.8"/>
            <path d="M52 47 V50 C52 55.5 47.5 58 41 58 H35" fill="none" stroke="#F0F1F0" strokeWidth="2.6" strokeLinecap="round"/>
            <circle cx="32" cy="58" r="3" fill="none" stroke="#F0F1F0" strokeWidth="2.4"/>
          </svg>
          <div className="text_icons">
            <p className="pargrafone">پشتیبانی تخصصی</p>
            <p className="pargraftwo">مشاوره رایگان قبل از خرید</p>
          </div>

        </div>
      </div>
    </div>
  );
}                                                                                                                                                                                                                                                                                                                                                                                                                                                    
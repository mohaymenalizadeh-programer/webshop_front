import React, { useState } from "react";
import "../styles/Callme.css";
import Navbarpage from "./Navbarpage";
import SEO from "./SEO.jsx";

export default function Callme() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://webflow.pythonanywhere.com/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("پیام شما با موفقیت ارسال شد!");
        setForm({ name: "", phone: "", subject: "", message: "" });
      } else {
        alert("خطا در ارسال پیام، لطفاً دوباره تلاش کنید.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("خطا در ارتباط با سرور رخ داد.");
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "صفحه اصلی", "item": "https://yadakkan.ir/" },
      { "@type": "ListItem", "position": 2, "name": "تماس با ما", "item": "https://yadakkan.ir/contact" }
    ]
  };

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "تماس با یدک‌کان",
    "url": "https://yadakkan.ir/contact"
  };

  return (
    <div>
      <SEO
        title="تماس با ما"
        description="راه‌های ارتباط با یدک‌کان (یدکان): شماره تماس، ایمیل، آدرس فروشگاه و فرم تماس آنلاین برای پیگیری سفارش و مشاوره خرید قطعات یدکی."
        keywords="تماس با یدک کان, تماس با یدکان, شماره تماس یدک کان, آدرس یدک کان"
        canonical="/contact"
        jsonLd={[breadcrumbSchema, contactPageSchema]}
      />
      <Navbarpage />
      <main className="callme-page" dir="rtl">
        <section className="callme-hero">
          <img
            className="callme-hero-image"
            src="https://example.com/contact-hero.jpg"
            alt=""
          />

          <div className="callme-container callme-hero-content">
            <div className="callme-breadcrumb">
              <span>صفحه اصلی</span>
              <svg viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" />
              </svg>
              <strong>تماس با ما</strong>
            </div>

            <div className="callme-hero-text">
              <h1>تماس با ما</h1>
              <p>ما همیشه آماده پاسخگویی به سوالات و نظرات شما هستیم</p>
              <span></span>
            </div>
          </div>
        </section>

        <section className="callme-content">
          <div className="callme-container callme-grid">

            <div className="callme-form-box">
              <div className="callme-form-heading">
                <h2>فرم تماس با ما</h2>
                <p>
                  در صورت داشتن هرگونه سوال، پیشنهاد یا مشکل،
                  از طریق فرم زیر با ما در ارتباط باشید.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="callme-form">
                <label className="callme-field">
                  <span>نام و نام خانوادگی</span>
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="نام و نام خانوادگی خود را وارد کنید"
                      autoComplete="name"
                      required
                    />
                    <svg viewBox="0 0 24 24">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 21c.7-4 3.4-6 8-6s7.3 2 8 6" />
                    </svg>
                  </div>
                </label>

                <label className="callme-field">
                  <span>شماره تماس</span>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="شماره تماس خود را وارد کنید"
                      autoComplete="tel"
                      inputMode="tel"
                      required
                    />
                    <svg viewBox="0 0 24 24">
                      <path d="M6.6 3.8l2.1-.5c.7-.2 1.4.2 1.7.9l1.1 2.8c.2.6 0 1.3-.5 1.7-1.4 1.1 1 2.7 2.1 4.8 3.1l1.1-1.4c.4-.5 1.1-.7 1.7-.5l2.8 1.1c.7.3 1.1 1 .9 1.7l-.5 2.1c-.2.9-1 1.5-1.9 1.5C11.9 19.1 4.9 12.1 4.9 3.9c0-.9.6-1.7 1.7-2.1z" />
                    </svg>
                  </div>
                </label>

                <label className="callme-field">
                  <span>موضوع پیام</span>
                  <div>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">موضوع پیام را انتخاب کنید</option>
                      <option value="order">پیگیری سفارش</option>
                      <option value="product">مشاوره خرید محصول</option>
                      <option value="support">پشتیبانی</option>
                      <option value="complaint">انتقاد و پیشنهاد</option>
                      <option value="other">سایر موارد</option>
                    </select>

                    <svg viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </label>

                <label className="callme-field callme-message">
                  <span>متن پیام</span>
                  <div>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="پیام خود را وارد کنید..."
                      rows="5"
                      required
                    ></textarea>

                    <svg viewBox="0 0 24 24">
                      <path d="M4 5h16v11H8l-4 4V5z" />
                      <path d="M8 9h8M8 12h5" />
                    </svg>
                  </div>
                </label>

                <button type="submit" className="callme-submit">
                  ارسال پیام
                  <svg viewBox="0 0 24 24">
                    <path d="M3 11l18-8-8 18-2-8-8-2z" />
                  </svg>
                </button>
              </form>
            </div>

            <div className="callme-left">
              <div className="callme-info-grid">
                
                {/* تلفن */}
                <a href="tel:02112345678" className="callme-info-card">
                  <div className="callme-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M6.6 3.8l2.1-.5c.7-.2 1.4.2 1.7.9l1.1 2.8c.2.6 0 1.3-.5 1.7-1.4 1.1 1 2.7 2.1 4.8 3.1l1.1-1.4c.4-.5 1.1-.7 1.7-.5l2.8 1.1c.7.3 1.1 1 .9 1.7l-.5 2.1c-.2.9-1 1.5-1.9 1.5C11.9 19.1 4.9 12.1 4.9 3.9c0-.9.6-1.7 1.7-2.1z" />
                    </svg>
                  </div>
                  <div>
                    <h3>شماره تماس</h3>
                    <strong>09906056570</strong>
                  </div>
                </a>

                {/* ایمیل */}
                <a href="mailto:info@yadakkan.ir" className="callme-info-card">
                  <div className="callme-icon">
                    <svg viewBox="0 0 24 24">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M4 7l8 6 8-6" />
                    </svg>
                  </div>
                  <div>
                    <h3>ایمیل</h3>
                    <strong>info@gmail.com</strong>
                    <p>پاسخگویی در کمتر از ۲۴ ساعت</p>
                  </div>
                </a>

                {/* آدرس */}
                <div className="callme-info-card">
                  <div className="callme-icon">
                    <svg viewBox="0 0 24 24">
                      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </div>
                  <div>
                    <h3>آدرس</h3>
                    <strong>تهران _ سه راه افسریه _ نمایندگی ایساکو</strong>
                  </div>
                </div>

                {/* تلگرام */}
                <a href="https://t.me/Soro_S77" target="_blank" rel="noopener noreferrer" className="callme-info-card">
                  <div className="callme-icon" style={{ color: '#229ED9' }}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.99 1.27-5.62 3.72-.53.36-1.01.54-1.44.53-.47-.02-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.75 3.99-1.74 6.65-2.89 7.98-3.46 3.8-1.63 4.59-1.91 5.1-1.92.11 0 .37.03.54.17.14.12.18.28.2.4-.01.07.01.21 0 .34z"/>
                    </svg>
                  </div>
                  <div>
                    <h3>تلگرام</h3>
                    <strong>@Soro_S77</strong>
                    <p>پشتیبانی و ارتباط مستقیم</p>
                  </div>
                </a>

                {/* واتساپ */}
                <a href="https://wa.me/989906056570" target="_blank" rel="noopener noreferrer" className="callme-info-card">
                  <div className="callme-icon" style={{ color: '#25D366' }}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.15-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.371l-.361-.214-3.732.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.406 0 0 5.405 0 12.05c0 2.126.556 4.202 1.613 6.024L0 24l6.095-1.595a11.802 11.802 0 005.952 1.603h.005c6.643 0 12.05-5.404 12.05-12.05 0-3.218-1.252-6.244-3.525-8.517"/>
                    </svg>
                  </div>
                  <div>
                    <h3>واتساپ</h3>
                    <strong>09906056570</strong>
                    <p>پشتیبانی و مشاوره متنی</p>
                  </div>
                </a>

                {/* روبیکا */}
                <a href="https://rubika.ir/admin_storre" target="_blank" rel="noopener noreferrer" className="callme-info-card">
                  <div className="callme-icon" style={{ color: '#3A74DF' }}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 14.5h-2v-5h2zm0-7h-2V7.5h2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3>روبیکا</h3>
                    <strong>@admin_storre</strong>
                    <p>ارتباط از طریق روبیکا</p>
                  </div>
                </a>

                {/* بله */}
                <a href="https://ble.ir/mrym_s77" target="_blank" rel="noopener noreferrer" className="callme-info-card">
                  <div className="callme-icon" style={{ color: '#00B386' }}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm4.5 13.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-7 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm3.5-5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z"/>
                    </svg>
                  </div>
                  <div>
                    <h3>پیام‌رسان بله</h3>
                    <strong>@mrym_s77</strong>
                    <p>ارتباط از طریق اپلیکیشن بله</p>
                  </div>
                </a>

              </div>

              <div className="callme-map">
                <img
                  src="https://example.com/map.jpg"
                  alt="موقعیت فروشگاه یدک‌کان روی نقشه"
                />

                <div className="callme-map-overlay">
                  <div className="callme-location-card">
                    <div className="callme-location-pin">
                      <svg viewBox="0 0 24 24">
                        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                    </div>

                    <div>
                      <strong>یدک‌کان</strong>
                      <span>تهران، سه راه افسریه، نمایندگی ایساکو</span>
                    </div>
                  </div>

                  <a href="#" className="callme-map-button">
                    مشاهده در نقشه
                    <svg viewBox="0 0 24 24">
                      <path d="M3 11l18-8-8 18-2-8-8-2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}

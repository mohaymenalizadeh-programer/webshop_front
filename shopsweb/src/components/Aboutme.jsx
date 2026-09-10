import React from "react";
import "../styles/Aboutme.css";
import Navbarpage from "./Navbarpage";
import SEO from "./SEO.jsx";

export default function Aboutme() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "صفحه اصلی", "item": "https://yadakkan.ir/" },
      { "@type": "ListItem", "position": 2, "name": "درباره ما", "item": "https://yadakkan.ir/about" }
    ]
  };

  return (
    <div>
      <SEO
        title="درباره ما"
        description="یدک‌کان (یدکان)، فروشگاه تخصصی قطعات یدکی خودرو با سال‌ها تجربه، ضمانت اصالت کالا و بیش از ۵۰ هزار مشتری راضی در سراسر ایران."
        keywords="درباره یدک کان, درباره یدکان, فروشگاه قطعات خودرو, یدک کان"
        canonical="/about"
        jsonLd={breadcrumbSchema}
      />
      <Navbarpage/>
      <main className="about-page" dir="rtl">

        <section className="about-hero">
          <div className="about-container about-hero-inner">

            <div className="about-breadcrumb">
              <span>صفحه اصلی</span>

              <svg viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" />
              </svg>

              <strong>درباره ما</strong>
            </div>

            <div className="about-hero-title">
              <h1>درباره ما</h1>

              <p>
                ما با عشق به خودرو، بهترین قطعات را برای شما فراهم می‌کنیم
              </p>

              <span></span>
            </div>

          </div>

          <div className="about-yellow-shape"></div>
        </section>

        <section className="about-story-section">
          <div className="about-container about-story">

            <div className="about-story-text">

              <div className="about-title-line"></div>

              <h2>داستان ما</h2>

              <p>
                یدک کان، فروشگاه تخصصی قطعات خودرو، با هدف ارائه محصولات باکیفیت
                و اصل تأسیس شده است. ما باور داریم که هر خودرو، شایسته بهترین
                قطعات است.
              </p>

              <p>
                به همین دلیل، با همکاری معتبرترین برندهای داخلی و خارجی،
                مجموعه‌ای کامل از قطعات یدکی و لوازم مصرفی خودرو را در اختیار
                شما قرار داده‌ایم.
              </p>

              <p>
                هدف ما رضایت شماست. از انتخاب محصول تا ارسال سریع، ما در کنار شما
                هستیم تا تجربه‌ای مطمئن و لذت‌بخش از خرید قطعات خودرو داشته باشید.
              </p>

              <button className="about-main-button">
                بیشتر بدانید

                <svg viewBox="0 0 24 24">
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </button>

            </div>

            <div className="about-story-art">

              <svg
                className="about-large-svg"
                viewBox="0 0 520 520"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="260" cy="260" r="205" fill="#fff8dc" />

                <circle cx="260" cy="260" r="165" fill="#ffffff" stroke="#f1c400" strokeWidth="3" />

                <path
                  d="M260 118
                     C338 118 402 181 402 260
                     C402 339 338 402 260 402
                     C181 402 118 339 118 260
                     C118 181 181 118 260 118Z"
                  fill="none"
                  stroke="#e9eaec"
                  strokeWidth="17"
                />

                <path
                  d="M260 145
                     C324 145 375 196 375 260
                     C375 324 324 375 260 375
                     C196 375 145 324 145 260
                     C145 196 196 145 260 145Z"
                  fill="none"
                  stroke="#ffc400"
                  strokeWidth="8"
                  strokeDasharray="17 13"
                />

                <path
                  d="M250 164
                     L270 164
                     L278 191
                     C290 194 301 199 311 205
                     L335 191
                     L349 205
                     L335 229
                     C341 239 345 250 348 262
                     L375 270
                     L375 290
                     L348 298
                     C345 310 341 321 335 331
                     L349 355
                     L335 369
                     L311 355
                     C301 361 290 366 278 369
                     L270 396
                     L250 396
L242 369
                     C230 366 219 361 209 355
                     L185 369
                     L171 355
                     L185 331
                     C179 321 175 310 172 298
                     L145 290
                     L145 270
                     L172 262
                     C175 250 179 239 185 229
                     L171 205
                     L185 191
                     L209 205
                     C219 199 230 194 242 191
                     Z"
                  fill="#1b1d21"
                />

                <circle cx="260" cy="280" r="74" fill="#ffffff" stroke="#25282d" strokeWidth="9" />

                <circle cx="260" cy="280" r="47" fill="#f6f6f6" stroke="#ffc400" strokeWidth="7" />

                <circle cx="260" cy="280" r="16" fill="#1b1d21" />

                <circle cx="260" cy="214" r="8" fill="#ffc400" />

                <circle cx="260" cy="346" r="8" fill="#ffc400" />

                <circle cx="194" cy="280" r="8" fill="#ffc400" />

                <circle cx="326" cy="280" r="8" fill="#ffc400" />

                <path
                  d="M143 151
                     C121 173 108 204 108 238
                     C108 248 109 258 112 267"
                  fill="none"
                  stroke="#1b1d21"
                  strokeWidth="13"
                  strokeLinecap="round"
                />

                <path
                  d="M377 389
                     C399 367 412 336 412 302
                     C412 292 411 282 408 273"
                  fill="none"
                  stroke="#1b1d21"
                  strokeWidth="13"
                  strokeLinecap="round"
                />

                <path d="M108 238 L94 221 L88 246 L112 267" fill="#ffc400" />

                <path d="M412 302 L426 319 L432 294 L408 273" fill="#ffc400" />

                <circle cx="111" cy="105" r="9" fill="#ffc400" />

                <circle cx="416" cy="414" r="7" fill="#ffc400" />

                <circle cx="424" cy="104" r="5" fill="#d7d9dc" />

                <circle cx="101" cy="411" r="5" fill="#d7d9dc" />
              </svg>

              <div className="about-art-label">
                <span></span>
                <strong>یدک کان</strong>
                <small>همراه مطمئن خودروی شما</small>
              </div>

            </div>

          </div>
        </section>

        <section className="about-benefits-section">
          <div className="about-container">

            <div className="about-section-heading">
              <div className="about-title-line"></div>
              <h2>چرا یدک کان؟</h2>
              <p>
                همه چیز برای یک خرید مطمئن و حرفه‌ای
              </p>
            </div>

            <div className="about-benefits">
              <div className="about-benefit-card">
                <div className="about-benefit-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
                    <path d="M8.5 12l2.2 2.2 4.8-5" />
                  </svg>
                </div>
                <h3>ضمانت اصالت کالا</h3>
                <p>تمامی محصولات با ضمانت اصالت ارائه می‌شوند.</p>
              </div>

              <div className="about-benefit-card">
                <div className="about-benefit-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M3 6h11v10H3z" />
                    <path d="M14 9h4l3 3v4h-7z" />
                    <circle cx="7" cy="18" r="2" />
                    <circle cx="18" cy="18" r="2" />
                  </svg>
                </div>
                <h3>ارسال سریع</h3>
                <p>سفارش شما در کوتاه‌ترین زمان ممکن ارسال می‌شود.</p>
              </div>

              <div className="about-benefit-card">
                <div className="about-benefit-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 13v-2a7 7 0 0114 0v2" />
                    <path d="M5 13H3v4h4v-4H5z" />
                    <path d="M19 13h2v4h-4v-4h2z" />
                    <path d="M19 17c0 2-2 3-5 3" />
                  </svg>
                </div>
                <h3>پشتیبانی حرفه‌ای</h3>
                <p>قبل و بعد از خرید همراه شما خواهیم بود.</p>
              </div>

              <div className="about-benefit-card">
                <div className="about-benefit-icon">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="3" />
                    <path d="M6 21v-3a6 6 0 0112 0v3" />
                    <path d="M8 5l-1.5-2M16 5l1.5-2" />
                    <path d="M4 9H2M22 9h-2" />
                  </svg>
                </div>
                <h3>تجربه و اعتبار</h3>
                <p>سال‌ها تجربه در حوزه قطعات خودرو.</p>
              </div>

              <div className="about-benefit-card">
                <div className="about-benefit-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 3l2.2 5.2L20 9l-4.2 3.8L17 18l-5-2.8L7 18l1.2-5.2L4 9l5.8-.8L12 3z" />
                  </svg>
                </div>
                <h3>تنوع محصولات</h3>
                <p>دسترسی به مجموعه‌ای متنوع از قطعات خودرو.</p>
              </div>

              <div className="about-benefit-card">
                <div className="about-benefit-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 7h16" />
                    <path d="M6 4h12l2 17H4L6 4z" />
                    <path d="M9 11h6" />
                    <path d="M9 15h6" />
                  </svg>
                </div>
                <h3>قیمت مناسب</h3>
                <p>کیفیت بالا با قیمت منصفانه و رقابتی.</p>
              </div>

            </div>

          </div>
        </section>

        <section className="about-stat-section">
          <div className="about-container about-statistics">

            <div className="about-stat">
              <div className="about-stat-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 3l2.2 5.2L20 9l-4.2 3.8L17 18l-5-2.8L7 18l1.2-5.2L4 9l5.8-.8L12 3z" />
                </svg>
              </div>
              <strong>۹۸٪</strong>
              <span>رضایت مشتریان</span>
            </div>

            <div className="about-stat">
              <div className="about-stat-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M4 9h16v11H4z" />
                  <path d="M3 9l2-5h14l2 5" />
                  <path d="M8 13h3v7H8z" />
                </svg>
              </div>
              <strong>+۸</strong>
              <span>سال تجربه</span>
            </div>

            <div className="about-stat">
              <div className="about-stat-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M4 6h16v13H4z" />
                  <path d="M8 6V4h8v2" />
                  <path d="M8 11h8" />
                  <path d="M8 15h5" />
                </svg>
              </div>
              <strong>+۱۰,۰۰۰</strong>
              <span>محصول متنوع</span>
            </div>

            <div className="about-stat">
              <div className="about-stat-icon">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="8" />
                  <path d="M8.5 10h.01M15.5 10h.01" />
                  <path d="M8.5 14c1 2 6 2 7 0" />
                </svg>
              </div>
              <strong>+۵۰,۰۰۰</strong>
              <span>مشتری راضی</span>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
import "../styles/Footer.css";

export default function Footer() {
  return (
    <div className="dfgkh" dir="rtl">
        <div className="formemail">

        <div>
            <div className="txts">
                <h1>از تخفیف ها و جدید ترین محصولات مطلع شوید !</h1>
                <p className="pone">ایمیل خودرا وارد کنید(اختیاری)</p>
                <div className="email-input-row">
                  <input placeholder="ایمیل خود را وارد کنید..." type="text" />
                  <p className="ptwo">ثبت ایمیل</p>
                </div>
        </div>
        </div>
        <div className="imgconiner">
                <img src="/images/taier.png" alt="عضویت در خبرنامه یدک‌کان" />
            </div>
        </div>

    <footer className="site-footer" dir="rtl">
      <div className="footer-inner">

        <div className="footer-column footer-contact">
          <h3>اطلاعات تماس</h3>

          <a href="tel:02112345678" className="footer-item">
            <span>09906056570</span>

            <svg viewBox="0 0 24 24">
              <path d="M7.2 3.5 9.8 3c.7-.1 1.3.3 1.5.9l1.1 3.1c.2.5 0 .9-.4 1.2l-1.8 1.4c1 2 2.5 3.5 4.5 4.5l1.4-1.8c.3-.4.8-.6 1.2-.4l3.1 1.1c.6.2 1 .8.9 1.5l-.5 2.6c-.1.7-.8 1.2-1.5 1.2C10.9 18.3 5.7 13.1 5.7 6.7c0-.7.5-1.4 1.2-1.5Z" />
            </svg>
          </a>

          <a href="mailto:info@yadakkan.ir" className="footer-item">
            <span>info@yadakkan.ir</span>

            <svg viewBox="0 0 24 24">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m4 7 8 6 8-6" />
            </svg>
          </a>

          <div className="footer-item">
            <span>شنبه تا پنجشنبه ۸ تا ۱۸</span>

            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="8.5" />
              <path d="M12 7v5l3 2" />
            </svg>
          </div>
        </div>

        <div className="footer-column">
          <h3>دسته‌بندی محصولات</h3>

          <a href="#">سیستم ترمز</a>
          <a href="#">موتور و قطعات</a>
          <a href="#">سیستم تعلیق</a>
          <a href="#">برق و روشنایی</a>
          <a href="#">فیلترها</a>
          <a href="#">همه دسته‌ها</a>
        </div>

        <div className="footer-column">
          <h3>دسترسی سریع</h3>

          <a href="#">درباره ما</a>
          <a href="#">تماس با ما</a>
          <a href="#">شرایط و قوانین</a>
          <a href="#">حریم خصوصی</a>
          <a href="#">پیگیری سفارش</a>
          <a href="#">پشتیبانی آنلاین</a>
        </div>

        <div className="footer-column footer-about">
          <h3>درباره یدک‌کان</h3>

          <p>
            فروشگاه تخصصی قطعات یدکی خودرو با بهترین
            کیفیت و ضمانت اصالت کالا.
          </p>

          <p>
            تجربه‌ای مطمئن برای خرید قطعات خودرو
            با پشتیبانی و ارسال سریع.
          </p>

          <div className="footer-socials">

            <a href="#" aria-label="اینستاگرام یدک‌کان" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24">
                <rect x="4" y="4" width="16" height="16" rx="4" />
                <circle cx="12" cy="12" r="3.5" />
                <circle cx="17.2" cy="6.8" r="1" />
              </svg>
            </a>

            <a href="#" aria-label="تلگرام یدک‌کان" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24">
                <path d="m21 4-3.1 16-6.1-4.6-3.5 3.3.6-5.2L18 7.1 9.4 12l-4.2-1.5L21 4Z" />
                <path d="m11.8 15.4 2.1-2.1" />
              </svg>
            </a>

            <a href="#" aria-label="واتساپ یدک‌کان" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24">
                <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z" />
                <path d="M9 8.5c.3-.3.6-.3.9 0l.8 1c.2.3.2.6 0 .9l-.5.5c.7 1.2 1.5 2 2.7 2.7l.5-.5c.3-.2.6-.2.9 0l1 .8c.3.3.3.6 0 .9-.5.6-1.1.9-1.8.8-2.9-.4-5.9-3.4-6.3-6.3-.1-.7.2-1.3.8-1.8Z" />
              </svg>
            </a>

            <a href="#" aria-label="لینکدین یدک‌کان" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24">
                <rect x="4" y="4" width="16" height="16" rx="3" />
                <path d="M8 10v6M8 8v.1M11 16v-3.2c0-1.8 2.8-2 2.8 0V16M11 10v6" />
              </svg>
            </a>

          </div>
        </div>
      </div>

      <div className="footer-bottom">

        <div className="footer-copyright">
          تمام حقوق این سایت متعلق به یدک‌کان می‌باشد.
        </div>

        <div className="footer-bottom-brand">
          <strong>یدک‌کان</strong>
          <span>فروشگاه تخصصی قطعات خودرو</span>
        </div>
</div>
    </footer>
    </div>

  );
}
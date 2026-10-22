import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Accounts.css';
import Navbar from "./Navbarpage.jsx";

const API_BASE_URL = "https://webflow.pythonanywhere.com";
const ORDERS_API_URL = "https://webflow.pythonanywhere.com";

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

export default function Accounts() {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout, loading: authLoading } = useAuth(); 

  const phone = user?.phone || '';

  const [profile, setProfile] = useState({
    phone: phone,
    first_name: '',
    last_name: '',
    email: '',
    national_code: '',
    card_number: '',
    newsletter: false,
  });

  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // تا زمانی که AuthContext دارد وضعیت لودینگ اولیه را چک می‌کند، هیچ کاری نکنیم
    if (authLoading) return;

    // اگر لودینگ تمام شد و قطعی فهمیدیم کاربر لاگین نیست، هدایت به صفحه ورود
    if (!isLoggedIn) {
      navigate('/authform');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const profileRes = await axios.get(`${API_BASE_URL}profile/`, {
          withCredentials: true
        });
        setProfile(profileRes.data);

        try {
          const ordersRes = await axios.get(ORDERS_API_URL, {
            withCredentials: true,
            headers: { 'X-CSRFToken': getCookie('csrftoken') || '' }
          });
          setOrders(ordersRes.data || []);
        } catch (orderErr) {
          console.error(orderErr);
        }

      } catch (err) {
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          navigate('/authform');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoggedIn, authLoading, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/authform');
  };

  const handleOpenModal = () => {
    setFormData(profile); 
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}profile/`, formData, {
        withCredentials: true,
        headers: {
          'X-CSRFToken': getCookie('csrftoken') || ''
        }
      });
      setProfile(formData); 
      setIsModalOpen(false);
    } catch (err) {
      alert("خطا در ذخیره اطلاعات");
    }
  };

  if (authLoading || loading) {
    return <div className="account-loading">در حال دریافت اطلاعات...</div>;
  }

  const fullName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim();

  return (
    <div>
      <Navbar />
      <div className="account-page" dir="rtl">
        <div className="account-wrapper">
          <aside className="account-sidebar">
            <div className="sidebar-profile-card">
              <div className="user-info">
                <strong className="user-name">{fullName || "کاربر محترم"}</strong>
                <span className="user-phone">{profile.phone || phone}</span>
              </div>
            </div>

            <nav className="sidebar-nav">
              <a href="#orders" className="nav-item">سفارش‌های من</a>
              <a href="#addresses" className="nav-item">نشانی‌ها</a>
              <button type="button" className="nav-item logout-btn" onClick={handleLogout}>
                خروج از حساب
              </button>
            </nav>
          </aside>

          <div className="account-main-content">
            <div className="account-card">
              <div className="card-header">
                <h2>اطلاعات شخصی</h2>
              </div>

              <div className="info-grid">
                <div className="info-box"><span className="label">نام و نام خانوادگی</span><span className="value">{fullName || "- -"}</span></div>
                <div className="info-box"><span className="label">پست الکترونیک</span><span className="value">{profile.email || "-"}</span></div>
                <div className="info-box"><span className="label">شماره تلفن همراه</span><span className="value phone-value">{profile.phone || phone || "-"}</span></div>
                <div className="info-box"><span className="label">کد ملی</span><span className="value">{profile.national_code || "-"}</span></div>
                <div className="info-box"><span className="label">دریافت خبرنامه</span><span className="value">{profile.newsletter ? "بله" : "خیر"}</span></div>
                <div className="info-box"><span className="label">شماره کارت</span><span className="value">{profile.card_number || "-"}</span></div>
              </div>

              <div className="card-footer">
                <button type="button" className="btn-edit-profile" onClick={handleOpenModal}>
                  ویرایش اطلاعات شخصی
                </button>
              </div>
            </div>

            <div className="account-card" id="orders">
              <div className="card-header"><h2>آخرین سفارش‌ها</h2></div>
              <div className="table-responsive">
                <table className="orders-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
                      <th style={{ padding: '12px' }}>#</th>
                      <th style={{ padding: '12px' }}>شماره سفارش</th>
                      <th style={{ padding: '12px' }}>تاریخ ثبت سفارش</th>
                      <th style={{ padding: '12px' }}>مبلغ کل</th>
                      <th style={{ padding: '12px' }}>وضعیت سفارش</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length > 0 ? (
                      orders.map((order, index) => (
                        <tr key={order.id || index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '14px', color: '#334155' }}>{index + 1}</td>
                          <td style={{ padding: '14px', fontWeight: 'bold', color: '#0f172a' }}>
                            #{order.order_number || order.id}
                          </td>
                          <td style={{ padding: '14px', color: '#334155' }}>
                            {order.created_at}
                          </td>
                          <td style={{ padding: '14px', color: '#16a34a', fontWeight: 'bold' }}>
                            {Number(order.total_price || 0).toLocaleString('fa-IR')} تومان
                          </td>
                          <td style={{ padding: '14px', color: '#d97706', fontWeight: 'bold' }}>
                            {order.status_text || order.status}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                          هنوز سفارشی ثبت نکرده‌اید.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="modal-backdrop">
            <div className="modal-box">
              <div className="modal-header">
                <h3>ویرایش اطلاعات شخصی</h3>
                <button type="button" className="close-btn" onClick={() => setIsModalOpen(false)}>×</button>
              </div>

              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-row">
                  <div className="form-field">
                    <label>نام</label>
                    <input type="text" name="first_name" value={formData.first_name || ''} onChange={handleChange} />
                  </div>
                  <div className="form-field">
                    <label>نام خانوادگی</label>
                    <input type="text" name="last_name" value={formData.last_name || ''} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-field">
                  <label>شماره تلفن همراه (غیرقابل تغییر)</label>
                  <input type="text" value={profile.phone || phone} disabled className="disabled-input" />
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>پست الکترونیک</label>
                    <input type="email" name="email" value={formData.email || ''} onChange={handleChange} />
                  </div>
                  <div className="form-field">
                    <label>کد ملی</label>
                    <input type="text" name="national_code" maxLength="10" value={formData.national_code || ''} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-field">
                  <label>شماره کارت</label>
                  <input type="text" name="card_number" maxLength="16" value={formData.card_number || ''} onChange={handleChange} />
                </div>

                <div className="form-checkbox">
                  <label>
                    <input type="checkbox" name="newsletter" checked={formData.newsletter || false} onChange={handleChange} />
                    <span>دریافت خبرنامه</span>
                  </label>
                </div>

                <div className="modal-buttons">
                  <button type="submit" className="btn-confirm">ذخیره تغییرات</button>
                  <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}>انصراف</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

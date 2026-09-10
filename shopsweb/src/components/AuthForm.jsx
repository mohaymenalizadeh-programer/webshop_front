import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SEO from './SEO.jsx';
import '../styles/AuthForm.css';
const API_BASE_URL = 'http://api.yadakkan.ir/apiaccounts';

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

export default function AuthForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const otpInputsRef = useRef([]);

  useEffect(() => {
    let interval = null;
    if (!isLogin && step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isLogin, step, timer]);

  const handleOtpChange = (e, index) => {
    const val = e.target.value;
    if (isNaN(val)) return;

    const newOtp = [...otp];
    newOtp[index] = val ? val.substring(val.length - 1) : '';
    setOtp(newOtp);

    if (val && index < 3) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const response = await fetch(`${API_BASE_URL}/send-code/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken') || ''
        },
        credentials: 'include',
        body: JSON.stringify({ phone }),
      });
      const data = await response.json();

      if (response.ok) {
        setStep(2);
        setTimer(120);
        setCanResend(false);
      } else {
        setErrorMsg(data.error || 'خطا در ارسال کد');
      }
    } catch (err) {
      setErrorMsg('خطا در ارتباط با سرور');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const code = otp.join('');
    if (code.length !== 4) {
      setErrorMsg('لطفا کد تایید ۴ رقمی را کامل وارد کنید.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/verify-code/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken') || ''
        },
        credentials: 'include',
        body: JSON.stringify({ phone, code }),
      });
      const data = await response.json();

      if (response.ok) {
        setStep(3);
      } else {
        setErrorMsg(data.error || 'کد تایید اشتباه است');
      }
    } catch (err) {
      setErrorMsg('خطا در ارتباط با سرور');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('رمز عبور و تکرار آن یکسان نیستند.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken') || ''
        },
        credentials: 'include',
        body: JSON.stringify({
          phone,
          code: otp.join(''),
          password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        login(data.user || { phone });
        navigate('/home');
      } else {
        setErrorMsg(data.error || 'خطا در ثبت‌نام');
      }
    } catch (err) {
      setErrorMsg('خطا در ارتباط با سرور');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const response = await fetch(`${API_BASE_URL}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken') || ''
        },
        credentials: 'include',
        body: JSON.stringify({ phone, password }),
      });
      const data = await response.json();

      if (response.ok) {
        login(data.user || { phone });
        navigate('/home');
      } else {
        setErrorMsg(data.error || 'اطلاعات ورود اشتباه است');
      }
    } catch (err) {
      setErrorMsg('خطا در ارتباط با سرور');
    }
  };

  const resendCode = async () => {
    setErrorMsg('');
    try {
      const response = await fetch(`${API_BASE_URL}/send-code/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken') || ''
        },
        credentials: 'include',
        body: JSON.stringify({ phone }),
      });
      const data = await response.json();

      if (response.ok) {
        setTimer(120);
        setCanResend(false);
        setOtp(['', '', '', '']);
        otpInputsRef.current[0]?.focus();
      } else {
        setErrorMsg(data.error || 'خطا در ارسال مجدد کد');
      }
    } catch (err) {
      setErrorMsg('خطا در ارتباط با سرور');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setStep(1);
    setOtp(['', '', '', '']);
    setPassword('');
    setConfirmPassword('');
    setErrorMsg('');
  };

  return (
    <div className="full-screen-container">
      <SEO
        title={isLogin ? "ورود به حساب کاربری" : "ثبت‌نام"}
        description="ورود یا ثبت‌نام در یدک‌کان"
        canonical="/authform"
        noindex={true}
      />
      <div className="right-panel">
        <div className="form-content-wrap">
          <div className="form-header-badge">
            <span>{isLogin ? 'ورود به حساب' : 'ثبت نام جدید'}</span>
          </div>

          {errorMsg && <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{errorMsg}</div>}

          {!isLogin && (
            <div className="modern-stepper">
              <div className="stepper-track">
                <div
                  className="stepper-fill"
                  style={{ width: `${((step - 1) / 2) * 100}%` }}
                ></div>
                <div className={`step-node ${step >= 1 ? 'active' : ''}`}>۱</div>
                <div className={`step-node ${step >= 2 ? 'active' : ''}`}>۲</div>
                <div className={`step-node ${step >= 3 ? 'active' : ''}`}>۳</div>
              </div>
              <div className="step-labels-text">
                <span className={step === 1 ? 'current' : ''}>شماره همراه</span>
                <span className={step === 2 ? 'current' : ''}>کد تایید</span>
                <span className={step === 3 ? 'current' : ''}>رمز عبور</span>
              </div>
            </div>
          )}

          {isLogin ? (
            <form onSubmit={handleLogin} className="auth-form-body">
              <h2 className="title-bold">ورود به حساب کاربری</h2>
              <p className="subtitle-faded">اطلاعات ورود خود را وارد کنید.</p>

              <div className="custom-field">
                <label>شماره همراه</label>
                <div className="input-with-icon">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09123456789"
                    className="ltr-input"
                    required
                  />
                  <svg className="field-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                  </svg>
                </div>
              </div>

              <div className="custom-field">
                <label>کلمه عبور</label>
                <div className="input-with-icon">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                  />
                  <svg className="field-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
              </div>

              <button type="submit" className="action-button-yellow">
                <span>ورود به حساب</span>
              </button>
            </form>
          ) : (
            <div className="signup-flow-box">
              {step === 1 && (
                <form onSubmit={handleSendOtp} className="auth-form-body">
                  <h2 className="title-bold">ایجاد حساب جدید</h2>
                  <p className="subtitle-faded">شماره همراه خود را وارد کنید.</p>

                  <div className="custom-field">
                    <label>شماره همراه</label>
                    <div className="input-with-icon">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="09123456789"
                        className="ltr-input"
                        required
                      />
                      <svg className="field-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                        <line x1="12" y1="18" x2="12.01" y2="18"></line>
                      </svg>
                    </div>
                  </div>

                  <button type="submit" className="action-button-yellow">
                    <span>ارسال کد تایید</span>
                  </button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleVerifyOtp} className="auth-form-body">
                  <h2 className="title-bold">تایید شماره همراه</h2>
                  <p className="subtitle-faded">کد ۴ رقمی ارسال شده به {phone} را وارد کنید.</p>

                  <div className="otp-boxes-wrapper">
                    {otp.map((data, index) => (
                      <input
                        key={index}
                        ref={(el) => (otpInputsRef.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength="1"
                        value={data}
                        onChange={(e) => handleOtpChange(e, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        className="otp-box-digit"
                      />
                    ))}
                  </div>

                  <div className="timer-status">
                    {canResend ? (
                      <button type="button" onClick={resendCode} className="resend-action">
                        ارسال مجدد کد
                      </button>
                    ) : (
                      <span>ارسال مجدد تا: <b className="time-accent">{formatTime(timer)}</b></span>
                    )}
                  </div>

                  <button type="submit" className="action-button-yellow">
                    <span>تایید و ادامه</span>
                  </button>
                </form>
              )}

              {step === 3 && (
                <form onSubmit={handleRegister} className="auth-form-body">
                  <h2 className="title-bold">تنظیم کلمه عبور</h2>
                  <p className="subtitle-faded">رمز عبور مورد نظر خود را وارد کنید.</p>

                  <div className="custom-field">
                    <label>کلمه عبور</label>
                    <div className="input-with-icon">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        required
                      />
                      <svg className="field-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 2l-2 2m-1.5 1.5L4 18l-1 4 4-1 12.5-12.5M15 5l4 4"></path>
                      </svg>
                    </div>
                  </div>

                  <div className="custom-field">
                    <label>تکرار کلمه عبور</label>
                    <div className="input-with-icon">
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        required
                      />
                      <svg className="field-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                  </div>

                  <button type="submit" className="action-button-yellow">
                    <span>تکمیل ثبت‌نام</span>
                  </button>
                </form>
              )}
            </div>
          )}

          <div className="card-footer-toggle">
            <span>{isLogin ? 'حساب کاربری ندارید؟' : 'قبلاً ثبت‌نام کرده‌اید؟'}</span>
            <button type="button" onClick={switchMode} className="inline-link-btn">
              {isLogin ? 'ثبت‌نام کنید' : 'وارد شوید'}
            </button>
          </div>
        </div>
      </div>

      <div className="left-yellow-panel">
        <div className="yellow-panel-content">
          <div className="panel-top-text">
            <h2>سامانه جامع تامین قطعات</h2>
            <p>دسترسی سریع، امن و یکپارچه به کلیه خدمات</p>
          </div>

          <div className="main-logo-wrapper">
            <svg className="hero-logo-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>

          <div className="panel-bottom-text">
            <h3>تضمین اصالت و کیفیت</h3>
            <p>پشتیبانی ۲۴ ساعته در تمامی مراحل خرید</p>
          </div>
        </div>
      </div>
    </div>
  );
}